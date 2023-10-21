import { TestBed } from '@angular/core/testing';

import { ProjectsTreeService } from './projects-tree.service';

describe('ProjectsTreeService', () => {
  let service: ProjectsTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
