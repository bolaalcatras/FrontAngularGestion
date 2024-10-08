import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { CreateTransaccionDTO } from '@shared/dto/create-transaccion-dto.';
import { TipoTransaccionModel } from '@shared/models/tipo-transaccion-model';
import { TransaccionModel } from '@shared/models/transaccion-model';

const {API_URL} = environment;
 
@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  private http = inject(HttpClient);

  URL:string = `${API_URL}/transaccion`;

  constructor() { 
  }

  getAll(){
    return this.http.get<TransaccionModel[]>(this.URL);
  }

  create(data:CreateTransaccionDTO){
    return this.http.post<TransaccionModel>(this.URL,data)
  }

  delete(id:CreateTransaccionDTO){
    return this.http.delete<TransaccionModel>(`${this.URL}/${id}`)
  }



}
