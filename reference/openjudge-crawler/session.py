#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import requests
from typing import Optional
from pathlib import Path
import time

from config import load_config, get_cookie, get_headers

class OpenJudgeSession:
    """Manages HTTP sessions to OpenJudge."""

    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip('/')
        self.config = load_config()
        self.cookie = get_cookie(self.config)
        self.headers = get_headers(self.config)
        self.session = requests.Session()
        self.session.headers.update(self.headers)

        if self.cookie:
            self.session.cookies.set("PHPSESSID", self.cookie, domain=self._get_domain())

    def _get_domain(self) -> str:
        """Extract domain from base_url."""
        from urllib.parse import urlparse
        return urlparse(self.base_url).netloc

    def get(self, path: str = "", timeout: int = 30) -> Optional[requests.Response]:
        """GET request to the OpenJudge instance."""
        url = f"{self.base_url}/{path.lstrip('/')}" if path else self.base_url

        try:
            response = self.session.get(url, timeout=timeout)
            response.encoding = 'utf-8'
            return response
        except requests.RequestException as e:
            print(f"    Request failed: {e}")
            return None

    def get_with_retry(self, path: str = "", retries: int = 3, delay: float = 1.0) -> Optional[requests.Response]:
        """GET with retry logic."""
        for attempt in range(retries):
            response = self.get(path)
            if response and response.status_code == 200:
                return response
            if attempt < retries - 1:
                time.sleep(delay)
        return None
