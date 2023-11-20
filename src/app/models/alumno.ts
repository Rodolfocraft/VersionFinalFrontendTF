import { CarreraProfesional } from "./carreraprofesional";
import { Universidad } from "./universidad";
import { Users } from "./user";

export class Alumno{
    id:number=0;
    usuarios:Users=new Users();
    universidad:Universidad=new Universidad();
    carrerasProfesionales:CarreraProfesional=new CarreraProfesional();
    ciclo:number=0;
    anioingreso:number=0;
    dni:number=0;
}