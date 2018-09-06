import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'nb-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbLoginComponent implements OnInit {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  rememberMe = false;

  constructor(
      protected cd: ChangeDetectorRef,
      private router: Router,
    ) {
  }

  ngOnInit(){}
  login(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.submitted = false;
    const redirect = '/pages';
    if (redirect) {
      setTimeout(() => {
        return this.router.navigateByUrl(redirect);
      }, this.redirectDelay);
    }
    this.cd.detectChanges();
    
  }
}