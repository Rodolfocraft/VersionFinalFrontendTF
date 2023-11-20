import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ComponentsRoutingModule } from './components-routing.module';
import { UniversidadComponent } from './universidad/universidad.component';
import { ListarUniversidadComponent } from './universidad/listar-universidad/listar-universidad.component';
import { CreaeditaUniversidadComponent } from './universidad/creaedita-universidad/creaedita-universidad.component';
import { CursoComponent } from './curso/curso.component';
import { CreaeditaCursoComponent } from './curso/creaedita-curso/creaedita-curso.component';
import { ListarCursoComponent } from './curso/listar-curso/listar-curso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { AdministradorComponent } from './administrador/administrador.component';
import { CreaeditaAdministradorComponent } from './administrador/creaedita-administrador/creaedita-administrador.component';
import { ListarAdministradorComponent } from './administrador/listar-administrador/listar-administrador.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { CreaeditaAlumnoComponent } from './alumno/creaedita-alumno/creaedita-alumno.component';
import { ListarAlumnoComponent } from './alumno/listar-alumno/listar-alumno.component';
import { CalificaciondocenteComponent } from './calificaciondocente/calificaciondocente.component';
import { CreaeditaCalificaciondocenteComponent } from './calificaciondocente/creaedita-calificaciondocente/creaedita-calificaciondocente.component';
import { ListarCalificaciondocenteComponent } from './calificaciondocente/listar-calificaciondocente/listar-calificaciondocente.component';
import { CarreraprofesionalComponent } from './carreraprofesional/carreraprofesional.component';
import { CreaeditacarreraprofesionalComponent } from './carreraprofesional/creaeditacarreraprofesional/creaeditacarreraprofesional.component';
import { ListarcarreraprofesionalComponent } from './carreraprofesional/listarcarreraprofesional/listarcarreraprofesional.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { CreaeditaProfesoresComponent } from './profesores/creaedita-profesores/creaedita-profesores.component';
import { ListarProfesoresComponent } from './profesores/listar-profesores/listar-profesores.component';
import { CardUniversidadComponent } from './universidad/card-universidad/card-universidad.component';
import {MatCardModule} from '@angular/material/card';
import { ReporteComponent } from './reporte/reporte.component';
import { Reporte01Component } from './reporte/reporte01/reporte01.component';
import { Reporte02Component } from './reporte/reporte02/reporte02.component';
import { Reporte03Component } from './reporte/reporte03/reporte03.component';
import { Reporte04Component } from './reporte/reporte04/reporte04.component';
import { Reporte05Component } from './reporte/reporte05/reporte05.component';
import { NgChartsModule } from 'ng2-charts';
import { CardComponent } from './profesores/card/card.component';



@NgModule({
  declarations: [
    UniversidadComponent,
    ListarUniversidadComponent,
    CreaeditaUniversidadComponent,
    CursoComponent,
    CreaeditaCursoComponent,
    ListarCursoComponent,
    CarreraprofesionalComponent,
    ListarcarreraprofesionalComponent,
    CreaeditacarreraprofesionalComponent,
    AlumnoComponent,
    CalificaciondocenteComponent,
    ListarAlumnoComponent,
    ListarCalificaciondocenteComponent,
    CreaeditaCalificaciondocenteComponent,
    AdministradorComponent,
    CreaeditaAdministradorComponent,
    ListarAdministradorComponent,
    ProfesoresComponent,
    CreaeditaProfesoresComponent,
    ListarProfesoresComponent,
    CardUniversidadComponent,
    ReporteComponent,
    Reporte01Component,
    Reporte02Component,
    Reporte03Component,
    Reporte04Component,
    Reporte05Component,
    CardComponent,
    CreaeditaAlumnoComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    MatTableModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
