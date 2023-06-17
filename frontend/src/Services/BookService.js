import axios from "axios";
const BOOK_TRAIN_TICKET = "http://localhost:8085/user/book";
const CANCEL_TRAIN_TICKET = "http://localhost:8085/user/cancel";
const GET_TRAIN_BY_PNR = "http://localhost:8085/user/getDetailsByPnrNo";
class BookService {
  bookTrain(UserDetails) {
    return axios.post(BOOK_TRAIN_TICKET, UserDetails);
  }

  deleteBook(PnrNo) {
    return axios.put(CANCEL_TRAIN_TICKET + "/" + PnrNo);
  }

  searchByPnr(PnrNo) {
    return axios.get(GET_TRAIN_BY_PNR + "/" + PnrNo);
  }
}
export default new BookService();
