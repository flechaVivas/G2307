"""Type, Comprensión de Listas, Sorted y Filter."""

from typing import List, Union


def numeros_al_final_basico(lista: List[Union[float, str]]) -> List[Union[float, str]]:
    """Toma una lista de enteros y strings y devuelve una lista con todos los
    elementos numéricos al final.
    """
    letras = []
    nros = []
    for i in lista:
        if isinstance(i, str):
            letras.append(i)
        elif isinstance(i, int) or isinstance(i, float):
            nros.append(i)
    return letras + nros




# NO MODIFICAR - INICIO
assert numeros_al_final_basico([3, "a", 1, "b", 10, "j"]) == ["a", "b", "j", 3, 1, 10]
# NO MODIFICAR - FIN


##############################################################################


def numeros_al_final_comprension(lista: List[Union[float, str]]) -> List[Union[float, str]]:
    """Re-escribir utilizando comprensión de listas."""
    letras = [ i for i in lista if isinstance(i, str)]
    nros = [ i for i in lista if isinstance(i, int) or isinstance(i, float)]
    return letras + nros


# NO MODIFICAR - INICIO
assert numeros_al_final_comprension([3, "a", 1, "b", 10, "j"]) == ["a", "b", "j", 3, 1, 10]
# NO MODIFICAR - FIN


##############################################################################


def numeros_al_final_sorted(lista: List[Union[float, str]]) -> List[Union[float, str]]:
    """Re-escribir utilizando la función sorted con una custom key.
    Referencia: https://docs.python.org/3/library/functions.html#sorted
    """
    letras = sorted([ i for i in lista if isinstance(i, str)], key=lambda x: isinstance(x, str))
    nros = sorted([ i for i in lista if isinstance(i, int) or isinstance(i, float)], key=lambda x: isinstance(x, str))
    return letras + nros
# Usé una función lambda para la key porque si ponia isinstance me daba error, porque necesitaba comparar el objeto de la lista con el tipo de dato, 
# que me devuelva un booleano, y asi poder comparar el objeto con el booleano, y asi poder ordenar la lista.
# NO MODIFICAR - INICIO
assert numeros_al_final_sorted([3, "a", 1, "b", 10, "j"]) == ["a", "b", "j", 3, 1, 10]
# NO MODIFICAR - FIN


###############################################################################


def numeros_al_final_filter(lista: List[Union[float, str]]) -> List[Union[float, str]]:
    """CHALLENGE OPCIONAL - Re-escribir utilizando la función filter.
    Referencia: https://docs.python.org/3/library/functions.html#filter
    """
    letras = list(filter(lambda x: isinstance(x, str), lista))
    nros = list(filter(lambda x: isinstance(x, int) or isinstance(x, float), lista))
    return letras + nros
    # Primero filtra la lista, y me devuelve una lista con los elementos que cumplen la condición, 
    # que son los strings en el primer caso y los nros en el segundo.
    # Luego, con list, casteo la lista que me devuelve.

# NO MODIFICAR - INICIO
if __name__ == "__main__":
    assert numeros_al_final_filter([3, "a", 1, "b", 10, "j"]) == ["a", "b", "j", 3, 1, 10]
# NO MODIFICAR - FIN


###############################################################################


def numeros_al_final_recursivo(lista: List[Union[float, str]]) -> List[Union[float, str]]:
    """CHALLENGE OPCIONAL - Re-escribir de forma recursiva."""


# NO MODIFICAR - INICIO
if __name__ == "__main__":
    assert numeros_al_final_recursivo([3, "a", 1, "b", 10, "j"]) == ["a", "b", "j", 3, 1, 10]
# NO MODIFICAR - FIN
