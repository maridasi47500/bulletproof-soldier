import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) { }

  async register( pass:any) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, pass.email, pass.password);
      return user;
    } catch (e) {
      return null;
    }
  }

  async login( pass:any ) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, pass.email, pass.password);
      return user;
    } catch (e) {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }
}
