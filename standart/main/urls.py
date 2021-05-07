from django.urls import path

from main import views
from main import api

app_name = 'main'

urlpatterns = [
    path('', views.IndexPageView.as_view(), name='index'),
    path('api/change-city/', api.ChangeSessionCityView.as_view(), name='change_city'),
]
