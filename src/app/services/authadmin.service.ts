import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthadminService {
  isAdmin: boolean = false;

  constructor(private http: HttpClient, private shared: SharedService) { }

  private url = 'http://127.0.0.1:3000/admin/';



  login(admin: any) {
    localStorage.setItem('token', 'your_jwt_token_here');
    return this.http.post(this.url + 'login', admin);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);

  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  isAdminLoggedIn() {
    const token = this.shared.getAdminToken();
    console.log(token);
    if (token != null) {
      return true
    }
    return false;
  }
  getAdminFromToken(): boolean {
    console.log(this.shared.getAdminToken());
    const tokenObj = this.shared.getAdminToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log('Admin Token: ' + token);
    return this.isAdmin = true;
  }

  
  deleteAnnonceur(email: string) {
    console.log('Attempting to delete annonceur with email: ', email);
    return this.http.delete('http://localhost:3000/admin/deleteAnnonceur/' + email);
  }

  editAnnonceur(annonceurEmail: string, username: string, email: string, tel: string, nomE: string, emailE: string, adresseE: string, domaineE: string): Observable<any> {
    const url = `http://localhost:3000/admin/editAnnonceur/${annonceurEmail}`;
    const data = { username, email , tel, nomE, emailE, adresseE, domaineE };
    return this.http.put(url, data);
  }

  
}