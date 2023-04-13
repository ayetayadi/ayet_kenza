import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthadminService } from 'src/app/services/authadmin.service';
import { AuthannonceurService } from 'src/app/services/authannonceur.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  admin = {
    email: '',
    password: '',
  }

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

  rememberMe: boolean = false;


  isAdminLoggedIn: boolean = false;

  email: string = "";
  password: string = "";
  emailValid: boolean = true;
  passwordValid: boolean = true;

  constructor(private shared: SharedService, private auth1: AuthadminService, private auth2: AuthannonceurService, private router: Router) {

  }

  ngOnInit(): void {
  }


  token: any;

  login() {
    this.auth1.login(this.admin).subscribe(
      res => {
        this.token = res;
        const emailAdmin = this.admin.email;
        console.log(`Email de l'admin current: ` + emailAdmin)
        localStorage.setItem('token', this.token)
        console.log(`token1: ` + this.token)
        console.log(this.token)
        alert('Admin connecté!!')
        this.shared.setAdminToken(this.token);
        console.log(this.shared.getAdminToken())
        console.log('Navigation to dashboard route successful!');
        this.router.navigate(['/dashboard']);
        this.isAdminLoggedIn = true;

      },
      err => {
        console.log(err);
      }
    )

    this.auth2.login(this.annonceur).subscribe(
      res => {
        this.token = res;
        const usernameAnn = this.annonceur.username;
        console.log(`Username de l'annonceur current: ` + usernameAnn)
        const emailAnn = this.annonceur.email;
        console.log(`Email de l'annonceur current: ` + emailAnn)
        const telAnn = this.annonceur.tel;
        console.log(`Phone de l'annonceur current: ` + telAnn)
        const nomE = this.annonceur.nomE;
        console.log(`Nom de l'entreprise de l'annonceur current: ` + nomE)
        const emailE = this.annonceur.emailE;
        console.log(`Email de l'entreprise de l'annonceur current: ` + emailE)
        const domaineE = this.annonceur.domaineE;
        console.log(`Nom de l'entreprise de l'annonceur current: ` + domaineE)
        const adresseE = this.annonceur.adressE;
        console.log(`Nom de l'entreprise de l'annonceur current: ` + adresseE)
        localStorage.setItem('token2', this.token)
        alert('Annonceur connecté!!')
        this.shared.setAnnonceurToken(this.token);
        console.log(this.token)
        console.log(this.shared.getAnnonceurToken())
        this.router.navigate(['/dashboard']);
        this.isAdminLoggedIn = false;

      },
      err => {
        console.log(err);
      }
    )
  }

  onSubmit() {
    //if email and password is blank then add error classes in it else call specified function
    if (this.email.trim() === "") {
      this.emailValid = false;
    } else {
      this.checkEmail();
    }

    if (this.password.trim() === "") {
      this.passwordValid = false;
    } else {
      this.checkPass();
    }

    //if email and password fields are valid then submit the form
    if (this.emailValid && this.passwordValid) {
      // submit form or redirect to specified url
    }
  }

  checkEmail() {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate email
    if (!this.email.match(pattern)) {
      this.emailValid = false;
    } else {
      this.emailValid = true;
    }
  }

  checkPass() {
    if (this.password.trim() === "") {
      this.passwordValid = false;
    } else {
      this.passwordValid = true;
    }
  }

}

