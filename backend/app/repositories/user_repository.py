from sqlalchemy.orm import Session
from app.models.user import User

class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_user_by_id(self, user_id: int):
        return self.db.query(User).filter(User.id == user_id).first()

    def create_user(self, name: str):
        db_user = User(name=name)
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user
