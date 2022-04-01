from rest_framework.routers import DefaultRouter
from django.urls import path
from . import views


router = DefaultRouter()
router.register(r'product', views.ProductViewSet, basename="product")
router.register(r'product-type', views.ProductTypeViewSet, basename="product-type")
router.register(r'category', views.CategoryViewSet, basename="category")
router.register(r'product-attribute', views.ProductAttributeViewSet, basename="product-attribute")
router.register(r'product-attribute-value', views.ProductAttributeValueViewSet, basename="product-attribute-value")
router.register(r'category-list', views.CategoryListViewSet, basename="category-list")
router.register(r'media', views.MediaListViewSet, basename="media")


urlpatterns = [
    path('search/', views.SearchView.as_view()),
    # path('turn/', views.test)
]

urlpatterns += router.urls