import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';


@Injectable()

export class UnAuthGuard implements CanActivate{

    constructor(private auth:AuthService,private router:Router){}

    canActivate():Observable<boolean>|Promise<boolean>|boolean{
        return this.auth.isLoggedIn()
                    .map((user) => {
                        if(!user){
                            return true;
                        }else{
                            this.router.navigate(['/library']);
                        }
                    })
    }

}