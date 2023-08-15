from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, CancionSerializer, ArtistaSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from django.shortcuts import render, reverse, redirect, get_object_or_404
from django.http import Http404, HttpResponse, HttpResponseRedirect, JsonResponse
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.edit import CreateView
from django.db.models import Q
from nospeak_app.models import *
from rest_framework import viewsets
from rest_framework.decorators import action



class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)

# from rest_framework import viewsets
# from .serializers import UsuarioSerializer
# from .models import Usuario

# # Create your views here.
# class UsuarioView(viewsets.ModelViewSet):
#     serializer_class = UsuarioSerializer
#     queryset = Usuario.objects.all()

class ArtistaViewSet(viewsets.ModelViewSet):
    serializer_class = ArtistaSerializer
    queryset = Artista.objects.all()
    lookup_field = "id"

    @action(detail=True, methods=["GET"])
    def canciones(self, request, id=None):
        artista = self.get_object()
        canciones = Cancion.objects.filter(artista=artista)
        serializer = CancionSerializer(canciones, many=True)
        return Response(serializer.data, status=200)

    @action(detail=True, methods=["POST"])
    def choice(self, request, id=None):
        artista = self.get_object()
        data = request.data
        data["artista"] = artista.id
        serializer = CancionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.erros, status=400)