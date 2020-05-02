import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const AccountButton = () => {
  return (
    <div style={{ marginLeft: "auto", marginRight: 10 }}>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/account"
      >
        Account
      </Button>
    </div>
  );
};

export default AccountButton;
