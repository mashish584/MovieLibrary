import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  isUser:boolean = false;

  constructor(private auth:AuthService,private router:Router,private actRoute:ActivatedRoute){}

  ngOnInit(){
    this.auth.isLoggedIn()
        .subscribe(user => {
            if(user){
              this.isUser = true;
            }else{
              this.isUser = false;
            }
        })
  }

  logout(){
    this.auth.signOut();
    this.router.navigate(['/library']);
  }

}
