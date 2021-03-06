import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { Serie } from '../../../../../models/serie.model';
import { DateTimeMomentService } from '../../../../../core/services/date-time-moment.service';
import { StatisticService } from '../../../../services/statistic.service';

@Component({
  selector: 'app-chart-line-orders',
  templateUrl: './chart-line-orders.component.html',
  styleUrls: ['./chart-line-orders.component.css']
})
export class ChartLineOrdersComponent implements OnInit {


  dateFrom = 0;
  dateTo = 99999999;

  ordersLength = 0
  multi: any[] = [
    {
      "name": "Ventas",
      "series": [ ]
    }
  ];

  view: any[] = [undefined, 400];

  // options
  gradient: boolean = true;
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  // xAxisLabel: string = 'Años';
  //yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454']
  };

  interval;

  currentDate = this.momentService.getMomentInstance();
  dateInitBefore = this.momentService.minus(30, 'd')
  public dateFromControl: FormControl = new FormControl(
    {
      "year": +this.dateInitBefore.format('YYYY'),
      "month": +this.dateInitBefore.format('MM'),
      "day": +this.dateInitBefore.format('DD')
    }
  );
  public dateToControl: FormControl = new FormControl(
    {
      "year": +this.currentDate.format('YYYY'),
      "month": +this.currentDate.format('MM'),
      "day": +this.currentDate.format('DD')
    }
  );

  constructor( public statisticService: StatisticService, private momentService: DateTimeMomentService) {
    this.loadSalesByBusinessDateCreated();
  }

  loadSalesByBusinessDateCreated(): void {
    this.buildDateFilter();
    this.statisticService.getSalesByBusinessDateCreated(this.dateFrom, this.dateTo)
        .subscribe((series: Serie[]) => {

          console.log(series);
          const newResult = [...this.multi];
          newResult.forEach( (element: any) => {
            element.series = series;
            this.ordersLength = series.length;
          })

          this.multi = [...newResult]

        }, error => {
          console.log('Error request getOrdersByDateCreatedAndCounts', error);
          this.ordersLength = 0;
        })
  }


  onDateFromSelection(date: NgbDate): void {

    if (!this.dateToControl.value) {
      this.dateToControl.setValue({ year: date.year, month: date.month, day: date.day });
    }
    this.loadSalesByBusinessDateCreated();
  }

  onDateToSelection(date: NgbDate): void {
    if (!this.dateFromControl.value) {
      this.dateFromControl.setValue({ year: date.year, month: date.month, day: date.day });
    }

    this.loadSalesByBusinessDateCreated();
  }


  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 400];
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
   clearInterval( this.interval )

  }


  private buildDateFilter(): void {

    if (this.dateFromControl.value !== null) {
      console.log(this.dateFromControl.value)
      const temporal = this.dateFromControl.value.year + this.momentService.helperZeroBeforeMonthOrDay(this.dateFromControl.value.month) + this.momentService.helperZeroBeforeMonthOrDay(this.dateFromControl.value.day);
      this.dateFrom = +temporal;
    } else { this.dateFrom = 0 }

    if (this.dateToControl.value !== null) {
      console.log(this.dateToControl.value)
      const temporal = this.dateToControl.value.year + this.momentService.helperZeroBeforeMonthOrDay(this.dateToControl.value.month) + this.momentService.helperZeroBeforeMonthOrDay(this.dateToControl.value.day);
      this.dateTo = +temporal;
    } else { this.dateTo = 99999999 }

  }


}


