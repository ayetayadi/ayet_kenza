import { Component, OnInit } from '@angular/core';
import { AuthannonceurService } from 'src/app/services/authannonceur.service';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {


  email: string ='';
  message: string ='';
 

  constructor(private auth2: AuthannonceurService) { }

  ngOnInit(): void {
  }

 envoyer() {
    this.auth2.forgotPassword(this.email).subscribe(
      (response: any) => {
        console.log(`Email de l'annonceur: `+this.email)
        this.message = response.message;
      },
      (error) => {
        console.error(error);
        this.message = 'An error occurred while sending the email.';
      }
    );
  }


  }


