from re import search
from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin


class UserAdminConfig(UserAdmin):

    search_fields = ('username', 'email')
    list_filter = ('username', 'email', 'is_active', 'is_staff', 'is_superuser')
    ordering = ('-date_joined',)
    list_display = ('username', 'email', 'is_active', 'is_staff', 'is_superuser')
    fieldsets = (
        (None, {'fields' : ('username', 'email')}),
        ('Permissions', {'fields' : ('is_staff', 'is_active', 'is_superuser')}),
        ('Additional Info', {'fields' : ('first_name', 'last_name', 'birth_date', 'bio', 'city', 'country', 'date_joined', 'profile_image')}),
    )

admin.site.register(User, UserAdminConfig)