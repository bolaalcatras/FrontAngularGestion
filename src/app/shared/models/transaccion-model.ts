import { TipoTransaccionModel } from "./tipo-transaccion-model";

export interface TransaccionModel {
    id:number;
    fecha:Date;
    monto:number;
    motivo:string;
    type_id:number;
    type?:TipoTransaccionModel;

}
