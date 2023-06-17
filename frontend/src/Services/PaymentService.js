import axios from "axios";
const PAYMENT_TRAIN_TICKET = "http://localhost:8082/pay/add";

class BookService {
  makePayment(PaymentDetails) {
    return axios.post(PAYMENT_TRAIN_TICKET, PaymentDetails);
  }
}
export default new BookService();
