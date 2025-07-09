def send_notification(user, message):
    if hasattr(user, 'notifications'):
        user.notifications.append(message)
