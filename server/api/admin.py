from django.contrib import admin
from api.models import BlogPost, Like

class UserAdminConfig(admin.ModelAdmin):

    search_fields = ('title', 'body')
    ordering = ('-date_published',)
    list_display = ('title', 'user','slug')

admin.site.register(BlogPost, UserAdminConfig)
admin.site.register(Like)
