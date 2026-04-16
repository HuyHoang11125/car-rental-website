# core/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Bạn có thể xóa hoặc comment dòng path('admin/', admin.site.urls) nếu muốn khóa hẳn Django Admin mặc định
    path('admin/', admin.site.urls), 
    
    # Kết nối với các URL của app rentals
    path('', include('rentals.urls')), 
]