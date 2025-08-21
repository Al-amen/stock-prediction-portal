from django.shortcuts import render

from rest_framework import views
from rest_framework import permissions
from rest_framework.response import Response


class ProtectedView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self,request):
        response = {
            "status":"Request was permitted"
        }
        return Response(response)
