// URL base del servidor
const BASE_URL = 'http://localhost:3000/api';


const sqliteForm = document.getElementById('sqliteForm');
const sqliteName = document.getElementById('sqliteName');
const sqliteEmail = document.getElementById('sqliteEmail');
const sqliteUsersList = document.getElementById('sqliteUsersList');

const mongoForm = document.getElementById('mongoForm');
const mongoName = document.getElementById('mongoName');
const mongoEmail = document.getElementById('mongoEmail');
const mongoUsersList = document.getElementById('mongoUsersList');

// Función para obtener y mostrar usuarios de SQLite
const fetchSQLiteUsers = async () => {
  const response = await fetch(`${BASE_URL}/sqlite/users`);
  const users = await response.json();
  sqliteUsersList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.textContent = `${user.name} - ${user.email} - Edad: ${user.age || 'N/A'} - País: ${user.country || 'N/A'}`;

    // Botón de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', () => deleteUser(user.id, 'sqlite'));
    li.appendChild(deleteButton);

    // Botón de editar
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', () => editUser(user, 'sqlite'));
    li.appendChild(editButton);

    sqliteUsersList.appendChild(li);
  });
};


// Función para obtener y mostrar usuarios de MongoDB
const fetchMongoUsers = async () => {
  const response = await fetch(`${BASE_URL}/mongo/users`);
  const users = await response.json();
  mongoUsersList.innerHTML = ''; 

  users.forEach((user) => {
    const li = document.createElement('li');
    li.textContent = `${user.name} - ${user.email} - Edad: ${user.age} - País: ${user.country}`;
    
    // Botón de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', () => deleteUser(user._id, 'mongo'));
    li.appendChild(deleteButton);

    // Botón de editar
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', () => editUser(user, 'mongo')); 
    li.appendChild(editButton);

    mongoUsersList.appendChild(li);
  });
};


// Manejar formulario de SQLite
sqliteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const user = {
    name: sqliteName.value,
    email: sqliteEmail.value,
    age: parseInt(document.getElementById('sqliteAge').value),
    country: document.getElementById('sqliteCountry').value, 
  };

  await fetch(`${BASE_URL}/sqlite/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  sqliteName.value = '';
  sqliteEmail.value = '';
  document.getElementById('sqliteAge').value = '';  
  document.getElementById('sqliteCountry').value = '';  

  fetchSQLiteUsers();
});

// Manejar formulario de MongoDB
mongoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const user = {
    name: mongoName.value,
    email: mongoEmail.value,
    age: parseInt(mongoAge.value, 10), 
    country: mongoCountry.value
  };
  await fetch(`${BASE_URL}/mongo/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  mongoName.value = '';
  mongoEmail.value = '';
  mongoAge.value = '';
  mongoCountry.value = '';
  fetchMongoUsers();
});

// Función para eliminar usuario
async function deleteUser(userId, dbType) {
  try {
    const url = `${BASE_URL}/${dbType}/users/${userId}`;
    const response = await fetch(url, { method: 'DELETE' });
    if (response.ok) {
      alert('Usuario eliminado con éxito');
      dbType === 'mongo' ? fetchMongoUsers() : fetchSQLiteUsers();
    } else {
      alert('Error al eliminar el usuario');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Función para editar usuario
async function editUser(user, dbType) {
  const name = prompt(`Edita el nombre de ${user.name}:`, user.name);
  const email = prompt(`Edita el email de ${user.email}:`, user.email);
  const age = prompt(`Edita la edad de ${user.name}:`, user.age || '');
  const country = prompt(`Edita el país de ${user.name}:`, user.country || '');

  if (name && email && age && country) {
    try {
      const userId = dbType === 'mongo' ? user._id : user.id; 
      const url = `${BASE_URL}/${dbType}/users/${userId}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, age: parseInt(age), country }),
      });

      if (response.ok) {
        alert('Usuario actualizado con éxito');
        dbType === 'mongo' ? fetchMongoUsers() : fetchSQLiteUsers();
      } else {
        alert('Error al actualizar el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    alert('Todos los campos son obligatorios');
  }
}

fetchSQLiteUsers();
fetchMongoUsers();
