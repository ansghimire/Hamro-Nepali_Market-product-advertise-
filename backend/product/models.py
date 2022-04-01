from django.db import models
from django.conf import settings


class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=100)

    def __str__(self):
        return self.category_name


class ProductAttribute(models.Model):
    attribute_id = models.AutoField(primary_key=True)
    attribute_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.attribute_name


class ProductType(models.Model):
    type_id = models.AutoField(primary_key=True)
    type_name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="type")
    attribute = models.ManyToManyField(ProductAttribute)

    def __str__(self):
        return self.type_name


class ProductAttributeValue(models.Model):
    attribute_value_id = models.AutoField(primary_key=True)
    product_attribute = models.ForeignKey(ProductAttribute, on_delete=models.CASCADE, related_name='attribVal')
    attribute_value = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.product_attribute.attribute_name}:{self.attribute_value}"





class DeliveryArea(models.TextChoices):
    MYAREA = 'within my area'
    MYCITY = 'within my city'
    anywhere = 'almost anywhere in nepal'

class WarrantyType(models.TextChoices):
    DEALER = 'Dealer/Shop'
    MANUFACTURER = 'Manufacturer/Importer'
    NOWARRANTY = 'No Warranty'

class Condition(models.TextChoices):
    BRANDNEW = 'Brand New(not used)'
    LIKENEW = 'LIKE New(used few times)'
    EXCELLENT = 'Excellent'
    NOTWORKING = "Not Working"

class Document(models.TextChoices):
     PURCHASEBILL = 'Original Purchase Bill'
     WARRANTYCARD = 'Stamped waranty card'
     NOCARD = "I do not have any document"
 

from django.utils.translation import gettext_lazy as _
class ExpireChoices(models.TextChoices):
    MINUTES_5 = '5', _('5 minutes')
    MINUTES_10 = '10', _('10 minutes')
    MINUTES_15 = '15', _('15 minutes')
    MINUTES_20 = '20', _('20 minutes')

class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.PositiveIntegerField(null=True)
    price_negotiable = models.BooleanField(null=True)
    condition = models.CharField(max_length=100, choices=Condition.choices, null=True)
    used_for  = models.CharField(max_length=100, null=True) # how much month it has been used
    owndership_document_provided = models.CharField(max_length=150, choices=Document.choices, null=True)
    home_delivery = models.BooleanField(null=True)
    delivery_area = models.CharField(max_length=100, choices=DeliveryArea.choices, null=True)
    warranty_type = models.CharField(max_length=100, choices=WarrantyType.choices, null=True)
    warranty_period = models.CharField(max_length=100, null=True)
    type = models.ForeignKey(ProductType, on_delete=models.CASCADE, related_name="types")
    productattributevalues = models.ManyToManyField(ProductAttributeValue, related_name="attributeValue")
    #last add
    quantity = models.IntegerField(null=True, blank=True)
    expire = models.CharField(max_length=3, choices=ExpireChoices.choices, default=ExpireChoices.MINUTES_5)

    


    def __str__(self):
        return self.title



#for media
def product_directory_path(instance,filename):
    return f'user_{instance.user.id, filename}'


class Media(models.Model):
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, related_name="product", null=True, blank=True)
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
    image_url = models.ImageField(upload_to='uploads/')




from django.utils import timezone
class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product= models.ForeignKey(Product, on_delete=models.CASCADE)
    comment = models.TextField()
    # created = models.DateTimeField(editable=False )

    # def save(self, *args, **kwargs):
    #     ''' On save, update timestamp'''
    #     if not self.id:
    #         self.created = timezone.now()
    
    def __str__(self):
        return self.comment



    





