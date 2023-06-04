import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private shared: SharedService) { }

  private url = 'http://localhost:3002/accountService/'
  private urlAnnonceur = 'http://127.0.0.1:3002/accountService/annonceur/';
  private urlAdmin = 'http://127.0.0.1:3002/accountService/admin/';
  
  getAnnonceur() {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log(token);
    return this.http.get(this.urlAnnonceur + 'profile', {
      observe: 'body',
      params: new HttpParams().append('token', this.shared.getAnnonceurToken())
    })
  }

  updateAnnonceur(id: string, username: string, email: string, dateNaiss: string, tel: string, nomE: string, emailE: string, telE: string, domaineE: string, adresseE: string) {
    const token = this.shared.getAnnonceurToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const body = { username, email, dateNaiss, tel, nomE, emailE, telE, domaineE, adresseE };
    return this.http.put(`${this.urlAnnonceur}editProfile?token=${token}`, body);
  }
  

  getAnnonceurs() {
    return this.http.get<any[]>(this.urlAdmin + 'getAll');
  }

  createAnnonceur(username: string, email: string, password: string ) {
    const body = { username, email, password };
    return this.http.post(this.urlAdmin + 'addAnnonceur', body);
  }

  deleteAnnonceur(email: string) {
    console.log('Attempting to delete annonceur with email: ', email);
    return this.http.delete(this.urlAdmin + 'deleteAnnonceur/' + email);
  }

  editAnnonceur(annonceurEmail: string, username: string, email: string, tel: string, nomE: string, emailE: string, adresseE: string, domaineE: string): Observable<any> {
    const url = this.urlAdmin + `editAnnonceur/${annonceurEmail}`;
    const data = { username, email , tel, nomE, emailE, adresseE, domaineE };
    return this.http.put(url, data);
  }

  verifyRole(token: string): Observable<any> {
    return this.http.get(`${this.url}verifyRole?token=${token}`);
  }

  resetPassword(passwordResetToken: string, password: string, confirmPassword: string) {
    const body = { password, confirmPassword };
    const url = this.url + `resetPassword?passwordResetToken=${passwordResetToken}`;
    return this.http.post(url, body);
  }

  getPermission(token: string): Observable<any> {
    return this.http.get(`${this.urlAnnonceur}getPermission?token=${token}`);
  }
}
