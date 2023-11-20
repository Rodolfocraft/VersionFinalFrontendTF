import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { CalificacionDocente } from 'src/app/models/calificaciondocente';
import { CarreraProfesional } from 'src/app/models/carreraprofesional';
import { Curso } from 'src/app/models/curso';
import { Profesores } from 'src/app/models/profesores';
import { Universidad } from 'src/app/models/universidad';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CalificaciondocenteService } from 'src/app/services/calificaciondocente.service';
import { CarreraprofesionalService } from 'src/app/services/carreraprofesional.service';
import { CursoService } from 'src/app/services/curso.service';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { UniversidadService } from 'src/app/services/universidad.service';
import * as moment from 'moment';
import { Administrador } from 'src/app/models/administrador';
import { AdministradorService } from 'src/app/services/administrador.service';
@Component({
  selector: 'app-creaedita-calificaciondocente',
  templateUrl: './creaedita-calificaciondocente.component.html',
  styleUrls: ['./creaedita-calificaciondocente.component.css']
})
export class CreaeditaCalificaciondocenteComponent implements OnInit{
  form: FormGroup=new FormGroup({});
  calificacion: CalificacionDocente=new CalificacionDocente();
  mensaje:string='';
  id:number=0;
  edicion:boolean=true;
  maxFecha: Date = moment().add(-1, 'days').toDate();
  listaalumno:Alumno[]=[];
  listauniversidad:Universidad[]=[];
  listaprofesor:Profesores[]=[];
  listacurso: Curso[]=[];
  listacarrera: CarreraProfesional[]=[];
  listaadministrador: Administrador[]=[];
  constructor(
    private cS: CalificaciondocenteService,
    private uS: UniversidadService,
    private pS: ProfesoresService,
    private as: AlumnoService,
    private cuS: CursoService,
    private caS: CarreraprofesionalService, 
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private aS: AdministradorService
  ){}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
  
    this.form = this.formBuilder.group({
      id: [''],
      alumno: ['', Validators.required],
      profesor: ['', Validators.required],
      curso: ['', Validators.required],
      carrera: ['', Validators.required],
      universidad: ['', Validators.required],
      valoracion: ['', Validators.required],
      recomendacion:['',Validators.required],
      fechapublicacion:['',Validators.required],
      administrador:['',Validators.required],
    });
    this.uS.list().subscribe((data)=> {
      this.listauniversidad=data;
    });
    this.as.list().subscribe((data)=> {
      this.listaalumno=data;
    });
    this.caS.list().subscribe((data)=> {
      this.listacarrera=data;
    });
    this.cuS.list().subscribe((data)=> {
      this.listacurso=data;
    });
    this.pS.list().subscribe((data)=> {
      this.listaprofesor=data;
    });
    this.aS.list().subscribe((data)=> {
      this.listaadministrador=data;
    });
  }
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          alumno: new FormControl(data.alumno),
          profesor: new FormControl(data.profesores),
          curso: new FormControl(data.curso),
          carrera: new FormControl(data.carrerasProfesionales),
          universidad:new FormControl(data.universidad),
          valoracion: new FormControl(data.valoracion),
          recomendacion: new FormControl(data.recomendacion),
          fechapublicacion:new FormControl(data.fechapublicacion),
          administrador:new FormControl(data.administrador)
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
      this.calificacion.id = this.form.value.id;
      this.calificacion.curso.id=this.form.value.curso;
      this.calificacion.profesores.id=this.form.value.profesor;
      this.calificacion.alumno.id = this.form.value.alumno;
      this.calificacion.universidad.id = this.form.value.universidad;
      this.calificacion.carrerasProfesionales.id = this.form.value.carrera;
      this.calificacion.valoracion=this.form.value.valoracion;
      this.calificacion.fechapublicacion=this.form.value.fechapublicacion;
      this.calificacion.administrador.id=this.form.value.administrador;
      this.calificacion.recomendacion=this.form.value.recomendacion;
      if (this.edicion) {
        this.cS.update(this.calificacion).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.calificacion).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['/components/calificaciondocente']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }


}
