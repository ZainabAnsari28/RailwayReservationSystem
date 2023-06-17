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
import SearchService from "../Services/SearchService.js";
import { Link } from "react-router-dom";
import "./PaymentSuccess.css";
import BookService from "../Services/BookService";
import { toast } from "react-toastify";
import { ceil } from "lodash";
toast.configure();

function PaymentSuccess() {
  useEffect(() => {
    (async function getPnr() {
      const raw = await JSON.parse(localStorage.getItem("pnrNo"));
      setpnrNo(raw);
      const details = await BookService.searchByPnr(raw);
      settrainNo(details.data.trainNo);
      settrainName(details.data.trainName);
      setsourceStation(details.data.sourceStation);
      setclassType(details.data.classType);
      setdestinationStation(details.data.destinationStation);
      setDate(details.data.journeyDate);
      setPassengerNo(details.data.passengerNo);
      console.log(details, "Details");
      setpayment(details.data.totalFare);
      console.log(payment, "Payment");
      console.log(date, "Date");
    })();
  }, []);

  const [trainNo, settrainNo] = useState("");
  const [trainName, settrainName] = useState("");
  const [sourceStation, setsourceStation] = useState("");
  const [destinationStation, setdestinationStation] = useState("");
  const [classType, setclassType] = useState("");
  const [payment, setpayment] = useState("");
  const [pnrNo, setpnrNo] = useState("");
  const [date, setDate] = useState("");
  const [passengerNo, setPassengerNo] = useState("");

  const generatePdf = () => {
    const bookingData = {
      pnrNo: pnrNo,
      trainNo: trainNo,
      trainName: trainName,
      sourceStation: sourceStation,
      destinationStation: destinationStation,
      passengerNo: passengerNo,
      date: date,
      classType: classType,
      payment: payment,
    };

    console.log(bookingData, "Booking Data");
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
            pnrNo: {bookingData.pnrNo}
          </Text>
          <Text style={{ display: "flex", paddingBottom: 10, paddingLeft: 50 }}>
            trainNo: {bookingData.trainNo}
          </Text>
          <Text style={{ display: "flex", paddingBottom: 10, paddingLeft: 50 }}>
            trainName: {bookingData.trainName}
          </Text>
          <Text style={{ display: "flex", paddingBottom: 10, paddingLeft: 50 }}>
            sourceStation: {bookingData.sourceStation}
          </Text>
          <Text style={{ display: "flex", paddingBottom: 10, paddingLeft: 50 }}>
            destinationStation: {bookingData.destinationStation}
          </Text>
          <Text style={{ display: "flex", paddingBottom: 10, paddingLeft: 50 }}>
            TotalPassenger: {bookingData.passengerNo}
          </Text>
          <Text style={{ display: "flex", paddingBottom: 10, paddingLeft: 50 }}>
            date: {bookingData.date}
          </Text>
          <Text style={{ display: "flex", paddingBottom: 10, paddingLeft: 50 }}>
            classType: {bookingData.classType}
          </Text>
          <Text style={{ display: "flex", paddingBottom: 10, paddingLeft: 50 }}>
            payment: {bookingData.payment}
          </Text>
        </Page>
      </Document>
    );
    return (
      <PDFDownloadLink
        style={{ paddingLeft: 50 }}
        document={<MyDoc bookingData={bookingData} />}
        fileName="TicketDetails.pdf"
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
        <div class="topHalf">
          <p>
            <svg viewBox="0 0 512 512" width="100" title="check-circle">
              <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
            </svg>
          </p>
          <h1>Ticket Booked!!!</h1>

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
            {/* You Will Receive Your Ticket Details In Email Soon, */}
            <h3>
              <b>THANK YOU FOR USING TRAINYATRA</b>
              <br></br>Your PnrNo is :{pnrNo}
              <br></br>
            </h3>
          </p>

          <Link to="/" className="btn btn-info">
            Back to Home Page
          </Link>
        </div>
        {generatePdf()}
      </div>
    </div>
  );
}

export default PaymentSuccess;
