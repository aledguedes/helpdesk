import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Cliente } from '../models/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http : HttpClient) { }

  findAll() {
    return this.http.get<Cliente[]>(`${API_CONFIG.baseUrl}/clientes`)
  }

  findById(id : any){
    return this.http.get<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`)
  }

  create(tecnico: Cliente){
    return this.http.post<Cliente>(`${API_CONFIG.baseUrl}/clientes`, tecnico)
  }

  update(tecnico: Cliente){
    return this.http.put<Cliente>(`${API_CONFIG.baseUrl}/clientes/${tecnico.id}`, tecnico)
  }

  delete(id: any){
    return this.http.delete<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`)
  }
}
