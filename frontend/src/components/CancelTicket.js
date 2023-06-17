import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

import * as Yup from "yup";

import "./CancelTicket.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookService from "../Services/BookService";
import { useHistory, useParams } from "react-router-dom";

toast.configure();

const LoginSchema = Yup.object().shape({
  password: Yup.string().required("PNR Number is required!"),
});

const CancelTicket = () => {
  /**To Show Add Toastify Text */
  const notify = (type, message) => {
    toast[type](message, {
      position: "top-center",
      autoClose: 2000,
    });
  };

  /**To Show Error Toastify Text */
  const error = () => {
    toast.error("Invalid Credentials!!!", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const [PnrNo, setPnrNo] = useState("");
  // const [checked, setChecked] = React.useState(false);
  const history = useHistory();

  const onPnrChange = (event) => {
    setPnrNo(event.target.value);
  };
  // function handleChange(e) {
  //   setChecked(e.target.checked);
  // }

  const cancelTicket = async () => {
    try {
      const response = await BookService.deleteBook(PnrNo);
      console.log(response, "response of cancel ticket");
      notify("success", response.data);
      history.push("/cancelSuccessful");
    } catch (error) {
      console.log("Error in Cancelling", error.response.data);
      notify("error", error.response.data);
      error();
    }
  };

  return (
    <Formik
      initialValues={{
        PNRNumber: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={() => console.log("getting in")}
    >
      {() => (
        <Form>
          <div className="cancelTicket-container">
            {/* <div className="card col-md-6 offset-md-3 offset-md-3"> */}
            <h1 className="booking">COUNTER TICKET CANCELLATION</h1>
            <hr></hr>
            <div className="inner">
              <label>
                <b>PNR Number</b>
              </label>
              <Field
                name="PNRNumber"
                type="text"
                placeholder="Enter Your PNR Number"
                value={PnrNo}
                onChange={onPnrChange}
              />

              <br></br>
              <br></br>

              {/* <div>
                <input
                  value="Cancel"
                  type="checkbox"
                  required
                  onChange={handleChange}
                />
                <span>
                  {" "}
                  I have read cancellation/boarding page change procedure and
                  its rules.{" "}
                </span>
              </div> */}

              <br></br>
              <button
                className="btn btn-success"
                type="submit"
                onClick={cancelTicket}
              >
                Submit
              </button>
            </div>
          </div>
          {/* </div> */}
        </Form>
      )}
    </Formik>
  );
};
export default CancelTicket;
