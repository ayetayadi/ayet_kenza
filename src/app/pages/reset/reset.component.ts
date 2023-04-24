import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {


  password: string = '';
  confirmPassword: string ='';
  passwordResetToken: string ='';
  message: string ='';


  constructor(private authService: AuthService, private router: ActivatedRoute, private _router:Router) {
    this.router.queryParams.subscribe(params => {
      this.passwordResetToken = params['passwordResetToken'];
    });
   }

  ngOnInit(): void {
  }
  resetPassword(){
    this.authService.resetPassword(this.passwordResetToken, this.password, this.confirmPassword).subscribe(
      (data: any) => {
        console.log(this.passwordResetToken);
        console.log(this.password);
        console.log(this.confirmPassword);
        this.message = data.message;
        console.log(this.message);
        this._router.navigate(['/']);
      },
      error => {
        console.log(error);
      });
    
  }
}
