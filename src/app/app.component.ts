import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {  TranslateService } from '@ngx-translate/core';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,RouterModule ,Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-test';
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('ar');
    this.translate.use('ar');
  }
}
