import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges, OnDestroy } from '@angular/core';
import { LegendItemModel } from '../../../@core/entities/legend-item.model';
import { NbThemeService } from '@nebular/theme';
import { LayoutService } from '../../../@core/utils';
import { takeWhile, delay } from 'rxjs/operators';

@Component({
  selector: 'frk-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent  implements AfterViewInit, OnChanges, OnDestroy {

  private alive = true;

  @Input() chartData: any;
  @Input() legend: LegendItemModel;
  @Input() filterOptions: any[];
  @Input() selectedFilter: any;
  @Output() onFilterChanged: EventEmitter<any> = new EventEmitter();

  option: any;
  themeSubscription: any;
  echartsIntance: any;
  

  constructor(private theme: NbThemeService,
              private layoutService: LayoutService) {
    this.layoutService.onSafeChangeLayoutSize()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe(() => this.resizeChart());
  }

  ngAfterViewInit(): void {
    this.initTheme();
  }

  ngOnChanges() {
    this.initTheme();
  }

  private initTheme() {
    this.theme.getJsTheme()
    .pipe(
      delay(1),
      takeWhile(() => this.alive),
    )
    .subscribe(config => {
      const eTheme: any = config.variables.visitors;
      this.setOptions(eTheme);
  });
  }

  setOptions(eTheme) {
    if (!this.chartData) {
      return;
    }
    let chartData: any[] = this.chartData;
    chartData = chartData.reverse();
    this.option = {
      grid: {
        left: 40,
        top: 20,
        right: 0,
        bottom: 60,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: eTheme.tooltipLineColor,
            width: eTheme.tooltipLineWidth,
          },
        },
        textStyle: {
          color: eTheme.tooltipTextColor,
          fontSize: 20,
          fontWeight: eTheme.tooltipFontWeight,
        },
        position: 'top',
        backgroundColor: eTheme.tooltipBg,
        borderColor: eTheme.tooltipBorderColor,
        borderWidth: 1,
        formatter: (params) => {
          return Math.round(parseInt(params[0].value, 10));
        },
        extraCssText: eTheme.tooltipExtraCss,
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        offset: 25,
        data: chartData.map(i => i.label),
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: eTheme.axisTextColor,
          fontSize: 14,
        },
        axisLine: {
          lineStyle: {
            color: eTheme.axisLineColor,
            width: '2',
          },
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: eTheme.axisLineColor,
            width: '1',
          },
        },
        axisLabel: {
          color: eTheme.axisTextColor,
          fontSize: eTheme.axisFontSize,
        },
        axisTick: {
          show: false,
        },
        splitLine: {

          lineStyle: {
            color: eTheme.yAxisSplitLine,
            width: '1',
          },
        },
      },
      series: [{
        type: 'bar',
        data: chartData.reverse().map(i => i.value),
        itemStyle: {color: 'blue'},
       // showBackground: true,
        backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
        }
    }]
    };
  }


  onChartInit(echarts) {
    this.echartsIntance = echarts;
  }

  resizeChart() {
    if (this.echartsIntance) {
      this.echartsIntance.resize();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  onChange($event) {
    this.onFilterChanged.emit($event);
  }
}
