import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Administrador } from 'src/app/models/administrador';
import { Users } from 'src/app/models/user';
import { AdministradorService } from 'src/app/services/administrador.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-creaedita-administrador',
  templateUrl: './creaedita-administrador.component.html',
  styleUrls: ['./creaedita-administrador.component.css']
})
export class CreaeditaAdministradorComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  administrador: Administrador = new Administrador();
  mensaje: string = '';
  listaUsuarios: Users[]=[]
  id:number=0;
  edicion: boolean = true;
  
  constructor(
    private aS: AdministradorService,
    private uS: UserService,
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
      usuario: ['', Validators.required],
    });
    this.uS.list().subscribe((data)=> {
      this.listaUsuarios=data;
    })

  }
  aceptar(): void {
    if (this.form.valid) {
        this.administrador.id = this.form.value.id;
        this.administrador.usuarios.id = this.form.value.usuario;
        this.aS.insert(this.administrador).subscribe((data) => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
        this.router.navigate(['/components/administrador']);
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
      this.aS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          usuario: new FormControl(data.usuarios.id)
        });
      });
    }
  }
  
}
