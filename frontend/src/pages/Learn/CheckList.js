import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { updateCompletedSections } from "../../utils/backend.js";

function CheckList(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginLeft: "10%",
      width: "100%",
      maxWidth: "70%",
      backgroundColor: theme.palette.background.paper,
    },
  }));
  const classes = useStyles();

  const handleCheckboxClick = (item) => () => {
    let previouslyCompletedSections = props.project.completedSections || [];
    let completedSections;

    const { id } = item;
    if (previouslyCompletedSections.indexOf(id) === -1) {
      completedSections = [...previouslyCompletedSections, item.id];
    } else {
      completedSections = previouslyCompletedSections.filter(
        (itemID) => itemID !== id
      );
    }

    updateCompletedSections(completedSections, props.userInfo.activeProjectID);
  };

  function isSectionCompleted(section) {
    let completed = false;
    if (props.project && Array.isArray(props.project.completedSections)) {
      completed = props.project.completedSections.indexOf(section.id) > -1;
    }
    return completed;
  }

  return (
    <List className={classes.root}>
      {props.items.map((item, i) => {
        const labelId = `checkbox-list-label-${i}`;

        return (
          <ListItem
            key={i}
            role={undefined}
            dense
            button
            onClick={item.isCheckable ? handleCheckboxClick(item) : null}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={isSectionCompleted(item)}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={item.text} />
          </ListItem>
        );
      })}
    </List>
  );
}

const mapStateToProps = (state) => {
  const {
    firestore: {
      data: { userInfo, project },
    },
    user,
  } = state;
  return {
    userInfo,
    project,
    user,
  };
};
const ConnectedChecklist = connect(mapStateToProps)(CheckList);

export default ConnectedChecklist;
