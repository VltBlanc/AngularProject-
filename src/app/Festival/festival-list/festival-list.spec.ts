import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FestivalList } from './festival-list';

describe('FestivalList', () => {
  let component: FestivalList;
  let fixture: ComponentFixture<FestivalList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivalList],
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
