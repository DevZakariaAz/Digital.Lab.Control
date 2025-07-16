import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CivilServantsComponent } from './civil-servants.component';

describe('CivilServantsComponent', () => {
  let component: CivilServantsComponent;
  let fixture: ComponentFixture<CivilServantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CivilServantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CivilServantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
