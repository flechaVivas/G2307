from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError
from nospeak_app.models import Cancion, Artista

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		user_obj = UserModel.objects.create_user(email=clean_data['email'], password=clean_data['password'])
		user_obj.username = clean_data['username']
		user_obj.save()
		return user_obj

class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['email'], password=clean_data['password'])
		if not user:
			raise ValidationError('user not found')
		return user

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('email', 'username')

class CancionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Cancion
        fields = [
            'id',
            'titulo',
	    	'artista',
		    'anio_lanzamiento',
		    'genero',
		    'duracion',
		    'audio'
        ]
        read_only_fields = ('artista',)
	
class ArtistaSerializer(serializers.ModelSerializer):
    canciones = CancionSerializer(many=True)

    class Meta:
        model = Artista
        fields = [
            "id",
            "nombre",
            "nacionalidad",
            "nro_seguidores",
            "canciones"
        ]

    def create(self, validated_data):
        canciones = validated_data.pop('canciones')
        artista = Artista.objects.create(**validated_data)
        for cancion in canciones:
            Cancion.objects.create(**cancion, artista=artista)
        return artista

    def update(self, instance, validated_data):
        canciones = validated_data.pop('canciones')
        
        instance.nombre = validated_data.get("nombre", instance.nombre)
        instance.nacionalidad = validated_data.get("nacionalidad", instance.nacionalidad)
        instance.nro_seguidores = validated_data.get("nro_seguidores", instance.nro_seguidores)
        instance.save()
        keep_canciones = []
        
        for cancion in canciones:
            if "id" in cancion.keys():
                if Cancion.objects.filter(id=cancion["id"]).exists():
                    c = Cancion.objects.get(id=cancion["id"])
                    c.titulo = cancion.get('titulo', c.titulo)
                    c.anio_lanzamiento = cancion.get('anio_lanzamiento', c.anio_lanzamiento)
                    c.genero = cancion.get('genero', c.genero)
                    c.duracion = cancion.get('duracion', c.duracion)
                    c.audio = cancion.get('audio', c.audio)
                    c.save()
                    keep_canciones.append(c.id)
                else:
                    continue
            else:
                c = Cancion.objects.create(**cancion, artista=instance)
                keep_canciones.append(c.id)

        for cancion in instance.canciones:
            if cancion.id not in keep_canciones:
                cancion.delete()

        return instance

# class UsuarioSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Usuario
#         fields = '__all__'