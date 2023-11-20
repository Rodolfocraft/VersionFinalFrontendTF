import { Administrador } from "./administrador";
import { Alumno } from "./alumno";
import { CarreraProfesional } from "./carreraprofesional";
import { Curso } from "./curso";
import { Profesores } from "./profesores";
import { Universidad } from "./universidad";

export class CalificacionDocente{
    id:number=0;
    profesores: Profesores=new Profesores();
    curso: Curso=new Curso();
    carrerasProfesionales:CarreraProfesional=new CarreraProfesional();
    universidad: Universidad=new Universidad();
    valoracion: number=0;
    recomendacion:number=0;
    alumno:Alumno=new Alumno();
    fechapublicacion:Date=new Date(Date.now());
    administrador:Administrador = new Administrador();
}