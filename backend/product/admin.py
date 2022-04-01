from django.contrib import admin

from .models import ProductType, Category, Product, ProductAttribute, ProductAttributeValue, Media, Comment

admin.site.register(ProductType)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(ProductAttribute)
admin.site.register(ProductAttributeValue)
admin.site.register(Media)
admin.site.register(Comment)



