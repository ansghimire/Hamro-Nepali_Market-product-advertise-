from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework.permissions import IsAuthenticated
from .serializer import CookieTokenRefreshSerializer, MyTokenPairSerializer, UserInfoSerializer
# from rest_framework_simplejwt.tokens import RefreshToken


class CookieTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenPairSerializer
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get('refresh'):
            cookie_max_age = 3600 * 24 * 14 # 14 days
            response.set_cookie('refresh_token', response.data['refresh'], samesite="none", secure=True, max_age=cookie_max_age, httponly=True )
            del response.data['refresh']
        return super().finalize_response(request, response, *args, **kwargs)
 



class CookieTokenRefreshView(TokenRefreshView):
    def finalize_response(self, request, response, *args, **kwargs):
        # print(self.request.user)
        if response.data.get('refresh'):
            cookie_max_age = 3600 * 24 * 14 # 14 days
            response.set_cookie('refresh_token', response.data['refresh'], samesite="none", secure=True, max_age=cookie_max_age, httponly=True )
            del response.data['refresh']
            # response.data['is_admin'] = self.request.user.is_superuser
         
            
        return super().finalize_response(request, response, *args, **kwargs)
    serializer_class = CookieTokenRefreshSerializer


from rest_framework.decorators import api_view
from rest_framework.response import Response
@api_view(['POST'])
def logout(request):
    response = Response('')
    response.delete_cookie('refresh_token')
    return response




from rest_framework.mixins import RetrieveModelMixin
from rest_framework.viewsets import GenericViewSet
# from django.conf import settings
from rest_framework import permissions

# User = settings.AUTH_USER_MODEL()
from .models import UserAccount


class UserInfoViewset(RetrieveModelMixin, GenericViewSet):
    queryset = UserAccount.objects.all()
    serializer_class = UserInfoSerializer
    permission_classes = [permissions.IsAuthenticated]
