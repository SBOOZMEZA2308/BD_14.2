
const firebaseConfig = {
  apiKey: "AIzaSyAecM7BgW8OOtjekH-ULdmKwoAkVUUAapI",
  authDomain: "registroweb-4a2d3.firebaseapp.com",
  projectId: "registroweb-4a2d3",
  storageBucket: "registroweb-4a2d3.appspot.com",
  messagingSenderId: "1012710257644",
  appId: "1:1012710257644:web:14edcc749fa5d2f0abc6c9"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();
const db = firebase.firestore();

//LLamando elementos de html o del DOM
let btnRegistrar = document.getElementById('btnRegistrar');
let btnIngresar = document.getElementById('btnIngresar');
let contenidoDeLaWeb = document.getElementById("contenidoDeLaWeb");
let formulario = document.getElementById('formulario');
let btnCerrarSesion = document.getElementById('btnCerrarSesion');
let btnGoogle = document.getElementById('btnGoogle');
let btnPublicar = document.getElementById('btnPublicar');
//Funcion Registrar
btnRegistrar.addEventListener('click',()=>{
    let email = document.getElementById("txtEmail").value;
    let password = document.getElementById("txtPassword").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    console.log("Inicio de sesión correcto");
    contenidoDeLaWeb.classList.replace('ocultar','mostrar');
    formulario.classList.replace('mostrar','ocultar');
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    // ..
  });
})

//Funcion  Ingresar
btnIngresar.addEventListener('click',()=>{
  let email = document.getElementById("txtEmail").value;
    let password = document.getElementById("txtPassword").value;
console.log("tu email es" + email + "y tu password es" + password);
cargaJSON ();
firebase.auth().signInWithEmailAndPassword(email, password)
.then((userCredential) => {
  // Signed in
  console.log("Inicio de sesión correcto");
    contenidoDeLaWeb.classList.replace('ocultar','mostrar');
    formulario.classList.replace('mostrar','ocultar');
    formulario2.classList.replace('mostrar','ocultar');
  var user = userCredential.user;
  console.log("Inicio sesion correctamente")
  // ...
})
.catch((error) => {
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorMessage);
}); 
})
//Funcion Cerrar Sesion
btnCerrarSesion.addEventListener('click',()=>{
  firebase.auth().signOut().then(() => {
    contenidoDeLaWeb.classList.replace('mostrar','ocultar');
    formulario.classList.replace('ocultar','mostrar');
    formulario2.classList.replace('ocultar','mostrar');
    console.log("Cierre de sesion correcto");
  }).catch((error) => {
    console.log("Error con el cierre de Sesion");
  });
})
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    
    var uid = user.uid;
    contenidoDeLaWeb.classList.replace('ocultar','mostrar');
    formulario.classList.replace('mostrar','ocultar');
    // ...
  } else {
    contenidoDeLaWeb.classList.replace('mostrar','ocultar');
    formulario.classList.replace('ocultar','mostrar');
    // User is signed out
   
  }
});
//Funcion Login  con Google
btnGoogle.addEventListener('click',()=>{
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
   
    var credential = result.credential;
    console.log("Inicio sesion con google")
    
      // ...
  }).catch((error) => {
    
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log("Error de login con google")
    // ...
  });
})

function cargaJSON (){
  fetch('data.json')
  .then(function(res){
    return res.json();
  })
  .then((data) =>{
    let html = '';
    data.forEach((productos)=>{
      html +=`
      <table class="ahora">
      <div class="producto">
    <p> ${productos.marca} </p>
     <img src="${productos.img}"  class="imgProducto">
     <strong> ${productos.precio} </strong>
     
     </div>  
     </table>
     `;
    })
  document.getElementById('resultado').innerHTML=html;
  })
  
    }
  //Funcion agregar datos 
  btnPublicar.addEventListener('click',()=>{
    db.collection("comentarios").add({
      titulo: txtTitulo= document.getElementById('txtTitulo').value,
      descripcion: txtDescripcion = document.getElementById('txtDescripcion').value,
  })
  .then((docRef) => {
      console.log("Se guardo tu comentario correctamente");
      imprimirComentariosEnPantalla();
  })
  .catch((error) => {
      console.error("Error al enviar tu comentario",error);
  });
  })
  //Funcion leer datos o imprimir comentarios en pantalla
function imprimirComentariosEnPantalla(){
  db.collection("comentarios").get().then((querySnapshot) => {
    let html = '';
    querySnapshot.forEach((doc)=>{
      console.log(`${doc.data().titulo}`);
      console.log(`${doc.data().descripcion}`);
      var listarDatos = `
      <div style = "border: solid" "background-color: red";>
      <br>
      <li class = "listarDatos">
      <h5 class ="listarDatosH5"> ${doc.data().titulo} </h5>
      <p> ${doc.data().descripcion} </p>
      </li>
      <br>
      </div>
      `;
      html += listarDatos;
    }); document.getElementById('imprimirComentariosEnPantalla').innerHTML= html;
});

}

