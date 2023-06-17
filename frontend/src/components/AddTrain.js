import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import SearchService from "../Services/SearchService.js";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const AddTrain = () => {
  /**To Show Add Train Toastify Text */
  const notify = () => {
    toast("Train Added Successfully", {
      position: "top-center",
      autoClose: 3002,
    });
  };
  const notify1 = () => {
    toast("Train Updated Successfully", {
      position: "top-center",
      autoClose: 3002,
    });
  };
  const error = () => {
    toast.error("Something wrong in data", {
      position: "top-center",
      autoClose: 2000,
    });
  };
  const [trainNo, settrainNo] = useState("");
  const [trainName, settrainName] = useState("");
  const [sourceStation, setsourceStation] = useState("");
  const [destinationStation, setdestinationStation] = useState("");
  const [arrivalTime, setarrivalTime] = useState("");
  const [deptTime, setdeptTime] = useState("");
  const [duration, setduration] = useState("");
  const [noOfSeats, setnoOfSeats] = useState("");
  const [firstClassACFare, setfirstClassACFare] = useState("");
  const [twoTierAcFare, settwoTierAcFare] = useState("");
  const [threeTierAcFare, setthreeTierAcFare] = useState("");
  const [sleeperFare, setsleeperFare] = useState("");
  const history = useHistory();
  const { id } = useParams();

  const saveOrUpdateTrains = (e) => {
    e.preventDefault();
    const TrainDetails = {
      trainNo,
      trainName,
      sourceStation,
      destinationStation,
      arrivalTime,
      deptTime,
      duration,
      noOfSeats,
      firstClassACFare,
      twoTierAcFare,
      threeTierAcFare,
      sleeperFare,
    };
    if (id) {
      SearchService.updateTrain(id, TrainDetails)
        .then((response) => {
          alert("Your Train has been updated");
          notify1();
          history.push("/adminTrainList");
        })
        .catch((err) => {
          console.log(err);
          error();
          //alert("Something wrong in data")
        });
    } else {
      SearchService.addTrain(TrainDetails)
        .then((response) => {
          console.log(response.data);
          notify();
          history.push("/adminTrainList");
        })
        .catch((err) => {
          console.log(err);
          error();
        });
    }
  };
  useEffect(() => {
    SearchService.getTrainById(trainNo)
      .then((response) => {
        settrainNo(response.data.trainNo);
        settrainName(response.data.trainName);
        setsourceStation(response.data.sourceStation);
        setdestinationStation(response.data.destinationStation);
        setarrivalTime(response.data.arrivalTime);
        setdeptTime(response.data.deptTime);
        setduration(response.data.duration);
        setnoOfSeats(response.data.noOfSeats);
        setfirstClassACFare(response.data.firstClassACFare);
        settwoTierAcFare(response.data.twoTierAcFare);
        setthreeTierAcFare(response.data.threeTierAcFare);
        setsleeperFare(response.data.sleeperFare);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [trainNo]);

  const title = () => {
    if (id) {
      return <h2 className="text-center">Update Train</h2>;
    } else {
      return <h2 className="text-center">Add Train</h2>;
    }
  };
  return (
    <div>
      <br></br>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {title()}

            <div className="card-body">
              <p className="instruction">
                Please fill in this form to add a train .
              </p>

              <form>
                <div className="form-group mb-2">
                  <Table>
                    <tr>
                      <td>
                        <label>
                          <b>Train No</b>
                        </label>
                      </td>
                      <td>
                        <label>
                          <b>Train Name</b>
                        </label>
                      </td>
                    </tr>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="text"
                            placeholder="Enter Train Number"
                            name="trainNo"
                            className="form-control"
                            value={trainNo}
                            onChange={(e) => settrainNo(e.target.value)}
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Enter Train Name"
                            name="trainName"
                            className="form-control"
                            value={trainName}
                            onChange={(e) => settrainName(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className="form-group mb-2">
                  <Table>
                    <tr>
                      <td>
                        <label htmlFor="sourceStation">
                          <b>Source Station</b>
                        </label>
                      </td>
                      <td>
                        <label htmlFor="destinationStation">
                          <b>Destination Station</b>
                        </label>
                      </td>
                    </tr>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="text"
                            name="sourceStation"
                            id="sourceStation"
                            placeholder="Enter Your SourceStation"
                            required
                            value={sourceStation}
                            onChange={(e) => setsourceStation(e.target.value)}
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            name="destinationStation"
                            id="destinationStation"
                            placeholder="Enter Your DestinationStation"
                            required
                            value={destinationStation}
                            onChange={(e) =>
                              setdestinationStation(e.target.value)
                            }
                          ></input>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                <div className="form-group mb-2">
                  <Table>
                    <tr>
                      <td>
                        <label htmlFor="destinationStation">
                          <b>ArrivalTime</b>
                        </label>
                      </td>
                      <td>
                        <label htmlFor="destinationStation">
                          <b>DeptTime</b>
                        </label>
                      </td>
                    </tr>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="text"
                            placeholder="Enter Arrival Time"
                            name="arrivalTime"
                            className="form-control"
                            value={arrivalTime}
                            onChange={(e) => setarrivalTime(e.target.value)}
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Enter Departure Time"
                            name="deptTime"
                            className="form-control"
                            value={deptTime}
                            onChange={(e) => setdeptTime(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                <div className="form-group mb-2">
                  <Table>
                    <tr>
                      <td>
                        <label>
                          <b>NoOfSeats</b>
                        </label>
                      </td>
                      <td>
                        <label>
                          <b>Duration</b>
                        </label>
                      </td>
                    </tr>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="text"
                            placeholder="Enter Number of seats"
                            name="noOfSeats"
                            className="form-control"
                            value={noOfSeats}
                            onChange={(e) => setnoOfSeats(e.target.value)}
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Enter Duration"
                            name="duration"
                            className="form-control"
                            value={duration}
                            onChange={(e) => setduration(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                <div className="form-group mb-2">
                  <Table>
                    <tr>
                      <td>
                        <label>
                          <b>firstClassACFare</b>
                        </label>
                      </td>
                      <td>
                        <label>
                          <b>TwoTierAcFare</b>
                        </label>
                      </td>
                    </tr>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="text"
                            placeholder="Enter FirstClass AC Fare"
                            name="firstClassACFare"
                            className="form-control"
                            value={firstClassACFare}
                            onChange={(e) =>
                              setfirstClassACFare(e.target.value)
                            }
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Enter TwoTier AC Fare"
                            name="twoTierAcFare"
                            className="form-control"
                            value={twoTierAcFare}
                            onChange={(e) => settwoTierAcFare(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                <div className="form-group mb-2">
                  <Table>
                    <tr>
                      <td>
                        <label>
                          <b>ThreeTierAcFare</b>
                        </label>
                      </td>
                      <td>
                        <label>
                          <b>sleeperFare</b>
                        </label>
                      </td>
                    </tr>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="text"
                            placeholder="Enter ThreeTier AC Fare"
                            name="threeTierAcFare"
                            className="form-control"
                            value={threeTierAcFare}
                            onChange={(e) => setthreeTierAcFare(e.target.value)}
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Enter SleeperFare"
                            name="sleeperFare"
                            className="form-control"
                            value={sleeperFare}
                            onChange={(e) => setsleeperFare(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                <Link
                  onClick={(e) => {
                    saveOrUpdateTrains(e);
                  }}
                  to="/adminTrainList"
                  className="btn btn-success"
                >
                  {" "}
                  Submit{" "}
                </Link>
                <Link
                  to="/admindashboard"
                  className="btn btn-danger"
                  style={{ marginLeft: 5 }}
                >
                  {" "}
                  Cancel{" "}
                </Link>
              </form>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default AddTrain;
