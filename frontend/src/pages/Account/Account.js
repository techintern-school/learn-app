import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function Account(props) {
  return (
    <div>
      <h2>Account</h2>
      {props.user && props.user.uid ? (
        <div>
          <h3>Your .tisConfig file content is:</h3>
          <code> {`{"userID":"${props.user.uid}"}`}</code>
          <br />
          <br />
        </div>
      ) : (
        <h3>
          you are not logged in, navigate back to learn and click on the account
          link
        </h3>
      )}
      <Button variant="contained" color="warning" component={Link} to="/learn">
        Go back
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user,
  };
};
const ConnectedAccount = connect(mapStateToProps)(Account);

export default ConnectedAccount;
