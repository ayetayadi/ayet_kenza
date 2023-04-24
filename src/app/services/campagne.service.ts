import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampagneService {

  constructor(private http: HttpClient, private shared: SharedService) { }

  private url = 'http://localhost:3000/'
  private urlAnnonceur = 'http://127.0.0.1:3000/annonceur/';
  private urlAdmin = 'http://127.0.0.1:3000/admin/';
  
  getAllCampagnes() {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log(token);
    return this.http.get<any[]>(`${this.urlAnnonceur}getAllCampagnes?token=` + token);
  }

  createCampagne(campagne: any) {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log(token);
    return this.http.post<any>(`${this.urlAnnonceur}createCampagne?token=` + token, campagne);
  }

  updateCampagne(nomA: string, nom: string, description: string): Observable<any> {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log(token);
    return this.http.put(`${this.urlAnnonceur}updateCampagne/${nomA}?token=` + token, { nom, description });
  }

  deleteCampagne(nom: string): Observable<any> {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log(token);
    return this.http.delete(`${this.urlAnnonceur}deleteCampagne/${nom}?token=` + token);
  }
}
