/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { UsersApi } from './users-api';
import { MessageService } from 'primeng/api';

describe('UsersApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersApi, MessageService],
    });
  });

  it('should ...', inject([UsersApi], (service: UsersApi) => {
    expect(service).toBeTruthy();
  }));
});
