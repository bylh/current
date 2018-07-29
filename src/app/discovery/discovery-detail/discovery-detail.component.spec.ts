import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryDetailComponent } from './discovery-detail.component';

describe('DiscoveryDetailComponent', () => {
  let component: DiscoveryDetailComponent;
  let fixture: ComponentFixture<DiscoveryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoveryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoveryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
