/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { NotificationPush } from './notification-push';

describe('Service: Notification', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationPush],
    });
  });

  it('should ...', inject([NotificationPush], (service: NotificationPush) => {
    expect(service).toBeTruthy();
  }));
});
