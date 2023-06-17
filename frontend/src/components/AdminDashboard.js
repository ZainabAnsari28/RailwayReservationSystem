import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import _get from "lodash.get";
import "./AdminDashboard.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const AdminDashboard = () => {
  const location = useLocation();
  const fromUrl = _get(location, "state.from.pathname");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="dashboard-container">
      <div className="card col-md-6 offset-md-3 offset-md-3">
        <h1 className="admindash">ADMIN DASHBOARD</h1>
        <hr></hr>

        <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
          <Link to="/addTrain">
            <button
              style={{
                width: "120px",
                height: "50px",
                alignitems: "center",
                justifycontent: "center",
              }}
              type="submit"
              variant="primary"
              onClick={handleShow}
            >
              Add Train
            </button>
          </Link>

          <br></br>
          <br></br>

          <Link to="/adminTrainList">
            <button
              style={{
                width: "120px",
                height: "50px",
                alignitems: "center",
                justifycontent: "center",
              }}
              type="submit"
              variant="primary"
              onClick={handleShow}
            >
              Train Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
