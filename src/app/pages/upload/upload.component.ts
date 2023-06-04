import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  nom_campagne: string = '';

  banner = {
    nom_campagne: '',
    nom: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    title: '',
    subtitle: '',
    placeholder: '',
    plateformeType: '',
    callToAction: '',
    image: File
  };


  fileToUpload: File;

  hasValue = false;

  constructor(private router: Router, private route: ActivatedRoute, private bannerService: BannerService) { }

  ngOnInit(): void {
    this.nom_campagne = this.route.snapshot.paramMap.get('nom_campagne') || '';
    console.log(this.nom_campagne);
    this.banner.nom_campagne = this.nom_campagne;
    console.log(this.banner.nom_campagne);
    this.onSubmit();
    this.getNomCampagne();
  }



  getNomCampagne() {
    console.log(this.banner.nom_campagne);
    return this.banner.nom_campagne;
  }

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
  }


  onSubmit() {
    const formData = new FormData();
    formData.append('nom_campagne', this.banner.nom_campagne);
    formData.append('nom', this.banner.nom);
    formData.append('description', this.banner.description);
    formData.append('startDate', this.banner.startDate);
    formData.append('endDate', this.banner.endDate);
    formData.append('startTime', this.banner.startTime);
    formData.append('endTime', this.banner.endTime);
    formData.append('title', this.banner.title);
    formData.append('subtitle', this.banner.subtitle);
    formData.append('placeholder', this.banner.placeholder);
    formData.append('plateformeType', this.banner.plateformeType);
    formData.append('callToAction', this.banner.callToAction);
    formData.append('image', this.fileToUpload);

    this.bannerService.createBannerWithImageUpload(this.nom_campagne, formData).subscribe(
      () => {
        console.log('Banner created successfully');
        alert('Votre bannière est crééé!!');
        this.router.navigate([`/bannières/${this.getNomCampagne()}`]);

      },
      (err) => {
        console.error(err);
      }
    );
  }

  onDateChange() {
    this.hasValue = true;
  }

}
