# Trong rentals/views.py hoặc một file services.py mới
from .models import Booking, Car

def create_booking_backend(user, car_id, start_time, end_time, pickup_id, dropoff_id):
    # 1. Kiểm tra xe trống (Logic từ [cite: 230])
    is_available = not Booking.objects.filter(
        car_id=car_id,
        status__in=['confirmed', 'ongoing'],
        start_time__lt=end_time,
        end_time__gt=start_time
    ).exists()

    if not is_available:
        return {"error": "Xe đã có người đặt trong thời gian này"}

    # 2. Tính giá (Logic từ [cite: 233])
    car = Car.objects.get(id=car_id)
    duration = end_time - start_time
    total_price = car.base_price * duration.days

    # 3. Lưu Booking (Logic từ [cite: 240])
    booking = Booking.objects.create(
        user=user,
        car=car,
        start_time=start_time,
        end_time=end_time,
        pickup_location_id=pickup_id,
        dropoff_location_id=dropoff_id,
        total_price=total_price,
        status='pending'
    )
    return booking