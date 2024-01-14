import { Component, EnvironmentInjector, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonCol, IonRow, IonButton, IonIcon, IonItem, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, logoGoogle, walletOutline } from 'ionicons/icons';
import { AuthenticationService } from '../../services/authentication-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonCol, IonRow, IonButton, IonIcon, IonItem, IonLabel],
})
export class LoginPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(
    public router: Router,
    public authService: AuthenticationService
  ) {
    addIcons({ home, logoGoogle, walletOutline });
  }
}
