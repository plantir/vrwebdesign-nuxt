<style lang="scss">
.chart_wrapper {
  background-color: #ffffff;
  height: 100%;
  padding: 1rem;
  margin: 1rem;
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
      flex-direction: column;
      h3 {
        margin: 0;
        padding: 0;
        font-size: 1.2rem;
        font-weight: 500;
        color: #464457;
      }
      h5 {
        width: 85%;
        color: #464457;
        padding: 0.2rem 0;
        font-size: 1rem;
        font-weight: 500;
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
    padding-top: 4rem;
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
}
</style>

<template>
  <section>
    <div class="chart_wrapper">
      <div class="header">
        <div class="header-label">
          <h3>{{ options.title }}</h3>
          <h5 v-if="options.subtitle">{{options.subtitle}}</h5>
        </div>
        <div class="toolbar">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn @click="showDateFilter = !showDateFilter" v-on="on" flat icon>
                <v-icon>date_range</v-icon>
              </v-btn>
            </template>
            <span>فیلتر زمان</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn @click="refresh" v-on="on" flat icon>
                <v-icon>la-sync-alt</v-icon>
              </v-btn>
            </template>
            <span>تازه کردن اطلاعات</span>
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
                clearable
                type="date"
                @change="changeChart"
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
                clearable
                type="date"
                @change="changeChart"
                :min="date.start_date||null"
                label="تاریخ پایان فیلتر را وارد نمایید"
                format="jYYYY/jMM/jDD"
                valueFormat="YYYY-MM-DD"
              ></vr-date-picker>
            </v-flex>
          </v-layout>
        </transition>
      </div>
      <section class="highchart-wrapper" ref="chart"></section>
    </div>
  </section>
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
    dateFilter: {},
    options: {
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      timeout: null,
      showDateFilter: false,
      date: {
        start_date: null,
        end_date: null
      }
    }
  },
  async mounted() {
    this.init()
    this.options.reset = () => {
      this.refresh()
    }
  },
  methods: {
    async refresh() {
      this.init()
    },
    init() {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(async () => {
        let options
        if (this.service) {
          options = await this.service(this.options)
          // options = Object.assign(options, this.options)
        } else {
          options = this.options
        }
        options.yAxis = Object.assign(YAXIS_OBJ, options.yAxis || {})
        options.xAxis = Object.assign(XAXIS_OBJ, options.xAxis || {})
        Highcharts.chart(
          this.$refs.chart,
          {
            chart: {
              type: options.type
            },
            title: {
              text: ''
            },
            subtitle: {
              text: ''
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
          },
          200
        )
      })
    },
    async changeChart() {
      this.options.filters = this.options.filters.filter(
        item => !item.includes('created_at')
      )
      if (this.date.start_date) {
        this.options.filters.push(`created_at:${this.date.start_date}:>`)
        this.options.start_at = this.date.start_date
      }
      if (this.date.end_date) {
        this.options.filters.push(`created_at:${this.date.end_date}:<`)
        this.options.end_at = this.date.end_date
      }
      this.init()
      // this.date.haveDateFilter = true
      // await this.dateFilter(this.date)
    }
  }
}
</script>
