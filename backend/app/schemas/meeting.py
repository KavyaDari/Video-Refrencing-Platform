from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class MeetingBase(BaseModel):
    title: str = Field(..., example="Project Sync")
    description: Optional[str] = Field(None, example="Weekly team sync")
    scheduled_time: datetime = Field(...)
    duration: int = Field(..., gt=0, example=60) # Must be greater than 0

class MeetingCreate(MeetingBase):
    host_id: int

class MeetingResponse(MeetingBase):
    id: int
    meeting_id: str
    host_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class ScheduleMeetingRequest(MeetingBase):
    host_id: int
