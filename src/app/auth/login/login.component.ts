import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../services/auth.service';

@Component({
    selector:'app-login',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']
})

export class LoginComponent implements OnInit{

    error:any;

    constructor(private afAuth:AngularFireAuth,private router:Router,private auth:AuthService){}

    ngOnInit(){}

    logIn(form){
        this.auth.authenticateUser(form)
            .then((user) => {
                if(user){
                    this.router.navigate(['/library']);
                }
            })
            .catch(() => {
                this.error = "Email and Password combination not matched.";
            })
    }

}