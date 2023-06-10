"""Base de Datos SQL - Búsqueda"""

import datetime
import sqlite3
from ejercicio_01 import reset_tabla
from ejercicio_02 import agregar_persona


def buscar_persona(id_persona):
    """Implementar la funcion buscar_persona, que devuelve el registro de una 
    persona basado en su id. El return es una tupla que contiene sus campos: 
    id, nombre, nacimiento, dni y altura. Si no encuentra ningun registro, 
    devuelve False."""
    conexion: sqlite3.Connection = sqlite3.connect("data.db")
    try:
        cursor: sqlite3.Cursor = conexion.cursor()
        cursor.execute(
            """
            SELECT * FROM Persona
            WHERE IdPersona = (?);
            """,
            (id_persona, )
        )
        persona = cursor.fetchone()
        conexion.commit()
        if persona:
            campos = list(persona)
            campos[2]=datetime.datetime.strptime(persona[2],"%Y-%m-%d %H:%M:%S")
            camposTuple = tuple(campos)
            return camposTuple
        else:
            return False
    except:
        conexion.rollback()
    finally:        
        conexion.close()



# NO MODIFICAR - INICIO
@reset_tabla
def pruebas():
    juan = buscar_persona(agregar_persona('juan perez', datetime.datetime(1988, 5, 15), 32165498, 180))
    assert juan == (1, 'juan perez', datetime.datetime(1988, 5, 15), 32165498, 180)
    assert buscar_persona(12345) is False

if __name__ == '__main__':
    pruebas()
# NO MODIFICAR - FIN
