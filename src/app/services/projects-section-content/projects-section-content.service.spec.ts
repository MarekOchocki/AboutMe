import { TestBed } from '@angular/core/testing';

import { ProjectsSectionContentService } from './projects-section-content.service';

describe('ProjectsSectionContentService', () => {
  let service: ProjectsSectionContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsSectionContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
