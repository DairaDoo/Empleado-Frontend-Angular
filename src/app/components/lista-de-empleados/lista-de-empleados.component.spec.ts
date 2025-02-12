import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeEmpleadosComponent } from './lista-de-empleados.component';

describe('ListaDeEmpleadosComponent', () => {
  let component: ListaDeEmpleadosComponent;
  let fixture: ComponentFixture<ListaDeEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDeEmpleadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDeEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
