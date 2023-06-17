import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Table } from "react-bootstrap";
import "./UserRegister.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

toast.configure();

const notify = () => {
  toast.success("User Added Successfully!!", {
    position: "top-center",
    autoClose: 3000,
  });
};
const error = () => {
  toast.error("UserName already taken.", {
    position: "top-center",
    autoClose: 2000,
  });
};

// const error1 = () => {
//   toast.error("Email already taken.", {
//     position: "top-center",
//     autoClose: 2000,
//   });
// };
// const email = this.state.emailId;
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
class UserRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      emailId: "",
      contact: "",
      username: "",
      password: "",
      confirmpassword: "",
      nameError: "",
      emailIdError: "",
      contactError: "",
      usernameError: "",
      passwordError: "",
      confirmpasswordError: "",
    };
    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  valid() {
    if (
      this.state.name.length < 4 &&
      this.state.emailId.length < 6 &&
      this.state.contact.length <= 10 &&
      this.state.username.length < 6 &&
      this.state.password.length < 6 &&
      this.state.confirmpassword.length < 6
    ) {
      this.setState({
        nameError: "Invalid Name",
        emailIdError: "Please Enter a Valid Email Id",
        contactError: "Please Enter 10 Digit Mobile Number",
        usernameError: "UserName length shoud be more than 6",
        passwordError: "Password length should be more than 6",
        confirmpasswordError: "Password length should be more than 6",
      });
    } else if (this.state.name.length < 1) {
      this.setState({
        nameError: "Name length should be more than 1",
      });
    } else if (this.state.emailId.length < 9) {
      this.setState({
        emailIdError: "Email length should be more than 8",
      });
    } else if (this.state.contact.length < 9) {
      this.setState({
        contactError: "Mobile number should be 10 digits",
      });
    } else if (this.state.username.length < 4) {
      this.setState({
        usernameError: "Invalid Username",
      });
    } else if (this.state.password.length < 6) {
      this.setState({
        passwordError: "Password length should be more than 6",
        confirmpasswordError: null, // Reset the error for confirm password
      });
    } else if (this.state.confirmpassword.length < 6) {
      this.setState({
        confirmpasswordError: "Password length should be more than 6",
        passwordError: null, // Reset the error for password
      });
    } else if (this.state.password !== this.state.confirmpassword) {
      this.setState({
        passwordError: "Passwords do not match",
        confirmpasswordError: "Passwords do not match",
      });
    } else {
      return true;
    }
  }

  register(e) {
    this.setState({
      nameError: "",
      emailIdError: "",
      contactError: "",
      usernameError: "",
      passwordError: "",
      confirmpasswordError: "",
    });
    e.preventDefault();
    if (this.valid()) {
      axios
        .post("http://localhost:8081/users/signup", {
          name: this.state.name,
          emailId: this.state.emailId,
          contact: this.state.contact,
          username: this.state.username,
          password: this.state.password,
          confirmpassword: this.state.confirmpassword,
        })
        .then((response) => {
          console.log(response.data, "response here");

          this.props.history.push("/userlogin");
          notify();
          this.resetForm();
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            console.log(err.response.data, "Error here");
            error();
          }
        });
    }
  }

  handleChange(changeObject) {
    this.setState(changeObject);
  }
  render() {
    return (
      <form>
        <div className="userlogin-container">
          <h2 className="user-panel">USER REGISTRATION</h2>
          <hr></hr>
          <div className="userregisterform">
            <Table>
              <tr>
                <td>
                  <label>
                    <b>Name</b>
                  </label>
                </td>
                <td>
                  <label>
                    <b>Email</b>
                  </label>
                </td>
              </tr>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter name"
                      onChange={(e) =>
                        this.handleChange({ name: e.target.value })
                      }
                    />
                    <p style={{ color: "red" }}>{this.state.usernameError}</p>
                  </td>
                  <td>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      onChange={(e) =>
                        this.handleChange({ emailId: e.target.value })
                      }
                    />
                    <p style={{ color: "red" }}>{this.state.emailIdError}</p>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div className="userregisterform">
            <Table>
              <tr>
                <td>
                  <label>
                    <b>Contact</b>
                  </label>
                </td>
                <td>
                  <label>
                    <b>UserName</b>
                  </label>
                </td>
              </tr>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter contact"
                      onChange={(e) =>
                        this.handleChange({ contact: e.target.value })
                      }
                    />
                    <p style={{ color: "red" }}>{this.state.contactError}</p>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter username"
                      onChange={(e) =>
                        this.handleChange({ username: e.target.value })
                      }
                    />
                    <p style={{ color: "red" }}>{this.state.usernameError}</p>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div className="userregisterform">
            <Table>
              <tr>
                <td>
                  <label>
                    <b>Password</b>
                  </label>
                </td>
                <td>
                  <label>
                    <b>Confirm Password</b>
                  </label>
                </td>
              </tr>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="password"
                      placeholder="Enter password"
                      onChange={(e) =>
                        this.handleChange({ password: e.target.value })
                      }
                    />
                    <p style={{ color: "red" }}>{this.state.passwordError}</p>
                  </td>
                  <td>
                    <input
                      type="password"
                      placeholder="Enter confirm password"
                      onChange={(e) =>
                        this.handleChange({ confirmpassword: e.target.value })
                      }
                    />
                    <p style={{ color: "red" }}>
                      {this.state.confirmpasswordError}
                    </p>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div className="userregisterform">
            <button
              type="submit"
              className="btn btn-success"
              onClick={(e) => {
                this.register(e);

                this.resetForm(e);
              }}
            >
              Register
            </button>

            <ToastContainer />

            <br></br>
            <p>
              Have an account? <Link to="/UserLogin">Login Here</Link>
            </p>
          </div>
        </div>
      </form>
    );
  }
}
export default withRouter(UserRegister);
