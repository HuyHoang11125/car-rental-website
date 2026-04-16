# rentals/urls.py
from django.urls import path
from . import views

app_name = 'rentals'

urlpatterns = [
    path('', views.index, name='index'), # Thêm dòng này để hết lỗi 404
    path('dashboard/', views.dashboard_home, name='dashboard_home'),
    path('dashboard/cars/', views.dashboard_car_list, name='dashboard_car_list'),
    router.register(r'notifications', NotificationViewSet, basename='notification'),
]
