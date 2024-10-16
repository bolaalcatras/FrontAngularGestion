  import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateTransaccionDTO } from '@shared/dto/create-transaccion-dto';
import { UpdateTransaccionDTO } from '@shared/dto/update-transaccion.dto';
import { TipoTransaccionModel } from '@shared/models/tipo-transaccion-model';
import { TransaccionModel } from '@shared/models/transaccion-model';
import { TipoTransaccionService } from '@shared/services/tipo-transaccion.service';
import { TokenService } from '@shared/services/token.service';
import { TransaccionService } from '@shared/services/transaccion.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './transacciones.component.html',
  styleUrl: './transacciones.component.css'
})
export class TransaccionesComponent implements OnInit{
  
  private formBuilder = inject(FormBuilder);

  

  private token_service = inject(TokenService);

  private transaccionService = inject(TransaccionService);
  private tipoTransaccionService = inject(TipoTransaccionService);

  formTransaccion: FormGroup | null = null;

  tipoTransacciones: TipoTransaccionModel[] = [];
  transacciones: TransaccionModel[] = [
    // {
    //   monto: 2000,
    //   motivo: 'regalo'
    // },
    // {
    //   monto: 3000,
    //   motivo: 'deuda'
    // }
  ];

  transaccion: TransaccionModel | null = null;
  indexTransaccion: number | null = null;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const dataSub = forkJoin([
      this.transaccionService.getAll(),
      this.tipoTransaccionService.getAll(),
    ]).subscribe({
      next: ([transacciones, tipoTransacciones]) => {
        this.transacciones = [...transacciones];
        this.tipoTransacciones = [...tipoTransacciones];
      },
      complete() {
        dataSub.unsubscribe();
      },
    });
  }

  crearTransaccion() {
    this.formTransaccion = this.formBuilder.group({
      monto: new FormControl(null, [Validators.required]),
      fecha: new FormControl(null, [Validators.required]),
      motivo: new FormControl(null, [Validators.required]),
      type_id: new FormControl(null, [Validators.required]),
    });
  }

  cancelarTransaccion() {
    this.formTransaccion = null;
  }

  guardarTransaccion() {
    if (!this.formTransaccion || this.formTransaccion.invalid) {
      alert('llena todos los campos');
      return;
    }
    const { value } = this.formTransaccion;
    console.log(this.formTransaccion.get('id'));
    if (this.formTransaccion.get('id')) {
      const nuevaTransaccion: UpdateTransaccionDTO =
        value as UpdateTransaccionDTO;
      const updateSub = this.transaccionService
        .update(nuevaTransaccion)
        .subscribe({
          next: (transaccion) => {
            let transacciones = [...this.transacciones];
            let transaccion_index = transacciones.findIndex(
              (transaccion) => transaccion.id == nuevaTransaccion.id
            );
            transacciones[transaccion_index] = transaccion;
            this.transacciones = transacciones;
            this.cancelarTransaccion();
          },
          complete: () => {
            updateSub.unsubscribe();
          },
        });
      return;
    }

    const nuevaTransaccion: CreateTransaccionDTO =
      value as CreateTransaccionDTO;

    const saveSub = this.transaccionService.create(nuevaTransaccion).subscribe({
      next: (transaccion) => {
        this.transacciones = [...this.transacciones, transaccion];
      },
      complete: () => {
        saveSub.unsubscribe;
      },
    });

    this.formTransaccion = null;
  }

  eliminarTransaccion(id: number) {
    const deleteSub = this.transaccionService.delete(id).subscribe({
      next: (value) => {
        let transacciones = [...this.transacciones];
        let transaccion_index = transacciones.findIndex(
          (transaccion) => transaccion.id == id
        );
        transacciones.splice(transaccion_index, 1);
        this.transacciones = transacciones;
      },
      complete: () => {
        deleteSub.unsubscribe();
      },
    });
  }

  actualizarTrasaccion(transaccion: TransaccionModel) {
    this.formTransaccion = this.formBuilder.group({
      id: new FormControl(transaccion.id, [Validators.required]),
      monto: new FormControl(transaccion.monto, [Validators.required]),
      fecha: new FormControl(transaccion.fecha, [Validators.required]),
      motivo: new FormControl(transaccion.motivo, [Validators.required]),
      type_id: new FormControl(transaccion.type_id, [Validators.required]),
    });
  }

  logout(){
    
  }
}
