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
import { NuxtAxiosInstance } from '../modules/nuxt-axios/types'
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
export class BaseService<T> {
  path
  constructor(public $axios: NuxtAxiosInstance, path) {
    this.path = path
  }
  get(id: number | string): Promise<AxiosResponse<T>> {
    return this.$axios.get(this.path + '/' + id)
  }
  save(obj: any): Promise<AxiosResponse<T>> {
    return this.$axios.post(this.path, obj)
  }
  query(params?: Iparams): Promise<AxiosResponse<IListOption<T>>> {
    return this.$axios.get(this.path, { params })
  }
  update(id: number | string, obj: any): Promise<AxiosResponse<T>> {
    return this.$axios.put(this.path + '/' + id, obj)
  }
  delete(id: number | string): Promise<AxiosResponse<T>> {
    return this.$axios.delete(this.path + '/' + id)
  }
  chart(obj: any) {
    return this.$axios.post(this.path + '/chart', obj)
  }
  recycle(id: number) {
    return this.$axios.put(this.path + '/' + id + '/recycle')
  }
  $get(id: number | string): Promise<T> {
    return this.$axios.$get(this.path + '/' + id)
  }
  $save(obj: any): Promise<T> {
    return this.$axios.$post(this.path, obj)
  }
  $query(params?: Iparams): Promise<IListOption<T>> {
    return this.$axios.$get(this.path, { params })
  }
  $update(id: number | string, obj: any): Promise<T> {
    return this.$axios.$put(this.path + '/' + id, obj)
  }
  $delete(id: number | string): Promise<T> {
    return this.$axios.$delete(this.path + '/' + id)
  }
  $chart(obj: any) {
    return this.$axios.$post(this.path + '/chart', obj)
  }
  $recycle(id: number) {
    return this.$axios.$put(this.path + '/' + id + '/recycle')
  }
}
