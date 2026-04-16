def create_notification(user, title, message):
    """Hàm tạo thông báo mới cho người dùng"""
    return Notification.objects.create(
        user=user,
        title=title,
        message=message
    )