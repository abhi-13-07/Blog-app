from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils import timezone

class UserManager(BaseUserManager):
    def _create_user(self, username, email, password, is_active, is_staff, is_superuser, **extra_fields):

        if not username:
            raise ValueError("Username field is required !")
        if not email:
            raise ValueError("Email field is required !")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, is_active=is_active, is_staff=is_staff, is_superuser=is_superuser, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email, password, **extra_fields):
        return self._create_user(username, email, password,  is_active=True, is_staff=False, is_superuser=False, **extra_fields)

    def create_superuser(self, username, email, password, **extra_fields):
        user = self._create_user(username, email, password, is_active=True, is_staff=True, is_superuser=True, **extra_fields)
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(max_length=250, unique=True)
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    birth_date = models.DateTimeField(blank=True, null=True)
    bio = models.TextField(max_length=300, blank=True, null=True)
    city = models.CharField(max_length=35, blank=True, null=True)
    country = models.CharField(max_length=35, blank=True, null=True)
    profile_image = models.ImageField(default='default.jpg', upload_to='user_profiles', null=True, blank=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE,  null=True, blank=False)
#     image = models.ImageField(default='default.jpg', upload_to='user_profiles', null=True, blank=False)

#     def __str__(self):
#         return f'{self.user.username} Profile'