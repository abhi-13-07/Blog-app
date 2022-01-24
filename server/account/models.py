from distutils.command.upload import upload
from email.policy import default
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,  null=True, blank=False)
    image = models.ImageField(default='default.jpg', upload_to='user_profiles', null=True, blank=False)

    def __str__(self):
        return f'{self.user.username} Profile'