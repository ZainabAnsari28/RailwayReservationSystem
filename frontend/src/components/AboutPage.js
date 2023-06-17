import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontSize: "20px",
  },
  heading: {
    fontSize: "38px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  section: {
    marginBottom: "20px",
    fontSize: "20px",
  },
});

const AboutPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.heading}>About Railway Reservation</div>

      <div className={classes.section}>
        <h3>Features</h3>
        <ul>
          Train Search: Search for trains based on various criteria.<br></br>
          Train Details: View train details including fare and timing .<br></br>
          Booking: Book train tickets
          <br></br>
          Cancellation: Cancel train tickets
        </ul>
      </div>

      <div className={classes.section}>
        <h3>Design and Interface</h3>
        <p>
          Our Railway Reservation web application provides a user-friendly
          interface . The modern and intuitive design makes it easy for users to
          navigate and interact with the application.
        </p>
      </div>

      <div className={classes.section}>
        <h3>Get Started</h3>
        <p>
          To start using our Railway Reservation application, navigate to the
          Train Search page and enter your travel preferences. You can then view
          train details, including fare and timing, and proceed to book or
          cancel your train tickets as needed.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
