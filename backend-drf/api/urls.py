from django.urls import path
from .import views
urlpatterns = [
    path('protected-view/',views.ProtectedView.as_view())
]
