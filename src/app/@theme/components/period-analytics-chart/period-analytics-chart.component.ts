import { delay, takeWhile } from 'rxjs/operators';
import { AfterViewInit, Component, Input, OnDestroy, Output, EventEmitter, OnChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { LayoutService } from '../../../@core/utils';
import { LegendItemModel } from '../../../@core/entities/legend-item.model';

@Component({
  selector: 'frk-period-analytics-chart',
  styleUrls: ['./period-analytics-chart.component.scss'],
  templateUrl: './period-analytics-chart.component.html'
})
export class PeriodAnalyticsChartComponent implements AfterViewInit, OnChanges, OnDestroy {

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
        boundaryGap: false,
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
      series: [
        this.getOuterLine(eTheme),
      ],
    };
  }

  getOuterLine(eTheme) {
    let chartData: any[] = this.chartData;
    chartData = chartData.reverse();
    return {
      type: 'line',
      smooth: true,
      symbolSize: 20,
      itemStyle: {
        normal: {
          opacity: 0,
        },
        emphasis: {
          color: '#ffffff',
            borderColor: eTheme.itemBorderColor,
            borderWidth: 2,
            opacity: 1,
        },
      },
      lineStyle: {
        normal: {
          width: eTheme.lineWidth,
          type: eTheme.lineStyle,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: eTheme.lineGradFrom,
          }, {
            offset: 1,
            color: eTheme.lineGradTo,
          }]),
          shadowColor: eTheme.lineShadow,
          shadowBlur: 6,
          shadowOffsetY: 12,
        },
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: eTheme.areaGradFrom,
          }, {
            offset: 1,
            color: eTheme.areaGradTo,
          }]),
        },
      },
      data: chartData.reverse().map(i => i.value),
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
