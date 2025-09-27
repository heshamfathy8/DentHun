import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslatationService } from 'app/translatation.service';
import { AppSidebar } from '../../components/app.sidebar';
import { AppTopbar } from '../../components/app.topbar';
import { AppFooter } from '../../components/app.footer';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss'],
  standalone:true,
  imports : [
    AppSidebar,
    AppFooter,
     AppTopbar
  ]
})
export class LayoutPageComponent implements OnInit {
  currentLang: string;

  constructor(ts: TranslatationService, private router: Router) {
    // this.currentLang = ts.switchLang();
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
