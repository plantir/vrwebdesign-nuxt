<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ebedf2;
  min-height: 60px;
  align-items: center;
  position: relative;
  padding: 0 25px;
  .header-label {
    display: flex;
    align-items: center;
    h3 {
      margin: 0;
      padding: 0;
      font-size: 1.2rem;
      font-weight: 500;
      color: #464457;
    }
  }
}
.toolbar {
  display: flex;
  align-items: center;
}
.filter_section {
  overflow: hidden;
  transition: 0.2s;
  > div {
    padding: 25px;
  }
}
.highchart-wrapper {
  padding-top: 2rem;
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

<template>
  <section>
    <div class="header">
      <div class="header-label">
        <h3>{{ options.title }}</h3>
      </div>
      <div class="toolbar">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              @click="showDateFilter = !showDateFilter"
              v-on="on"
              flat
              icon
            >
              <v-icon>date_range</v-icon>
            </v-btn>
          </template>
          <span>فیلتر زمان</span>
        </v-tooltip>
      </div>
    </div>
    <div class="filter_section">
      <transition
        name="fade"
        enter-active-class="fade-enter-active"
        leave-active-class="fade-leave-active"
      >
        <v-layout row wrap v-if="showDateFilter">
          <v-flex xs12 md6 px-4>
            <vr-date-picker
              append-icon="la-calendar"
              v-model="date.start_date"
              type="date"
              label="تاریخ شروع فیلتر را وارد نمایید"
              format="jYYYY/jMM/jDD"
              valueFormat="YYYY-MM-DD"
            ></vr-date-picker>
          </v-flex>
          <v-flex xs12 md6 px-4>
            <vr-date-picker
              append-icon="la-calendar"
              outlined
              v-model="date.end_date"
              type="date"
              @change="changeChart"
              label="تاریخ پایان فیلتر را وارد نمایید"
              format="jYYYY/jMM/jDD"
              valueFormat="YYYY-MM-DD"
              :disabled="!date.start_date"
            ></vr-date-picker>
          </v-flex>
        </v-layout>
      </transition>
    </div>
    <section class="highchart-wrapper" ref="chart"></section>
  </section>
</template>
<script>
const YAXIS_OBJ = {
  title: {
    text: 'عنوان نمودار Y',
  },
  labels: {
    formatter: function () {
      return this.value
    },
  },
}
const XAXIS_OBJ = {
  labels: {
    formatter: function () {
      return this.value
    },
  },
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
    dateFilter: {},
    options: {
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      date: {
        start_date: '',
        end_date: '',
      },
      showDateFilter: false,
    }
  },
  async mounted() {
    this.init()
  },
  methods: {
    refresh() {
      this.dateFilter(this.date)
      this.init()
    },
    async init() {
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
          type: options.type,
        },
        title: {
          text: options.title,
        },
        subtitle: {
          text: options.subtitle,
        },
        xAxis: options.xAxis,
        yAxis: options.yAxis,
        series: options.series,
        tooltip: {
          crosshairs: true,
          useHTML: true,
          shared: true,
        },

        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: '#666666',
              lineWidth: 1,
            },
          },
          area: {
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2,
              states: {
                hover: {
                  enabled: true,
                },
              },
            },
          },
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              useHTML: true,
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              connectorColor: 'silver',
            },
          },
          column: {
            borderRadius: 5,
          },
        },
      })
    },
    async changeChart() {
      this.refresh()
    },
  },
}
</script>
