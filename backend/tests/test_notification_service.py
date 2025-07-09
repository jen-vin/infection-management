import pytest
from app.services.notification_service import send_notification

class DummyUser:
    def __init__(self, id, email):
        self.id = id
        self.email = email
        self.notifications = []

def test_send_notification():
    user = DummyUser(1, "test@example.com")
    message = "Testbenachrichtigung"
    send_notification(user, message)
    assert message in user.notifications 