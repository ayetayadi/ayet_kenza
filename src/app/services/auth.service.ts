import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private shared: SharedService) { }
 
  private url = 'http://localhost:3000/'
  private urlAnnonceur = 'http://127.0.0.1:3000/annonceur/';
  private urlAdmin = 'http://127.0.0.1:3000/admin/';


  registerAnnonceur(annonceur: any) {
    return this.http.post(this.urlAnnonceur + 'register', annonceur);
  }

  loginAnnonceur(annonceur: any) {
    localStorage.setItem('token', 'your_jwt_token_here');
    return this.http.post(this.urlAnnonceur + 'login', annonceur);
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
    localStorage.removeItem(this.shared.getAnnonceurToken());
  }

  
  loginAdmin(admin: any) {
    localStorage.setItem('token', 'your_jwt_token_here');
    return this.http.post(this.urlAdmin + 'login', admin);
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
    localStorage.removeItem(this.shared.getAdminToken());
  }

  forgotPassword(email: string) {
    return this.http.post(this.url + 'forgotPassword', { email: email });
  }


  resetPassword(passwordResetToken: string, password: string, confirmPassword: string) {
    const body = { password, confirmPassword };
    const url = this.url + `resetPassword?passwordResetToken=${passwordResetToken}`;
    return this.http.post(url, body);
  }
}
