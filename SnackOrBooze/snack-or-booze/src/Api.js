// Application API calls

import axios from "axios";

const BASE_API_URL = "http://localhost:5000";

// get list of refreshments based on type: snacks / drinks

export async function getRefreshments(type) {
  let response = await axios.get(`${BASE_API_URL}/${type}`);
  return response.data;
}

// post new item. type = drinks / snacks
export async function addItem(type, data) {
  await axios.post(`${BASE_API_URL}/${type}`, data);
}

// export async function addItemApi(type, data) {
//   try {
//     const response = await axios.post(`${BASE_API_URL}/${type}`, data);
//     return response.data;
//   } catch (error) {
//     console.error("Error adding item:", error);
//     throw new Error("Failed to add item");
//   }
// }
