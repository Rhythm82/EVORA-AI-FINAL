from datetime import datetime


def parse_datetime(date, time):

    formats = [
        "%Y-%m-%d %H:%M",
        "%Y-%m-%d %H:%M:%S",
        "%Y-%m-%d %I:%M %p"
    ]

    for fmt in formats:
        try:
            return datetime.strptime(f"{date} {time}", fmt)
        except:
            continue

    raise ValueError("Invalid date/time format")


def detect_conflict(new_event, existing_events):

    new_start = parse_datetime(new_event["start_date"], new_event["start_time"])
    new_end = parse_datetime(new_event["end_date"], new_event["end_time"])

    if new_start >= new_end:
        return {
            "status": "invalid",
            "conflict": True,
            "reason": "Event end time must be after start time"
        }

    for event in existing_events:

        existing_start = parse_datetime(event["start_date"], event["start_time"])
        existing_end = parse_datetime(event["end_date"], event["end_time"])

        if new_start < existing_end and new_end > existing_start:

            return {
                "status": "conflict",
                "conflict": True,
                "conflicting_event": event["event_name"],
                "message": f"Event conflicts with {event['event_name']}"
            }

    return {
        "status": "valid",
        "conflict": False
    }