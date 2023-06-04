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
  status: string = '';
  token: string = '';
  message: string = '';

  selectedStatus: string = '';


  itemsPerPage = 5;
  currentPage = 1;
  searchText = '';

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
      .subscribe(response => {
        console.log(`Email de l'annonceur: ` + this.email)
        this.message = response.message;
        const newMember = {
          email: this.email,
          status: response.status
        };

        this.membres.push(newMember);
      },
        error => {
          console.error(error);
        }
      )
  }

  deleteMember(membre: any) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${membre.email} de ${this.teamName}?`)) {
      this.teamService.deleteMember(membre.email, this.teamName)
        .subscribe(
          response => {
            console.log('Membre retiré avec succès');
            alert('Membre retiré avec succès');
            console.log(response);
            const index = this.membres.findIndex(membre => membre.email === this.email);
            this.membres.splice(index, 1);
          },
          error => console.error(error)
        );
    }
  }

  getPaginatedMembres() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    let filteredMembres = this.membres;
    if (this.searchText) {
      const searchTextLower = this.searchText.toLowerCase();
      filteredMembres = filteredMembres.filter(
        membre =>
          membre.email.toLowerCase().includes(searchTextLower)
      );
    }
    if (this.selectedStatus) {
      filteredMembres = filteredMembres.filter(
        membre =>
          this.membres[0].status === this.selectedStatus
      );
    }
    return filteredMembres.slice(start, end);
  }


  getPaginationArray() {
    const totalPages = Math.ceil(this.membres.length / this.itemsPerPage);
    const paginationArray = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationArray.push(i);
    }
    return paginationArray;
  }

  getTotalPages() {
    return Math.ceil(this.membres.length / this.itemsPerPage);
  }
}
