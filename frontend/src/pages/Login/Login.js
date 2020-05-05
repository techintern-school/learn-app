import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {
  auth,
  gProvider,
  setActiveProjectFromDB,
} from "../../utils/backend.js";
import { connect } from "react-redux";
import { setUser, setActiveProject } from "../../redux/actions.js";

function Login(props) {
  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Github
    signInOptions: [gProvider.providerId],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult) {
        var user = authResult.user;
        props.onLogin(user);
        setActiveProjectFromDB(setActiveProject);
        props.history.push("/learn");
        return false;
      },
      signInFailure: function(error) {
        // TODO
        return false;
      },
    },
  };

  return (
    <div>
      <h2>techIntern.school</h2>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (user) => {
      dispatch(setUser(user));
    },
    setActiveProject: (id) => {
      dispatch(setActiveProject(id));
    },
  };
};
const mapStateToProps = (state) => {
  return {};
};
const ConnectedLogin = connect(
  () => mapStateToProps,
  mapDispatchToProps
)(Login);

export default ConnectedLogin;
