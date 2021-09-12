import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { FramesServService } from "../shared/frames-serv.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";



@Injectable({
    providedIn:'root'
})
export class UserGuard implements CanActivate{
    constructor(private frames:FramesServService,private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      
        return localStorage.getItem('loginAutorization')?true: this.router.navigate(['/']);
        
    }

}