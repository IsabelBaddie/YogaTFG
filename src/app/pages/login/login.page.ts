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
import { UserI } from 'src/app/models/user.models';

// Importamos diferenes servicios 
import { FirestoreService } from '../../services/firestore.service';
import { AutenticacionService } from '../../services/autenticacion.service';
import { RutinasService } from '../../services/rutinas.service';
import { StorageService } from '../../services/storage.service'; // ajusta el path si es diferente


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonFooter, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    FormsModule, IonItem, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardContent,
    IonLabel, IonInput, ReactiveFormsModule,]
})
export class LoginPage implements OnInit {

  constructor(private navigationService: NavigationService, private firestoreService: FirestoreService, private rutinaService: RutinasService,
    private autenticacion: AutenticacionService, private storageService: StorageService) { // Constructor del componente

    this.loadusers(); //Al crear el componente (la pagina), se ejecuta loadusers() para cargar los usuarios desde Firestore.
    this.initUser(); // Inicializamos un usuario vacío para el formulario

  }

  ngOnInit() {
  }

  //VARIABLES 
  // Definimos las propiedades del componente


  //Atributo users, que es un array de objetos del tipo UserI.
  users: UserI[] = []; //Inicializamos en vacio, de un modelo/interfaz que hemos creado, se va rellenando con Firebase

  newUser!: UserI;   // Objeto que usamos para el formulario de crear/editar usuarios

  cargando: boolean = false;  // Bandera para mostrar un spinner de carga (true/false)

  usuarioActual: any; // Variable para almacenar el usuario activo


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

  initUser() { // Inicializamos un nuevo usuario vacío para el formulario
    this.newUser = {
      id: this.firestoreService.createIdDoc(),
      nombre: null,
      email: '',
      password: ''
    }
  }

  async goToHome() { // Utilizamos el servicio de navegación para ir a la página home
    // Verificar si el usuario está logueado
    const usuarioId = await this.storageService.get('usuarioActivo'); // ✅ Correcto


    if (usuarioId) {
      // Si está logueado, redirigir a la página de rutinas
      console.log('Usuario logueado, redirigiendo...');
      this.navigationService.goToHome();
    } else {
      // Si no está logueado, redirigir al login o mostrar un mensaje
      console.log('Usuario no logueado');
    }

  }

  goToPrivacidad() { // Utilizamos el servicio de navegación para ir a la página de privacidad
    this.navigationService.goToPrivacidad();
  }



  async registerAndSave() { // Método para registrar y guardar un nuevo usuario
    const { email, password, nombre } = this.newUser;

    if (email && password && nombre) {
      try {
        // 1. Registrar en Firebase Auth
        const cred = await this.autenticacion.register({ email, password });

        // 2. Guardar en Firestore (usando el ID generado o el UID del auth)
        this.newUser.id = cred.user.uid; // usa el UID del auth como ID único
        await this.firestoreService.createDocumentID(this.newUser, 'usuarios', this.newUser.id);

        console.log('Usuario registrado y guardado correctamente.');
        this.initUser();

      } catch (err) {
        console.error('Error al registrar:', err);
      }
    } else {
      console.warn('Completa todos los campos antes de registrar.');
    }
  }

  async login() { // Método para iniciar sesión
    const { email, password } = this.loginData;


    if (email && password) {
      try {
        const res = await this.autenticacion.signIn(email, password);
        console.log('Login exitoso:', res);

        // Guardar el UID o email del usuario
        await this.storageService.set('usuarioActivo', res.user.uid);
        console.log('Usuario almacenado en Storage con este uid:', res.user.uid);

        // Obtener los datos completos del usuario
        const datos = await this.autenticacion.obtenerDatosUsuario();
        this.usuarioActual = datos;

        // ✅ Guarda el nombre del usuario en el Storage
        if (this.usuarioActual?.nombre) {
          await this.storageService.set('nombreUsuario', this.usuarioActual.nombre);
          console.log('Nombre del usuario guardado:', this.usuarioActual.nombre);
        }

        this.rutinaService.crearRutinasPorDefectoParaUsuario(); // Crear rutinas por defecto para el usuario

        console.log('Usuario actual:', this.usuarioActual);

      } catch (err) {
        console.error('Error en login:', err);
      }
    } else {
      console.warn('Por favor completa el email y la contraseña.');
    }
  }

  async logout() { // Método para cerrar sesión
    try {
      await this.autenticacion.logout();
      await this.storageService.remove('usuarioActivo');
      console.log('Sesión cerrada correctamente');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  }


}
