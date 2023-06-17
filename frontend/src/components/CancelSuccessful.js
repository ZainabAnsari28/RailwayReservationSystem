import React, { useRef, useState, useEffect } from "react";
import TableRows from "./TableRows";
import { useHistory, useParams } from "react-router-dom";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";

import { Link } from "react-router-dom";

import BookService from "../Services/BookService";
import { toast } from "react-toastify";
import { ceil } from "lodash";
import "./CancelSuccess.css";

toast.configure();

function CancelSucccessful() {
  useEffect(() => {
    (async function getPnr() {
      const raw = await JSON.parse(localStorage.getItem("pnrNo"));

      const details = await BookService.searchByPnr(raw);
      settrainNo(details.data.trainNo);
      settrainName(details.data.trainName);

      setclassType(details.data.classType);
      setbookingStatus(details.data.bookingStatus);

      console.log(details, "Details");
      setpayment(details.data.totalFare);
      console.log(payment, "Payment");
    })();
  }, []);

  const [trainNo, settrainNo] = useState("");
  const [trainName, settrainName] = useState("");
  const [classType, setclassType] = useState("");
  const [payment, setpayment] = useState("");
  const [bookingstatus, setbookingStatus] = useState("");

  const generatePdf = () => {
    const bookingData = {
      trainNo: trainNo,
      trainName: trainName,
      bookingstatus: bookingstatus,
      classType: classType,
      payment: payment,
    };

    const MyDoc = ({ bookingData }) => (
      <Document>
        <Page>
          <Text
            style={{
              display: "flex",
              alignSelf: "center",
              paddingBottom: 50,
              paddingTop: 50,
            }}
          >
            TRAINYATRA.COM
          </Text>
          <Text
            style={{
              display: "flex",
              alignSelf: "center",
              paddingBottom: 30,
              paddingTop: 20,
            }}
          >
            Details
          </Text>

          <Text style={{ display: "flex", paddingBottom: 10, paddingLeft: 50 }}>
            trainNo : {bookingData.trainNo}
          </Text>
          <Text style={{ display: "flex", paddingBottom: 10, paddingLeft: 50 }}>
            trainName : {bookingData.trainName}
          </Text>
          <Text style={{ display: "flex", paddingBottom: 10, paddingLeft: 50 }}>
            bookingstatus : {bookingData.bookingstatus}
          </Text>
          <Text style={{ display: "flex", paddingBottom: 10, paddingLeft: 50 }}>
            classType : {bookingData.classType}
          </Text>
          <Text style={{ display: "flex", paddingBottom: 10, paddingLeft: 50 }}>
            payment : {bookingData.payment}
          </Text>
        </Page>
      </Document>
    );
    return (
      <PDFDownloadLink
        style={{ paddingLeft: 50 }}
        document={<MyDoc bookingData={bookingData} />}
        fileName="Ticket Details.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download Details"
        }
      </PDFDownloadLink>
    );
  };

  return (
    <div class="wrapperAlert">
      <div class="contentAlert">
        <div class="top_Half">
          <p>
            <svg viewBox="0 0 512 512" width="100" title="check-circle">
              <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
            </svg>
          </p>
          <h1>Ticket Cancelled!!!</h1>

          <ul class="bg-bubbles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>

        <div class="bottomHalf">
          <p>
            Your payment will be credited into your account within 7 days.
            <h3>
              <b>THANK YOU FOR USING TRAINYATRA</b>
            </h3>{" "}
          </p>

          <Link to="/" className="btn btn-info">
            Back to Home Page
          </Link>
        </div>
        {/* PDF download link */}
        {generatePdf()}
      </div>
    </div>
  );
}

export default CancelSucccessful;
