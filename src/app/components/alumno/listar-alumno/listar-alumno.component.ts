import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-listar-alumno',
  templateUrl: './listar-alumno.component.html',
  styleUrls: ['./listar-alumno.component.css']
})
export class ListarAlumnoComponent implements OnInit{
  datasource: MatTableDataSource<Alumno> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'usuario',
    'universidad',
    'carreraprofesional',
    'ciclo',
    'anioingreso',
    'dni',
    'accion01',
    'accion02'
  ];
  constructor(private aS:AlumnoService){}
  ngOnInit(): void {
    this.aS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;
    });
    this.aS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.aS.delete(id).subscribe((data) => {
      this.aS.list().subscribe((data) => {
        this.aS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.datasource.filter = en.target.value.trim();
  }

}
