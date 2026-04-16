from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Ánh xạ các trường từ file Word của bạn
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('customer', 'Customer'),
    )
    
    # Django đã có sẵn 'username', 'password', 'first_name', 'last_name', 'email'
    # Chúng ta thêm các trường tùy chỉnh:
    email = models.EmailField(unique=True, verbose_name="Email") # [cite: 7]
    phone = models.CharField(max_length=20, blank=True, null=True, verbose_name="Số điện thoại") # [cite: 9]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer', verbose_name="Vai trò") # 
    provider = models.CharField(max_length=50, blank=True, null=True, verbose_name="Nguồn đăng nhập") # [cite: 11]
    avatar_url = models.URLField(max_length=500, blank=True, null=True, verbose_name="Link ảnh đại diện") # [cite: 12]
    
    # Sử dụng email làm trường đăng nhập chính thay vì username (tùy chọn)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        verbose_name = "Người dùng"
        verbose_name_plural = "Danh sách người dùng"

    def __str__(self):
        return self.email
# 1. BẢNG NHÀ CUNG CẤP (SUPPLIERS)
class Supplier(models.Model):
    name = models.CharField(max_length=255, verbose_name="Tên nhà cung cấp")
    phone = models.CharField(max_length=20, verbose_name="Số điện thoại")
    email = models.EmailField(max_length=255, verbose_name="Email")
    address = models.TextField(blank=True, null=True, verbose_name="Địa chỉ")

    class Meta:
        verbose_name = "Nhà cung cấp"
        verbose_name_plural = "Danh sách Nhà cung cấp"

    def __str__(self):
        return self.name


# 2. BẢNG ĐỊA ĐIỂM (LOCATIONS - Phân cấp)
class Location(models.Model):
    name = models.CharField(max_length=255, verbose_name="Tên địa điểm")
    # Sử dụng 'self' để bảng có thể tự tham chiếu đến chính nó (Quốc gia -> Tỉnh/Thành -> Quận/Huyện)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='sub_locations', verbose_name="Trực thuộc")
    address = models.TextField(blank=True, null=True, verbose_name="Địa chỉ chi tiết")
    latitude = models.DecimalField(max_digits=10, decimal_places=6, null=True, blank=True, verbose_name="Vĩ độ")
    longitude = models.DecimalField(max_digits=10, decimal_places=6, null=True, blank=True, verbose_name="Kinh độ")

    class Meta:
        verbose_name = "Địa điểm"
        verbose_name_plural = "Danh sách Địa điểm"

    def __str__(self):
        if self.parent:
            return f"{self.name} ({self.parent.name})"
        return self.name


# 3. CẬP NHẬT LẠI BẢNG XE (CARS)
class Car(models.Model):
    STATUS_CHOICES = (
        ('available', 'Sẵn sàng'),
        ('rented', 'Đang cho thuê'),
        ('maintenance', 'Bảo dưỡng'),
    )

    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, related_name='cars', verbose_name="Nhà cung cấp")
    name = models.CharField(max_length=255, verbose_name="Tên xe")
    brand = models.CharField(max_length=255, verbose_name="Hãng xe")
    type = models.CharField(max_length=100, verbose_name="Loại xe") # SUV, Sedan, v.v.
    base_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Giá cơ bản/Ngày")
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='available', verbose_name="Tình trạng")
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, related_name='cars', verbose_name="Địa điểm hiện tại")
    description = models.TextField(blank=True, null=True, verbose_name="Mô tả chi tiết")
    
    # Custom thêm một trường hình ảnh để hiển thị lên Website cho đẹp
    image = models.ImageField(upload_to='cars/', blank=True, null=True, verbose_name="Hình ảnh xe")

    class Meta:
        verbose_name = "Xe"
        verbose_name_plural = "Danh sách Xe"

    def __str__(self):
        return f"{self.brand} {self.name} - {self.supplier.name}"
# 4. BẢNG GIÁ (PRICING) [cite: 76-86]
class Pricing(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='pricings')
    date = models.DateField(null=True, blank=True, help_text="Để trống nếu là giá mặc định")
    price_hour = models.DecimalField(max_digits=10, decimal_places=2)
    price_day = models.DecimalField(max_digits=10, decimal_places=2)
    price_week = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    price_month = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    surge_multiplier = models.DecimalField(max_digits=5, decimal_places=2, default=1.0)

# 5. BẢNG ĐẶT XE (BOOKINGS) [cite: 56-72]
class Booking(models.Model):
    STATUS_CHOICES = (('pending', 'Chờ xác nhận'), ('confirmed', 'Đã xác nhận'), ('ongoing', 'Đang thuê'), ('completed', 'Hoàn thành'), ('cancelled', 'Đã hủy'))
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    pickup_location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, related_name='pickups')
    dropoff_location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, related_name='dropoffs')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending')

# 6. BẢNG GIAO DỊCH (TRANSACTIONS) [cite: 90-102]
class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=50) # payment, refund, deposit
    method = models.CharField(max_length=50) # vnpay, momo, wallet
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
def get_current_price(self):
        """Lấy giá thuê dựa trên ngày hiện tại (Xử lý Surge Multiplier)"""
        today = timezone.now().date()
        # Tìm giá đặc biệt cho ngày hôm nay, nếu không có lấy giá cơ bản
        special_price = Pricing.objects.filter(car=self, date=today).first()
        
        if special_price:
            return special_price.price_day * special_price.surge_multiplier
        return self.base_price
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications', verbose_name="Người nhận") # [cite: 121, 126]
    title = models.CharField(max_length=255, verbose_name="Tiêu đề") # [cite: 122]
    message = models.TextField(verbose_name="Nội dung") # [cite: 123]
    is_read = models.BooleanField(default=False, verbose_name="Đã đọc") # [cite: 124]
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Thời gian tạo") # [cite: 125]

    class Meta:
        verbose_name = "Thông báo"
        verbose_name_plural = "Danh sách Thông báo"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} - {self.user.email}"