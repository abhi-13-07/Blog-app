from  . import views
from django.urls import path
from account.views import (
    RegisterAPIView, LogoutAPIView, 
    ProfileAPIView, LoginAPIView, UserDetailsAPIView)
    
from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/user/<str:pk>', UserDetailsAPIView.as_view(), name='user_details'),
    path('api/login/',LoginAPIView.as_view(), name='login'),
    path('api/logout/', LogoutAPIView.as_view(), name='logout'),
    path('api/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterAPIView.as_view(), name="register"),
    path('api/upload/', ProfileAPIView.as_view(), name="profile"),
]