import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {
  private ufUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
  private municipiosUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios';

  constructor(private http: HttpClient) {}

  getUFs(): Observable<any> {
    return this.http.get<any>(this.ufUrl);
  }

  getMunicipios(uf: string): Observable<any> {
    return this.http.get<any>(this.municipiosUrl.replace('{UF}', uf));
  }
}
