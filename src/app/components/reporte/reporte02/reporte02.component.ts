import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { CalificaciondocenteService } from 'src/app/services/calificaciondocente.service';

@Component({
  selector: 'app-reporte02',
  templateUrl: './reporte02.component.html',
  styleUrls: ['./reporte02.component.css']
})
export class Reporte02Component implements OnInit{
  barChartOptions:ChartOptions={
    responsive:true
  }
  barChartLabels:string[]=[];
  barChartType:ChartType='bar';
  barChartLegend=true;
  barChartData:ChartDataset[]=[];
  constructor(private cS:CalificaciondocenteService){}
  ngOnInit(): void {
    this.cS.getCount().subscribe(data=>{
      this.barChartLabels=data.map(item=>item.nameProfesor);
      this.barChartData=[
        {
          data:data.map((item)=>item.quantityCalifications),
          label:'Cantidad de calificaciones por profesor'
        }
      ]
    })
  }

}
