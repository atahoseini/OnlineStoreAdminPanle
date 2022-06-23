import baseRequest, { setToken } from "./baseRequest";

export const cityServices = {
  getProvince: async data => baseRequest(data, "/city/provinces", "get", true),
  getWithProvinceId: async id => baseRequest(null, `/city/?provinceId=${id}`, "get", true)
}
