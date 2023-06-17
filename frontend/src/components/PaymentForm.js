import React, { useEffect, useState } from "react";
import PaymentService from "../Services/PaymentService";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentForm = () => {
  const [pnrNo, setpnrNo] = useState("");
  const [bankName, setbankName] = useState("");
  const [cardNo, setcardNo] = useState("");
  const [cvv, setcvv] = useState("");
  const [classType, setclassType] = useState("");
  const history = useHistory();

  useEffect(() => {
    (async function getPnr() {
      const raw = await JSON.parse(localStorage.getItem("pnrNo"));
      setpnrNo(raw);
    })();
  }, []);

  const makePayment = (e) => {
    e.preventDefault();
    const PaymentDetails = { pnrNo, bankName, cardNo, cvv };
    if (!bankName || !cardNo || !cvv) {
      // alert("Please Fill Out All Details");
      const notify = () => {
        toast.error("Please Fill Out All Details", {
          position: "top-center",
          autoClose: 3002,
        });
      };
      notify();
    } else if (cardNo.length !== 16) {
      //alert("Card Number should be exactly 16-digits.");
      const notify1 = () => {
        toast.error("Card Number should be exactly 16-digits.", {
          position: "top-center",
          autoClose: 3002,
        });
      };
      notify1();
    } else {
      PaymentService.makePayment(PaymentDetails)
        .then((response) => {
          var e = JSON.stringify(response.data);
          //alert(e);
          const notify2 = () => {
            toast.success("Payment Successful!!", {
              position: "top-center",
              autoClose: 3002,
            });
          };
          notify2();

          console.log(response);
          history.push("/paymentSucessful");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <React.Fragment>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <br></br>
            <br></br>
            <h2 className="text-center">Payment</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">BankName</label>

                  <input
                    type="text"
                    placeholder="Enter Bank Name"
                    name="bankName"
                    className="form-control"
                    required
                    value={bankName}
                    onChange={(e) => setbankName(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Card No</label>

                  <input
                    type="tel"
                    pattern="[0-9]*"
                    placeholder="Enter card No"
                    name="cardNo"
                    className="form-control"
                    required
                    value={cardNo}
                    onKeyPress={(event) => {
                      const regex = /^[0-9\b]+$/; // regular expression to allow only numeric values
                      if (!regex.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={(e) => setcardNo(e.target.value)}
                    autoComplete="off"
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">CVV</label>

                  <input
                    type="text"
                    placeholder="Enter cvv"
                    name="cvv"
                    className="form-control"
                    required
                    value={cvv}
                    onKeyPress={(event) => {
                      const regex = /^[0-9\b]+$/; // regular expression to allow only numeric values
                      if (!regex.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={(e) => setcvv(e.target.value)}
                  ></input>
                </div>

                <button
                  className="btn btn-success"
                  onClick={(e) => makePayment(e)}
                >
                  Pay
                </button>
                <Link to="/search" className="btn btn-danger">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </React.Fragment>
  );
};
export default PaymentForm;
