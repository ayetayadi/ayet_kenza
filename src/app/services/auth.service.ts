import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private shared: SharedService) { }

  private url = 'http://localhost:3001/authService/'
  private urlAnnonceur = 'http://127.0.0.1:3001/authService/annonceur/';
  private urlAdmin = 'http://127.0.0.1:3001/authService/admin/';
  private urlMembre = 'http://127.0.0.1:3001/authService/membre/';


  registerAnnonceur(annonceur: any) {
    return this.http.post(this.urlAnnonceur + 'register', annonceur);
  }

  loginAnnonceur(annonceur: any): Observable<any> {
    return this.http.post<any>(`${this.urlAnnonceur}login`, annonceur, {withCredentials: true}).pipe(
      tap(res => {
        this.shared.setAnnonceurToken(res.accessToken);
      })
    );
  }



  isAnnonceurLoggedIn() {
    const token = this.shared.getAnnonceurToken();
    console.log(token);
    if (token != null) {
      return localStorage.getItem(token);
    }
    return false;
  }

  logoutAnnonceur() {
    return this.http.post(`${this.urlAnnonceur}logout`, {}, {withCredentials: true});
  }

  loginAdmin(admin: any): Observable<any> {
    return this.http.post<any>(`${this.urlAdmin}login`, admin, {withCredentials: true}).pipe(
      tap(res => {
  
        this.shared.setAdminToken(res.accessToken);
      })
    );
  }

  acceptInvitation(code: string): Observable<any> {
    const url = `${this.urlMembre}acceptInvitation`;
    const body = { code };
    return this.http.post<any>(url, body).pipe(
      tap(res => {
        this.shared.setMemberToken(res.accessMemberToken);
      })
    );
  }
  

  isAdminLoggedIn() {
    const token = this.shared.getAdminToken();
    console.log(token);
    if (token != null) {
      return localStorage.getItem(token);
    }
    return false;
  }

  logoutAdmin() {
    return this.http.post(`${this.urlAdmin}logout`, {}, {withCredentials: true});
  }

  forgotPassword(email: string) {
    return this.http.post(this.url + 'forgotPassword', { email: email });
  }

  logoutMember() {
    return this.http.post(`${this.urlMembre}logout`, {}, {withCredentials: true});
  }

}
