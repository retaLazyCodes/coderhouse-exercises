export class ProductService {
  constructor (serverAddress, endpoint, axios) {
    this.serverAddress = serverAddress
    this.endpoint = endpoint
    this.axios = axios
  }

  async getAll () {
    return await this.axios.get(this.serverAddress + this.endpoint)
  }
  async getById (id) {
    return await this.axios.get(`${this.serverAddress}${this.endpoint}/${id}`)
  }
  async save (product) {
    return await this.axios.post(this.serverAddress + this.endpoint)
  }
  async update (id, product) {

  }
  async delete (id) {

  }

}