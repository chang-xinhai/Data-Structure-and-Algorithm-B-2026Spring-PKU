#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from dataclasses import dataclass, field
from typing import List, Optional
from datetime import datetime

@dataclass
class Problem:
    """Represents a single problem."""
    contest_id: str
    problem_num: str  # e.g., "A", "B", "1", "2"
    problem_id: str
    url: str
    title: Optional[str] = None
    time_limit: Optional[str] = None
    memory_limit: Optional[str] = None
    description_html: Optional[str] = None

    @property
    def filename(self) -> str:
        return f"{self.problem_num}.html"

    @property
    def storage_path(self) -> str:
        return f"{self.contest_id}/{self.filename}"

@dataclass
class Contest:
    """Represents a contest."""
    contest_id: str  # e.g., "2026hw3" or "26hw5"
    url: str
    base_url: str  # e.g., "http://xlxxsjjg.openjudge.cn"
    title: Optional[str] = None
    problems: List[Problem] = field(default_factory=list)

    @property
    def storage_path(self) -> str:
        return self.contest_id

@dataclass
class CrawlResult:
    """Result of a crawl operation."""
    contest: Contest
    success: bool
    problems_crawled: int = 0
    problems_skipped: int = 0
    error: Optional[str] = None
    timestamp: str = field(default_factory=lambda: datetime.now().isoformat())
