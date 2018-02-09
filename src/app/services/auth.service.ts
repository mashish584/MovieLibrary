import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()

export class AuthService{


    constructor(private afAuth:AngularFireAuth){}

    isLoggedIn(){
        return this.afAuth.authState;
    }

    authenticateUser(form){
       return this.afAuth.auth.signInWithEmailAndPassword(form.value.email,form.value.password)
    }

    registerUser(form){
        return this.afAuth.auth.createUserWithEmailAndPassword(form.value.email,form.value.password);
    }

    signOut(){
        this.afAuth.auth.signOut();
    }


}