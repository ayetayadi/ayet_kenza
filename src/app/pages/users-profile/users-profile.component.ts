import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthannonceurService } from 'src/app/services/authannonceur.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  annonceur = {
    email: '',
    oldPassword: '',
    newPassword: ''
  }


  updated = {
    username: '',
    email: '',
    tel: '',
    nomE: '',
    emailE:'',
    domaineE:'',
    adresseE:''
  }

  id:string = '';
  username: string = '';
  email: string = '';
  tel: string = '';
  nomE: string = '';
  emailE: string = '';
  domaineE: string = '';
  adresseE: string = '';
  


  errorMessage: string = '';

  constructor(private auth2: AuthannonceurService, private router: Router) {

   this.auth2.getAnnonceur().subscribe(
      (response: any) => {
        console.log(response)
        this.id = response.id;
        console.log(this.id)
        this.username = response.username;
        console.log(this.username)
        this.email = response.email;
        console.log(this.email)
        this.tel = response.tel;
        console.log(this.tel)
        this.nomE = response.nomE;
        console.log(this.nomE)
        this.emailE = response.emailE;
        console.log(this.emailE)
        this.domaineE = response.domaineE;
        console.log(this.domaineE)
        this.adresseE = response.adresseE;
        console.log(this.adresseE)
        
      },
      (error: any) => {
        console.log(error);
        this.router.navigate(['/']);
      }
    ); 
  }
  ngOnInit(): void {
   }

  changePassword() {
    this.auth2.changePassword(this.annonceur.oldPassword, this.annonceur.newPassword, this.annonceur.email).subscribe(
      (res) => {
        console.log(res);
        const oldPassword = this.annonceur.oldPassword;
        console.log(`oldPassword de l'annonceur current: ` + oldPassword)
        const newPassword = this.annonceur.newPassword;
        console.log(`New password de l'annonceur current: ` + newPassword)
        this.router.navigate(['/'])
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateProfile(){
    this.auth2.updateAnnonceur(this.id, this.username, this.email, this.tel, this.nomE, this.emailE, this.domaineE, this.adresseE)
    .subscribe({
      next: () => {
        const username = this.username;
        console.log(`username de l'annonceur: ` + username)
        alert('Profile successfully updated!');
      },
      error: (err) => {
        this.errorMessage = err.message || 'An error occurred while updating your profile.';
      }
    });
    }
}



