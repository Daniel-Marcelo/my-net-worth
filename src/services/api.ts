import axios, { AxiosRequestConfig } from "axios";

export class Api<T> {
  public readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = `${process.env.REACT_APP_API_URL}/${baseUrl}`;
  }

  get(id: string) {
    return axios.get(`${this.baseUrl}/${id}`);
  }

  create(item: T) {
    return axios.post(this.baseUrl, item);
  }

  delete(id: string) {
    return axios.delete(`${this.baseUrl}/${id}`);
  }

  getList() {
    return axios.get(`${this.baseUrl}`);
  }

  deleteList(ids: string) {
    return axios.delete(`${this.baseUrl}`, { ids } as AxiosRequestConfig<{ ids: number[] }>);
  }
}
