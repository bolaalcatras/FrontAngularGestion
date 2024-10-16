import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { TipoTransaccionModel } from '@shared/models/tipo-transaccion-model';

@Injectable({
  providedIn: 'root'
})
export class TipoTransaccionService {

  private http = inject(HttpClient);

  URL:string = `type`;

  constructor() { }

  getAll(){
    return this.http.get<TipoTransaccionModel[]>(this.URL)
  }
}
