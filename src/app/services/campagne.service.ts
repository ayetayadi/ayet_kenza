import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampagneService {

  constructor(private http: HttpClient, private shared: SharedService) { }

  private url = 'http://localhost:3004/campagneService/'
  private urlAnnonceur = 'http://127.0.0.1:3004/campagneService/annonceur/';
  private urlAdmin = 'http://127.0.0.1:3004/campagneService/admin/';
  
  campagneUpdated = new EventEmitter();

  getAllCampagnes() {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = this.shared.getAnnonceurToken();
    console.log(token);
    return this.http.get<any[]>(`${this.urlAnnonceur}getAllCampagnes?token=` + token);
  }

  createCampagne(campagne: any) {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = this.shared.getAnnonceurToken();
    console.log(token);
    return this.http.post<any>(`${this.urlAnnonceur}createCampagne?token=` + this.shared.getAnnonceurToken(), campagne);
  }

  updateCampagne(nomA: string, nom: string, description: string): Observable<any> {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = this.shared.getAnnonceurToken();
    console.log(token);
    return this.http.put(`${this.urlAnnonceur}updateCampagne/${nomA}?token=` + token, { nom, description });
  }

  deleteCampagne(nom: string): Observable<any> {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = this.shared.getAnnonceurToken();
    console.log(token);
    return this.http.delete(`${this.urlAnnonceur}deleteCampagne/${nom}?token=` + token);
  }

  getCampagnesByAnnonceur(email: string): Observable<any> {
    const url = `${this.urlAdmin}getCampagnesByAnnonceur/${email}`;
    return this.http.get(url);
  }
}
