from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List

from app.database.database import get_db
from app.repositories.meeting_repository import MeetingRepository
from app.repositories.participant_repository import ParticipantRepository
from app.services.meeting_service import MeetingService
from app.services.participant_service import ParticipantService
from app.schemas.meeting import MeetingCreate, MeetingResponse, ScheduleMeetingRequest
from app.schemas.participant import JoinMeetingRequest, ParticipantResponse
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/meetings", tags=["meetings"])

def get_meeting_service(db: Session = Depends(get_db)):
    repo = MeetingRepository(db)
    return MeetingService(repo)

def get_participant_service(db: Session = Depends(get_db)):
    participant_repo = ParticipantRepository(db)
    meeting_repo = MeetingRepository(db)
    return ParticipantService(participant_repo, meeting_repo)

@router.post("/create", response_model=MeetingResponse, status_code=status.HTTP_201_CREATED)
def create_meeting(meeting_data: MeetingCreate, service: MeetingService = Depends(get_meeting_service), current_user: User = Depends(get_current_user)):
    """Creates an immediate meeting."""
    meeting_data.host_id = current_user.id
    return service.create_meeting(meeting_data)

@router.post("/schedule", response_model=MeetingResponse, status_code=status.HTTP_201_CREATED)
def schedule_meeting(schedule_data: ScheduleMeetingRequest, service: MeetingService = Depends(get_meeting_service), current_user: User = Depends(get_current_user)):
    """Schedules a future meeting."""
    schedule_data.host_id = current_user.id
    return service.schedule_meeting(schedule_data)

@router.post("/join", response_model=ParticipantResponse, status_code=status.HTTP_200_OK)
def join_meeting(join_data: JoinMeetingRequest, service: ParticipantService = Depends(get_participant_service)):
    """Validates meeting ID and creates a participant record to join a meeting."""
    return service.join_meeting(join_data)

@router.get("/upcoming", response_model=List[MeetingResponse])
def get_upcoming_meetings(service: MeetingService = Depends(get_meeting_service), current_user: User = Depends(get_current_user)):
    """Returns a list of upcoming meetings."""
    return service.get_upcoming_meetings()

@router.get("/recent", response_model=List[MeetingResponse])
def get_recent_meetings(service: MeetingService = Depends(get_meeting_service), current_user: User = Depends(get_current_user)):
    """Returns a list of past/recent meetings."""
    return service.get_recent_meetings()

@router.get("/{meeting_id}", response_model=MeetingResponse)
def get_meeting(meeting_id: str, service: MeetingService = Depends(get_meeting_service), current_user: User = Depends(get_current_user)):
    """Gets details of a specific meeting by its public string ID."""
    return service.get_meeting_by_id(meeting_id)
