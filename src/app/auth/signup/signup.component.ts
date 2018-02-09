import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error:any;
  errorState:boolean = false;

  constructor(private afAuth:AngularFireAuth,private router:Router,private auth:AuthService) { }

  ngOnInit() {}

  // validate Password
  validatePass(password,confirm){
      if(confirm.length == 0 || confirm == password) {
        this.error = "";
        this.errorState = false;
        return;
      }
      if(password != confirm){
        this.error = "Password not matched";
        this.errorState = true;
        return;
      }
  }

  // register new user
  signUp(form){
    this.auth.registerUser(form)
        .then((user) => {
            if(user){
              this.errorState = false;
              this.router.navigate(['/library']);
            }
        })
        .catch((err) => {
          this.errorState = true;
          this.error = err;
        })
  }

}
