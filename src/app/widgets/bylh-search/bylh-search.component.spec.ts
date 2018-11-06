import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BylhSearchComponent } from './bylh-search.component';

describe('BylhSearchComponent', () => {
  let component: BylhSearchComponent;
  let fixture: ComponentFixture<BylhSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BylhSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BylhSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
