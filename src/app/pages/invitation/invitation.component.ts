import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

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

  constructor(private route: ActivatedRoute, private teamService: TeamService, private router: Router) { }

  ngOnInit(): void {
  }

  acceptInvitation() :void{
    this.teamService.acceptInvitation(this.code).subscribe(
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




