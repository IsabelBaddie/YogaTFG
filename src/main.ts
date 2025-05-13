import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import 'bootstrap';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

//imports de Firebase 
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from './environments/environment';

import { provideFirestore, getFirestore } from '@angular/fire/firestore'; //base de datos

import { provideAuth, getAuth } from '@angular/fire/auth'; //autenticación 

//storage 
import { getStorage, provideStorage } from '@angular/fire/storage';
import { Storage } from '@ionic/storage-angular'

//

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    //configuración de Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    Storage, 
  ],
});
