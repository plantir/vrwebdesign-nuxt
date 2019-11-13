interface IListOption<T> {
  data: T[]
  perPage: number
  page: number
  lastPage: number
  total: number
}
interface Iparams {
  perPage?: number
  page?: number
  filters?: string
  sort?: string
}
import { AxiosResponse } from 'axios'
import { NuxtAxiosInstance } from '../../modules/nuxt-axios/types'
export interface IBaseService<T> {
  get(id: number | string): Promise<AxiosResponse<T>>
  save(obj: any): Promise<AxiosResponse<T>>
  query(params?: Iparams): Promise<AxiosResponse<IListOption<T>>>
  update(id: number | string, obj: any): Promise<AxiosResponse<T>>
  delete(id: number | string): Promise<AxiosResponse<T>>
  chart(obj: any): Promise<AxiosResponse<T>>
  recycle(id: number | string): Promise<AxiosResponse<T>>
  $get(id: number | string): Promise<T>
  $save(obj: any): Promise<T>
  $query(params?: Iparams): Promise<IListOption<T>>
  $update(id: number | string, obj: any): Promise<T>
  $delete(id: number | string): Promise<T>
  $chart(obj: any): Promise<T>
  $recycle(id: number | string): Promise<T>
}
declare const BaseService: IBaseService<T>
export default BaseService
