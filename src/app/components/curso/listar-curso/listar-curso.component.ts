import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-listar-curso',
  templateUrl: './listar-curso.component.html',
  styleUrls: ['./listar-curso.component.css']
})
export class ListarCursoComponent implements OnInit{
  datasource: MatTableDataSource<Curso> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'codigo',
    'codigocurso',
    'nombrecurso',
    'creditos',
    'semestre',
    'horasdictadas',
    'modalidad',
    'accion01',
    'accion02'
 ];
 constructor(private cS: CursoService) {}
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
