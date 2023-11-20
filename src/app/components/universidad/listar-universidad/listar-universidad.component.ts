import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Universidad } from 'src/app/models/universidad';
import { UniversidadService } from 'src/app/services/universidad.service';
@Component({
  selector: 'app-listar-universidad',
  templateUrl: './listar-universidad.component.html',
  styleUrls: ['./listar-universidad.component.css']
})
export class ListarUniversidadComponent implements OnInit{
  datasource: MatTableDataSource<Universidad> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'codigo',
    'codigouniversidad',
    'nombreuniversidad',
    'sede',
    'descripcion',
    'fechafundacion',
    'direccion',
    'tipo',
    'accion01',
    'accion02'
 ];
 constructor(private uS: UniversidadService) {}
 ngOnInit(): void {
  this.uS.list().subscribe((data) => {
    this.datasource = new MatTableDataSource(data);
    this.datasource.paginator = this.paginator;
  });
  this.uS.getList().subscribe((data) => {
    this.datasource = new MatTableDataSource(data);
    this.datasource.paginator = this.paginator;
  });
}
eliminar(id: number) {
  this.uS.delete(id).subscribe((data) => {
    this.uS.list().subscribe((data) => {
      this.uS.setList(data);
    });
  });
}
filter(en: any) {
  this.datasource.filter = en.target.value.trim();
}
}
