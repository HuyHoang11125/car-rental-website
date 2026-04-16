from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Supplier, Location, Car
class CustomUserAdmin(UserAdmin):
    model = User
    # Hiển thị các trường tùy chỉnh ra danh sách admin
    list_display = ['email', 'username', 'role', 'phone', 'is_staff']
    fieldsets = UserAdmin.fieldsets + (
        ('Thông tin bổ sung', {'fields': ('role', 'phone', 'provider', 'avatar_url')}),
    )

admin.site.register(User, CustomUserAdmin)
@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email')
    search_fields = ('name', 'phone')

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent', 'latitude', 'longitude')
    list_filter = ('parent',)

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'type', 'base_price', 'status', 'supplier', 'location')
    list_filter = ('status', 'brand', 'type')
    search_fields = ('name', 'brand')