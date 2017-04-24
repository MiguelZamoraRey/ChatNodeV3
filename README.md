# ChatNodeV3
Proyecto para generar un chat con las ultimas especificaciones de Socket.io.

# Descipción

Con este proyecto se pretende generar una aplicación web con un chat que sea capaz de gestionar
usuarios a través de una base de datos MySql, utilizando Node.js en la parte del servidor con
Socket.io y Express.

# Instalación

Bajamos el repositorio, y una vez tengamos Node.js instalado, acudimos vía cmd hasta la carpeta
donde lo tenemos ubicado y hacemos un "npm install"

Hemos utilizado una base de datos Mysql en localhost con una sola tabla "usuarios" que contiene 
los siguientes campos:

  ID_USU: INT(8), primary key, auto increment.
  NAME_USU: VARCHAR(100), not null.
  NICK_USU: VARCHAR(100), not null.
  PASS_USU: VARCHAR(100), not null.

# Trabajando actualmente

Seguridad en el login para evitar sql injection, refactorización de código, creación de diferentes 
salas de chat.
