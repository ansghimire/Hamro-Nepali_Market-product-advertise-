from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

from consumer_profile.models import UserProfile
User = get_user_model()
from rest_framework_simplejwt.serializers import TokenRefreshSerializer, TokenObtainPairSerializer
from rest_framework_simplejwt.exceptions import InvalidToken
from  rest_framework import serializers
from consumer_profile.serializers import UserProfileSerializer

#while registering user
class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'full_name','password')
                  

#user-id -> profile
class UserInfoSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)
    class Meta:
        model = User
        fields = ['profile']



class MyTokenPairSerializer(TokenObtainPairSerializer):
    
    @classmethod
    def get_token(cls, user):
        data = super().get_token(user)
        data['is_admin'] = user.is_superuser
        data['is_admin'] = user.is_superuser
        data['is_admin'] = user.is_superuser
        data['is_admin'] = user.is_superuser
        data['is_admin'] = user.is_superuser
        data['is_admin'] = user.is_superuser
        data['is_admin'] = user.is_superuser
        data['is_admin'] = user.is_superuser
        return data
    def validate(self, attrs):
        data = super().validate(attrs)
        data['is_admin'] = self.user.is_superuser
        return data



# #while Refreshing TOken
class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    # refresh = None
    # def validate(self, attrs):
    #     data = super().validate(attrs)
    #     data['is_admin'] = self.request.user
    #     return data
    @classmethod
    def get_token(cls, user):
        data = super().get_token(user)
        data['is_admin'] = user.is_superuser
        return data
    # def validate(self, attrs):
    #     attrs['refresh'] = self.context['request'].COOKIES.get('refresh_token')

    #     if(attrs['refresh']):
    #         data = super().validate(attrs)
    #         # print(self.context['request'].user)
    #         print()
    #         data['is_admin'] = self.context['request'].user.is_active
    #         return data
    #     else:
    #         raise InvalidToken('No valid token found in cookie \'refresh_token\'')
from this import d
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
User = get_user_model()
from rest_framework_simplejwt.serializers import TokenRefreshSerializer, TokenObtainPairSerializer
from rest_framework_simplejwt.exceptions import InvalidToken



#while registering user
class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'full_name', 'mobile', 'street_name',
                  'area_location', 'city', 'password')
                  


class MyTokenPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        #Add custom claims
        token['email'] = user.email
        token['is_admin'] = user.is_superuser
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        # data['is_admin'] = self.user.is_superuser
        return data



# #while Refreshing TOken
class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
            attrs['refresh'] = self.context['request'].COOKIES.get('refresh_token')
            
            if(attrs['refresh']):
                data =  super().validate(attrs)
                return data
            else:
                raise InvalidToken('No valid token found in cookie \'refresh_token\'')
