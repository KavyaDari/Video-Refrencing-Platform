from pydantic import BaseModel, Field
from datetime import datetime

class JoinMeetingRequest(BaseModel):
    meeting_id: str = Field(..., description="The unique public string ID of the meeting")
    participant_name: str = Field(..., example="John Doe")
    role: str = Field(default="attendee")

class ParticipantResponse(BaseModel):
    id: int
    meeting_id: int
    participant_name: str
    role: str
    joined_at: datetime

    class Config:
        from_attributes = True
