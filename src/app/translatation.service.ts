import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatationService {


  
  constructor(private translate: TranslateService) {
  translate.setDefaultLang('ar');
  translate.use('ar');
}

switchLang(lang: string) {
  this.translate.use(lang);
}
}
