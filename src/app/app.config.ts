import {  importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideNativeDateAdapter } from '@angular/material/core';
import { routes } from './app.routes';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { FormlyInputModule} from '@ngx-formly/primeng/input';
import { MultiSelectModule } from 'primeng/multiselect';
import { HttpClient, provideHttpClient, withFetch, withInterceptorsFromDi ,withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CustomFileTypeComponent } from './shared/components/formly-customTypes/custom-file-type/custom-file-type.component';
import { FormlyPrimengMultiselectComponent } from './shared/components/formly-customTypes/formly-primeng-multiselect/formly-primeng-multiselect.component';
import { RepeatTypeComponent } from './shared/components/formly-customTypes/repeat-type/repeat-type.component';
import { FloatLabelLargeInputComponent } from '@shared/components/formly-customTypes/floatlabel-large-input.type';
import { FloatlabelDatepickerTypeComponent } from '@shared/components/formly-customTypes/floatlabel-datepicker.type';
import { ConfirmationService, MessageService } from 'primeng/api';
import { errorInterceptor } from '../../error.interceptor';
import { Intercepter } from './core/interceptors/interceptor';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { environment } from 'environments/environment.prod';

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
const AllRoutes = [...routes]

export const appConfig: any = {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideMessaging(() => getMessaging()),
  importProvidersFrom(
    BrowserAnimationsModule,
    ReactiveFormsModule,
   FormlyModule.forRoot({
        types: [
          { name: 'custom-file', component: CustomFileTypeComponent },
          { name: 'multiselect', component: FormlyPrimengMultiselectComponent },
          { name: 'repeat', component: RepeatTypeComponent },
          { name: 'floatlabel-large', component: FloatLabelLargeInputComponent },
          { name: 'floatlabel-datepicker', component: FloatlabelDatepickerTypeComponent },
        ],
        validators: [
          // لو عندك validators custom ضيفها هنا
        ],
        wrappers: [
          // wrappers custom لو موجودة
        ]
      }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormlyPrimeNGModule,
    FormlyInputModule,
    MultiSelectModule,

  ),
  
 
 
  MessageService,
  ConfirmationService,
  { provide: HTTP_INTERCEPTORS, useClass: Intercepter, multi: true },

  // HttpClient (حط كل الإضافات في provideHttpClient واحد)
  provideHttpClient(
    withInterceptors([errorInterceptor]),
    withInterceptorsFromDi(),
    withFetch()
  ),

  provideNativeDateAdapter(),
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideAnimationsAsync(), // ✅ مرة واحدة

  provideRouter(AllRoutes, withInMemoryScrolling({
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  }), withEnabledBlockingInitialNavigation()),

  importProvidersFrom(
     
    ),

  providePrimeNG({
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.app-dark'
      }
    }
  })
],
imports: [
  CustomFileTypeComponent
]

};


