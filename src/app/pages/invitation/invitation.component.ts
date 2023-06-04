import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { TeamService } from 'src/app/services/team.service';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

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

  code: string = '';

  constructor(private cookieService: CookieService, private route: ActivatedRoute, private authService: AuthService, private teamService: TeamService, private router: Router, public shared: SharedService) { }

  ngOnInit(): void {
  }

  acceptInvitation(): void {
    this.authService.acceptInvitation(this.code).subscribe(
      res => {
        console.log(res.idAnn);
        const memberToken = res.accessMemberToken;
        console.log(res.accessMemberToken);
        this.cookieService.set('memberToken', memberToken, 15 / 1440);
        this.shared.setMemberToken(memberToken);
        const queryParams = { nom_campagne: res.nom_campagne };
        const navigationExtras: NavigationExtras = {
          queryParams,
          state: { showSidebar: false }
        };

        this.router.navigate(['/bannières', res.nom_campagne], navigationExtras);
      },
      err => {
        console.log(err);
      }
    );
  }




}




