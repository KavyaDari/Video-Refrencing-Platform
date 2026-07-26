import logging
from app.repositories.participant_repository import ParticipantRepository
from app.repositories.meeting_repository import MeetingRepository
from app.models.participant import Participant
from app.schemas.participant import JoinMeetingRequest
from app.core.exceptions import NotFoundException

logger = logging.getLogger(__name__)

class ParticipantService:
    def __init__(self, participant_repo: ParticipantRepository, meeting_repo: MeetingRepository):
        self.participant_repo = participant_repo
        self.meeting_repo = meeting_repo

    def join_meeting(self, join_data: JoinMeetingRequest) -> Participant:
        logger.info(f"User {join_data.participant_name} attempting to join meeting: {join_data.meeting_id}")
        
        meeting = self.meeting_repo.get_meeting_by_id(join_data.meeting_id)
        if not meeting:
            raise NotFoundException("Meeting not found or invalid meeting ID.")

        participant = Participant(
            meeting_id=meeting.id,
            participant_name=join_data.participant_name,
            role=join_data.role
        )
        return self.participant_repo.add_participant(participant)
