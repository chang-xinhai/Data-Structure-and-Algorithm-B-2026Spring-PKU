#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
from typing import List, Optional, Tuple
from urllib.parse import urljoin

from models import Contest, Problem

def parse_contest_list_page(html: str, base_url: str) -> List[str]:
    """
    Parse the base URL page to extract contest IDs.
    Contest IDs are like "2026hw3", "26hw5" etc.
    """
    contest_ids = []

    # Pattern 1: Links like <a href="/2026hw3/">2026hw3</a> or <a href="./2026hw3/">
    pattern1 = re.compile(r'<a[^>]+href=["\'](?:\./|/)?([a-zA-Z0-9]+)/["\'][^>]*>([^<]+)</a>')
    for match in pattern1.finditer(html):
        contest_id = match.group(1)
        # Filter out common non-contest links
        if contest_id not in ('admin', 'api', 'static', 'problems', 'news', 'index.html'):
            contest_ids.append(contest_id)

    # Pattern 2: Contest IDs in paths like /2026hw3/C/ or /26hw5/1/
    pattern2 = re.compile(r'href=["\']/(?![a-zA-Z0-9]+/)([a-zA-Z0-9]+)/["\']')
    for match in pattern2.finditer(html):
        contest_id = match.group(1)
        if contest_id not in contest_ids and contest_id not in ('admin', 'api', 'static'):
            contest_ids.append(contest_id)

    # Deduplicate while preserving order
    seen = set()
    unique = []
    for cid in contest_ids:
        if cid not in seen:
            seen.add(cid)
            unique.append(cid)

    return unique

def parse_contest_page(html: str, contest_id: str, base_url: str) -> List[Problem]:
    """
    Parse a contest page to extract problem list.
    Returns list of problems with their URLs.
    """
    problems = []

    # Pattern: links like /2026hw3/A/, /2026hw3/B/, /26hw5/1/, /26hw5/2/
    # or just the problem identifier
    pattern = re.compile(r'<a[^>]+href=["\']/?' + re.escape(contest_id) + r'/([^/]+)/["\'][^>]*>([^<]*)</a>')

    seen = {}
    for match in pattern.finditer(html):
        prob_id = match.group(1)
        prob_text = match.group(2).strip()

        # Skip if not a problem (could be navigation etc.)
        SKIP_PATHS = {
            'admin', 'api', 'problems', 'news', 'logout',
            'status', 'clarify', 'ranking', 'statistics', 'tips',
            'submit', 'solution', 'ranklist', 'editorial'
        }
        if prob_id.lower() in SKIP_PATHS:
            continue

        if prob_id not in seen:
            seen[prob_id] = True
            url = f"/{contest_id}/{prob_id}/"
            problems.append(Problem(
                contest_id=contest_id,
                problem_num=prob_id,
                problem_id="",  # Will be extracted from problem page
                url=url
            ))

    # Sort problems - try to sort alphanumerically
    try:
        problems.sort(key=lambda p: (len(p.problem_num), p.problem_num))
    except:
        pass

    return problems

def parse_problem_page(html: str, problem: Problem) -> Problem:
    """
    Parse a problem page to extract details.
    """
    # Extract problem ID from form or hidden fields
    # Pattern: <input type="hidden" name="problem_id" value="12345" />
    pid_match = re.search(r'<input[^>]+name=["\']problem_id["\'][^>]+value=["\'](\d+)["\']', html)
    if not pid_match:
        pid_match = re.search(r'problem_id=(\d+)', html)

    if pid_match:
        problem.problem_id = pid_match.group(1)

    # Try to extract title
    title_match = re.search(r'<h2[^>]*>([^<]+)</h2>', html)
    if not title_match:
        title_match = re.search(r'<title>([^<]+)</title>', html)
    if title_match:
        problem.title = title_match.group(1).strip()

    # Extract time limit
    time_match = re.search(r'Time Limit:\s*(\d+)\s*(ms|S)', html, re.IGNORECASE)
    if time_match:
        problem.time_limit = f"{time_match.group(1)} {time_match.group(2)}"

    # Extract memory limit
    mem_match = re.search(r'Memory Limit:\s*(\d+)\s*(KB|MB|GB)', html, re.IGNORECASE)
    if mem_match:
        problem.memory_limit = f"{mem_match.group(1)} {mem_match.group(2)}"

    # Extract main description (everything in the problem-content div or similar)
    desc_match = re.search(r'<div[^>]+class=["\'][^"\']*problem[^"\']*["\'][^>]*>(.*?)</div>\s*</div>\s*<div[^>]+class=["\'][^"\']*submit', html, re.DOTALL | re.IGNORECASE)
    if desc_match:
        problem.description_html = desc_match.group(1).strip()
    else:
        # Fallback: try to find main content area
        desc_match = re.search(r'<div[^>]+id=["\'][^"\']*content[^"\']*["\'][^>]*>(.*?)</div>', html, re.DOTALL)
        if desc_match:
            problem.description_html = desc_match.group(1).strip()
        else:
            # Last resort: just grab body content before submit area
            body_match = re.search(r'<body[^>]*>(.*?)<div[^>]+class=["\'][^"\']*submit', html, re.DOTALL | re.IGNORECASE)
            if body_match:
                problem.description_html = body_match.group(1).strip()

    return problem
