import { useState } from "react";

export default function Profile() {
  const [user] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || {}
  );
  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              alt="Profile"
            />
          </div>
        </div>

        <div className="col-md-5 border">
          <div className="d-flex flex-column gap-2 p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">My Profile</h4>
            </div>
            <label className="labels">Full Name</label>
            <input
              className="form-control form-control-sm"
              disabled={true}
              value={user?.fullName}
            />

            <label className="labels">Email</label>
            <input
              className="form-control form-control-sm"
              disabled={true}
              value={user?.email}
            />
            {user.isEmailVerified ? (
              <span className="badge rounded-pill bg-success">
                Email is verified
              </span>
            ) : (
              <span className="badge rounded-pill bg-warning">
                Email is not verified
              </span>
            )}

            <label className="labels">Roll</label>
            <input
              className="form-control form-control-sm"
              disabled={true}
              value={user?.roll}
            />

            <label className="labels">Company Name</label>
            <input
              className="form-control form-control-sm"
              disabled={true}
              value={user?.companyName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
