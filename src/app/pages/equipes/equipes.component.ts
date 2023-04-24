import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrls: ['./equipes.component.css']
})
export class EquipesComponent implements OnInit {

  selectedEquipe: any;

  equipes: any[] = [];

  email: string = '';
  team: string = '';
  token: string = '';
  message: string = '';


  teamName: string = '';
  newTeamName: string = '';


  constructor(private teamService: TeamService, private shared: SharedService) {
    this.teamService.getTeamsForAnnonceur(this.shared.getAnnonceurToken())
      .subscribe((data: any[]) => {
        console.log(data);
        this.equipes = data;
      });
  }

  ngOnInit(): void {
  }

  createTeam() {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log(token);
    this.teamService.createTeam(token, this.teamName).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }

  deleteTeam(equipe: any) {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = tokenObj.token;
    console.log(token);
    if (!token) {
      console.error('Unable to retrieve JWT token');
      return;
    }
    console.log(equipe.nom)
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${equipe.nom} ?`)) {
      this.teamService.deleteTeam(equipe.nom, token)
        .subscribe(
          () => {
            console.log('Team deleted successfully');
            alert('Équipe supprimée avec succès');
          },
          error => console.error(error)
        );
    }
  }


  updateTeam() {
    this.teamService.updateTeam(this.selectedEquipe?.nom, this.newTeamName).subscribe(
      response => {
        console.log(response.message);
      },
      error => {
        console.error(error);

      }
    )
  }

  invite() {
    this.teamService.sendInvitation(this.email, this.selectedEquipe?.nom)
      .subscribe(response => {
        console.log(`Email de l'annonceur: ` + this.email)
        this.message = response.message;
      },
        error => {
          console.error(error);
          this.message = 'An error occurred while sending the invitation.';
        }
      )
  }
}