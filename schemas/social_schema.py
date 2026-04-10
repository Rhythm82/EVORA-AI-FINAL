from pydantic import BaseModel
from typing import List, Dict


class SocialMediaOutput(BaseModel):
    posts: List[str]
    campaign_series: List[str]
    best_posting_time: Dict[str, str]
    content_queue: List[str]