import axios from "axios";

const { FLUTTER_SECRET } = process.env;

const http = axios.create({
  baseURL: "",
  timeout: 3000000,
  headers: {
    Authorization: `Bearer ${FLUTTER_SECRET}`,
  },
});

export const verifyFlutterTransaction = async (reference: string) => {
  const { data } = await http
    .get(`https://api.flutterwave.com/v3/transactions/${reference}/verify`)
    .catch((e) => {
      throw e;
    });
  return data.data;
};
