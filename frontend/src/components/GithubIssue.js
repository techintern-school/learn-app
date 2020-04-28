import React from "react";
import Button from "@material-ui/core/Button";

const GithubIssue = () => {
  return (
    <div style={{ marginLeft: "auto", marginRight: 10 }}>
      <Button
        variant="contained"
        color="secondary"
        href="https://github.com/techintern-school/curapp/issues/new"
        target="_blank"
      >
        File an issue
      </Button>
    </div>
  );
};

export default GithubIssue;
