from django.db import models


class Usuario(models.Model):
    nombre = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=20)
    telefono = models.CharField(max_length=20)
    
    def __str__(self) -> str:
        return self.nombre

class Suscripcion(models.Model):
    usuario = models.ForeignKey(Usuario, related_name='suscripciones', on_delete=models.RESTRICT)
    tipo = models.CharField(max_length=20)
    precio = models.FloatField()
    fecha_expiracion = models.DateField()

class Artista(models.Model):
    nombre = models.CharField(max_length=255)
    nacionalidad = models.CharField(max_length=50)
    nro_seguidores = models.IntegerField(default=0)

class Album(models.Model):
    titulo = models.CharField(max_length=255)
    portada = models.CharField(max_length=255)

class Cancion(models.Model):
    album = models.ForeignKey(Album, related_name="canciones_album", on_delete=models.RESTRICT)
    titulo = models.CharField(max_length=255)
    anio_lanzamiento = models.CharField(max_length=4)
    genero = models.CharField(max_length=50)
    duracion = models.FloatField()
    audio = models.CharField(max_length=255)

class Historial(models.Model):
    cancion = models.ForeignKey(Cancion, related_name="canciones_historial", on_delete=models.RESTRICT)
    usuario = models.ForeignKey(Usuario, related_name='historiales', on_delete=models.RESTRICT)
    fecha_reproduccion = models.DateField()

class Playlist(models.Model):
    cancion = models.ForeignKey(Cancion, related_name="canciones_playlist", on_delete=models.RESTRICT)
    usuario = models.ForeignKey(Usuario, related_name='playlists_usuario', on_delete=models.RESTRICT)
    titulo = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255)
    fecha_creacion = models.DateField()


class Recomendacion(models.Model):
    cancion = models.ForeignKey(Cancion, related_name="canciones_recomendacion", on_delete=models.RESTRICT)
    usuario = models.ForeignKey(Usuario, related_name='recomendaciones_usuario', on_delete=models.RESTRICT)
    playlist = models.ForeignKey(Playlist, related_name='playlist_recomendacion', on_delete=models.RESTRICT)
    fecha_recomendacion = models.DateField()

