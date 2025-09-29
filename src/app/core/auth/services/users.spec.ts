/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { UsersApi } from './users-api';

describe('UsersApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersApi],
    });
  });

  it('should ...', inject([UsersApi], (service: UsersApi) => {
    expect(service).toBeTruthy();
  }));
});
