
from xml.dom.minidom import Document
from django.conf import settings
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf.urls.static import static

from accounts.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/jwt/create/', CookieTokenObtainPairView.as_view()),
    path('auth/jwt/refresh/', CookieTokenRefreshView.as_view()),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('api/', include('product.urls')),
    path('/', include('accounts.urls')),
    path('api/', include('consumer_profile.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT )

# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
