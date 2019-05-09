import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryDetailComponent } from './secretary-detail.component';

describe('SecretaryDetailComponent', () => {
  let component: SecretaryDetailComponent;
  let fixture: ComponentFixture<SecretaryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretaryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
