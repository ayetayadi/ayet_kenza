import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {


  email: string ='';
  message: string ='';
 

  constructor(private auth: SharedService, private authService: AuthService) { }

  ngOnInit(): void {
  }

 envoyer() {
    
    this.authService.forgotPassword(this.email).subscribe(
      (response: any) => {
        console.log(+this.email)
        this.message = response.message;
      },
      (error) => {
        console.error(error);
        this.message = `Une erreur s'est produite lors de l'envoi de l'email.`;
      }
    );
  }


  }


