// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDTJg4uWgKsc3HTnft9UPsWCbz_BiTLaJc",
    authDomain: "crud-estudiantes-87bb9.firebaseapp.com",
    projectId: "crud-estudiantes-87bb9",
    storageBucket: "crud-estudiantes-87bb9.appspot.com",
    messagingSenderId: "918616343154",
    appId: "1:918616343154:web:7f0a1570d1e4841a52f8eb",
    databaseURL: "https://crud-estudiantes-87bb9-default-rtdb.firebaseio.com"
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

async function registrarNuevoEstudiante() {

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
        listarEstudiantes();
        var registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        registerModal.hide();

    } catch (error) {
        alert(error);
    }
}

// Función para listar estudiantes
function listarEstudiantes() {
    const studentsRef = ref(db, 'Students');
    console.log(studentsRef);
    get(studentsRef).then((snapshot) => {
        const students = snapshot.val();
        const studentsList = document.getElementById("student-list");
        studentsList.innerHTML = "";
        console.log(students);

        if(students === null) return;
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
        document.getElementById("formControlNombre").value = student.nombre;
        document.getElementById("formControlApellido1").value = student.ape1;
        document.getElementById("formControlApellido2").value = student.ape2;
        document.getElementById("formControlTelefono").value = student.telef;
        document.getElementById("formControlEmail").value = student.email;
        document.getElementById("formControlDescripcion").value = student.desc ? student.desc : '';
        document.getElementById("studentId").value = id;
        document.querySelector("#register-form button[type=submit]").innerText = 'Actualizar';
        var myModal = new bootstrap.Modal(document.getElementById('registerModal'));
        myModal.show();
    });
}

// Función para eliminar estudiante
function eliminarEstudiante(id) {
    const studentRef = ref(db, 'Students/' + id);
    remove(studentRef).then(() => {
        listarEstudiantes();
        alert("Estudiante eliminado");
    });
}


registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const studentId = document.getElementById("studentId").value; 
    if (studentId) {
        actualizarEstudiante(studentId);
    } else {
        registrarNuevoEstudiante();
    }
});


function actualizarEstudiante(id) {
    const studentRef = ref(db, 'Students/' + id);
    const updatedData = {
        nombre: registerForm["nombre"].value,
        ape1: registerForm["apellido1"].value,
        ape2: registerForm["apellido2"].value,
        telef: registerForm["telefono"].value,
        email: registerForm["email"].value,
        desc: registerForm["descripcion"].value,
    };

    update(studentRef, updatedData).then(() => {
        document.getElementById("register-form").reset();
        document.getElementById("studentId").value = "";
        var myModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        myModal.hide();
        alert("Estudiante actualizado con éxito");
        listarEstudiantes();
    }).catch((error) => {
        alert(error);
    });
}
    
window.editarEstudiante = editarEstudiante;
window.eliminarEstudiante = eliminarEstudiante;

document.addEventListener("DOMContentLoaded", () => {
    listarEstudiantes();
});