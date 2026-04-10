from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Optional

from agent.sm_agent import generate_social_content
from agent.email_agent import generate_emails
from agent.scheduler_agent import scheduler_agent

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# -------- SOCIAL MEDIA INPUT --------
class EventInput(BaseModel):
    event_description: str


# -------- EMAIL AGENT INPUT --------
class EmailInstruction(BaseModel):
    instruction: str
    participants: List[Dict]


# -------- SCHEDULER EVENT MODEL --------
class Event(BaseModel):
    event_id: str
    event_name: str
    start_time: str
    end_time: str
    start_date: str
    end_date: str
    description: Optional[str] = None


class SchedulerRequest(BaseModel):
    events: List[Event]


@app.get("/")
def root():
    return {"message": "EVORA AI Agents API running"}


# -------- SOCIAL MEDIA AGENT --------
@app.post("/generate-social-content")
def generate_content(data: EventInput):

    try:
        return generate_social_content(data.event_description)

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }


# -------- EMAIL AGENT --------
@app.post("/email-agent")
def run_email_agent(data: EmailInstruction):

    try:
        return generate_emails(
            instruction=data.instruction,
            participants=data.participants
        )

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }


# -------- SCHEDULER AGENT --------
@app.post("/schedule-events")
def schedule_events(data: SchedulerRequest):

    try:

        events = [event.dict() for event in data.events]

        if not events:
            return {
                "status": "error",
                "message": "No events provided"
            }

        result = scheduler_agent(events)

        return result

    except Exception as e:

        return {
            "status": "error",
            "message": str(e)
        }