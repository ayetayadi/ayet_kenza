import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { AuthannonceurInterceptor } from '../../interceptors/authannonceur.interceptor';
import { AuthadminInterceptor } from '../../interceptors/authadmin.interceptor';
import { CookieService } from 'ngx-cookie-service';


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
    rememberMe: false,
  }

  annonceur = {
    username: '',
    email: '',
    tel: '',
    password: '',
    nomE: '',
    emailE: '',
    domaineE: '',
    adressE: '',
  }
  rememberMe: boolean = false;


  isAdminLoggedIn: boolean = false;
  isAnnonceurLoggedIn: boolean = false;

  email: string = "";
  password: string = "";
  emailValid: boolean = true;
  passwordValid: boolean = true;

  message: string = "";
  error: string = "";

  constructor(private shared: SharedService, private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private cookieService: CookieService) {

  }

  ngOnInit() {
    const adminRememberMe = this.cookieService.get('adminRememberMe');
    const annonceurRememberMe = this.cookieService.get('annonceurRememberMe');
    
    if (adminRememberMe && this.admin.email) {
      this.router.navigate(['/acceuiladmin']);
      
    } else if (annonceurRememberMe && this.annonceur.email) {
    this.router.navigate(['/campagnes']); 
   }
  }
  


  accessToken: any;
  token: any;

  login() {  
    if (this.admin.email) {
      this.authService.loginAdmin(this.admin).subscribe(
        res => {
          AuthadminInterceptor.accessToken = res.accessToken;
          const accessToken = AuthadminInterceptor.accessToken;
          const refreshToken = res.refreshToken;
          const emailAdmin = this.admin.email;
          console.log(`Email de l'admin current: ` + emailAdmin)
          console.log(`accessToken: ` + accessToken);
          console.log(`refreshToken: ` + refreshToken);
          this.shared.setAdminToken(accessToken);
          this.cookieService.set('accessToken', accessToken, 15 / 1440);
          this.cookieService.set('refreshToken', refreshToken, 1 / 24);
          console.log('Navigation to dashboard route successful!');
          if (this.rememberMe) {
            const expirationDate = new Date();
            expirationDate.setMonth(expirationDate.getMonth() + 3);
            this.cookieService.set('accessToken', accessToken, expirationDate);
            const refreshExpirationDate = new Date();
            refreshExpirationDate.setDate(refreshExpirationDate.getDate() + 7);
            this.cookieService.set('refreshToken', refreshToken, refreshExpirationDate);  
            this.cookieService.set('adminRememberMe', 'true', 90);                       
          }
          else {
            this.cookieService.set('accessToken', accessToken, 15 / 1440);
            this.cookieService.set('refreshToken', refreshToken, 1 / 24);
          }
          this.router.navigate(['/acceuiladmin']);
          this.isAdminLoggedIn = true;
          checkLoginStatus();
         
        },
        err => {
          if (this.annonceur.email) {
            this.authService.loginAnnonceur(this.annonceur).subscribe(
              res => {
                AuthannonceurInterceptor.accessToken = res.accessToken;
                const accessToken = AuthannonceurInterceptor.accessToken;
                const refreshToken = res.refreshToken;
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
                console.log(`accessToken: ` + accessToken);
                console.log(`refreshToken: ` + refreshToken);
                this.shared.setAnnonceurToken(accessToken);
                if (this.rememberMe) {
                  const expirationDate = new Date();
                  expirationDate.setMonth(expirationDate.getMonth() + 3);
                  this.cookieService.set('accessToken', accessToken, expirationDate);
                  const refreshExpirationDate = new Date();
                  refreshExpirationDate.setDate(refreshExpirationDate.getDate() + 7);
                  this.cookieService.set('refreshToken', refreshToken, refreshExpirationDate);
                  this.cookieService.set('annonceurRememberMe', 'true', 90);
                }
                else {
                  this.cookieService.set('accessToken', accessToken, 15 / 1440);
                  this.cookieService.set('refreshToken', refreshToken, 1 / 24);
                }
                this.router.navigate(['/acceuilannonceur']);
                this.isAnnonceurLoggedIn = true;
                checkLoginStatus();
              },
              err => {
                console.log(err);
                this.error = 'Email ou Mot de passe invalide';
              }
            );
          }

        }
      );
    }

    const checkLoginStatus = () => {
      if (this.isAdminLoggedIn) {
        const rememberMe = this.admin.rememberMe;
        if (rememberMe) {
          this.router.navigate(['/acceuiladmin']);
        } else {
          alert('Login Admin successful!');
          this.router.navigate(['/acceuiladmin']);
        }
      } else if (this.isAnnonceurLoggedIn) {
        

          alert('Login Annonceur successful!');
          this.router.navigate(['/acceuilannonceur'])
        
      }
    }

    


  }    


  onSubmit() {
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

