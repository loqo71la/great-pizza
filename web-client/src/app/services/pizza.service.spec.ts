import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { EMPTY, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { PizzaService } from './pizza.service';

describe('PizzaService', () => {
  let service: PizzaService;

  const httpMock = jasmine.createSpyObj('Http', ['get', 'post', 'put', 'delete']);
  const pizzaUrl = `${environment.api.url}/pizza`;
  const limit = environment.api.limit;
  const page = 1;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpMock }
      ]
    });
    service = TestBed.inject(PizzaService);
  });

  it('#getAll should call the Http module to get a pageable Pizza', () => {
    const params = { params: { page, limit } };
    httpMock.get.withArgs(pizzaUrl, params).and.returnValue(EMPTY);

    service.getAll();
    expect(service).toBeTruthy();
    expect(httpMock.get).toHaveBeenCalledWith(pizzaUrl, params);
  });

  it('#getById should call the Http module to get a Pizza by id "3"', () => {
    httpMock.get.withArgs(`${pizzaUrl}/3`).and.returnValue(EMPTY);

    service.getById('3');
    expect(service).toBeTruthy();
    expect(httpMock.get).toHaveBeenCalledWith(`${pizzaUrl}/3`);
  });

  it('#add should call the Http module to add a new Pizza', () => {
    const newPizza = { id: 0, name: 'test', size: '', type: '', price: 0, toppings: undefined };
    httpMock.post.withArgs(pizzaUrl, newPizza).and.returnValue(EMPTY);

    service.add(newPizza);
    expect(service).toBeTruthy();
    expect(httpMock.post).toHaveBeenCalledWith(pizzaUrl, newPizza);
  });

  it('#delete should call the Http module to delete a Pizza by id "21"', () => {
    httpMock.delete.withArgs(`${pizzaUrl}/21`).and.returnValue(EMPTY);

    service.delete(21);
    expect(service).toBeTruthy();
    expect(httpMock.delete).toHaveBeenCalledWith(`${pizzaUrl}/21`);
  });

  it('#update should call the Http module to update a Pizza by id "5"', () => {
    const pizza = { id: 5, name: 'test', size: '', type: '', price: 0, toppings: undefined };
    httpMock.put.withArgs(`${pizzaUrl}/5`, pizza).and.returnValue(EMPTY);

    service.update(pizza);
    expect(service).toBeTruthy();
    expect(httpMock.put).toHaveBeenCalledWith(`${pizzaUrl}/5`, pizza);
  });

  it('#assing should call the Http module to assing Topping ids [3, 4, 5]', () => {
    const ids = [3, 4, 5];
    httpMock.post.withArgs(`${pizzaUrl}/1/topping/assign`, { ids }).and.returnValue(EMPTY);

    service.assign(1, ids);
    expect(service).toBeTruthy();
    expect(httpMock.post).toHaveBeenCalledWith(`${pizzaUrl}/1/topping/assign`, { ids });
  });
});
