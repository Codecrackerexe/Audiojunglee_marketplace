from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('auth/login/', views.login_view, name='login'),
    path('auth/register/', views.register_view, name='register'),
    path('auth/logout/', views.logout_view, name='logout'),
    path('auth/profile/', views.profile_view, name='profile'),
    path('auth/update-profile/', views.update_profile_view, name='update_profile'),
    path('auth/change-password/', views.change_password_view, name='change_password'),

    # for token refresh
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
