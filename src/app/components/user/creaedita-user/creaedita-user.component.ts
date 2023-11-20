import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Users } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-creaedita-user',
  templateUrl: './creaedita-user.component.html',
  styleUrls: ['./creaedita-user.component.css']
})
export class CreaeditaUserComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  user:Users=new Users();
  
  rol:string="";
  username:string="";
  mensaje:string='';
  id:number=0;
  edicion:boolean=true;
  maxFecha:Date=moment().add(-1,'days').toDate();
  genero: { value: string; viewValue: string }[] = [
    { value: 'Femenino', viewValue: 'Femenino' },
    { value: 'Masculino', viewValue: 'Masculino' }
  ];
  tipousuario: { value: string; viewValue: string }[] = [
    { value: 'USER', viewValue: 'Alumno' },
    { value: 'ADMIN', viewValue: 'Administrador' }
  ];
  constructor(
    private uS:UserService,
    private router:Router,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute
  ){}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form=this.formBuilder.group({
      id:[''],
      username:['',Validators.required],
      password:['',Validators.required],
      tipousuario:['',Validators.required],
      apellido:['',Validators.required],
      nombre:['',Validators.required],
      fechanac:['',Validators.required],
      correo:['',Validators.required],
      genero:['',Validators.required],
      direccion:['',Validators.required],
      telefono:['',Validators.required]
    });
    
  }
  init() {
    if(this.edicion) {
      this.uS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          id:new FormControl(data.id),
          username:new FormControl(data.username),
          password:new FormControl(data.password),
          tipousuario:new FormControl(data.rol),
          apellido:new FormControl(data.apellido),
          nombre:new FormControl(data.nombre),
          fechanac:new FormControl(data.fechanac),
          correo:new FormControl(data.correo),
          genero:new FormControl(data.genero),
          direccion:new FormControl(data.direccion),
          telefono:new FormControl(data.rol),
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
  aceptar():void {
    if(this.form.valid){
      this.user.id=this.form.value.id;
      this.user.username=this.form.value.username;
      this.user.password=this.form.value.password;
      this.user.rol=this.form.value.tipousuario;
      this.user.apellido=this.form.value.apellido;
      this.user.nombre=this.form.value.nombre;
      this.user.fechanac=this.form.value.fechanac;
      this.user.correo=this.form.value.correo;
      this.user.genero=this.form.value.genero;
      this.user.direccion=this.form.value.direccion;
      this.user.telefono=this.form.value.telefono;
      if(this.edicion){
        this.uS.update(this.user).subscribe((data)=>{
          this.uS.list().subscribe((data)=>{
            this.uS.setList(data);
          })
        })
      }else{
        this.uS.insert(this.user).subscribe((data)=>{
          this.uS.list().subscribe((data)=>{
            this.uS.setList(data);
          })
        })
      }
      if(this.user.rol=="ADMIN"){
        this.router.navigate(['login']);
      }
      else if(this.user.rol=="USER"){
        this.router.navigate(['login']);
      }
    } else {
      this.mensaje='Por favor complete todos los campos obligatorios'
    }

  }
  
}
