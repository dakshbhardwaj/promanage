import Image from "next/image";
import React from "react";
function LogInForm({ onSignInClick }) {
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",

        backgroundColor: "#000000",
        backgroundImage: "url('../../logo_background.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div
        className="card border-0 shadow rounded-3 my-5"
        style={{
          width: 400,
          height: 225,
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <Image
            src="/pro_manage_ai@2x.png"
            alt="ProManage AI Logo"
            width={222}
            height={36}
            res
          />
        </div>

        <hr style={{ border: "1px dashed #F3173F" }} />

        <div className="card-body p-4 p-sm-5  align-items-center">
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
              />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogInForm;
