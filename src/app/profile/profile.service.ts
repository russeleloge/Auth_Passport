import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// canActivate nous permet de gérer l'accès aux pages
export class ProfileService implements CanActivate {
  profile = new Object;
  endpointURL = 'http://127.0.0.1:8000/api/';

  constructor(private HttpClient: HttpClient, private router: Router) {}

  getProfile() {
    return new Observable((observer) => {
      // On verifie si on est deja aller chercher le profil
      if (this.profile) {
        // Si c'est le cas on retourne le profil en question
        observer.next(this.profile);
        observer.complete();
      }
      // Dans le cas contraire on ira chercher dans l'API
      else {
        this.HttpClient.get(this.endpointURL).subscribe(
          profile => {
            this.profile = profile;
            observer.next(profile);
            observer.complete();
          },
          (error) => {
            observer.error(error);
            observer.complete();
          }
        );
      }
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return new Observable((observer) => {
      this.getProfile().subscribe(
        (profile) => {
          observer.next(true);
          observer.complete();
        },
        (error) => {
          this.router.navigate(['/login']);
          // Pour indiquer qu'on n'a pas le droit d'activer la page en question
          observer.next(false);
          observer.complete();
        }
      );
    });
  }
}
