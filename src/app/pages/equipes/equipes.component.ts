import { Component, OnInit } from '@angular/core';
import { CampagneService } from 'src/app/services/campagne.service';
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
  campagnes: any[] = [];


  teamName: string = '';
  newTeamName: string = '';
  nomCampagne: string = '';
  selectedCampagne: string = '';

  
  constructor(private teamService: TeamService, private shared: SharedService, private campagneService: CampagneService) {
    this.teamService.getTeamsForAnnonceur(this.shared.getAnnonceurToken())
      .subscribe((data: any[]) => {
        console.log(data);
        this.equipes = data;
      });
  }

  ngOnInit(): void {
    this.campagneService.getAllCampagnes().subscribe((data: any[]) => {
      console.log(data);
      this.campagnes = data;
    }, error => {
      console.log(error);
    });
  }

  createTeam() {
    console.log(this.shared.getAnnonceurToken());
    const token = this.shared.getAnnonceurToken() as string;
    console.log(token);
    const teamName = this.teamName;
    const nomCampagne = this.nomCampagne;
    this.teamService.createTeam(token, teamName, nomCampagne).subscribe(
      (response: any) => {
        console.log(response);

        const newTeam = {
          nom: teamName,
        };

        this.equipes.push(newTeam);
      },
     
      error => console.log(error)
    );
  }

  deleteTeam(equipe: any) {
    console.log(this.shared.getAnnonceurToken());
    const tokenObj = this.shared.getAnnonceurToken() as unknown as { token: string };
    const token = this.shared.getAnnonceurToken();
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
            this.equipes = this.equipes.filter((item: any) => item.nom !== equipe.nom);
          },
          error => console.error(error)
        );
    }
  }


  updateTeam() {
    if (!this.selectedEquipe) {
      console.error('No team selected');
      return;
    }

    this.teamService.updateTeam(this.selectedEquipe.nom, this.newTeamName).subscribe(
      response => {
        console.log(response.message);
        // Update the team name in the this.equipes array
        const updatedTeam = { ...this.selectedEquipe, nom: this.newTeamName };
        this.equipes = this.equipes.map((item: any) => (item.nom === this.selectedEquipe.nom ? updatedTeam : item));
      },
      error => {
        console.error(error);
      }
    );
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