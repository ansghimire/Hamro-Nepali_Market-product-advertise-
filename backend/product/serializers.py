
from itertools import product
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Product, ProductType, Category, ProductAttributeValue, ProductAttribute, Media, Comment



class DynamicFieldsModelSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)




class CategorySerializier(ModelSerializer):
    class Meta:
        model = Category
        fields = ['category_id','category_name' ]
        read_only = 'category_id'


class  SimpleProductAttibValSerializer(ModelSerializer):
    class Meta:
        model = ProductAttributeValue
        fields = ['attribute_value_id','attribute_value']

class ProductAttributeSerializer(DynamicFieldsModelSerializer):
    attribute_val = SimpleProductAttibValSerializer(source='attribVal', many=True, read_only=True)

    class Meta:
        model = ProductAttribute
        fields = ['attribute_id','attribute_name', 'attribute_val']
        read_only = 'attribute_id'



class ProductTypeSerializer(ModelSerializer):
    class Meta:
        model = ProductType
        fields = ['type_id','type_name', 'category', 'attribute']
        read_only = 'type_id'
        
    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get('request')
       
        if request and request.method == "GET":
            fields['category'] = CategorySerializier()
            fields['attribute'] = ProductAttributeSerializer(many=True)
        return fields


class ProductAttributeValueSerializer(DynamicFieldsModelSerializer):

    class Meta:
        model = ProductAttributeValue
        fields = ['attribute_value', 'product_attribute', 'attribute_value_id']

    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get('request')

        if request and request.method == "GET":
            fields['product_attribute'] = ProductAttributeSerializer(fields=('attribute_id', 'attribute_name',))
        
        return fields


class SimpleProductTypeSerilizer(DynamicFieldsModelSerializer):
    class Meta:
        model = ProductType
        fields = ['type_id', 'type_name']
        read_only = 'type_id'
        

class ProductSerializer(ModelSerializer):
    # user = serializers.CharField(read_only=True)

    class Meta:
        model = Product
        fields = ['product_id', 'title', 'description','price','price_negotiable','condition', 'used_for','owndership_document_provided', 'home_delivery','delivery_area','warranty_type', 'warranty_period',
        'type', 'productattributevalues','user', 'quantity', 'expire']
        read_only_fields = ['product_id']

    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get("request")
        
        if request and request.method == "GET":
            fields['productattributevalues'] = ProductAttributeValueSerializer(many=True)
            fields['type'] = SimpleProductTypeSerilizer()
        return fields
    
    def create(self, validated_data):
        attribVal = validated_data.pop('productattributevalues')
        pr = Product.objects.create(user=self.context.get('request').user , **validated_data)
        for obj in attribVal:
            pr.productattributevalues.add(obj.attribute_value_id)
        return pr

  




class CategoryListSerializer(ModelSerializer):
    product_type = SimpleProductTypeSerilizer(source="type", many=True, read_only=True)
    class Meta:
        model = Category
        fields = ['category_id', 'category_name', 'product_type']
        read_only = "category_id"
        

class MediaSerializer(ModelSerializer):
    class Meta:
        model = Media
        fields = ['id', 'image_url', 'product']
        read_only = 'id'

    
    def create(self, validated_data):
        user = self.context.get('request').user
        # print(self.context)
        product_id = self.context.get('product_id')
      
        queryset = Product.objects.filter(user = user, product_id= product_id)
        if not queryset:
            raise serializers.ValidationError("You are not authorized to upload")

        return Media.objects.create(**validated_data)
    
 

class CommentSerializer(ModelSerializer):
    product = serializers.CharField(read_only=True)
    user =serializers.CharField(read_only=True)

    class Meta:
        model = Comment
        fields = ["comment", "product", "user"]

    def create(self, validated_data):
        user_id = self.context['request'].user
        product_obj = self.context['product_obj']
        comment = Comment.objects.create(user = user_id, product=product_obj, **validated_data)
        return comment







