import { Component,OnInit,OnDestroy } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	  loginButtonText:string;

	    loginChangedSubscription: Subscription;
	myuser:any=null;
  constructor(private auth: Auth, private authService: AuthService) {
 this.myuser= this.auth.currentUser;
  }
    ngOnInit() {
	        this.loginChangedSubscription = this.authService.loginChanged$.subscribe((loginValue: any)=>{
			      this.myuser=loginValue;
				        })
					  }

					    ngOnDestroy(): void {
						        if (this.loginChangedSubscription) {
								      this.loginChangedSubscription.unsubscribe();
								          }
									    }
}
