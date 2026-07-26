from datetime import datetime, timezone
import logging
from app.repositories.meeting_repository import MeetingRepository
from app.models.meeting import Meeting
from app.schemas.meeting import MeetingCreate, ScheduleMeetingRequest
from app.core.exceptions import NotFoundException, BadRequestException

logger = logging.getLogger(__name__)

class MeetingService:
    def __init__(self, meeting_repo: MeetingRepository):
        self.meeting_repo = meeting_repo

    def create_meeting(self, meeting_data: MeetingCreate) -> Meeting:
        logger.info(f"Creating meeting: {meeting_data.title}")
        
        # Validation for time (allow 5-minute grace period for network latency on instant meetings)
        from datetime import timedelta
        now = datetime.now(timezone.utc)
        
        scheduled = meeting_data.scheduled_time
        if scheduled.tzinfo is None:
            scheduled = scheduled.replace(tzinfo=timezone.utc)
            
        if scheduled < now - timedelta(minutes=5):
            raise BadRequestException("Scheduled time must be in the future.")
        
        meeting = Meeting(
            title=meeting_data.title,
            description=meeting_data.description,
            host_id=meeting_data.host_id,
            scheduled_time=meeting_data.scheduled_time,
            duration=meeting_data.duration
        )
        return self.meeting_repo.create_meeting(meeting)

    def schedule_meeting(self, schedule_data: ScheduleMeetingRequest) -> Meeting:
        logger.info(f"Scheduling meeting: {schedule_data.title}")
        meeting_data = MeetingCreate(**schedule_data.model_dump())
        return self.create_meeting(meeting_data)

    def get_meeting_by_id(self, meeting_id: str) -> Meeting:
        meeting = self.meeting_repo.get_meeting_by_id(meeting_id)
        if not meeting:
            logger.warning(f"Meeting not found: {meeting_id}")
            raise NotFoundException(f"Meeting with ID {meeting_id} not found")
        return meeting

    def get_upcoming_meetings(self):
        meetings = self.meeting_repo.get_all_meetings()
        # Convert to naive UTC to match SQLAlchemy SQLite output
        now = datetime.now(timezone.utc).replace(tzinfo=None)
        # Filter in memory for simplicity, though this should ideally be handled by DB query
        upcoming = [m for m in meetings if m.scheduled_time > now]
        return sorted(upcoming, key=lambda x: x.scheduled_time)

    def get_recent_meetings(self):
        meetings = self.meeting_repo.get_all_meetings()
        # Convert to naive UTC to match SQLAlchemy SQLite output
        now = datetime.now(timezone.utc).replace(tzinfo=None)
        recent = [m for m in meetings if m.scheduled_time <= now]
        return sorted(recent, key=lambda x: x.scheduled_time, reverse=True)
