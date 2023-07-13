from hashlib import md5
from kivymd.app import MDApp
from kivy.lang.builder import Builder
from kivy.uix.screenmanager import ScreenManager, Screen
from os import close
from typing import Self, final
from kivymd.uix.dialog import MDDialog
from kivymd.uix.button import MDFlatButton
from kivy.core.window import Window
import sqlite3
from kivy.app import App
from kivy.config import Config
from sqlalchemy import try_cast
Config.set('graphics', 'resizable', '0')



class LoginScreen(Screen):
    pass

class MenuScreen(Screen):
    pass

class MostrarScreen(Screen):
    pass

class AgregarScreen(Screen):
    pass

class ModificarScreen(Screen):
    pass

class EliminarScreen(Screen):
    pass

# sm = ScreenManager()
# sm.add_widget(MenuScreen(name='login'))
# sm.add_widget(MenuScreen(name='menu'))
# sm.add_widget(MostrarScreen(name='mostrar'))
# sm.add_widget(AgregarScreen(name='agregar'))
# sm.add_widget(ModificarScreen(name='modificar'))
# sm.add_widget(EliminarScreen(name='eliminar'))

class SysacadApp(MDApp):
    dialog = None

    def build(self):
        Window.size = (850,850)
        self.theme_cls.theme_style = "Light"
        self.theme_cls.primary_palette = "Blue"
        self.theme_cls.accent_palette = "Blue"

        conexion: sqlite3.Connection = sqlite3.connect("usuarios.db")

        try:
            cursor: sqlite3.Cursor = conexion.cursor()
            query_1 = """CREATE TABLE IF NOT EXISTS Usuarios
            (User VARCHAR(50),
            Password VARCHAR(50)
            );"""
            cursor.execute(query_1)
            usuarios = [
                ("bautista", "bautista1234"),
                ("facundo", "facundo1234"),
                ("alessandro", "alessandro1234"),
                ("fernando", "fernando1234"),
                ("profesor", "profesor1234"),
            ]
            cursor.executemany("INSERT INTO Usuarios VALUES(?,?);", usuarios)
            conexion.commit()
        except:
            conexion.rollback()
            raise 
        finally: 
            conexion.close()
        
        conexion: sqlite3.Connection = sqlite3.connect("materias.db")

        try:
            cursor: sqlite3.Cursor = conexion.cursor()
            query = """
                CREATE TABLE IF NOT EXISTS Materias(
                    IdMateria INTEGER PRIMARY KEY AUTOINCREMENT,
                    Nombre VARCHAR(50),
                    ProfesorTeoria VARCHAR(50),
                    ProfesorPractica VARCHAR(50),
                    HorasSemanales INTEGER
                )
            """
            cursor.execute(query)
            conexion.commit()
        except:
            conexion.rollback()
            raise 
        finally: 
            conexion.close()

        

        

        screen = Builder.load_file('main.kv')
        return screen
    
    def login(self):
        conexion: sqlite3.Connection = sqlite3.connect("usuarios.db")

        try:
            cursor: sqlite3.Cursor = conexion.cursor()
            query = """
                SELECT * FROM Usuarios
                WHERE User = (?) AND Password = (?);
            """
            usuario_ingresado = self.root.get_screen('login').ids.user.text
            password_ingresado = self.root.get_screen('login').ids.password.text
            cursor.execute(query, (usuario_ingresado, password_ingresado))
            usuario = cursor.fetchone()
            conexion.commit()
            if usuario:
                if not self.dialog:
                    self.dialog = MDDialog(
                        title = 'Login',
                        text = f"Bienvenido {usuario_ingresado.capitalize()}!",
                        buttons = [
                            MDFlatButton(
                                text = "Aceptar",
                                text_color = self.theme_cls.accent_color,
                                on_release=self.dialog_close
                            ),
                        ],
                    )
                    self.dialog.open()
                    self.root.current = 'menu'
        except:
            conexion.rollback()
            raise 
        finally: 
            conexion.close()

    def dialog_close(self, *args):
        self.dialog.dismiss(force=True)
    
    def mostrar(self):
        conexion: sqlite3.Connection = sqlite3.connect("materias.db")

        self.root.get_screen('mostrar').ids.nombre_label.text = "Materias: "

        try:
            cursor: sqlite3.Cursor = conexion.cursor()
            query = """
                SELECT * FROM Materias;
            """
            cursor.execute(query)
            materias = cursor.fetchall()
            conexion.commit()
            for materia in materias:
                if materia[1]:
                    self.root.get_screen('mostrar').ids.nombre_label.text = self.root.get_screen('mostrar').ids.nombre_label.text + f"\n{materia[1]}"
        except:
            conexion.rollback()
            raise
        finally: 
            conexion.close()

    def agregar(self):
        conexion: sqlite3.Connection = sqlite3.connect("materias.db")

        Nombre = self.root.get_screen('agregar').ids.nombre.text
        ProfesorTeoria = self.root.get_screen('agregar').ids.profesor_teoria.text
        ProfesorPractica = self.root.get_screen('agregar').ids.profesor_practica.text
        HorasSemanales = self.root.get_screen('agregar').ids.horas_semanales.text

        if Nombre and ProfesorTeoria and ProfesorPractica and HorasSemanales:
            try:
                cursor: sqlite3.Cursor = conexion.cursor()
                query = """
                    INSERT INTO Materias(Nombre, ProfesorTeoria, ProfesorPractica, HorasSemanales)
                    VALUES(?,?,?,?)
                """
                cursor.execute(query, (Nombre, ProfesorTeoria, ProfesorPractica, HorasSemanales))
                conexion.commit()
                cambios = conexion.total_changes
                conexion.commit()
                if bool(cambios):
                    self.root.get_screen('agregar').ids.nombre.text = "Agregado"
                    self.root.get_screen('agregar').ids.profesor_teoria.text = ""
                    self.root.get_screen('agregar').ids.profesor_practica.text = ""
                    self.root.get_screen('agregar').ids.horas_semanales.text = ""
                else:
                    self.root.get_screen('agregar').ids.nombre.text = "Error al agregar"
                    self.root.get_screen('agregar').ids.profesor_teoria.text = ""
                    self.root.get_screen('agregar').ids.profesor_practica.text = ""
                    self.root.get_screen('agregar').ids.horas_semanales.text = ""
            except:
                conexion.rollback()
                raise
            finally:
                conexion.close()
        




    def buscar_materia(self, nombre_ingresado):
        conexion: sqlite3.Connection = sqlite3.connect("materias.db")
        
        try:
            cursor: sqlite3.Cursor = conexion.cursor()
            query = """
                SELECT * FROM Materias
                WHERE Nombre = (?);
            """
            cursor.execute(query, (nombre_ingresado,))
            materia = cursor.fetchone()
            conexion.commit()
            if materia:
                if self.root.current == "modificar": 
                    self.root.get_screen('modificar').ids.nombre.text = materia[1]
                    self.root.get_screen('modificar').ids.profesor_teoria.text = materia[2]
                    self.root.get_screen('modificar').ids.profesor_practica.text = materia[3]
                    self.root.get_screen('modificar').ids.horas_semanales.text = str(materia[4])
                else:
                    self.root.get_screen('eliminar').ids.nombre.text = materia[1]
                    self.root.get_screen('eliminar').ids.profesor_teoria.text = materia[2]
                    self.root.get_screen('eliminar').ids.profesor_practica.text = materia[3]
                    self.root.get_screen('eliminar').ids.horas_semanales.text = str(materia[4])
            else:
                if self.root.current == "modificar": 
                    self.root.get_screen('modificar').ids.nombre_a_buscar.text = "No Encontrado"
                    self.root.get_screen('modificar').ids.nombre.text = ""
                    self.root.get_screen('modificar').ids.profesor_teoria.text = ""
                    self.root.get_screen('modificar').ids.profesor_practica.text = ""
                    self.root.get_screen('modificar').ids.horas_semanales.text = ""
                else:
                    self.root.get_screen('eliminar').ids.nombre_a_buscar.text = "No Encontrado"
                    self.root.get_screen('eliminar').ids.nombre.text = ""
                    self.root.get_screen('eliminar').ids.profesor_teoria.text = ""
                    self.root.get_screen('eliminar').ids.profesor_practica.text = ""
                    self.root.get_screen('eliminar').ids.horas_semanales.text = ""

        except:
            conexion.rollback()
            raise 
        finally: 
            conexion.close()

    def modificar(self):
        conexion: sqlite3.Connection = sqlite3.connect("materias.db")

        Nombre = self.root.get_screen('modificar').ids.nombre_a_buscar.text
        NombreNuevo = self.root.get_screen('modificar').ids.nombre.text
        ProfesorTeoria = self.root.get_screen('modificar').ids.profesor_teoria.text
        ProfesorPractica = self.root.get_screen('modificar').ids.profesor_practica.text
        HorasSemanales = self.root.get_screen('modificar').ids.horas_semanales.text

        if NombreNuevo and ProfesorTeoria and ProfesorPractica and HorasSemanales:
            try:
                cursor: sqlite3.Cursor = conexion.cursor()
                query = """
                    UPDATE Materias
                    SET Nombre = (?), ProfesorTeoria = (?), ProfesorPractica = (?), HorasSemanales = (?)
                    WHERE Nombre = (?);
                """
                cursor.execute(query, (NombreNuevo, ProfesorTeoria, ProfesorPractica, HorasSemanales, Nombre))
                cambios = conexion.total_changes
                conexion.commit()
                if bool(cambios):
                    self.root.get_screen('modificar').ids.nombre_a_buscar.text = "Modificado"
                    self.root.get_screen('modificar').ids.nombre.text = ""
                    self.root.get_screen('modificar').ids.profesor_teoria.text = ""
                    self.root.get_screen('modificar').ids.profesor_practica.text = ""
                    self.root.get_screen('modificar').ids.horas_semanales.text = ""
                else:
                    self.root.get_screen('modificar').ids.nombre_a_buscar.text = "Error al modificar"
            except:
                conexion.rollback()
                raise
            finally:
                conexion.close()
            
            
            

    def eliminar(self):
        conexion: sqlite3.Connection = sqlite3.connect("materias.db")

        Nombre = self.root.get_screen('eliminar').ids.nombre_a_buscar.text
        
        try:
            cursor: sqlite3.Cursor = conexion.cursor()
            query = """
                DELETE FROM Materias
                WHERE Nombre = (?);
            """
            cursor.execute(query, (Nombre, ))
            cambios = conexion.total_changes
            conexion.commit()
            if bool(cambios):
                self.root.get_screen('eliminar').ids.nombre_a_buscar.text = "Eliminado"
                self.root.get_screen('eliminar').ids.nombre.text = ""
                self.root.get_screen('eliminar').ids.profesor_teoria.text = ""
                self.root.get_screen('eliminar').ids.profesor_practica.text = ""
                self.root.get_screen('eliminar').ids.horas_semanales.text = ""
            else:
                self.root.get_screen('eliminar').ids.nombre_a_buscar.text = "Error al eliminar"
        except:
            conexion.rollback()
            raise
        finally:
            conexion.close()


if __name__ == '__main__':
    SysacadApp().run()