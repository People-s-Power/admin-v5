import axios from "axios";

const { PAYSTACK_SECRET } = process.env;

const http = axios.create({
  baseURL: "https://api.paystack.co/",
  timeout: 3000000,
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET}`,
  },
});


export const transferRecipient = async (name: string, account_number: string, bank_code: string) => {
  try {
    const { data } = await http.post(
      'transferrecipient', {
        type: "nuban",
        name,
        account_number,
        bank_code,
        currency: "NGN"
      }
    )

    return data.data
  } catch (error) {
    console.log(error.data)
    throw error
  }
}

export const transferBalance =async (amount: number, recipient: string) => {
  try {
    const { data } = await http.post(
      'transfer', {
        source: "balance",
        amount: amount,
        recipient,
        reason: "Wallet withdrawal"
      }
    )

    return data.data
  } catch (error) {
    console.log(error.data)
    throw error
  }
}

export const finalize_transfer =async (transfer_code: string, otp: string) => {
  try {
    const { data } = await http.post(
      'transfer/finalize_transfer', {
        transfer_code,
        otp
      }
    )
      console.log(data)
    return data.data
  } catch (error) {
    console.log(error.data)
    throw error
  }
}