from rest_framework import serializers
from rest_framework import status

from product.serializers import ProductSerializer
from .models import UserProfile, Reviews, SavedList

class UserProfileSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="get_full_name", read_only=True)
    email = serializers.CharField(source="get_email", read_only=True)
    class Meta:
        model = UserProfile
        fields = ['id','provience', 'locality', 'mobile', 'photo', 'name', 'email']

    def create(self, validated_data):
        request = self.context.get('request', None)
        user = request.user

        if user.is_anonymous:
            res =  serializers.ValidationError({"detail": "Not authenticated"})
            res.status_code = status.HTTP_401_UNAUTHORIZED
            raise res


        check = UserProfile.objects.filter(user=user).exists()

        if check:
            raise serializers.ValidationError({"detail": "Already created profile"})

        try:
            obj = UserProfile.objects.create(user=user, **validated_data)
        except: 
            raise serializers.ValidationError({"detail":"Profile has been already created"})     
        
        return obj


class ReviewSerializer(serializers.ModelSerializer):
    review_user = serializers.CharField(read_only=True)
    class Meta:
        model = Reviews
        fields = ['id','review_user', 'rating', 'response']

    # def create(self, validated_data):
    #     user = self.context.get('request').user
    #     user_profile_obj = self.context['user_profile_obj']
    #     qs = Reviews.objects.filter(review_user=user, user=user_profile_obj).exists()

    #     if(qs):
    #         raise serializers.ValidationError("Already reviewed")

    #     return Reviews.objects.create(user=user_profile_obj, review_user= user, **validated_data)



class SavedListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedList
        fields =['id','product']


    def create(self, validated_data):
        product = self.data.get('product')
        user = self.context.get('request').user
        print(user)
        check = SavedList.objects.filter(product = product, user = user).exists()
        if check:
            raise serializers.ValidationError({"detail": "Already saved to the SavedList"})

        return super().create(validated_data)

    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get('request')

        if request and request.method == "GET":
            fields['product'] = ProductSerializer()
            
        return fields