import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  constructor(private http: HttpClient, private shared: SharedService) { }

  private url = 'http://localhost:3006/paiementService/'
  private urlAnnonceur = 'http://127.0.0.1:3006/paiementService/annonceur/';
  private urlAdmin = 'http://127.0.0.1:3006/paiementService/admin/';

  getOffres(): Observable<any> {
    return this.http.get(`${this.urlAdmin}getOffres`);
  }

  createOffre(offreData: any): Observable<any> {
    return this.http.post<any>(`${this.urlAdmin}createOffre`,offreData);
  }

  updateOffre(nomPack: string, offreData: any): Observable<any> {
    return this.http.put<any>(`${this.urlAdmin}updateOffre/${nomPack}`, offreData);
  }

  deleteOffre(nomPack: string) {
    return this.http.delete(`${this.urlAdmin}deleteOffre/${nomPack}`);
  }

  payer(email: string, offreId: string) {
    return this.http.post<any>(`${this.urlAnnonceur}payement/${email}/${offreId}`, {});
  }

  voirFactures() {
    const token = this.shared.getAnnonceurToken();
    console.log(token);
    return this.http.get<any[]>(`${this.urlAnnonceur}voirFactures?token=`+token);
  }

  getAnnonceursFactures(): Observable<any> {
    return this.http.get<any>(`${this.urlAdmin}/getAnnonceursFactures`);
  }
}
