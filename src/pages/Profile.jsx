import { Navigate } from "react-router-dom";

function Profile() {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="page profile-page">
      <div className="profile-top">
        <h2>Account Settings</h2>
      </div>

      <div className="profile-card">
        <div className="profile-info">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="profile-image"
          />

          <div>
            <h3>{currentUser.name}</h3>

            <p>{currentUser.email}</p>
          </div>
        </div>

        <p className="profile-description">
          Lorem Ipsum Dolor Sit Amet,
          Consetetur Sadipscing Elitr,
          Sed Diam Nonumy Eirmod Tempor
          Invidunt Ut Labore Et Dolore
          Magna Aliquyam Erat, Sed Diam.
        </p>
      </div>
    </div>
  );
}

export default Profile;