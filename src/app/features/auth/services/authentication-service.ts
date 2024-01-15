import { Injectable, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Auth, GoogleAuthProvider } from '@angular/fire/auth';
import { signInWithRedirect } from 'firebase/auth';
import { Firestore, addDoc, collection, doc, getFirestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  auth = inject(Auth);
  firestore: Firestore = inject(Firestore); // inject Cloud Firestore

  constructor(
    public router: Router,
  ) {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.setUserData(<User>user);
      } else {
        localStorage.setItem('user', null || '{}');
      }
    });
  }
  // Sign in with Gmail
  async signWithGoogle() {
    await signInWithRedirect(this.auth, new GoogleAuthProvider());
  }

  async setUserData(user: User) {
    const userRef = doc(this.firestore, `users/${user.uid}`)
    setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    })
  }

  getUserData = (): User => {
    const currentUser = localStorage.getItem('user');
    return currentUser && JSON.parse(currentUser);
  }

  signOut() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
