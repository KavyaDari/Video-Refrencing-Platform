from sqlalchemy.orm import Session
from app.models.participant import Participant

class ParticipantRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_participant_by_id(self, participant_id: int):
        return self.db.query(Participant).filter(Participant.id == participant_id).first()

    def get_participants_by_meeting(self, meeting_id: int):
        return self.db.query(Participant).filter(Participant.meeting_id == meeting_id).all()

    def add_participant(self, participant: Participant):
        self.db.add(participant)
        self.db.commit()
        self.db.refresh(participant)
        return participant
