import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CreateTransaccionDTO } from '@shared/dto/create-transaccion-dto.';
import { TipoTransaccionModel } from '@shared/models/tipo-transaccion-model';
import { TransaccionModel } from '@shared/models/transaccion-model';
import { TipoTransaccionService } from '@shared/services/tipo-transaccion.service';
import { TransaccionService } from '@shared/services/transaccion.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{

  private formBuilder = inject(FormBuilder);

  private transaccionService =  inject(TransaccionService);
  private tipoTransaccionService = inject(TipoTransaccionService);

  formTransaccion:FormGroup | null = null;

  

  tipoTransacciones:TipoTransaccionModel[] = []
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

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    const dataSub = forkJoin([
      this.transaccionService.getAll(),
      this.tipoTransaccionService.getAll()
    ]).subscribe({
      next:([transacciones,tipoTransacciones]) => {
        this.transacciones = [...transacciones];
        this.tipoTransacciones = [...tipoTransacciones];
      },
      complete(){
        dataSub.unsubscribe()
      }
    })
    
  }

  crearTransaccion(){
  
    this.formTransaccion = this.formBuilder.group({
      monto:new FormControl(null,[Validators.required]),
      fecha:new FormControl(null,[Validators.required]),
      motivo:new FormControl(null,[Validators.required]),
      type_id:new FormControl(null,[Validators.required])
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
    const nuevaTransaccion:CreateTransaccionDTO = value as CreateTransaccionDTO;

    const saveSub = this.transaccionService.create(nuevaTransaccion).subscribe({
      next:(transaccion) => {
        this.transacciones = [...this.transacciones,transaccion];
      },
      complete:()=>{
        saveSub.unsubscribe
      },
    })

    this.formTransaccion = null;
    
  }

  eliminarTransaccion(id:number){
    const trasacciones = [...this.transacciones];
    trasacciones.splice(id);
    this.transacciones = trasacciones;
  }

  actualizarTrasaccion(index:number,transaccion:TransaccionModel ){

    this.transaccion = transaccion;
    this.indexTransaccion = index;
    this.formTransaccion = this.formBuilder.group({
      monto:new FormControl(null,[Validators.required]),
      fecha:new FormControl(null,[Validators.required]),
      motivo:new FormControl(null,[Validators.required]),
      type_id:new FormControl(null,[Validators.required])
    })
  }
  
}
