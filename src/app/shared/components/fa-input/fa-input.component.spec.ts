import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FaInputComponent } from './fa-input.component';

describe('FaInputComponent', () => {
  let component: FaInputComponent;
  let fixture: ComponentFixture<FaInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaInputComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
