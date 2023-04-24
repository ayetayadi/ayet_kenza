import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private elementRef: ElementRef, private authService: AuthService, private router: Router) {
    if (this.authService.isAnnonceurLoggedIn() != false) {
      this.router.navigate(['/dashboard']);
    }
    else if (this.authService.isAdminLoggedIn() != false) {
      this.router.navigate(['/dashboard']);
    }
   }

  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }

}
