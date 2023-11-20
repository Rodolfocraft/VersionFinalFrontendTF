import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-reporte01',
  templateUrl: './reporte01.component.html',
  styleUrls: ['./reporte01.component.css']
})
export class Reporte01Component implements OnInit {
  barChartOptions:ChartOptions={
    responsive:true
  }
  barChartLabels:string[]=[];
  barChartType:ChartType='bar';
  barChartLegend=true;
  barChartData:ChartDataset[]=[];
  constructor(private aS:AlumnoService){}
  ngOnInit(): void {
    this.aS.getCount().subscribe(data=>{
      this.barChartLabels=data.map(item=>item.carreraprofesional);
      this.barChartData=[
        {
          data:data.map((item)=>item.contadoralumnos),
          label:'Cantidad de alumnos por carrera profesional'
        }
      ]
    })
  }

}
