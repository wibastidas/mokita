import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddtransactionsPage } from './addtransactions.page';

describe('AddtransactionsPage', () => {
  let component: AddtransactionsPage;
  let fixture: ComponentFixture<AddtransactionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtransactionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddtransactionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
