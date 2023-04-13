import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthMembreService } from 'src/app/services/auth-membre.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {
  membre = {
    email: '',
    code: '',
  }

  code: string ='';

  constructor(private route: ActivatedRoute, private auth3: AuthMembreService, private router: Router) { }

  ngOnInit(): void {
  }

  acceptInvitation() :void{
    this.auth3.acceptInvitation(this.code).subscribe(
      res => {
        console.log('Navigation to dashboard route successful!');
        this.router.navigate(['/dashboard']);
      },
      err => {
        console.log(err);
      }
    )
}
}




