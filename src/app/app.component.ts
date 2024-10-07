import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TransaccionModel } from '@shared/models/transaccion-model';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private formBuilder = inject(FormBuilder);
  formTransaccion:FormGroup | null = null;


  transacciones:TransaccionModel []= [
    // {
    //   monto: 2000,
    //   motivo: 'regalo'
    // },
    // {
    //   monto: 3000,
    //   motivo: 'deuda'
    // }
  ]

  transaccion:TransaccionModel | null = null;
  indexTransaccion:number | null = null

  crearTransaccion(){
  
    this.formTransaccion = this.formBuilder.group({
      monto:new FormControl(0,[Validators.required]),
      motivo:new FormControl('',[Validators.required])
    })
  }

  cancelarTransaccion(){
    this.formTransaccion = null
  }

  guardarTransaccion(){
    if(!this.formTransaccion||this.formTransaccion.invalid) {
    alert('llena todos los campos')
    return
    }
    const {value} = this.formTransaccion;
    const nuevaTransaccion:TransaccionModel = value as TransaccionModel;

    if(this.indexTransaccion!==null){
    let transacciones = [...this.transacciones];
      transacciones[this.indexTransaccion] = nuevaTransaccion
      this.transacciones = [...transacciones]
      this.formTransaccion = null;
      this.indexTransaccion = null;
      return
    } 
    this.transacciones = [...this.transacciones,nuevaTransaccion]
    this.formTransaccion = null;
    
  }

  eliminarTransaccion(index:number){
    const trasacciones = [...this.transacciones];
    trasacciones.splice(index,1);
    this.transacciones = trasacciones;
  }

  actualizarTrasaccion(index:number,transaccion:TransaccionModel ){

    this.transaccion = transaccion;
    this.indexTransaccion = index;
    this.formTransaccion = this.formBuilder.group({
      monto:new FormControl(transaccion.monto,[Validators.required]),
      motivo:new FormControl(transaccion.motivo,[Validators.required])
    })
  }
  
}
