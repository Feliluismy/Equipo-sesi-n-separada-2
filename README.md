# Base da Datos - Mercado de Transferencias de Futbol

## Descripción

En esta base de Mongo, hicimos un sistema que nos permite registrar todas las transferencias realizadas en el mundo del futbol. Esta base de datos tiene colecciones de futbolistas, con sus datos personales, clubes de futbol de toda parte del mundo, y las transferencias realizadas por cada club.

## Tecnologías

* MongoDB 8.2.6
* Mongo drivers
* java-script (NodeJS)

## Nombre de la Base de Datos

* TransJugadores

## Colecciones

* jugadores:

  * \_id
  * nombre
  * edad
  * posicion
  * nacionalidad
  * clubId
* clubes:

  * \_id
  * nombre
  * pais
  * liga
* transferencias

  * \_id
  * jugadorId
  * IdclubOrigen
  * IdclubDestino
  * monto

## Ejecución

* Pasos de Ejecución:

  1. Tener MongoDB iniciado.
  2. Instalar el driver mongodb.
  3. Guardar el código en un archivo.
  4. Ejecutar con node TransferMarker.js.

## Funcionalidades

* Mostrar todos los jugadores.
* Obtener el ranking de jugadores por edad.
* Calcular el total gastado por cada club.
* Mostrar la transferencia de mayor monto.

## Justificación del diseño

* Decidimos rescatar solo los datos mínimos de los jugadores para informar quien es, de donde viene, y cual es su precio estimado.
* Los clubes tienen solo como dato nombre, país y liga, para mera información de los mismos.
* en transferencias tomamos la id del jugador para tenerlo en referencia, ya que solo ocuparemos uno solo para esta especificación, y lo mismo pasa con los clubes, ya que, si bien son dos clubes, no necesitamos mas, y son dos diferentes y no mas de dos los requeridos

