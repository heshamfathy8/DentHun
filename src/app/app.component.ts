import { Component, OnInit, inject, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessagingService } from './services/messaging.service';
import { Messaging, onMessage } from '@angular/fire/messaging';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Toast } from 'primeng/toast';
import { getToken } from 'firebase/messaging';
import { environment } from '../environments/environment';
import { AuthService } from './core/services/auth.service';
import { SupplierService } from '@operations/services/supplier.service';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,RouterModule ,Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('ar');
    this.translate.use('ar');
  }

  title = 'angular-test';

  private messaging = inject(Messaging);
  private ngZone = inject(NgZone);
  private supplierService = inject(SupplierService);

  ngOnInit() {
    this.checkNotificationPermission();

    // استماع للرسائل أثناء عمل التطبيق (Foreground)
    onMessage(this.messaging, (payload) => {
      this.ngZone.run(() => {
        console.log('📨 Message received:', payload);
        alert(`${payload.notification?.title}: ${payload.notification?.body}`);
      });
    });

    // تسجيل الـ service worker (مهم جداً)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registered:', registration.scope);
        })
        .catch((err) => console.error('❌ SW registration failed:', err));
    }
  }

  // ✅ يتأكد من الإذن قبل طلبه
  async checkNotificationPermission() {
    const permission = Notification.permission;
    console.log('🔍 Current permission:', permission);

    if (permission === 'granted') {
      // خلاص عندك الإذن، هات الـ token
      await this.getToken();
    } else if (permission === 'default') {
      // أول مرة، أو المستخدم تجاهل الطلب
      await this.requestPermission();
    } else {
      console.warn('🚫 المستخدم رفض الإذن. لازم يفعّله يدويًا من إعدادات المتصفح.');
    }
  }

  // ✅ طلب الإذن لأول مرة
  async requestPermission() {
    try {
      console.log('🟡 Requesting permission...');
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        console.log('✅ Permission granted');
        await this.getToken();
      } else {
        console.warn('🚫 Permission denied:', permission);
      }
    } catch (err) {
      console.error('❌ Error requesting permission:', err);
    }
  }

  // ✅ جلب الـ FCM Token
  async getToken() {
    try {
      const token = await getToken(this.messaging, {
        vapidKey: environment.vapidKey,
      });

      if (token) {
        console.log('🎯 FCM Token:', token);
        this.sendToken(token)
      } else {
        console.warn('⚠️ No token received.');
      }
    } catch (err) {
      console.error('❌ Error getting token:', err);
    }
  }

  // ✅ send token to backend
  sendToken(token){
    let data = {
      fcm_token: token,
      device: "web"
    }

    this.supplierService.sendFCMToken(data).subscribe(res=>{console.log('tiken sent successfully');
    })
  }
}
