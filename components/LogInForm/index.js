import React from "react";
function LogInForm({ onSignInClick }) {
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#F5F5F5" }}
    >
      <div
        className="card border-0 shadow rounded-3 my-5"
        style={{ marginBottom: "40px" }}
      >
        <div className="card-body p-4 p-sm-5">
          <h5
            className="card-title text-center mb-5 fw-light fs-5"
            style={{ color: "#FF5733" }}
          >
            ProManage AI
          </h5>
          <form>
            <div className="d-grid mb-2">
              <button
                className="btn btn-outline-primary btn-login text-uppercase"
                onClick={(e) => {
                  e.preventDefault();
                  onSignInClick();
                }}
              >
                <img
                  width="20px"
                  style={{ marginBottom: "3px", marginRight: "5px" }}
                  alt="Google sign-in"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                />{" "}
                Sign in with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogInForm;
