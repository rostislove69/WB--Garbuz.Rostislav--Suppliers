import { SupplyData } from "./types";

class Api {
  private _baseUrl: string;
  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  async _requestResult(res: Response) {
    const result = await res.json();
    return res.ok ? result : Promise.reject(result.message);
  }

  createSupply(data: SupplyData) {
    return fetch(`${this._baseUrl}/supplies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    }).then((res) => this._requestResult(res));
  }

  updateSupply(data: SupplyData, id: string) {
    return fetch(`${this._baseUrl}/supplies/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    }).then((res) => this._requestResult(res));
  }

  getSupplys(page = 1, limit = 10) {
    return fetch(`${this._baseUrl}/supplies?page=${page}&limit=${limit}`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => this._requestResult(res));
  }

  deleteSupply(id: string) {
    return fetch(`${this._baseUrl}/supplies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => this._requestResult(res));
  }

  getSum() {
    return fetch(`${this._baseUrl}/sum`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => this._requestResult(res));
  }

  updateSum(sum: number) {
    return fetch(`${this._baseUrl}/sum/0`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          sum,
        },
      }),
    }).then((res) => this._requestResult(res));
  }
}

const mainApi = new Api("http://localhost:3001");

export default mainApi;
