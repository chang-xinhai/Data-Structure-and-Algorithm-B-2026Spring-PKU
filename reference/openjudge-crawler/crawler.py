#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import argparse
import sys
import time
from pathlib import Path

from config import load_config
from session import OpenJudgeSession
from parsers import parse_contest_list_page, parse_contest_page, parse_problem_page
from storage import Storage
from models import Contest, CrawlResult

def crawl_contest(session: OpenJudgeSession, contest_id: str, storage: Storage,
                  force: bool = False, delay: float = 0.5) -> CrawlResult:
    """Crawl a single contest and all its problems."""
    contest = Contest(contest_id=contest_id, url=f"/{contest_id}/", base_url=session.base_url)

    # Step 1: Get contest page and parse problem list
    print(f"  Fetching contest page: {contest_id}")
    resp = session.get_with_retry(f"/{contest_id}/")
    if not resp or resp.status_code != 200:
        return CrawlResult(contest=contest, success=False, error=f"HTTP {resp.status_code if resp else 'None'}")

    problems = parse_contest_page(resp.text, contest_id, session.base_url)
    if not problems:
        print(f"  Warning: No problems found for contest {contest_id}")
        return CrawlResult(contest=contest, success=True, problems_crawled=0)

    print(f"  Found {len(problems)} problems: {[p.problem_num for p in problems]}")

    # Step 2: Crawl each problem page
    for i, problem in enumerate(problems):
        problem_path = f"/{contest_id}/{problem.problem_num}/"

        # Check if already exists (incremental)
        if storage.problem_exists(problem) and not force:
            print(f"  [{i+1}/{len(problems)}] Skip (exists): {problem.problem_num}")
            continue

        print(f"  [{i+1}/{len(problems)}] Crawling: {problem.problem_num}...", end='', flush=True)

        resp = session.get_with_retry(problem_path.lstrip('/'))
        if not resp or resp.status_code != 200:
            print(f" FAILED")
            continue

        # Parse problem details
        problem = parse_problem_page(resp.text, problem)

        # Save HTML (as requested)
        storage.save_html(problem, resp.text, force=force)

        print(f" OK (saved)")
        time.sleep(delay)

    return CrawlResult(contest=contest, success=True)

def crawl_base(base_url: str, force: bool = False, delay: float = 0.5) -> list:
    """Crawl all contests from a base URL."""
    print(f"\n{'='*60}")
    print(f"Crawling: {base_url}")
    print(f"{'='*60}")

    session = OpenJudgeSession(base_url)
    storage = Storage()

    # Step 1: Get base page and find all contests
    print("Fetching contest list...")
    resp = session.get_with_retry("/")
    if not resp or resp.status_code != 200:
        print(f"Failed to fetch base page: {resp.status_code if resp else 'None'}")
        return []

    contest_ids = parse_contest_list_page(resp.text, base_url)
    print(f"Found {len(contest_ids)} contests: {contest_ids[:10]}{'...' if len(contest_ids) > 10 else ''}")

    # Step 2: Crawl each contest
    results = []
    for contest_id in contest_ids:
        print(f"\n>> Contest: {contest_id}")
        result = crawl_contest(session, contest_id, storage, force=force, delay=delay)
        results.append(result)
        time.sleep(delay)

    return results

def main():
    parser = argparse.ArgumentParser(description="OpenJudge Crawler")
    parser.add_argument("--base", "-b", action="append",
                        help="Base URL to crawl (can specify multiple)")
    parser.add_argument("--force", "-f", action="store_true",
                        help="Overwrite existing files")
    parser.add_argument("--delay", "-d", type=float, default=0.5,
                        help="Delay between requests (default: 0.5)")
    parser.add_argument("--contest", "-c", action="append",
                        help="Crawl specific contest ID only")
    parser.add_argument("--stats", "-s", action="store_true",
                        help="Show storage statistics")
    parser.add_argument("--init", action="store_true",
                        help="Create config.json from example")

    args = parser.parse_args()

    # Handle --init
    if args.init:
        config_file = Path(__file__).parent / "config.json"
        example_file = Path(__file__).parent / "config.json.example"
        if config_file.exists():
            print(f"config.json already exists at {config_file}")
            sys.exit(1)
        if example_file.exists():
            import shutil
            shutil.copy(example_file, config_file)
            print(f"Created config.json from example")
            print(f"Please edit {config_file} and add your cookies")
            sys.exit(0)
        else:
            print("config.json.example not found")
            sys.exit(1)

    # Handle --stats
    if args.stats:
        storage = Storage()
        stats = storage.get_stats()
        print(f"Storage Statistics:")
        print(f"  Contests: {stats['contests']}")
        print(f"  Problems: {stats['problems']}")
        print(f"  Total Size: {stats['total_size'] / 1024:.1f} KB")
        print(f"  Path: {storage.base_path}")
        sys.exit(0)

    # Load config
    config = load_config()
    bases = args.base or config.get("bases", [])

    if not bases:
        print("No base URLs specified. Use --base or configure in config.json")
        print("Run with --init to create config.json")
        sys.exit(1)

    all_results = []
    for base in bases:
        results = crawl_base(base, force=args.force, delay=args.delay)
        all_results.extend(results)

    # Summary
    print(f"\n{'='*60}")
    print("Crawl Complete!")
    print(f"{'='*60}")
    print(f"Total contests processed: {len(all_results)}")

    storage = Storage()
    stats = storage.get_stats()
    print(f"Total problems in storage: {stats['problems']}")
    print(f"Storage path: {storage.base_path}")

if __name__ == "__main__":
    main()
