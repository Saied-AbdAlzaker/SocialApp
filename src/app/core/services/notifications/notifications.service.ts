import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Notifications } from '../../interface/notifications.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private readonly httpClient = inject(HttpClient);

  getNotifications(): Observable<Notifications> {
    return this.httpClient.get<Notifications>(
      `${environment.baseUrl}/notifications?unread=false&page=1&limit=10`,
    );
  }
  getUnreadNotifications(): Observable<Notifications> {
    return this.httpClient.get<Notifications>(
      `${environment.baseUrl}/notifications/unread-count`,
    );
  }
  readAllNotifications(): Observable<Notifications> {
    return this.httpClient.patch<Notifications>(
      `${environment.baseUrl}/notifications/read-all`,
      {},
    );
  }
  markNotificationsAsRead(notificationId: string): Observable<Notifications> {
    return this.httpClient.patch<Notifications>(
      `${environment.baseUrl}/notifications/${notificationId}/read`,
      {},
    );
  }
}
