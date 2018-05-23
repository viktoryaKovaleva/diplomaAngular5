import { Component, OnInit } from '@angular/core';
import { SessionService } from '../service/session.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-welcome-card',
  templateUrl: './welcome-card.component.html',
  styleUrls: ['./welcome-card.component.css']
})
export class WelcomeCardComponent implements OnInit {

  constructor(private sessionService: SessionService,
    private userService: UserService) { }

  ngOnInit() {
  }

  public isLoggedIn() {
    return this.userService.isUserSignedIn();
  }

  public signIn() {
    this.userService.signIn();
  }
}
