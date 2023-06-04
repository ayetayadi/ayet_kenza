import { Component, OnInit } from '@angular/core';
import { PaiementService } from 'src/app/services/paiement.service';

@Component({
  selector: 'app-offresadmin',
  templateUrl: './offresadmin.component.html',
  styleUrls: ['./offresadmin.component.css']
})
export class OffresadminComponent implements OnInit {

  nomPack: string ='';
  description: string ='';
  periodePack: string ='';
  prixPack: number;

  offres: any[] = [];
  itemsPerPage = 5;
  currentPage = 1;
  searchText = '';

  message: string ='';

  selectedOffre: any;
  constructor(private paiementService: PaiementService) {}

  ngOnInit(): void {
    this.paiementService.getOffres().subscribe(
      (response) => {
        console.log('Offres récupérées avec succès', response);
        this.offres = response.offres;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des offres', error);
      }
    );
  }

  getNomPack(nomPack: string): string {
      console.log(nomPack);
      this.nomPack = nomPack;
      return nomPack;
    }
  
    useNomPack() {
      console.log(this.getNomPack(this.nomPack));
    }

deleteOffre(offre: any){
  if (confirm(`Êtes-vous sûr de vouloir supprimer ${offre.nomPack}?`)) {
  this.paiementService.deleteOffre(offre.nomPack).subscribe(
    (response) => {
      console.log('Offre est supprimée');
      alert("Offre est supprimée!");
      this.offres = this.offres.filter((item: any) => item.nomPack !== offre.nomPack);
    },
    (error) => {
      console.error('Une erreur s\'est produite lors de la suppression de l\'offre', error);
      alert('Une erreur s\'est produite lors de la suppression de l\'offre')
    }
  )
  }
}
  createOffre() {
    const offreData = {
      nomPack: this.nomPack,
      description: this.description,
      periodePack: this.periodePack,
      prixPack: this.prixPack
    };
  
    this.paiementService.createOffre(offreData).subscribe(
      (response) => {
        this.message = response.message;
        console.log('Offre créée avec succès', response);
        alert("Offre créee avec succés!")
          
        const newOffre = {
          nomPack: offreData.nomPack,
          description: offreData.description,
          periodePack: offreData.periodePack,
          prixPack: offreData.prixPack
        };

        this.offres.push(newOffre);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la création de l\'offre', error);
        alert('Une erreur s\'est produite lors de la création de l\'offre')
      }
    );
  }
  
  openEditModal(offre: any) {
    this.nomPack = offre.nomPack;
    this.description = offre.description;
    this.periodePack = offre.periodePack;
    this.prixPack = offre.prixPack;
}


 


  editOffre(nomOffre: string) {
    const offreData = {
      nomPack: this.nomPack,
      description: this.description,
      periodePack: this.periodePack,
      prixPack: this.prixPack
    };
  
    this.paiementService.updateOffre(nomOffre, offreData).subscribe(
      (response) => {
        console.log(`Offre avec nom ${nomOffre} est mise à jour avec succès`, response);
        alert(`Offre avec nom ${nomOffre} est mise à jour avec succès`)
        const updatedOffreIndex = this.offres.findIndex(offre => offre.nomPack === this.getNomPack(this.nomPack));
        if (updatedOffreIndex !== -1) {
          this.offres[updatedOffreIndex].nomPack = offreData.nomPack;
          this.offres[updatedOffreIndex].description = offreData.description;
          this.offres[updatedOffreIndex].periodePack = offreData.periodePack;
          this.offres[updatedOffreIndex].prixPack = offreData.prixPack;
        }
      },
      (error) => {
        console.error(`Une erreur s'est produite lors de la mise à jour de l'offre avec nom ${nomOffre}`, error);
      }
    );
  }
  
  
}
