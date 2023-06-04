import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teamsadmin',
  templateUrl: './teamsadmin.component.html',
  styleUrls: ['./teamsadmin.component.css']
})
export class TeamsadminComponent implements OnInit {

  equipes: any[];
  annonceurEmail: string = '';

  constructor(private teamService: TeamService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.annonceurEmail = params.get('email')|| '';
      this.getTeamsByAnnonceur(this.annonceurEmail);
    });
  }

  getTeamsByAnnonceur(email: string) {
    this.teamService.getTeamsByAnnonceur(email)
      .subscribe(data => {
        this.equipes = data;
        console.log(`Found ${this.equipes.length} teams for annonceur "${this.annonceurEmail}"`);
      }, error => {
        console.error(error);
      });
  }
  
}
