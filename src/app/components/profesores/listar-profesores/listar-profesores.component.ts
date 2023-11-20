import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Profesores } from 'src/app/models/profesores';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-listar-profesores',
  templateUrl: './listar-profesores.component.html',
  styleUrls: ['./listar-profesores.component.css']
  
})
export class ListarProfesoresComponent implements OnInit{
 datasource: MatTableDataSource<Profesores> = new MatTableDataSource();
 @ViewChild(MatPaginator) paginator!: MatPaginator;
 displayedColumns: string[] = [
  'codigo',
  'codigoprofesor',
  'nombre',
  'apellido',
  'fechanac',
  'especialidad',
  'grado',
  'genero',
  'aniosexperiencia',
  'accion01',
  'accion02'
 ];
 constructor(private pS: ProfesoresService) {}
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;
    });
    this.pS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.pS.delete(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.datasource.filter = en.target.value.trim();
  }
}
