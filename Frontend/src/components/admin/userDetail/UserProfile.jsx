import React from "react";
import "./UserProfile.css";

const UserProfile = ({ user }) => {

  if (!user) return <p>No user data available</p>;

  return (
    <div className="user-card">
      <div className="user-header">
        <div className="avatar">{user.name.charAt(0)}</div>
        <div>
          <h2 className="user-name">{user.name}</h2>
          <p className="user-email">{user.email}</p>
        </div>
      </div>

      <div className="user-details">
        <p><span className="label">User ID:</span> {user._id}</p>
        <p><span className="label">Role:</span> {user.role}</p>
        <p><span className="label">Joined:</span> {new Date(user.date).toLocaleDateString()}</p>
      </div>

      <div className="user-addresses">
        <h3>Addresses</h3>
        {user.addresses && user.addresses.length > 0 ? (
          <ul>
            {user.addresses.map((addr, i) => (
              <li key={i}>
                {addr.label}: {addr.street}, {addr.city}, {addr.pincode}, {addr.phone}
                {addr.isDefault ? " (Default)" : ""}
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty">No addresses added</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
