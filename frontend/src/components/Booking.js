import React, { useRef, useState, useEffect } from "react";
import TableRows from "./TableRows";
import { useHistory, useLocation, useParams } from "react-router-dom";
import BookService from "../Services/BookService";
import SearchService from "../Services/SearchService.js";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Booking.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Booking = () => {
  const location = useLocation();
  const TrainDetails = location.state && location.state.TrainDetails;
  const notify = () => {
    toast.error("Something went wrong", {
      position: "top-center",
      autoClose: false,
    });
  };

  const [totalSeats, setSeat] = useState("");
  const [trainNo, settrainNo] = useState("");
  const [trainName, settrainName] = useState("");
  const [sourceStation, setsourceStation] = useState("");
  const [destinationStation, setdestinationStation] = useState("");
  const [classType, setclassType] = useState("");
  const [payment, setpayment] = useState("");
  const [pnrNo, setpnrNo] = useState("");
  const history = useHistory();
  const [date, setDate] = useState("");
  const dateInputRef = useRef(null);
  const [rowsData, setRowsData] = useState([]);
  const currentDate = new Date().toISOString().split("T")[0];

  const handleDateChange = (event) => {
    event.preventDefault();
    const selectedDate = event.target.value;
    setDate(selectedDate);
    console.log(selectedDate);
  };
  const handleChange = (index, event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };

  const addTableRows = (event) => {
    event.preventDefault();
    if (rowsData.length < 3) {
      const rowsInput = {
        Name: "",
        Age: "",
        Gender: "",
      };

      setRowsData([...rowsData, rowsInput]);
    } else {
      //window.alert("maximun no.of passenger exceeded!!");
      const notify2 = () => {
        toast.error("maximun no.of passenger exceeded!!", {
          position: "top-center",
          autoClose: 3002,
        });
      };
      notify2();
    }
  };
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
    console.log(rows, "Rowsss");
  };
  const [visible, setVisible] = useState(false);
  const handleAvail = (e) => {
    e.preventDefault();
    if (trainNo) {
      setVisible(true);
    }
  };
  const bookTrain = (e) => {
    e.preventDefault();
    const name = [];
    const age = [];
    const gender = [];
    const passengers = [];
    rowsData.forEach((e) => {
      name.push(e.Name);
      age.push(e.Age);
      gender.push(e.Gender);
      passengers.push({ name: e.Name, age: e.Age, gender: e.Gender });
    });
    const passengerNo = name.length;
    const totalFare =
      classType === "FirstClassAC"
        ? rowsData.length * ac1Fare
        : classType === "TwoTierAc"
        ? rowsData.length * ac2Fare
        : classType === "ThreeTierAc"
        ? rowsData.length * ac3Fare
        : rowsData.length * sleeperFare;
    e.preventDefault();
    const UserDetails = {
      pnrNo,
      name,
      age,
      gender,
      passengers,
      date,
      trainNo,
      passengerNo,
      trainName,
      sourceStation,
      destinationStation,
      classType,
      totalFare,
    };
    console.log(UserDetails, "user ki api details");

    BookService.bookTrain(UserDetails)
      .then((response) => {
        var e = JSON.stringify(response.data);
        // alert(e);
        console.log("PNR NUMBER : " + response.data.pnrNo);
        const fare =
          classType === "FirstClassAC"
            ? rowsData.length * ac1Fare
            : classType === "TwoTierAc"
            ? rowsData.length * ac2Fare
            : classType === "ThreeTierAc"
            ? rowsData.length * ac3Fare
            : rowsData.length * sleeperFare;
        //  alert(`Please Pay Rs${fare}`);
        const notify1 = () => {
          toast.success(`Please Pay Rs${fare}`, {
            position: "top-center",
            autoClose: 3002,
          });
        };
        notify1();
        localStorage.setItem("pnrNo", JSON.stringify(response.data.pnrNo));
        console.log(response);
        console.log(response.data.pnrNo);
        history.push("/payment");
      })
      .catch((error) => {
        //alert("Something went wrong");
        notify();
        console.log(error);
      });
  };
  const [ac1Fare, setAcFare] = useState("");
  const [ac2Fare, setAc2Fare] = useState("");
  const [ac3Fare, setAc3Fare] = useState("");
  const [sleeperFare, setSlFare] = useState("");

  useEffect(() => {
    TrainDetails && settrainNo(TrainDetails.trainNo);
  }, []);
  useEffect(() => {
    SearchService.getTrainById(trainNo)
      .then((response) => {
        settrainNo(response.data.trainNo);
        settrainName(response.data.trainName);
        setsourceStation(response.data.sourceStation);
        setdestinationStation(response.data.destinationStation);
        setSeat(response.data.noOfSeats);
        setAcFare(response.data.firstClassACFare);
        setAc2Fare(response.data.twoTierAcFare);
        setAc3Fare(response.data.threeTierAcFare);
        setSlFare(response.data.sleeperFare);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [trainNo]);

  return (
    <div>
      <br></br>
      <br></br>
      <form>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <div className="card-body">
                <h1 className="booking">BOOKING FORM</h1>
                <hr></hr>

                <p className="instruction">
                  Please fill this form to book a train ticket.
                </p>

                <Table>
                  <tr>
                    <td>
                      <label>
                        <b>Train Number</b>
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
                          name="trainNo"
                          id="trainNo"
                          placeholder="Enter Your TrainNumber"
                          required
                          value={trainNo}
                          onChange={(e) => settrainNo(e.target.value)}
                        ></input>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="trainName"
                          id="trainName"
                          placeholder="Enter Your TrainName"
                          required
                          value={trainName}
                          onChange={(e) => settrainName(e.target.value)}
                        ></input>
                      </td>
                    </tr>
                  </tbody>
                </Table>

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

                <form>
                  <Table>
                    <tr>
                      <td>
                        <div className="form-group mb-2">
                          <label>
                            <b>Journey Date</b>
                            <input
                              type="date"
                              onChange={handleDateChange}
                              min={currentDate}
                              ref={dateInputRef}
                            />
                          </label>
                        </div>
                      </td>

                      <div className="form-group mb-2">
                        <label>
                          <b> Class Type </b>
                        </label>
                        <br></br>

                        <select
                          name="classType"
                          id="classType"
                          required
                          value={classType}
                          onChange={(e) => setclassType(e.target.value)}
                        >
                          <option value="">Select Class Type</option>
                          <option value="FirstClassAC">FirstClassAC</option>
                          <option value="TwoTierAc">TwoTierAc</option>
                          <option value="ThreeTierAc">ThreeTierAc</option>
                          <option value="Sleeper">Sleeper</option>
                        </select>
                      </div>
                    </tr>
                  </Table>
                  <button className="btn btn-success" onClick={handleAvail}>
                    Check Availability
                  </button>
                  {visible && (
                    <div className="availabity">
                      {totalSeats <= 0
                        ? "No Seats Are Available"
                        : totalSeats <= 3
                        ? `${totalSeats} Seats Are Available`
                        : "Seats Are Available. Please Add Passengers"}
                    </div>
                  )}
                  <div className=" mb-2">
                    <br></br>
                    <label>
                      <b>Add Passengers</b>
                    </label>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Age</th>
                          <th>Gender</th>
                          <th>
                            <button
                              className="btn btn-outline-success"
                              onClick={addTableRows}
                            >
                              +
                            </button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <TableRows
                          rowsData={rowsData}
                          deleteTableRows={deleteTableRows}
                          handleChange={handleChange}
                        />
                      </tbody>
                    </table>
                  </div>
                  <hr></hr>
                  <Link
                    className="btn btn-success"
                    onClick={(e) => {
                      bookTrain(e);
                    }}
                  >
                    BOOK{" "}
                  </Link>
                  <hr></hr>
                </form>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Booking;
