import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { PizzaService } from './pizza.service';

describe('PizzaService', () => {
  let service: PizzaService;

  const authServiceMock = jasmine.createSpyObj('AuthService', ['getUserListener']);
  const httpMock = jasmine.createSpyObj('Http', ['get', 'post', 'put', 'delete']);
  const pizzaUrl = `${environment.api.url}/pizza`;
  const sort = environment.sorters.pizzas[0].id;
  const limit = environment.api.limit;
  const page = 1;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    });
    authServiceMock.getUserListener.and.returnValue(new BehaviorSubject(null));
    service = TestBed.inject(PizzaService);
  });

  it('#getAll should call the Http module to get a pageable Pizza', () => {
    const params = { params: { page, limit, sort } };
    const pageable = { currentPage: 1, totalPages: 1, totalItems: 0, items: [] };
    httpMock.get.withArgs(pizzaUrl, params).and.returnValue(of(pageable));

    service.getAll(1, limit, sort);
    expect(service).toBeTruthy();
    expect(httpMock.get).toHaveBeenCalledWith(pizzaUrl, params);
  });

  it('#getById should call the Http module to get a Pizza by id "3"', () => {
    const pizza = { id: '3', name: '', size: '', type: '', price: 0, updatedAt: '2022-06-23T20:17:44.346Z' };
    httpMock.get.withArgs(`${pizzaUrl}/3`).and.returnValue(of(pizza));

    expect(service).toBeTruthy();

    const expectedDate = new Date('2022-06-23T20:17:44.346Z');
    service.getById('3').subscribe(result => {
      expect(result.id).toBe('3');
      expect(result.modifiedDate).toEqual(expectedDate);
      expect(httpMock.get).toHaveBeenCalledWith(`${pizzaUrl}/3`);
    });
  });

  it('#add should call the Http module to add a new Pizza', () => {
    const newPizza = { id: '', name: 'test', size: '', type: '', price: 0, rating: 0, toppings: undefined };
    httpMock.post.withArgs(pizzaUrl, newPizza, jasmine.any(Object)).and.returnValue(EMPTY);

    service.add(newPizza);
    expect(service).toBeTruthy();
    expect(httpMock.post).toHaveBeenCalledWith(pizzaUrl, newPizza, jasmine.any(Object));
  });

  it('#delete should call the Http module to delete a Pizza by id "21"', () => {
    httpMock.delete.withArgs(`${pizzaUrl}/21`, jasmine.any(Object)).and.returnValue(EMPTY);

    service.delete("21");
    expect(service).toBeTruthy();
    expect(httpMock.delete).toHaveBeenCalledWith(`${pizzaUrl}/21`, jasmine.any(Object));
  });

  it('#update should call the Http module to update a Pizza by id "5"', () => {
    const pizza = { id: '5', name: 'test', size: '', type: '', price: 0, rating: 0, toppings: undefined };
    httpMock.put.withArgs(`${pizzaUrl}/5`, pizza, jasmine.any(Object)).and.returnValue(EMPTY);

    service.update(pizza);
    expect(service).toBeTruthy();
    expect(httpMock.put).toHaveBeenCalledWith(`${pizzaUrl}/5`, pizza, jasmine.any(Object));
  });

  it('#assing should call the Http module to assing Topping ids [3, 4, 5]', () => {
    const toppings = ['3', '4', '5'];
    httpMock.post.withArgs(`${pizzaUrl}/1/assign`, { toppings }, jasmine.any(Object)).and.returnValue(EMPTY);

    service.assign('1', toppings);
    expect(service).toBeTruthy();
    expect(httpMock.post).toHaveBeenCalledWith(`${pizzaUrl}/1/assign`, { toppings }, jasmine.any(Object));
  });
});
