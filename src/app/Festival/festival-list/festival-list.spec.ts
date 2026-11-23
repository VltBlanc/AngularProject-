import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FestivalList } from './festival-list';
import { provideRouter } from '@angular/router';

describe('FestivalList', () => {
  let component: FestivalList;
  let fixture: ComponentFixture<FestivalList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivalList],
      providers: [provideRouter([])],

    }).compileComponents();

    fixture = TestBed.createComponent(FestivalList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
