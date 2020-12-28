import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditSalePage } from './edit-sale.page';

describe('EditSalePage', () => {
  let component: EditSalePage;
  let fixture: ComponentFixture<EditSalePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSalePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
