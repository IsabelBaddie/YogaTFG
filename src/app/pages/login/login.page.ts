import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importamos los módulos necesarios de Ionic
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonFooter,
  IonItem, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonLabel,
} from '@ionic/angular/standalone';
// Importamos el servicio de navegación
import { NavigationService } from '../../services/navigation.service';
//Para el almacenamiento de datos en el dispositivo
import { Storage } from '@ionic/storage-angular';
import { UserI } from 'src/app/models/user.models';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonFooter, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    FormsModule, IonItem, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardContent,
    IonLabel]
})
export class LoginPage implements OnInit {

  constructor(private navigationService: NavigationService, private firestoreService: FirestoreService, private rutinaService: RutinasService) { // Constructor del componente
    this.loadusers(); //Al crear el componente (es decir la pagina), se ejecuta loadusers() para cargar los usuarios desde Firestore.
    this.initUser(); // Inicializamos un usuario vacío para el formulario

    //añadimos iconos personalizados
    addIcons({ create: icons['create'] });
    addIcons({ trash: icons['trash'] });

    this.initStorage(); // <--- importante
  }

   autenticacion = inject(AutenticacionService); //inyectamos el servicio de autenticacion

  ngOnInit() {
  }

  //VARIABLES 
  // Definimos las propiedades del componente
  private storage: Storage; // Almacenamiento de datos en el dispositivo

  //Atributo users, que es un array de objetos del tipo UserI.
  users: UserI[] = []; //Inicializamos en vacio, de un modelo/interfaz que hemos creado, se va rellenando con Firebase

  newUser: UserI;   // Objeto que usamos para el formulario de crear/editar usuarios

  cargando: boolean = false;  // Bandera para mostrar un spinner de carga (true/false)

  usuarioActual: any; // Variable para almacenar el usuario activo


  login = {
    email: '',
    password: ''
  };

  //MÉTODOS
  async initStorage() { // Inicializamos el almacenamiento
    // Creamos una instancia de Storage
    this.storage = await new Storage().create();
  }

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

  initUser() {
    this.newUser = {
      id: this.firestoreService.createIdDoc(),
      nombre: null,
      email: '',
      password: ''
    }
  }

  goToHome() { // Utilizamos el servicio de navegación para ir a la página home
    this.navigationService.goToHome();
  }

  goToPrivacidad() { // Utilizamos el servicio de navegación para ir a la página de privacidad
    this.navigationService.goToPrivacidad();
  }

  async registerAndSave() {
    const { email, password, nombre } = this.newUser;

    if (email && password && nombre) {
      try {
        // 1. Registrar en Firebase Auth
        const cred = await this.autenticacion.register({ email, password });

        // 2. Guardar en Firestore (usando el ID generado o el UID del auth)
        this.newUser.id = cred.user.uid; // usa el UID del auth como ID único
        await this.firestoreService.createDocumentID(this.newUser, 'Usuarios', this.newUser.id);

        console.log('Usuario registrado y guardado correctamente.');
        this.initUser();

      } catch (err) {
        console.error('Error al registrar:', err);
      }
    } else {
      console.warn('Completa todos los campos antes de registrar.');
    }
  }

  login() {
    console.log('Login clicked');
  }

  async logout() {
    try {
      await this.autenticacion.logout();
      await this.storage.remove('usuarioActivo');
      console.log('Sesión cerrada correctamente');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  }



}
