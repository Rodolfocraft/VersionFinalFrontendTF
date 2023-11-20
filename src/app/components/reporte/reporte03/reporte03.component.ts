import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-reporte03',
  templateUrl: './reporte03.component.html',
  styleUrls: ['./reporte03.component.css']
})
export class Reporte03Component implements OnInit{
  barChartOptions:ChartOptions={
    responsive:true
  }
  barChartLabels:string[]=[];
  barChartType:ChartType='bar';
  barChartLegend=true;
  barChartData:ChartDataset[]=[];
  constructor(private cS:CursoService){}
  ngOnInit(): void {
    this.cS.getCount().subscribe(data=>{
      this.barChartLabels=data.map(item=>item.nombreUniversidad);
      this.barChartData=[
        {
          data:data.map((item)=>item.cantidadCursos),
          label:'Cantidad de cursos por universidad'
        }
      ]
    })
  }
}
