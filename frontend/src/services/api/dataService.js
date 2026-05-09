import axiosClient from "../../api/axiosClient.js";

export const fetchProductList = async (limit = 10, skip = 0) => {
  const response = await axiosClient.get(
    `/products?limit=${limit}&skip=${skip}`,
  );
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axiosClient.get("/products/categories");
  return response.data;
};
