import axios from "axios";
const TRAIN_SEARCH_ALL_URL = "http://localhost:8080/admin/all";
const TRAIN_SEARCH_BYROUTE = "http://localhost:8081/users/route";
const TRAIN_ADD_TRAIN_URL = "http://localhost:8080/admin/addtrain";
const TRAIN_GET_TRAIN_BY_ID_URL = "http://localhost:8080/admin/search";
const TRAIN_UPDATE_TRAIN_BY_ID_URL = "http://localhost:8080/admin/update";
const TRAIN_DELETE_TRAIN_BY_ID_URL = "http://localhost:8080/admin/delete";
const TRAIN_UPDATE_SEATNO = "http://localhost:8080/admin/updateSeats";

class SearchService {
  getAllTrains() {
    return axios.get(TRAIN_SEARCH_ALL_URL);
  }

  getTrainsByRoute(sourceStation, destinationStation) {
    return axios.get(
      TRAIN_SEARCH_BYROUTE + "/" + sourceStation + "/" + destinationStation
    );
  }

  addTrain(trainDetails) {
    return axios.post(TRAIN_ADD_TRAIN_URL, trainDetails);
  }

  getTrainById(trainNo) {
    return axios.get(TRAIN_GET_TRAIN_BY_ID_URL + "/" + trainNo);
  }

  updateTrain(trainNo, TrainDetails) {
    return axios.put(
      TRAIN_UPDATE_TRAIN_BY_ID_URL + "/" + trainNo,
      TrainDetails
    );
  }

  deleteTrain(trainNo) {
    return axios.delete(TRAIN_DELETE_TRAIN_BY_ID_URL + "/" + trainNo);
  }

  updateSeats(trainNo, noOfPassengers) {
    return axios.get(
      TRAIN_UPDATE_SEATNO + "/" + trainNo + "/" + noOfPassengers
    );
  }
}
export default new SearchService();
