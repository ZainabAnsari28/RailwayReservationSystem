import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";

import _get from "lodash.get";
import "./Login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const UserDashboard = () => {
  const history = useHistory();
  const location = useLocation();
  const fromUrl = _get(location, "state.from.pathname");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    // <Stack direction="row" alignItems="center" spacing={2}>
    <div className="dashboard-container">
      {/* <div className="center"> */}

      <div className="card col-md-6 offset-md-3 offset-md-3">
        <h1 className="booking">USER DASHBOARD</h1>
        <hr></hr>

        <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
          <Link to="/search">
            <button
              style={{
                width: "125px",
                height: "30px",
                alignitems: "center",
                justifycontent: "center",
              }}
              type="submit"
              variant="primary"
              onClick={handleShow}
            >
              Search Train
            </button>
          </Link>

          <br></br>
          <br></br>

          <Link to="/booking">
            <button
              style={{
                width: "125px",
                height: "30px",
                alignitems: "center",
                justifycontent: "center",
              }}
              type="submit"
              variant="primary"
              onClick={handleShow}
            >
              Book Ticket
            </button>
          </Link>

          <br></br>
          <br></br>

          <Link to="/cancelTicket">
            <button
              style={{
                width: "125px",
                height: "30px",
                alignitems: "center",
                justifycontent: "center",
              }}
              type="submit"
              variant="primary"
              onClick={handleShow}
            >
              Cancel Ticket
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
