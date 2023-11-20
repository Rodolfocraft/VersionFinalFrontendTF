import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { CarreraProfesional } from 'src/app/models/carreraprofesional';
import { Universidad } from 'src/app/models/universidad';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CarreraprofesionalService } from 'src/app/services/carreraprofesional.service';
import { UniversidadService } from 'src/app/services/universidad.service';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/models/user';
@Component({
  selector: 'app-creaedita-alumno',
  templateUrl: './creaedita-alumno.component.html',
  styleUrls: ['./creaedita-alumno.component.css']
})
export class CreaeditaAlumnoComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  alumno: Alumno = new Alumno();
  mensaje: string = '';
  id:number = 0;
  listauniversidades:Universidad[]=[];
  listausuario: Users[]=[];
  listacarrera:CarreraProfesional[]=[];
  edicion: boolean = true;  
  maxFecha: Date = moment().add(-1, 'days').toDate();
  constructor(
    private aS: AlumnoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UniversidadService,
    private usS: UserService,
    private cS: CarreraprofesionalService
  ){}


  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
  
    this.form = this.formBuilder.group({
      id: [''],
      usuario: ['', Validators.required],
      universidad: ['', Validators.required],
      carrera: ['', Validators.required],
      ciclo: ['', Validators.required],
      anioingreso:['', Validators.required],
      dni:['', Validators.required]
    });
    this.cS.list().subscribe((data)=> {
      this.listacarrera=data;
    });
    this.uS.list().subscribe((data)=> {
      this.listauniversidades=data;
    });
    this.usS.list().subscribe((data)=> {
      this.listausuario=data;
    });
  }
  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          usuario: new FormControl(data.usuarios),
          universidad: new FormControl(data.universidad),
          carrera: new FormControl(data.carrerasProfesionales),
          ciclo: new FormControl(data.ciclo),
          anioingreso: new FormControl(data.anioingreso),
          dni: new FormControl(data.dni)
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
      this.alumno.id = this.form.value.id;
      this.alumno.usuarios.id = this.form.value.usuario;
      this.alumno.universidad.id = this.form.value.universidad;
      this.alumno.carrerasProfesionales.id = this.form.value.carrera;
      this.alumno.ciclo = this.form.value.ciclo;
      this.alumno.anioingreso = this.form.value.anioingreso;
      this.alumno.dni = this.form.value.dni;

      if (this.edicion) {
        this.aS.update(this.alumno).subscribe(() => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      } else {
        this.aS.insert(this.alumno).subscribe((data) => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      }
      this.router.navigate(['/components/alumno']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

}
