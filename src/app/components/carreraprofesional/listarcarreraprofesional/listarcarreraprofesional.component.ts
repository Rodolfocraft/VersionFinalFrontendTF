import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CarreraProfesional } from 'src/app/models/carreraprofesional';
import { CarreraprofesionalService } from 'src/app/services/carreraprofesional.service';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-listarcarreraprofesional',
  templateUrl: './listarcarreraprofesional.component.html',
  styleUrls: ['./listarcarreraprofesional.component.css']
})
export class ListarcarreraprofesionalComponent implements OnInit{
  datasource: MatTableDataSource<CarreraProfesional> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'codigo',
    'codigocarreraprofesional',
    'nombrecarreraprofesional',
    'tipo',
    'facultad',
    'ciclo',
    'accion01',
    'accion02'
 ];
 constructor(private cS: CarreraprofesionalService) {}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.datasource.filter = en.target.value.trim();
  }
}
