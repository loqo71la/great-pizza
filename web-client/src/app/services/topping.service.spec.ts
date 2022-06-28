import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { EMPTY, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ToppingService } from './topping.service';

describe('ToppingService', () => {
  let service: ToppingService;

  const httpMock = jasmine.createSpyObj('Http', ['get', 'post', 'put', 'delete']);
  const toppingUrl = `${environment.api.url}/topping`;
  const limit = environment.api.limit;
  const page = 1;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpMock }
      ]
    });
    service = TestBed.inject(ToppingService);
  });


  it('#getAll should call the Http module to get a pageable Topping', () => {
    const params = { params: { page, limit } };
    const pageable = { currentPage: 1, totalPages: 1, totalItems: 0, items: [] };
    httpMock.get.withArgs(toppingUrl, params).and.returnValue(of(pageable));

    service.getAll();
    expect(service).toBeTruthy();
    expect(httpMock.get).toHaveBeenCalledWith(toppingUrl, params);
  });

  it('#getById should call the Http module to get a Topping by id "22"', () => {
    const topping = { id: 22, name: '', type: '', price: 0, createdDate: '2022-06-23T20:17:44.346Z', modifiedDate: '2022-06-23T20:17:44.346Z' };
    httpMock.get.withArgs(`${toppingUrl}/22`).and.returnValue(of(topping));

    expect(service).toBeTruthy();

    const expectedDate = new Date('2022-06-23T20:17:44.346Z');
    service.getById('22').subscribe(result => {
      expect(result.id).toBe(22);
      expect(result.createdDate).toEqual(expectedDate);
      expect(result.modifiedDate).toEqual(expectedDate);
      expect(httpMock.get).toHaveBeenCalledWith(`${toppingUrl}/22`);
    });
  });

  it('#add should call the Http module to add a new Topping', () => {
    const newTopping = { id: 0, name: 'test', type: '', price: 0 };
    httpMock.post.withArgs(toppingUrl, newTopping).and.returnValue(EMPTY);

    service.add(newTopping);
    expect(service).toBeTruthy();
    expect(httpMock.post).toHaveBeenCalledWith(toppingUrl, newTopping);
  });

  it('#delete should call the Http module to delete a Topping by id "4"', () => {
    httpMock.delete.withArgs(`${toppingUrl}/4`).and.returnValue(EMPTY);

    service.delete(4);
    expect(service).toBeTruthy();
    expect(httpMock.delete).toHaveBeenCalledWith(`${toppingUrl}/4`);
  });

  it('#update should call the Http module to update a Topping by id "62"', () => {
    const topping = { id: 62, name: 'test', type: '', price: 0 };
    httpMock.put.withArgs(`${toppingUrl}/62`, topping).and.returnValue(EMPTY);

    service.update(topping);
    expect(service).toBeTruthy();
    expect(httpMock.put).toHaveBeenCalledWith(`${toppingUrl}/62`, topping);
  });
});
