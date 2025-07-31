import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  startAnimationForLineChart(chart) {
    let seq: any = 0, delays = 80, durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });
    seq = 0;
  }

  startAnimationForBarChart(chart) {
    let seq2: any = 0, delays2 = 80, durations2 = 500;

    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });
    seq2 = 0;
  }

  ngOnInit() {
    /* ---------- Répartition des Grades ---------- */
    const dataGradesChart: any = {
      labels: ['A', 'B', 'C', 'D', 'E'],
      series: [[30, 45, 25, 20, 10]]
    };

    const optionsGradesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({ tension: 0 }),
      low: 0,
      high: 60,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    const gradesChart = new Chartist.Line('#gradesDistributionChart', dataGradesChart, optionsGradesChart);
    this.startAnimationForLineChart(gradesChart);

    /* ---------- Documents Importés par Mois ---------- */
    const dataDocsChart = {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
      series: [[10, 20, 15, 25, 30, 28, 22]]
    };

    const optionsDocsChart = {
      lineSmooth: Chartist.Interpolation.cardinal({ tension: 0 }),
      low: 0,
      high: 40,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    };

    const docsChart = new Chartist.Line('#documentsPerMonthChart', dataDocsChart, optionsDocsChart);
    this.startAnimationForLineChart(docsChart);

    /* ---------- Ancienneté Moyenne ---------- */
    const dataSeniorityChart = {
      labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
      series: [[3.2, 3.5, 4.0, 4.2, 4.4, 4.6]]
    };

    const optionsSeniorityChart = {
      axisX: { showGrid: false },
      low: 0,
      high: 6,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };

    const responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];

    const seniorityChart = new Chartist.Bar('#averageSeniorityChart', dataSeniorityChart, optionsSeniorityChart, responsiveOptions);
    this.startAnimationForBarChart(seniorityChart);
  }
}
