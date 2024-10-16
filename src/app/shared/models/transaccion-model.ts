import { TipoTransaccionModel } from "./tipo-transaccion-model";
import { UserModel } from "./user-model";

export interface TransaccionModel {
    id:number;
    fecha:Date;
    monto:number;
    motivo:string;
    type_id:number;
    type?:TipoTransaccionModel;
    user_id:number;
    user:UserModel;

}
