import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchService from "../Services/SearchService";
import "./Search.css";
import { toast } from "react-toastify";
import { Table } from "react-bootstrap";

const Search = () => {
  const [trains, setTrains] = useState([]);
  const [trainNo, setTrainNo] = useState("");
  const [sourceStation, setSourceStation] = useState("");
  const [destinationStation, setDestinationStation] = useState("");
  const [show, setShow] = useState(false);
  const [token, setToken] = useState("");
  const notify1 = () => {
    toast.error("   Train not found!!", {
      position: "top-center",
      autoClose: 3002,
    });
  };
  useEffect(() => {
    (async function getToken() {
      const raw = JSON.parse(localStorage.getItem("token"));
      setToken(raw);
    })();
  }, []);

  const searchTrain = (e) => {
    e.preventDefault();

    SearchService.getTrainsByRoute(sourceStation, destinationStation)
      .then((response) => {
        console.log(response);
        setTrains(response.data);
        if (response.data.length === 0) {
          //alert("Train not found");
          notify1();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchTrainbyNo = (event) => {
    console.log(trainNo, "Train no");
    event.preventDefault();
    SearchService.getTrainById(trainNo)
      .then((response) => {
        console.log(response, "REsponse in Search Train");
        setTrains([response.data]);
        if (response.data.length === 0) {
          alert("Train not found");
        }
        console.log(trains.length, "Train ki length");
      })
      .catch((error) => {
        console.log(error);
        // alert("Train not found");
        notify1();
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="search-container">
      <h1 className="searching">SEARCH TRAINS</h1>
      <hr />
      <div className="form-searching">
        <Table>
          <tr>
            <td>
              <label>
                <b>Source Station :- </b>
              </label>
              <br></br>
              <br></br>
              <select
                name="sourceStation"
                id="sourceStation"
                required
                value={sourceStation}
                onChange={(e) => setSourceStation(e.target.value)}
              >
                <option value="">Enter Start Station</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Ludhiana">Ludhiana</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Patna">Patna</option>
              </select>
            </td>

            <br></br>
            <br></br>
            <td>
              <label>
                <b> Destination Station :- </b>
              </label>
              <br></br>
              <br></br>
              <select
                name="destinationStationn"
                id="destinationStation"
                required
                value={destinationStation}
                onChange={(e) => setDestinationStation(e.target.value)}
              >
                <option value="">Enter End Station</option>
                <option value="jabalpur">jabalpur</option>
                <option value="jaipur">jaipur</option>
                <option value="Ujjain">Ujjain</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Hydrabad">Hydrabad</option>
                <option value="Ajmer">Ajmer</option>
                <option value="Nagpur">Nagpur</option>
              </select>
            </td>
          </tr>
        </Table>
        <hr />
        <button className="btn btn-success" onClick={searchTrain}>
          Search Trains
        </button>
      </div>

      <div className="container">
        <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
          <div className="row">
            <div className="col-sm-3 mt-5 mb-4 text-gred">
              <div className="search">
                <form className="form-inline">
                  <input
                    type="text"
                    name="trainNo"
                    id="trainNo"
                    value={trainNo}
                    onChange={(event) => setTrainNo(event.target.value)}
                    required
                    placeholder="Search Train"
                    aria-label="Search"
                  />
                  <button className="btn btn-success" onClick={searchTrainbyNo}>
                    Search Trains
                  </button>
                </form>
              </div>
            </div>

            <div
              className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
              style={{ color: "#D2691E" }}
            >
              <h3>
                <b>LIST OF TRAINS AVAILABLE</b>
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="table-responsive">
              {trains && (
                <table className="table table-striped table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>TrainNo</th>
                      <th>TrainName</th>
                      <th>SourceStation</th>
                      <th>DestinationStation</th>
                      <th>ArrivalTime</th>
                      <th>DepartureTime</th>
                      <th>Duration</th>
                      <th>NoOfSeats</th>
                      <th>FirstClass</th>
                      <th>SecondClass</th>
                      <th>ThirdClass</th>
                      <th>Sleeper</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trains.map((TrainDetails) => (
                      <tr key={TrainDetails.trainNo}>
                        <td>{TrainDetails.trainNo}</td>
                        <td>{TrainDetails.trainName}</td>
                        <td>{TrainDetails.sourceStation}</td>
                        <td>{TrainDetails.destinationStation}</td>
                        <td>{TrainDetails.arrivalTime}</td>
                        <td>{TrainDetails.deptTime}</td>
                        <td>{TrainDetails.duration}</td>
                        <td>{TrainDetails.noOfSeats}</td>
                        <td>{TrainDetails.firstClassACFare}</td>
                        <td>{TrainDetails.twoTierAcFare}</td>
                        <td>{TrainDetails.threeTierAcFare}</td>
                        <td>{TrainDetails.sleeperFare}</td>
                        <td>
                          {token && (
                            <Link
                              className="btn btn-info"
                              to={{
                                pathname: "/Booking",
                                state: { TrainDetails },
                              }}
                            >
                              book
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="model_box">
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
              </Modal.Header>
              <Modal.Body></Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
