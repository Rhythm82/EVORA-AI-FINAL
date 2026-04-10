from pydantic import BaseModel
from typing import Optional, List, Dict


class EventInput(BaseModel):
    event_name: str
    start_time: str
    end_time: str
    start_date: str
    end_date: str
    description: Optional[str] = None


class SchedulerRequest(BaseModel):
    new_event: Dict
    existing_events: List[Dict]