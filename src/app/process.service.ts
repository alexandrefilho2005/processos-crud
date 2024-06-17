import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Process } from './process.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  public apiUrl = 'http://localhost:8080/api/processos'; // URL do backend

  constructor(private http: HttpClient) {}

  getProcesses(page: number, size: number): Observable<Page<Process>> {
    return this.http.get<Page<Process>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getProcess(id: number): Observable<Process> {
    return this.http.get<Process>(`${this.apiUrl}/${id}`);
  }

  createProcess(process: FormData): Observable<Process> {
    return this.http.post<Process>(this.apiUrl, process);
  }

  updateProcess(id: number, process: FormData): Observable<Process> {
    return this.http.put<Process>(`${this.apiUrl}/${id}`, process);
  }

  deleteProcess(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  markAsViewed(id: number): Observable<Process> {
    return this.http.patch<Process>(`${this.apiUrl}/${id}/visualizar`, {});
  }

  downloadDocument(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/documento`, { responseType: 'blob' });
  }
}

interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
