import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MiseAJourMotDePassePage } from './mise-ajour-mot-de-passe.page';

describe('MiseAJourMotDePassePage', () => {
  let component: MiseAJourMotDePassePage;
  let fixture: ComponentFixture<MiseAJourMotDePassePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MiseAJourMotDePassePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MiseAJourMotDePassePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
