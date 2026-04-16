from rest_framework import viewsets, permissions
from .models import Notification
from .serializers import NotificationSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Chỉ trả về thông báo của người dùng đang đăng nhập
        return Notification.objects.filter(user=self.request.user)

    # Thêm một hành động (action) để đánh dấu tất cả là đã đọc
    from rest_framework.decorators import action
    from rest_framework.response import Response

    @action(detail=False, methods=['post'])
    def mark_all_as_read(self, request):
        self.get_queryset().update(is_read=True)
        return Response({'status': 'Đã đánh dấu tất cả là đã đọc'})