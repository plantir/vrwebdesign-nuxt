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
