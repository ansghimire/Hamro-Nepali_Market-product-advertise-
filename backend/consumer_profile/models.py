import re
from django.db import models
from django.core.exceptions import ValidationError
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from product.models import Product

class ProvienceChoices(models.TextChoices):
    PROVIENCE_NO_1 = 'Provience No.1'
    PROVIENCE_NO_2 = 'Provience No.2'
    PROVIENCE_NO_3 = 'Provience No.3'
    GANDAKI_PRADESH = 'Gandaki Pradesh'
    PROVIENCE_NO_5 = 'Provience No.5'
    KARNALI_PRADESH = 'Karnali Pradesh'
    SUDURPASHCHIM_PRADESH = 'Sudurpashchim Pradesh'


def validate_mobile(value):
    if len(value) > 10:
        raise ValidationError("Mobile number not match")
    pattern = r"^(\+\d{1,3})?,?\s?\d{8,13}"
    result = re.match(pattern, value)
    if not result:
        raise ValidationError("Mobile number not match")



class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name="profile")
    provience = models.CharField(max_length=100, choices=ProvienceChoices.choices, default=ProvienceChoices.PROVIENCE_NO_3, null=True, blank=True)
    locality = models.CharField(max_length=100, null=True, blank=True)
    mobile = models.CharField(max_length=10, validators=[validate_mobile], unique=True, blank=True, null=True)
    photo = models.ImageField(upload_to ='uploads/photos', null=True, blank=True)

    def get_full_name(self):
        return self.user.full_name
    
    def get_email(self):
        return self.user.email

    def __str__(self):
        return self.user.email


class Reviews(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    review_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE )
    rating = models.PositiveIntegerField(validators = [MaxValueValidator(5), MinValueValidator(1)], null=True, blank=True)
    response = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.response


class SavedList(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    





