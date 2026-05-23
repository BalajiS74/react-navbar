import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function Sign() {
  const navigator = useNavigate();
  const notify = () => toast.success("Successfully😃");
  return (
    <div>
      <div className="container  p-5" style={{ width: "450px" }}>
        <div className="row shadow py-4 px-2 rounded">
          <div className="col-12">
            <h3 className="text-center fw-lighter">Sing up</h3>
            <form>
              <div className="mb-2">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  required
                />
              </div>

              <div className="mb-2">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  required
                />
                {/* <div id="emailHelp" class="form-text">
                  We'll never share your email with anyone else.
                </div> */}
              </div>
              <div className="mb-2">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  required
                />
              </div>
              <div className="col">
                <button className="btn btn-dark w-100 my-2" onClick={notify}>
                  Sign up
                </button>
                <ToastContainer />
              </div>
            </form>
            <div className="col-12 text-center py-2">
              <Link
                onClick={() => navigator("/login")}
                className="text-primary"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sign;
