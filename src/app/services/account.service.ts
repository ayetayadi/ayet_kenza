import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private shared: SharedService) { }

  private url = 'http://localhost:3000/'
  private urlAnnonceur = 'http://127.0.0.1:3000/annonceur/';
  private urlAdmin = 'http://127.0.0.1:3000/admin/';

  changePassword(oldPassword: string, newPassword: string, email: string) {
    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      email: email
    };

    return this.http.post(this.urlAnnonceur + 'changePassword', data);
  }

  
  getAnnonceur() {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log(token);
    return this.http.get(this.urlAnnonceur + 'profile', {
      observe: 'body',
      params: new HttpParams().append('token', token)
    })
  }

  updateAnnonceur(id: string, username: string, email: string, dateNaiss: string, tel: string, nomE: string, emailE: string, telE: string, domaineE: string, adresseE: string) {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const body = { id, username, email, dateNaiss, tel, nomE, emailE, telE, domaineE, adresseE };
    return this.http.put(this.urlAnnonceur + 'annonceur/editProfile?token=' + token, body, httpOptions);

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

}
