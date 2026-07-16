#!/usr/bin/env python3
"""VerifyAI tracking health check — run by cron every hour.

Checks:
1. Worker /api/track/status endpoint responds
2. Events have been received in the last N hours
3. No persistent errors

If any check fails, print error message.
If all OK, print nothing (silent = healthy).
"""

import json
import os
import sys
import urllib.request
from datetime import datetime, timezone, timedelta

SITE = "https://verifyai.fork.work"
WORKER_STATUS = f"{SITE}/api/track/status"
STALE_HOURS = 6


def check_worker():
    """Hit worker status endpoint and return parsed JSON or error."""
    try:
        req = urllib.request.Request(WORKER_STATUS, method="GET")
        with urllib.request.urlopen(req, timeout=10) as resp:
            return json.loads(resp.read().decode())
    except Exception as e:
        return {"error": str(e)}


def simulate_event():
    """Do a simple GET on the site to trigger a page view."""
    try:
        req = urllib.request.Request(SITE, method="GET")
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.status == 200
    except Exception:
        return False


def main():
    status = check_worker()

    # Check 1: Worker alive?
    if "error" in status:
        print(f"[ALERT] Worker status endpoint unreachable: {status['error']}")
        sys.exit(1)

    if not status.get("ok"):
        print(f"[ALERT] Worker reports unhealthy: {status}")
        sys.exit(1)

    # Check 2: Events received recently?
    last_event = status.get("last_event_at")
    if last_event:
        last_time = datetime.fromisoformat(last_event)
        now = datetime.now(timezone.utc)
        if now - last_time > timedelta(hours=STALE_HOURS):
            print(f"[WARN] No events in {STALE_HOURS}h (last: {last_event})")
            # Don't exit with error — this is a warning, not critical

    # Check 3: Any errors?
    last_error = status.get("last_error_at")
    if last_error:
        print(f"[WARN] Worker had an error at {last_error}: {status.get('last_error')}")

    # Check 4: Site is serving pages
    if not simulate_event():
        print("[WARN] Site GET failed — possible downtime")

    # Silent = healthy


if __name__ == "__main__":
    main()
