import { Injectable, inject } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private messaging = inject(Messaging);
  currentMessage = new BehaviorSubject<any>(null);

  constructor() {
    this.listen();
  }

  async requestPermission() {
    try {
      console.log('🔔 Requesting permission...');
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        const token = await getToken(this.messaging, {
          vapidKey: environment.vapidKey,
        });
        console.log('✅ FCM Token:', token);
        alert('✅ Notification permission granted.\nToken logged in console.');
      } else {
        console.warn('🚫 Notification permission not granted:', permission);
      }
    } catch (error) {
      console.error('❌ Error during permission/token:', error);
    }
  }

  listen() {
    onMessage(this.messaging, (payload) => {
      console.log('📩 Background/Foreground message:', payload);
      this.currentMessage.next(payload);
    });
  }
}
