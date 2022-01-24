from  . import views
from django.urls import path
from account.views import RegisterAPIView, LogoutAPIView, ProfileAPIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/auth/login/', TokenObtainPairView.as_view(), name='login'),
    path('api/auth/logout/', LogoutAPIView.as_view(), name='logout'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/register/', RegisterAPIView.as_view(), name="register"),
    path('api/auth/upload/', ProfileAPIView.as_view(), name="profile"),
]