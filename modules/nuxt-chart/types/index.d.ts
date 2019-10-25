export interface IChart {
  type: string,
  title: string,
  subTitle?: string,
  xAxisCategories: string[],
  yTitle?: string,
  dataSeries: IDataSeries[]
}

export interface IPieChart {
  title: string,
  dataSeries: IPieDataSeries[]
}

export interface IDataSeries {
  name: string,
  data: (number | string)[]
}

export interface IPieDataSeries {
  name: string,
  amount: number
}