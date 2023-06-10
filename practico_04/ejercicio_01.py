"""Base de Datos SQL - Crear y Borrar Tablas"""

import sqlite3

def crear_tabla():
    """Implementar la funcion crear_tabla, que cree una tabla Persona con:
        - IdPersona: Int() (autoincremental)
        - Nombre: Char(30)
        - FechaNacimiento: Date()
        - DNI: Int()
        - Altura: Int()
    """
    conexion: sqlite3.Connection = sqlite3.connect('data.db')
    try:
        cursor = conexion.cursor()
        query = """CREATE TABLE IF NOT EXISTS Persona
                        (IdPersona INTEGER PRIMARY KEY AUTOINCREMENT,
                        Nombre VARCHAR(30),
                        FechaNacimiento DATE,
                        DNI INTEGER,
                        Altura INTEGER);"""
        cursor.execute(query)
        conexion.commit()
    except:
        conexion.rollback()
    finally:
        conexion.close()
    



def borrar_tabla():
    """Implementar la funcion borrar_tabla, que borra la tabla creada 
    anteriormente."""
    conexion: sqlite3.Connection = sqlite3.connect("data.db")
    try:
        cursor = conexion.cursor()
        cursor.execute("DROP TABLE IF EXISTS Persona;")
        cursor.execute("DELETE FROM `sqlite_sequence` WHERE `name` = 'Persona';")
        conexion.commit()
    except sqlite3.OperationalError as exception:
        conexion.rollback()
    finally:
        conexion.close()


# NO MODIFICAR - INICIO
def reset_tabla(func):
    def func_wrapper():
        crear_tabla()
        func()
        borrar_tabla()
    return func_wrapper
# NO MODIFICAR - FIN
