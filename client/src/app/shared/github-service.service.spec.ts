/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GithubServiceService } from './github-service.service';

describe('GithubServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubServiceService]
    });
  });

  it('should ...', inject([GithubServiceService], (service: GithubServiceService) => {
    expect(service).toBeTruthy();
  }));
});
