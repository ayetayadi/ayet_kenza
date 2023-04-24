import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  annonceur = {
    username: '',
    email: '',
    dateNaiss: '',
    tel: '',
    password: '',
    nomE: '',
    emailE: '',
    telE: '',
    domaineE: '',
    adresseE: ''
  }

  token: any;
  constructor(private authService: AuthService,private shared: SharedService ,private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.authService.registerAnnonceur(this.annonceur)
    .subscribe(
      res => {
        this.token = res
        const usernameAnn = this.annonceur.username;
        console.log(`Username de l'annonceur enregistré: `+ usernameAnn)
        const emailAnn = this.annonceur.email;
        console.log(`Email de l'annonceur enregistré: `+ emailAnn)
        const dateNaissAnn = this.annonceur.dateNaiss;
        console.log(`Date de naissance de l'annonceur enregistré: `+ dateNaissAnn)
        const telAnn = this.annonceur.tel;
        console.log(`Téléphone de l'annonceur enregistré: `+ telAnn)
        const nomE = this.annonceur.nomE;
        console.log(`Nom de l'entreprise de l'annonceur enregistré: ` + nomE)
        const emailE = this.annonceur.emailE;
        console.log(`Email de l'entreprise de l'annonceur enregistré: ` + emailE)
        const telEAnn = this.annonceur.telE;
        console.log(`Téléphone de l'entreprise l'annonceur enregistré: `+ telEAnn)
        const domaineE = this.annonceur.domaineE;
        console.log(`Domaine de l'entreprise de l'annonceur enregistré: ` + domaineE)
        const adresseE = this.annonceur.adresseE;
        console.log(`Adresse de l'entreprise de l'annonceur enregistré: ` + adresseE)
        localStorage.setItem('token', this.token)
        this.router.navigate(['/'])
        console.log( `Successful Navigation`)
        this.shared.setToken(this.token);
        console.log(this.token)
        console.log(this.shared.getToken());
      },
      err => {
        console.log(err);
      }
    )
  }
}
