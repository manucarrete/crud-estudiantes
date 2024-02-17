
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyA7Pge-QF85I0doZKnHdE7zBG1BWsmXyfg",
        authDomain: "crud-js-394b8.firebaseapp.com",
        projectId: "crud-js-394b8",
        storageBucket: "crud-js-394b8.appspot.com",
        messagingSenderId: "260132245242",
        appId: "1:260132245242:web:6ae36a22b666d275af0343",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    import {
        getDatabase,
        set,
        get,
        update,
        remove,
        ref,
        child,
        push,
    } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";


    
    const db = getDatabase();

    const registerForm = document.getElementById("register-form");

    // Crear nuevo estudiante

    async function registrarNuevoEstudiante() {

        const newStudentRef = push(ref(db, "Students"));

        try {
            const newStudentRef = push(ref(db, "Students"));

            await set(newStudentRef, {
                nombre: registerForm["nombre"].value,
                ape1: registerForm["apellido1"].value,
                ape2: registerForm["apellido2"].value,
                telef: registerForm["telefono"].value,
                email: registerForm["email"].value,
                desc: registerForm["descripcion"].value,
            });

            alert("¡Nuevo estudiante registrado!!");
        } catch (error) {
            alert(error);
        }
    }

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        registrarNuevoEstudiante();
    });

    // Función para listar estudiantes
    function listarEstudiantes() {
        const studentsRef = ref(db, 'Students');
        get(studentsRef).then((snapshot) => {
            const students = snapshot.val();
            const studentsList = document.getElementById("student-list");
            studentsList.innerHTML = ""; // Limpiar la lista actual
            Object.keys(students).forEach((key) => {
                const student = students[key];
                const row = document.createElement("tr");
                row.innerHTML = `
                    <th scope="row">${key}</th>
                    <td>${student.nombre}</td>
                    <td>${student.ape1}</td>
                    <td>${student.ape2}</td>
                    <td>${student.telef}</td>
                    <td>${student.email}</td>
                    <td>
                        <button type="button" class="btn btn-warning" onclick="editarEstudiante('${key}')">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button type="button" class="btn btn-danger" onclick="eliminarEstudiante('${key}')">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </td>
                `;
                studentsList.appendChild(row);
            });
        });
    }
    // Función para editar estudiante
    function editarEstudiante(id) {
        const studentRef = ref(db, 'Students/' + id);
        get(studentRef).then((snapshot) => {
            const student = snapshot.val();
            // Cargar datos en el formulario...
            // Abrir el modal para editar
            var myModal = new bootstrap.Modal(document.getElementById('registerModal'));
            myModal.show();
        });
    }
    // Función para eliminar estudiante
    function eliminarEstudiante(id) {
        const studentRef = ref(db, 'Students/' + id);
        remove(studentRef).then(() => {
            alert("Estudiante eliminado");
            listarEstudiantes(); // Actualizar lista
        });
    }
    window.editarEstudiante = editarEstudiante;
    window.eliminarEstudiante = eliminarEstudiante;

    document.addEventListener("DOMContentLoaded", () => {
        listarEstudiantes();
});