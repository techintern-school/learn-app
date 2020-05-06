import React from "react";
import Button from "@material-ui/core/Button";
import { loginPopup } from "../utils/backend.js";

const AccountButton = (props) => {
  return (
    <div style={{ marginLeft: "auto", marginRight: 10 }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={loginPopup.bind(null, props.setUser)}
      >
        Login
      </Button>
    </div>
  );
};

export default AccountButton;
