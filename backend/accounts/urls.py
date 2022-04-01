from django.urls import path
from .views import logout, UserInfoViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('user-info', UserInfoViewset, basename='user-info')


urlpatterns = [
    path('logout/', logout),
 
]

urlpatterns += router.urls