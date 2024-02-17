# CRUD de Estudiantes con Firebase

## Funcionalidades

- **Registrar un nuevo estudiante:** Permite ingresar los datos de un nuevo estudiante (nombre, apellidos, teléfono, correo electrónico y descripción) y guardarlos en Firebase.
- **Listar estudiantes:** Muestra un listado de todos los estudiantes registrados en Firebase, permitiendo visualizar su información.
- **Editar estudiante:** Permite modificar los datos de un estudiante seleccionado. Los cambios se reflejan en tiempo real en Firebase.
- **Eliminar estudiante:** Permite eliminar el registro de un estudiante de Firebase.

## Conexión con Firebase

La aplicación se conecta a Firebase utilizando la SDK de Firebase para web. La configuración específica del proyecto Firebase se realiza mediante un objeto de configuración que incluye la apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId y databaseURL. Tal y como venía en el ejemple, aunque usando mi propia base de datos.

### Inicialización de Firebase

Firebase se inicializa en el archivo "app.js" utilizando la función "initializeApp" de Firebase SDK, pasando el objeto de configuración como argumento.

### Operaciones CRUD

Las operaciones CRUD se realizan utilizando la Firebase Database SDK. Se utilizan las funciones "getDatabase", "ref", "set", "get", "update", y "remove" para interactuar con la base de datos en tiempo real.

- **Crear:** Se utiliza "set" junto con "push" para añadir nuevos registros a la base de datos.
- **Leer:** Se utiliza "get" para recuperar los datos de los estudiantes almacenados en Firebase y mostrarlos en la página.
- **Actualizar:** Se utiliza "update" para modificar los datos existentes de un estudiante en Firebase.
- **Eliminar:** Se utiliza "remove" para eliminar el registro de un estudiante de la base de datos.