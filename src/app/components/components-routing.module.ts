import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './administrador/administrador.component';
import { CreaeditaAdministradorComponent } from './administrador/creaedita-administrador/creaedita-administrador.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { CreaeditaAlumnoComponent } from './alumno/creaedita-alumno/creaedita-alumno.component';
import { CalificaciondocenteComponent } from './calificaciondocente/calificaciondocente.component';
import { CreaeditaCalificaciondocenteComponent } from './calificaciondocente/creaedita-calificaciondocente/creaedita-calificaciondocente.component';
import { CarreraprofesionalComponent } from './carreraprofesional/carreraprofesional.component';
import { CreaeditacarreraprofesionalComponent } from './carreraprofesional/creaeditacarreraprofesional/creaeditacarreraprofesional.component';

import { CreaeditaProfesoresComponent } from './profesores/creaedita-profesores/creaedita-profesores.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { UniversidadComponent } from './universidad/universidad.component';
import { CreaeditaUniversidadComponent } from './universidad/creaedita-universidad/creaedita-universidad.component';
import { CursoComponent } from './curso/curso.component';
import { CreaeditaCursoComponent } from './curso/creaedita-curso/creaedita-curso.component';
import { CardUniversidadComponent } from './universidad/card-universidad/card-universidad.component';
import { Reporte01Component } from './reporte/reporte01/reporte01.component';
import { ReporteComponent } from './reporte/reporte.component';
import { Reporte02Component } from './reporte/reporte02/reporte02.component';
import { Reporte03Component } from './reporte/reporte03/reporte03.component';
import { Reporte04Component } from './reporte/reporte04/reporte04.component';
import { Reporte05Component } from './reporte/reporte05/reporte05.component';
import { CardComponent } from './profesores/card/card.component';



const routes: Routes = [
  {
    path: 'profesores',
    component: ProfesoresComponent,
    children: [
      {path: 'nuevo', component: CreaeditaProfesoresComponent},
      {path: 'ediciones/:id', component: CreaeditaProfesoresComponent},
      {path: 'card', component:CardComponent}
    ]
  },
  {
    path: 'CarrerasProfesionales',
    component: CarreraprofesionalComponent,
    children: [
      {path: 'nuevo', component: CreaeditacarreraprofesionalComponent},
      {path: 'ediciones/:id', component:CreaeditacarreraprofesionalComponent},
    ]
  },
  {
    path: 'alumno',
    component: AlumnoComponent,
    children: [
      {path: 'nuevo', component: CreaeditaAlumnoComponent},
      {path: 'ediciones/:id', component:CreaeditaAlumnoComponent},
    ]
  },
  {
    path: 'calificaciondocente',
    component: CalificaciondocenteComponent,
    children: [
      {path: 'nuevo', component: CreaeditaCalificaciondocenteComponent},
      {path: 'ediciones/:id', component:CreaeditaCalificaciondocenteComponent},
    ]
  },
  {
    path: 'administrador',
    component: AdministradorComponent,
    children: [
      {path: 'nuevo', component: CreaeditaAdministradorComponent},
      {path: 'ediciones/:id', component:CreaeditaAdministradorComponent},
    ]
  },
  {
    path: 'universidad',
    component: UniversidadComponent,
    children: [
      {path: 'nuevo', component: CreaeditaUniversidadComponent},
      {path: 'ediciones/:id', component:CreaeditaUniversidadComponent},
      {path: 'card', component:CardUniversidadComponent},
    ]
  },
  {
    path: 'curso',
    component: CursoComponent,
    children: [
      {path: 'nuevo', component: CreaeditaCursoComponent},
      {path: 'ediciones/:id', component:CreaeditaCursoComponent},
    ]
  },
  {
    path: 'reporte',
    component: ReporteComponent,
    children: [
      {path: '1', component: Reporte01Component},
      {path: '2', component: Reporte02Component},
      {path: '3', component: Reporte03Component},
      {path: '4', component: Reporte04Component},
      {path: '5', component: Reporte05Component},
    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
