import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  username;
  loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
  constructor(private router: Router) {}
  ngOnInit(): any {
    if (this.loggedIn === null) {
      this.router.navigate(['index']);
    } else {
      this.username = this.loggedIn.admin.username;
    }
  }
  logout(): any {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['index']);
  }
}
