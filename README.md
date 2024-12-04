# Requisitos

Node.js
MongoDB
SQLITE

# Instalación de dependencias

npm install

# Bases de datos

Las bases de datos se crean automáticamente si no existen.

# Iniciar proyecto

npm start

# Revisar cambios en bases de datos

Para sqlite debemos colocar en otra terminal el comando:  
sqlite3 db/santiDB.sqlite()
Luego para ir revisando los cambios en la tabla users (creada automáticamente) debemos poner:
SELECT * FROM users;

En caso de mongoDB debemos colocar el comando:
mongosh
Luego:
use santiDBmongo
Y por último para buscar los usuarios:
db.users.find();