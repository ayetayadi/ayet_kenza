import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.css']
})
export class MembresComponent implements OnInit {

  membres: any[] = [];
  teamName: string = '';

  email: string = '';
  team: string = '';
  token: string ='';
  message: string = '';

  constructor(private route: ActivatedRoute,
    private teamService: TeamService) {
  }

  ngOnInit(): void {
    this.teamName = this.route.snapshot.paramMap.get('nom') || '';
    console.log(this.teamName);
    this.getMembers();
  }

  getMembers(): void {
    this.teamService.getMembersByTeam(this.teamName).subscribe(
      data => {
        this.membres = data;
        console.log(`Found ${data.length} members for team "${this.teamName}"`);
      },
      error => console.error(error)
    );
  }

   generateAvatar(email: string) {
    const canvas = document.createElement('canvas');
    canvas.width = 50;
    canvas.height = 50;
  
    const context = canvas.getContext('2d');
    if (context) {
      context.beginPath();
      context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI); 
      context.fillStyle = '#9155FD';
      context.fill();
    
      context.font = '15px Arial'; 
      context.fillStyle = '#ffffff'; 
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(email.charAt(0).toUpperCase(), canvas.width / 2, canvas.height / 2);
    }
  
    return canvas.toDataURL(); 
  }
  
  invite() {
    this.teamService.sendInvitation(this.email, this.teamName)
      .subscribe( response => {
        console.log(`Email de l'annonceur: `+this.email)
        this.message = response.message;
      },
      error => {
        console.error(error);
        this.message = 'An error occurred while sending the invitation.';
      }
  )}

  deleteMember(email: string, teamName: string) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${this.teamName} ?`)) {
      this.teamService.deleteMember(email, teamName)
        .subscribe
          (response => {
            console.log('Team deleted successfully');
            alert('Équipe supprimée avec succès');
           console.log(response)

          },
          error => console.error(error)
        );
    }
  }
}
