import { Component, OnInit } from '@angular/core';
import { TokenStorageService} from '../../_services/token-storage.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  currentUser: any;

  constructor(private token: TokenStorageService) {
    this.currentUser = this.token.getUser();
  }
  ngOnInit(): void {

    this.isLoggedIn = !!this.token.getToken();

    this.currentUser = this.token.getUser();
    this.username = localStorage.getItem('username')!;


    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.displayName;
    }
  }
  logout(): void {
    this.token.signOut();
    //  window.location.reload();

    window.location.href = '/login';
  }
}
