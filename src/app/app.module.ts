import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';


import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AuthModule } from '@angular/fire/auth';
import { Auth } from '@angular/fire/auth';

import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './services/auth.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CategoriesComponent,
    AllPostComponent,
    NewPostComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  
    FormsModule,
       provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
       provideFirestore(() => getFirestore()),
       provideDatabase(() => getDatabase()),
       provideStorage(() => getStorage()),
       provideAuth(() => getAuth()),

       
       

    
       AngularEditorModule,
       HttpClientModule,
       ReactiveFormsModule,
       AuthModule,
       
       
      
      
      
       
      
       


  ],
  providers: [
    provideClientHydration(), AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
