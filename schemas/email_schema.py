from pydantic import BaseModel
from typing import List


class Participant(BaseModel):
    name: str
    email: str


class EmailItem(BaseModel):
    to: str
    subject: str
    body: str


class EmailAgentOutput(BaseModel):
    emails: List[EmailItem]