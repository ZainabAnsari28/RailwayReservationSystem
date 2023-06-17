import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import AddTrain from "./components/AddTrain";
import SearchService from "./Services/SearchService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const TrainList = () => {
  /**To Show Add Toastify Text */
  const notify = () => {
    toast.success("Train Updated Successfully", {
      position: "top-center",
      autoClose: 3000,
    });
  };
  /**To Show Delete Toastify Text */
  const showdelete = () => {
    toast.error("Train Deleted", {
      position: "top-center",
      autoClose: 3000,
    });
  };
  const [Trains, setTrains] = useState([]);
  useEffect(() => {
    getAllTrains();
  }, []);

  const getAllTrains = () => {
    SearchService.getAllTrains()
      .then((response) => {
        setTrains(response.data);
        console.log(response.date);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTrain = (trainNo) => {
    SearchService.deleteTrain(trainNo)
      .then((response) => {
        getAllTrains();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div class="container ">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded w-100">
        <div class="row ">
          <div class="col-sm-3 mt-5 mb-4 text-gred"></div>
          <div
            class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "#D2691E" }}
          >
            <h2>
              <b>TRAIN DETAILS</b>
            </h2>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive ">
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>TrainNo </th>
                  <th>TrainName </th>
                  <th>SourceStation </th>
                  <th>DestinationStation </th>
                  <th>ArrivalTime </th>
                  <th>DepartureTime </th>
                  <th>Duration </th>
                  <th>NoOfSeats </th>
                  <th>FirstClass </th>
                  <th>SecondClass </th>
                  <th>ThirdClass </th>
                  <th>Sleeper </th>
                  <th>Actions </th>
                </tr>
              </thead>
              <tbody>
                {Trains.map((TrainDetails) => (
                  <tr key={TrainDetails.trainNo}>
                    <td> {TrainDetails.trainNo} </td>
                    <td> {TrainDetails.trainName} </td>
                    <td> {TrainDetails.sourceStation} </td>
                    <td>{TrainDetails.destinationStation}</td>
                    <td>{TrainDetails.arrivalTime}</td>
                    <td>{TrainDetails.deptTime}</td>
                    <td>{TrainDetails.duration}</td>
                    <td>{TrainDetails.noOfSeats}</td>
                    <td> {TrainDetails.firstClassACFare} </td>
                    <td> {TrainDetails.twoTierAcFare} </td>
                    <td> {TrainDetails.threeTierAcFare} </td>
                    <td> {TrainDetails.sleeperFare} </td>
                    <td>
                      <Link
                        className="btn btn-info"
                        to={`/edit-train/${TrainDetails.trainNo}`}
                      >
                        {" "}
                        Update{" "}
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteTrain(TrainDetails.trainNo);
                          showdelete();
                        }}
                        style={{ marginLeft: "2px", marginTop: "5px" }}
                      >
                        Delete{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* <!--- Model Box ---> */}
        <div className="model_box">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Train</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddTrain />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Model Box Finish*/}
        </div>
      </div>
    </div>
  );
};

export default TrainList;
