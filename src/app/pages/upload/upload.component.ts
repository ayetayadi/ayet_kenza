import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(private bannerService: BannerService) {}

  onSubmit(form: HTMLFormElement) {
    const formData = new FormData(form);
    this.bannerService.createBannerWithImageUpload(formData).subscribe(
      (res) => console.log(res),
      (err) => console.error(err)
    );
  }
  
  ngOnInit(): void {
  }

}
