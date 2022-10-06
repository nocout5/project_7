import React from "react";

function Profile() {
  const user_data = JSON.parse(sessionStorage.getItem("userData"));
  return (
    <div>
      <h1>User config</h1>
      <div>{user_data.firstName}</div>
    </div>
  );
}

export default Profile;
