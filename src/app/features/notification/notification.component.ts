import { Component, inject, OnInit } from '@angular/core';
import { NotificationsService } from '../../core/services/notifications/notifications.service';
import { Notification } from '../../core/interface/notifications.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [DatePipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  notificationList: Notification[] = [];
  private readonly notificationsService = inject(NotificationsService);

  ngOnInit(): void {
    this.allNotifications();
  }

  allNotifications(): void {
    this.notificationsService.getNotifications().subscribe({
      next: (res) => {
        console.log(res.data.notifications);
        this.notificationList = res.data.notifications;
      },
    });
  }
  markAllRead():void{
    this.notificationsService.readAllNotifications().subscribe({
      next:(res)=>{console.log(res.data.notifications);
      }
    })
  }
  markNotificationRead(id:string):void{
    this.notificationsService.markNotificationsAsRead(id).subscribe({
      next:(res)=>{console.log(res.data.notifications);
      }
    })
  }
}
