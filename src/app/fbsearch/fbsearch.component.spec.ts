import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbsearchComponent } from './fbsearch.component';

describe('FbsearchComponent', () => {
  let component: FbsearchComponent;
  let fixture: ComponentFixture<FbsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
