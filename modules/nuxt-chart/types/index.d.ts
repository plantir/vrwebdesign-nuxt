export interface IChart {
  type: string
  title: string
  subTitle?: string
  xAxisCategories: string[]
  yTitle?: string
  dataSeries: IDataSeries[]
}

export interface IPieChart {
  title: string
  dataSeries: IPieDataSeries[]
}

export interface IDataSeries {
  name: string
  data: (number | string)[]
}

export interface IPieDataSeries {
  name: string
  amount: number
}
export interface VRChartOption {
  yAxis_title?: String
  start_date?: String
  end_date?: String
  title?: String
  subtitle?: String
  type?: String // chart type
  filters?: String[] // general filter
  series?: any[]
}
