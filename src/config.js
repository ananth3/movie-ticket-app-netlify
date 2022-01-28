import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://movie-ticket-booking-apis.herokuapp.com/api",
});
