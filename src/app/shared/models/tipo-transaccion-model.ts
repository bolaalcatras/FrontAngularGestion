import { TransaccionModel } from "./transaccion-model";

export interface TipoTransaccionModel {
    id:number;
    tipoTransaccion:string;
    transaccion?:TransaccionModel;
}
