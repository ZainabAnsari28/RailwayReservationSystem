import React from "react";
import shimla from "../assets/shimla.jpg";
import Kashmir from "../assets/Kashmir.jpg";
import rajdhani from "../assets/rajdhani-express.jpg";

const Destinations = () => {
  return (
    <section className="destinations">
      <h3>Book Your Trains</h3>
      <div className="grid">
        <div>
          {/* <a href='https://www.yatra.com/indian-railways/kalka-klk-to-shimla-sml-train-tickets'> */}
          <img
            src={shimla}
            alt="destination-1"
            style={{ display: "block", margin: "0 auto" }}
          />

          {/* </a> */}

          <h3>Kalka–Shimla Express</h3>
          <p>
            The Kalka–Shimla railway is a 2 ft 6 in (762 mm) narrow-gauge
            railway in North India which traverses a mostly mountainous route
            from Kalka to Shimla. It is known for dramatic views of the hills
            and surrounding villages.
          </p>
        </div>

        <div>
          {/* <a href="https://www.yatra.com/indian-railways/himsagar-express-16317-train"> */}
          <img
            src={Kashmir}
            alt="destination-2"
            style={{ display: "block", margin: "0 auto" }}
          />
          {/* </a> */}
          <h3>Himsagar Express</h3>
          <p>
            The 16317 / 16318 Himsagar Express is a weekly Express train of the
            Indian Railways running between Kanyakumari in India's southernmost
            state of Tamil Nadu to Shri Mata Vaishno Devi Katra in Jammu and
            Kashmir- the northernmost state of India.
          </p>
        </div>

        <div>
          {/* <a href="https://www.yatra.com/indian-railways/rajdhani-express-12433-train"> */}
          <img
            src={rajdhani}
            alt="destination-3"
            style={{ display: "block", margin: "0 auto" }}
          />
          {/* </a> */}
          <h3>Rajdhani Express</h3>
          <p>
            The Rajdhani Express is a series of passenger train service in India
            operated by Indian Railways connecting the national capital New
            Delhi with the capitals or largest city of various states. The word
            Rajdhani has been derived from the Devanagri script, which means
            Capital in English.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
