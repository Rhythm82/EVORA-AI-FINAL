from datetime import datetime, timedelta


def scheduler_agent(events):

    results = []

    # small delay so backend always schedules it
    now_time = (datetime.now() + timedelta(seconds=15)).strftime("%Y-%m-%dT%H:%M:%S")

    # -------- PROGRAM SUMMARY --------
    program_summary = "Full Event Schedule:\n"

    for event in events:
        program_summary += (
            f"{event['event_name']} - "
            f"{event['start_date']} {event['start_time']} to "
            f"{event['end_date']} {event['end_time']}\n"
        )

    # Use first event ID so backend processes it
    first_event_id = events[0]["event_id"]

    # -------- SUMMARY EMAIL --------
    results.append({
        "eventId": first_event_id,
        "triggerTime": now_time,
        "instruction": f"Send the following program schedule to all participants:\n{program_summary}"
    })

    # -------- SOCIAL MEDIA ACTIVATION --------
    results.append({
        "eventId": first_event_id,
        "triggerTime": now_time,
        "instruction": f"Generate promotional social media posts for the following event schedule:\n{program_summary}"
    })

    # -------- EVENT REMINDERS --------
    for event in events:

        start_dt = datetime.strptime(
            f"{event['start_date']} {event['start_time']}",
            "%Y-%m-%d %H:%M"
        )

        reminder_dt = start_dt - timedelta(minutes=30)

        reminder_time = reminder_dt.strftime("%Y-%m-%dT%H:%M:%S")

        results.append({
            "eventId": event["event_id"],
            "triggerTime": reminder_time,
            "instruction": (
                f"Reminder: {event['event_name']} will begin shortly at "
                f"{event['start_time']}. Please join on time."
            )
        })

    return {
        "results": results
    }