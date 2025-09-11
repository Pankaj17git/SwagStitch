import React from "react";
import "./UserList.css";
import { useAuth } from "../../../context/AuthContext";
import { Avatar, Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import UserProfile from "../userDetail/UserProfile";
import { useState } from "react";


const UserList = () => {
  const [openDetail, setOpenDetail] = useState(false);
  const [userDetail, setUserDetail] = useState();
  const { customer } = useAuth();

  return (
    <>
      <div className="user-list">
        <h1>All Users List</h1>
        {customer.map((user) => (
          <React.Fragment key={user.id}>
            <div  className="user-item">
              {/* <img src={user.avatar} alt={user.name} className="user-avatar" /> */}
              <Avatar alt={user.name}>{(user.name)[0]}</Avatar>
              <div className="user-info">
                <p className="user-name">{user.name}</p>
                <p className="user-email">{user.email}</p>
              </div>
              <span onClick={() => {setOpenDetail(true); setUserDetail(user)}} className="chevron">&gt;</span>
            </div>

            <Dialog open={openDetail} onClose={() => setOpenDetail(false)} maxWidth="sm" fullWidth>
              <DialogContent>
                <div>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2, padding: 0 }}
                    onClick={() => setOpenDetail(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
                <UserProfile user={userDetail}/>
              </DialogContent>
            </Dialog>
          </React.Fragment>
        ))}
      </div>
    </>

  );
};

export default UserList;
