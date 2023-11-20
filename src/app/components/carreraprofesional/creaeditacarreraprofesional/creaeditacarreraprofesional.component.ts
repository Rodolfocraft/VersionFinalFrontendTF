import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { CarreraProfesional } from 'src/app/models/carreraprofesional';
import { CarreraprofesionalService } from 'src/app/services/carreraprofesional.service';
@Component({
  selector: 'app-creaeditacarreraprofesional',
  templateUrl: './creaeditacarreraprofesional.component.html',
  styleUrls: ['./creaeditacarreraprofesional.component.css']
})
export class CreaeditacarreraprofesionalComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  carreraprofesional: CarreraProfesional = new CarreraProfesional();
  mensaje: string = '';
  id:number = 0;
  codCarreraProfesional:number = 0;
  edicion: boolean = true;  
  tipo: { value: string; viewValue: string }[] = [
    { value: 'Universitaria', viewValue: 'Universitaria' },
    { value: 'Tecnica', viewValue: 'Tecnica' }
  ];
  constructor(
    private cS: CarreraprofesionalService,
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
      codCarreraProfesional: ['', Validators.required],
      nombreCarreraProfesional: ['', Validators.required],
      tipo: ['', Validators.required],
      facultad:['', Validators.required],
      ciclo:['', Validators.required]
    });
  }
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          codCarreraProfesional: new FormControl(data.codCarreraProfesional),
          nombreCarreraProfesional: new FormControl(data.nombreCarreraProfesional),
          tipo: new FormControl(data.nombreCarreraProfesional),
          facultad: new FormControl(data.facultad),
          ciclo: new FormControl(data.ciclo)
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
      this.carreraprofesional.id = this.form.value.id;
      this.carreraprofesional.codCarreraProfesional = this.form.value.codCarreraProfesional;
      this.carreraprofesional.nombreCarreraProfesional = this.form.value.nombreCarreraProfesional;
      this.carreraprofesional.tipo = this.form.value.tipo;
      this.carreraprofesional.facultad = this.form.value.facultad;
      this.carreraprofesional.ciclo = this.form.value.ciclo;
      if (this.edicion) {
        this.cS.update(this.carreraprofesional).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.carreraprofesional).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['/components/CarrerasProfesionales']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }
}
