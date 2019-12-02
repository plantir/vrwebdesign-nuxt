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

  .highcharts-label.highcharts-tooltip {
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
const YAXIS_OBJ = {
  title: {
    text: 'عنوان نمودار Y'
  },
  labels: {
    formatter: function() {
      return this.value
    }
  }
}
const XAXIS_OBJ = {
  labels: {
    formatter: function() {
      return this.value
    }
  }
}
import Highcharts from 'highcharts'
export default {
  props: {
    type: {},
    title: {},
    subtitle: {},
    series: {},
    xAxis: {},
    yAxis: {},
    service: {},
    options: {
      default: () => {
        return {}
      }
    }
  },
  async mounted() {
    let options
    if (this.service) {
      options = await this.service()
      options = Object.assign(options, this.options)
    } else {
      options = this.options
    }
    options.yAxis = Object.assign(YAXIS_OBJ, options.yAxis || {})
    options.xAxis = Object.assign(XAXIS_OBJ, options.xAxis || {})
    Highcharts.chart(this.$refs.chart, {
      chart: {
        type: options.type
      },
      title: {
        text: options.title
      },
      subtitle: {
        text: options.subtitle
      },
      xAxis: options.xAxis,
      yAxis: options.yAxis,
      series: options.series,
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
