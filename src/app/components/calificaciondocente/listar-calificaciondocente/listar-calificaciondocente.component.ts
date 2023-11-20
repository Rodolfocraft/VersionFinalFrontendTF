import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CalificacionDocente } from 'src/app/models/calificaciondocente';
import { CalificaciondocenteService } from 'src/app/services/calificaciondocente.service';

@Component({
  selector: 'app-listar-calificaciondocente',
  templateUrl: './listar-calificaciondocente.component.html',
  styleUrls: ['./listar-calificaciondocente.component.css']
})
export class ListarCalificaciondocenteComponent implements OnInit{
  datasource: MatTableDataSource<CalificacionDocente> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'profesor',
    'curso',
    'universidad',
    'carreraprofesional',
    'valoracion',
    'recomendacion',
    'alumno',
    'fechapublicacion',
    'administrador',
    'accion01',
    'accion02'
 ];
 constructor(private cS: CalificaciondocenteService) {}
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
