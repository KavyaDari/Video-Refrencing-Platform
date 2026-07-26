from sqlalchemy.orm import Session
from app.models.meeting import Meeting

class MeetingRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_meeting_by_id(self, meeting_id: str):
        return self.db.query(Meeting).filter(Meeting.meeting_id == meeting_id).first()

    def get_all_meetings(self):
        return self.db.query(Meeting).all()

    def create_meeting(self, meeting: Meeting):
        self.db.add(meeting)
        self.db.commit()
        self.db.refresh(meeting)
        return meeting
