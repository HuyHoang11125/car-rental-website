from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required, user_passes_test
from .models import Car, Supplier, Location

# Hàm kiểm tra quyền Admin
def is_admin(user):
    return user.is_authenticated and user.role == 'admin'

# View cho trang chủ Dashboard
@user_passes_test(is_admin, login_url='/') # Ném người dùng về trang chủ nếu không phải admin
def dashboard_home(request):
    # Lấy dữ liệu thống kê cơ bản để hiển thị
    total_cars = Car.objects.count()
    available_cars = Car.objects.filter(status='available').count()
    total_suppliers = Supplier.objects.count()

    context = {
        'total_cars': total_cars,
        'available_cars': available_cars,
        'total_suppliers': total_suppliers,
    }
    return render(request, 'dashboard/home.html', context)

# View cho danh sách xe
@user_passes_test(is_admin, login_url='/')
def dashboard_car_list(request):
    cars = Car.objects.all().order_by('-id')
    return render(request, 'dashboard/car_list.html', {'cars': cars})
def index(request):
    # Trang chủ cho khách hàng xem xe
    cars = Car.objects.filter(status='available')[:6] # Lấy 6 xe mới nhất
    return render(request, 'rentals/index.html', {'cars': cars})