import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Profesores } from 'src/app/models/profesores';
import { ProfesoresService } from 'src/app/services/profesores.service';
@Component({
  selector: 'app-creaedita-profesores',
  templateUrl: './creaedita-profesores.component.html',
  styleUrls: ['./creaedita-profesores.component.css']
})
export class CreaeditaProfesoresComponent implements OnInit {
form: FormGroup = new FormGroup({});
profesores: Profesores = new Profesores();
mensaje: string = '';
id:number = 0;
codProfesor:number = 0;
edicion: boolean = true;
maxFecha: Date = moment().add(-1, 'days').toDate();
genero: { value: string; viewValue: string }[] = [
  { value: 'Femenino', viewValue: 'Femenino' },
  { value: 'Masculino', viewValue: 'Masculino' }
];
constructor(
  private pS: ProfesoresService,
  private router: Router,
  private formBuilder: FormBuilder,
  private route: ActivatedRoute
) {}


ngOnInit(): void {
  this.route.params.subscribe((data: Params) => {
    this.id = data['id'];
    this.edicion = data['id'] != null;
    this.init();
  });

  this.form = this.formBuilder.group({
    id: [''],
    codProfesor: [''],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    fechanac: ['', Validators.required],
    especialidad: ['', Validators.required],
    grado: ['', Validators.required],
    genero: ['', Validators.required],
    aniosexperiencia: ['', Validators.required],
  });
}
aceptar(): void {
  if (this.form.valid) {
    this.profesores.id = this.form.value.id;
    this.profesores.codProfesor = this.form.value.codProfesor;
    this.profesores.nombre = this.form.value.nombre;
    this.profesores.apellido = this.form.value.apellido;
    this.profesores.fechanac = this.form.value.fechanac;
    this.profesores.especialidad = this.form.value.especialidad;
    this.profesores.grado = this.form.value.grado;
    this.profesores.genero = this.form.value.genero;
    this.profesores.aniosexperiencia = this.form.value.aniosexperiencia;
    if (this.edicion) {
      this.pS.update(this.profesores).subscribe(() => {
        this.pS.list().subscribe((data) => {
          this.pS.setList(data);
        });
      });
    } else {
      this.pS.insert(this.profesores).subscribe((data) => {
        this.pS.list().subscribe((data) => {
          this.pS.setList(data);
        });
      });
    }
    this.router.navigate(['/components/profesores']);
  } else {
    this.mensaje = 'Por favor complete todos los campos obligatorios.';
  }
}

obtenerControlCampo(nombreCampo: string): AbstractControl {
  const control = this.form.get(nombreCampo);
  if (!control) {
    throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
  }
  return control;
}
init() {
  if (this.edicion) {
    this.pS.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        id: new FormControl(data.id),
        codProfesor: new FormControl(data.codProfesor),
        nombre: new FormControl(data.nombre),
        apellido: new FormControl(data.apellido),
        fechanac: new FormControl(data.fechanac),
        especialidad: new FormControl(data.especialidad),
        grado: new FormControl(data.grado),
        genero: new FormControl(data.genero),
        aniosexperiencia: new FormControl(data.aniosexperiencia),
      });
    });
  }
}


}



