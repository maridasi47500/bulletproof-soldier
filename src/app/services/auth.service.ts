import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
	  private mylogin: boolean = false;
	    private loginSubject$ = new BehaviorSubject<boolean>(this.mylogin);
	      loginChanged$ = this.loginSubject$.asObservable();
  constructor(private auth: Auth) { }

  async register( pass:any) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, pass.email, pass.password);
      this.mylogin=true;
      this.loginSubject$.next(this.mylogin);
      return user;
    } catch (e:any) {
      this.mylogin=false;
      this.loginSubject$.next(this.mylogin);
      return e.message;
    }
  }

  async login( pass:any ) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, pass.email, pass.password);
      this.mylogin=true;
      this.loginSubject$.next(this.mylogin);
      return user;
    } catch (e:any) {
      this.mylogin=false;
      this.loginSubject$.next(this.mylogin);
      return e.message;
    }
  }

  logout() {
      this.mylogin=false;
      this.loginSubject$.next(this.mylogin);
    return signOut(this.auth);
  }
}
