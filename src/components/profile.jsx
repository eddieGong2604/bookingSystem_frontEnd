import React from "react";

const Profile = ({ user }) => {
  console.log(user);
  return (
    <div className="container mt-4">
      <h3 style={{ color: "#4096e6" }}>Profile</h3>

      <br></br>

      <h6>Username: {user.sub}</h6>
      <h6>Role: {user.aud}</h6>
    </div>
  );
};

export default Profile;
