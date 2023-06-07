#----------------------------------------------------------------------------------------------------------------
#GENERO VARIABLES Y CONSTANTES QUE VOY A USAR
TAMANIO = 5
#LEE LOS ARCHIVOS.TXT LINEA POR LINEA
def leer_archivo(archivo, orden):
    linea = archivo.readline().rstrip()
    if linea: 
        linea, orden = limpiar_linea(linea, orden)
    return (linea, orden) if linea else (("","","","",""), 0) #Devuelve Orden,Fecha,Hora,Usuario,Nota Técnica

def limpiar_linea(linea, orden):
    linea_arr = linea.split(",")
    tamanio = len(linea_arr)
    while tamanio > 5:
        # Obtener los últimos dos valores
        ultimas_cadenas = linea_arr[-2:]

        # Sumar los valores
        concatenacion = ultimas_cadenas[0] + ultimas_cadenas[1]

        # Reemplazar los últimos dos valores por la suma
        linea_arr[-2:] = [concatenacion]
        tamanio = len(linea_arr)
    if(linea_arr[0].isnumeric()):
        orden = linea_arr[0]
    else:
        linea_arr[0] = orden
    tamanio = len(linea_arr)
    return linea_arr, orden


def grabar_archivo(archivo, mensaje):
    print(mensaje)
    for nota in mensaje:
        print(nota)
        archivo.write(','.join(nota) + '\n')


#CREACION DE NUESTRO DICC ORDENADO ALF.   TYPE: LIST
def crear_diccionario(notas,nueva_notas):
    index = 0
    orden = '0'
    notas_lista = []
    mensaje, orden = leer_archivo(notas, orden)
    while mensaje != ("","","","",""):
        notas_lista.append(mensaje)
        mensaje, orden = leer_archivo(notas, orden)
    grabar_archivo(nueva_notas,notas_lista)
#------------------------------------------------------------------------------------------------------------------------

notas = open("notas.csv", "r", encoding="utf8")
nueva_notas = open("notas_2.csv", "w", encoding="utf8")
palabras_definiciones = crear_diccionario(notas,nueva_notas)
notas.close()
nueva_notas.close()

