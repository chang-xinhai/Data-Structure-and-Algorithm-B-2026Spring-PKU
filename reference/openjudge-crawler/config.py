#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import os
from pathlib import Path

CONFIG_FILE = Path(__file__).parent / "config.json"

_default_config = {
    "cookie": "",
    "headers": {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive"
    },
    "bases": [],
    "storage_path": "reference/openjudge"
}

def load_config():
    """Load config from file, merge with defaults."""
    if not CONFIG_FILE.exists():
        return _default_config.copy()

    with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
        user_config = json.load(f)

    config = _default_config.copy()
    for key, value in user_config.items():
        if isinstance(value, dict) and key in config and isinstance(config[key], dict):
            config[key] = {**config[key], **value}
        else:
            config[key] = value
    return config

def save_config(config):
    """Save config to file."""
    with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
        json.dump(config, f, ensure_ascii=False, indent=4)

def get_cookie(config):
    """Get the OpenJudge cookie from config."""
    return config.get("cookie", "")

def get_headers(config):
    """Get headers from config."""
    return config.get("headers", _default_config["headers"]).copy()
