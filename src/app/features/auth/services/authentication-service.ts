import { Injectable, inject } from '@angular/core';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private auth: Auth = inject(Auth);
  constructor() { }
  // Sign in using a popup.
  async signWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);

    const user = result.user;
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    console.log(user);
    console.log(token);
  }
}
