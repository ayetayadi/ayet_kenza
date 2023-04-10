import { Component, OnInit } from '@angular/core';
import { AuthannonceurService } from 'src/app/services/authannonceur.service'
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  annonceur = {
    username: '',
    email: '',
    tel: '',
    password: '',
    nomE: '',
    emailE: '',
    domaineE: '',
    adressE: ''
  }

  token: any;
  constructor(private auth: AuthannonceurService,private shared: SharedService ,private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.auth.register(this.annonceur)
    .subscribe(
      res => {
        this.token = res
        const usernameAnn = this.annonceur.username;
        console.log(`Username de l'annonceur enregistré: `+ usernameAnn)
        const emailAnn = this.annonceur.email;
        console.log(`Email de l'annonceur enregistré: `+ emailAnn)
        const telAnn = this.annonceur.tel;
        console.log(`Username de l'annonceur enregistré: `+ telAnn)
        const nomE = this.annonceur.nomE;
        console.log(`Nom de l'entreprise de l'annonceur enregistré: ` + nomE)
        const emailE = this.annonceur.emailE;
        console.log(`Email de l'entreprise de l'annonceur enregistré: ` + emailE)
        const domaineE = this.annonceur.domaineE;
        console.log(`Domaine de l'entreprise de l'annonceur enregistré: ` + domaineE)
        const adresseE = this.annonceur.adressE;
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
