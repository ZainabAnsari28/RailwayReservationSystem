import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Showcase from "./components/Showcase";
import Footer from "./components/Footer";
import Login from "./components/Login.js";
import Destinations from "./components/Destinations";
import Error from "./components/Error";
import Search from "./components/Search";
import AddTrain from "./components/AddTrain";
import TrainList from "./TrainList";
import Booking from "./components/Booking";
import UserRegister from "./components/UserRegister";
import BookingList from "./components/BookingList";
import PaymentForm from "./components/PaymentForm";
import UserLogin from "./components/UserLogin";
import PaymentSuccess from "./components/PaymentSuccess";
import AboutPage from "./components/AboutPage";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashBoard";
import CancelTicket from "./components/CancelTicket";
import CancelSucccessful from "./components/CancelSuccessful";
import { Container } from "react-bootstrap";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    (async function getToken() {
      const token = await JSON.parse(localStorage.getItem("token"));
      if (token) {
        setIsLoggedIn(true);
      }
    })();
  }, []);
  return (
    <Router>
      <Header
        isLoggedIn={isLoggedIn}
        onLogout={(status) => {
          console.log("onlogoin");
          setIsLoggedIn(false);
        }}
      />

      <Switch>
        <Route exact path="/">
          <Showcase />
          <Destinations />
          <Footer />
        </Route>

        <Route exact path="/login">
          <Login
            onLogin={(status) => {
              console.log("onlogoin");
              setIsLoggedIn(status);
            }}
          />
          <Footer />
        </Route>

        <Route path="/userregistration">
          <UserRegister />
          <Footer />
        </Route>
        <Route path="/CancelSuccessful">
          <CancelSucccessful />
          <Footer />
        </Route>

        <Route path="/userlogin">
          <UserLogin
            onLogin={(status) => {
              setIsLoggedIn(status);
            }}
          />
          <Footer />
        </Route>

        <Route exact path="/adminDashboard">
          <AdminDashboard />
          <Footer />
        </Route>
        <Route exact path="/userDashboard">
          <UserDashboard />
          <Footer />
        </Route>
        <Route exact path="/aboutpage">
          <Route path="/about" component={AboutPage} />
          <AboutPage />
          <Footer />
        </Route>

        <Route exact path="/adminTrainList">
          <TrainList />
          <Footer />
        </Route>

        <Route exact path="/trainList">
          <BookingList></BookingList>
          <Footer />
        </Route>

        <Route exact path="/booking">
          <Booking></Booking>
          <Footer />
        </Route>

        <Route exact path="/edit-train/:id">
          <AddTrain />
          <Footer />
        </Route>

        <Route exact path="/addTrain">
          <AddTrain />
          <Footer />
        </Route>

        <Route exact path="/search">
          <Search />
          <Footer />
        </Route>

        {/* <Route path="/checkin">
          <Booking />
          <Footer />
        </Route> */}
        <Route exact path="/cancelTicket">
          <CancelTicket />
          <Footer />
        </Route>
        <Route exact path="/payment">
          <PaymentForm></PaymentForm>
          <Footer />
        </Route>

        <Route exact path="/paymentSucessful">
          <PaymentSuccess></PaymentSuccess>
          <Footer />
        </Route>

        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
