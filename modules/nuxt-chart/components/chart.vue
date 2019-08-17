<style lang="scss" >
.highchart-wrapper {
  * {
    font-family: IranSans;
  }
  .highcharts-pie-series {
    .highcharts-label span {
      display: block;
      direction: rtl;
      text-align: right;
    }
  }

  .highcharts-label.highcharts-tooltip.highcharts-color-0 {
    direction: rtl;
    text-align: right;

    span {
      font-family: 'iranSans' !important;
    }

    b {
      direction: ltr;
      display: inline-block;
    }
  }
}
</style>

<template >
  <section class="highchart-wrapper" ref="chart"></section>
</template>
<script>
import Highcharts from 'highcharts'
export default {
  props: {
    type: {
      default: 'area'
    },
    title: {
      default: 'عنوان نمودار'
    },
    subtitle: {
      default: 'زیر عنوان نمودار'
    },
    series: {
      default: () => []
    },
    xAxis: {
      default: () => []
    },
    yAxis: {
      default: () => []
    }
  },
  mounted() {
    Highcharts.chart(this.$refs.chart, {
      chart: {
        type: this.type
      },
      title: {
        text: this.title
      },
      subtitle: {
        text: this.subtitle
      },
      xAxis: {
        title: {
          text: this.xAxis.title
        },
        labels: {
          formatter:
            this.xAxis.labels ||
            function() {
              return this.value
            }
        }
      },
      yAxis: {
        title: {
          text: this.yAxis.title
        },
        labels: {
          formatter:
            this.yAxis.labels ||
            function() {
              return this.value
            }
        }
      },
      series: this.series,
      tooltip: {
        crosshairs: true,
        useHTML: true,
        shared: true
      },

      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1
          }
        },
        area: {
          pointStart: 1940,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        },
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            useHTML: true,
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            connectorColor: 'silver'
          }
        },
        column: {
          borderRadius: 5
        }
      }
    })
  }
}
</script>
