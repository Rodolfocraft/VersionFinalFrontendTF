import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Administrador } from 'src/app/models/administrador';
import { AdministradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'app-listar-administrador',
  templateUrl: './listar-administrador.component.html',
  styleUrls: ['./listar-administrador.component.css']
})
export class ListarAdministradorComponent implements OnInit{

  datasource: MatTableDataSource<Administrador> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'usuario',
    'accion01',
    'accion02'
  ];
  constructor(private aS:AdministradorService){}
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

