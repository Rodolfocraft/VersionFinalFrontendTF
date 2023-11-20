import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Universidad } from 'src/app/models/universidad';
import { UniversidadService } from 'src/app/services/universidad.service';

@Component({
  selector: 'app-creaedita-universidad',
  templateUrl: './creaedita-universidad.component.html',
  styleUrls: ['./creaedita-universidad.component.css']
})
export class CreaeditaUniversidadComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  universidad: Universidad = new Universidad();
  mensaje: string = '';
  id:number = 0;
  codUniversidad: number = 0;
  edicion: boolean = true;
  maxFecha: Date = moment().add(-1, 'days').toDate();
  tipouniversidad: { value: string; viewValue: string }[] = [
    { value: 'Publica', viewValue: 'Publica' },
    { value: 'Privada', viewValue: 'Privada' }
  ];
  constructor(
    private uS: UniversidadService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      id: [''],
      codUniversidad: [''],
      nombreUniversidad: ['', Validators.required],
      sede: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechafundacion: ['', Validators.required],
      direccion:  ['', Validators.required],
      tipo: ['', Validators.required],
    });
  }
  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          codUniversidad: new FormControl(data.codUniversidad),
          nombreUniversidad: new FormControl(data.nombreUniversidad),
          sede: new FormControl(data.sede),
          descripcion: new FormControl(data.descripcion),
          fechafundacion: new FormControl(data.fechafundacion),
          direccion: new FormControl(data.direccion),
          tipo: new FormControl(data.tipo),
        });
      });
    }
  }
  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  aceptar(): void {
    if (this.form.valid) {
      this.universidad.id = this.form.value.id;
      this.universidad.codUniversidad = this.form.value.codUniversidad;
      this.universidad.nombreUniversidad = this.form.value.nombreUniversidad;
      this.universidad.sede = this.form.value.sede;
      this.universidad.descripcion = this.form.value.descripcion;
      this.universidad.fechafundacion = this.form.value.fechafundacion;
      this.universidad.direccion = this.form.value.direccion;
      this.universidad.tipo = this.form.value.tipo;
      if (this.edicion) {
        this.uS.update(this.universidad).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.universidad).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
      this.router.navigate(['/components/universidad']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }
}
