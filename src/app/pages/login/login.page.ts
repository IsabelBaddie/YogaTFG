import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Importamos los módulos necesarios de Ionic
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonFooter,
  IonItem, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonLabel, IonInput,
} from '@ionic/angular/standalone';
// Importamos el servicio de navegación
import { NavigationService } from '../../services/navigation.service';
//Para el almacenamiento de datos en el dispositivo
import { Storage } from '@ionic/storage-angular';
//Modelo
import { UserI } from 'src/app/models/user.models';

// Importamos diferenes servicios 
import { FirestoreService } from '../../services/firestore.service';
import { AutenticacionService } from '../../services/autenticacion.service';
import { RutinasService } from '../../services/rutinas.service';
import { StorageService } from '../../services/storage.service'; // ajusta el path si es diferente

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonFooter, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    FormsModule, IonItem, IonCard, IonLabel, IonInput, ReactiveFormsModule,]
})
export class LoginPage implements OnInit {

  constructor(private navigationService: NavigationService, private firestoreService: FirestoreService, private rutinaService: RutinasService,
    private autenticacion: AutenticacionService, private storageService: StorageService, private toastController: ToastController) { // Constructor del componente donde inyectamos los servicios necesarios

    this.loadusers(); //Al crear el componente (la pagina), se ejecuta loadusers() para cargar los usuarios desde Firestore.
    this.inicializarUsuario(); // Inicializamos un usuario vacío para el formulario

  }

  ngOnInit() {
  }

  //VARIABLES 
  // Definimos las propiedades del componente


  users: UserI[] = []; //Es un array de tipo User I que lo inicializamos en vacio, de un modelo/interfaz que hemos creado, se va rellenando con Firebase

  newUser!: UserI;   // Objeto  para el formulario de crear/editar usuarios

  cargando: boolean = false;  // Bandera para mostrar un spinner de carga (true/false)

  usuarioActual: UserI | null = null; // Almacena el usuario actual después de iniciar sesión


  loginData = {
    email: '',
    password: ''
  };



  loadusers() {  // Método que escucha cambios en la colección 'Usuarios' en Firestore
    //utilizamos el metodo del servicio 
    /*getCollectionChanges<UserI>('Usuarios') devuelve un Observable<UserI[]>.
    .subscribe(data => {...}) escucha los cambios en tiempo real.
    Cuando hay datos, el observable emite un array de objetos UserI, y eso es lo que recibe el parámetro data
    */
    this.firestoreService.getCollectionChanges<UserI>('Usuarios').subscribe(data => {

      //FUNCIÓN
      if (data) { // Actualizamos la lista de usuarios si Firestore nos devuelve datos
        this.users = data
      }

    })
  }

  inicializarUsuario() { // Inicializamos un nuevo usuario vacío para el formulario
    this.newUser = {
      id: this.firestoreService.generarIdAleatorio(), // Generamos un ID único para el nuevo usuario usando nuestro servicio
      nombre: null,
      email: '',
      password: ''
    }
  }

  async goToHome() { // Utilizamos el servicio de navegación para ir a la página home

    const usuarioId = await this.storageService.get('usuarioActivo'); // Obtener el ID del usuario activo desde el almacenamiento
    //PD: anteriormente se ha usado en el login el método set para guardar el uid del usuario activo en el storage, ahora lo recuperamos con get
    if (usuarioId) { // Si hay un ID de usuario activo, significa que está logueado
      console.log('Usuario logueado, redirigiendo...');
      this.navigationService.goToHome(); //Redirigimos a la página home
    }
    else {
      // Si no está logueado mostrarmos un mensaje
      console.log('Usuario no logueado');
      const toast = await this.toastController.create({
        message: 'Debes iniciar sesión para poder entrar.',
        duration: 5000,
        position: 'top',
        color: 'danger'
      });
      await toast.present();
      console.log('entra en la tostada de aviso de debes iniciar sesión para poder entrar');
      return;
    }

  }

  goToPrivacidad() { // Utilizamos el servicio de navegación para ir a la página de privacidad
    this.navigationService.goToPrivacidad();
  }

  async registerAndSave() { // Método para registrar y guardar un nuevo usuario
    const { email, password, nombre } = this.newUser; // Desestructuramos el objeto newUser para obtener los valores de email, password y nombre

    if (email && password && nombre) { //Obtenidos los datos verificamos que todos los campos estén completos
      try {  //Intentamos registrar al usuario
        const credenciales = await this.autenticacion.register({ email, password }); //Registramos en Firebase Auth gracias nuestro servicio de autenticación

        //Guardamos en Firestore (usando el UID del auth)
        this.newUser.id = credenciales.user.uid; // usa el UID del auth como ID único
        const usuarioAGuardar = {
          id: credenciales.user.uid,
          email: email,
          nombre: nombre
        };

        await this.firestoreService.crearDocumentoID(usuarioAGuardar, 'usuarios', usuarioAGuardar.id);


        // Guardar en Storage
        await this.storageService.set('usuarioActivo', credenciales.user.uid);
        console.log('Usuario registrado y almacenado en Storage.');

        console.log('Usuario registrado y guardado correctamente.');
        this.inicializarUsuario(); // Reiniciamos el formulario

        const toast = await this.toastController.create({
          message: 'Registro correcto.',
          duration: 5000,
          position: 'top',
          color: 'success'
        });
        await toast.present();
        console.log('entra en la tostada de aviso de registro correcto');

      } catch (err) { // Si hay un error al registrar, lo mostramos en la consola
        console.error('Error al registrar:', err);
      }
    } else { // Si no se completan todos los campos, mostramos un mensaje de error         
      const toast = await this.toastController.create({
        message: 'Completa todos los campos antes de registrarte.',
        duration: 5000,
        position: 'top',
        color: 'danger'
      });
      await toast.present();
      console.log('entra en la tostada de aviso de completar todos los campos antes de registrarse');
      return;
    }
  }

  async login() { // Método para iniciar sesión
    const { email, password } = this.loginData; // Desestructuramos el objeto loginData para obtener los valores de email y password

    if (email && password) { // Verificamos que ambos campos estén completos
      try { //Intentamos iniciar sesión 
        const credenciales = await this.autenticacion.signIn(email, password); // Iniciar sesión con nuestro servicio de autenticación
        console.log('Login exitoso:', credenciales);

        // Guardamos el UID del usuario en el almacenamiento local/storage para poder usarlo en otras partes de la app
        await this.storageService.set('usuarioActivo', credenciales.user.uid);
        console.log('Usuario almacenado en Storage con este uid:', credenciales.user.uid);

        // Obtenemos los datos completos del usuario gracias a nuestro servicio de autenticación
        const datos = await this.autenticacion.obtenerDatosUsuario();
        this.usuarioActual = datos; //Guardamos los datos del usuario en usuarioActual

        this.rutinaService.crearRutinasPorDefectoParaUsuario(); // Crear rutinas por defecto para el usuario

        console.log('Usuario actual:', this.usuarioActual);

        const toast = await this.toastController.create({
          message: 'Login correcto.',
          duration: 5000,
          position: 'top',
          color: 'success'
        });
        await toast.present();
        console.log('entra en la tostada de aviso de login correcto');

      } catch (err) { // Si hay un error al iniciar sesión, lo mostramos en la consola
        console.error('Error en login:', err);
      }

    } else {
      // Si no se completan todos los campos, mostramos un mensaje de error
      const toast = await this.toastController.create({
        message: 'Por favor completa el email y la contraseña para logearte.',
        duration: 5000,
        position: 'top',
        color: 'danger'
      });
      await toast.present();
      console.log('entra en la tostada de aviso de completar email y contraseña para logearte');
      return;
    }
  }

  async logout() { // Método para cerrar sesión
    try {
      await this.autenticacion.logout(); // Llamamos al método de cierre de sesión de nuestro servicio de autenticación
      await this.storageService.remove('usuarioActivo'); // Limpiamos el almacenamiento local
      console.log('Sesión cerrada correctamente');

    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  }

}
