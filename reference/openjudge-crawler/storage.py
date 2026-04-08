#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
from pathlib import Path
from typing import Optional
import html2text

from models import Problem
from config import load_config

class Storage:
    """Handles file storage with incremental support."""

    def __init__(self, base_path: Optional[str] = None):
        config = load_config()
        self.base_path = Path(base_path or config.get("storage_path", "reference/openjudge"))
        self.h = html2text.HTML2Text()
        self.h.ignore_links = False
        self.h.body_width = 0  # Don't wrap

    def _get_domain(self, base_url: str) -> str:
        """Extract domain from base_url."""
        from urllib.parse import urlparse
        return urlparse(base_url).netloc

    def get_problem_path(self, problem: Problem, base_url: str = "") -> Path:
        """Get the full path for a problem file."""
        if base_url:
            domain = self._get_domain(base_url)
            return self.base_path / domain / problem.contest_id / problem.filename
        return self.base_path / problem.contest_id / problem.filename

    def problem_exists(self, problem: Problem, base_url: str = "") -> bool:
        """Check if problem file already exists."""
        path = self.get_problem_path(problem, base_url)
        return path.exists()

    def save_problem(self, problem: Problem, force: bool = False) -> bool:
        """
        Save problem to file.
        Returns True if saved, False if skipped (already exists and not force).
        """
        path = self.get_problem_path(problem)

        if path.exists() and not force:
            return False

        # Ensure directory exists
        path.parent.mkdir(parents=True, exist_ok=True)

        # Convert HTML to markdown
        if problem.description_html:
            markdown_content = self.h.handle(problem.description_html)
        else:
            markdown_content = f"# {problem.title or problem.problem_num}\n\n*No description available.*"

        # Build full content
        lines = [
            f"# {problem.title or f'Problem {problem.problem_num}'}",
            "",
            f"- Contest: {problem.contest_id}",
            f"- Problem ID: {problem.problem_num}",
            f"- URL: {problem.url}",
        ]

        if problem.time_limit:
            lines.append(f"- Time Limit: {problem.time_limit}")
        if problem.memory_limit:
            lines.append(f"- Memory Limit: {problem.memory_limit}")

        lines.extend([
            "",
            "## Description",
            "",
            markdown_content.strip()
        ])

        content = "\n".join(lines)

        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)

        return True

    def save_html(self, problem: Problem, html_content: str, force: bool = False, base_url: str = "") -> bool:
        """Save raw HTML content."""
        path = self.get_problem_path(problem, base_url)

        if path.exists() and not force:
            return False

        path.parent.mkdir(parents=True, exist_ok=True)

        with open(path, 'w', encoding='utf-8') as f:
            f.write(html_content)

        return True

    def get_stats(self) -> dict:
        """Get storage statistics."""
        stats = {"domains": 0, "contests": 0, "problems": 0, "total_size": 0}

        if not self.base_path.exists():
            return stats

        for domain_dir in self.base_path.iterdir():
            if domain_dir.is_dir():
                stats["domains"] += 1
                for contest_dir in domain_dir.iterdir():
                    if contest_dir.is_dir():
                        stats["contests"] += 1
                        for problem_file in contest_dir.iterdir():
                            if problem_file.is_file():
                                stats["problems"] += 1
                                stats["total_size"] += problem_file.stat().st_size

        return stats
