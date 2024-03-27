import { Injectable } from '@angular/core';
import { BASE_URL } from './service.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LocationInformationService {
  constructor(private http: HttpClient) {}

  getDepartments() {
    return this.http.get(`${BASE_URL}/departamentos`);
  }

  getProvinciasByDepartamento(id: number) {
    return this.http.get(`${BASE_URL}/departamentos/${id}/provincias`);
  }

  getDistritosByProvincia(id: number) {
    return this.http.get(`${BASE_URL}/provincias/${id}/distritos`);
  }
}
