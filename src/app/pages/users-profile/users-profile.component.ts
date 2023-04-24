import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';


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
    dateNaiss: '',
    tel: '',
    nomE: '',
    emailE:'',
    telE: '',
    domaineE:'',
    adresseE:''
  }

  id:string = '';
  username: string = '';
  email: string = '';
  dateNaiss: string = '';
  tel: string = '';
  nomE: string = '';
  emailE: string = '';
  telE: string = '';
  domaineE: string = '';
  adresseE: string = '';
  
  errorMessage: string = '';

  constructor(private accountService: AccountService, private router: Router) {

   this.accountService.getAnnonceur().subscribe(
      (response: any) => {
        console.log(response)
        this.id = response.id;
        console.log(this.id)
        this.username = response.username;
        console.log(this.username)
        this.email = response.email;
        console.log(this.email)
        this.dateNaiss = response.dateNaiss;
        console.log(this.dateNaiss)
        this.tel = response.tel;
        console.log(this.tel)
        this.nomE = response.nomE;
        console.log(this.nomE)
        this.emailE = response.emailE;
        console.log(this.emailE)
        this.telE = response.telE;
        console.log(this.telE)
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
    this.accountService.changePassword(this.annonceur.oldPassword, this.annonceur.newPassword, this.annonceur.email).subscribe(
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
    this.accountService.updateAnnonceur(this.id, this.username, this.email, this.dateNaiss, this.tel, this.nomE, this.emailE,this.telE, this.domaineE, this.adresseE)
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



