export class Users{
    id:number=0;
    username:string=""
    password:string=""
    enabled:boolean=true
    rol:string=""
    apellido:string=""
    nombre:string=""
    fechanac:Date=new Date(Date.now());
    correo:string="";
    genero: string = "";
    direccion: string = "";
    telefono:number=0;
}