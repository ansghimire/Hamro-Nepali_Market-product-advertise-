from email.mime import base
from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('profile', views.UserProfileViewSet, basename="profile")
router.register('review', views.ReviewViewSet, basename="review")
router.register('saved-list', views.SavedListViewset, basename="saved-list")

urlpatterns = [
    
]

urlpatterns += router.urls


