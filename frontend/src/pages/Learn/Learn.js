import React, { useEffect } from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DoneIcon from "@material-ui/icons/Done";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ProjectContent from "./ProjectContent";
import GithubIssue from "../../components/GithubIssue";
import AccountButton from "../../components/AccountButton";
import LoginButton from "../../components/LoginButton";
import Button from "@material-ui/core/Button";
import {
  setActiveProject,
  markProjectCompleted,
  PROJECT_COMPLETE_CONSTANT,
} from "../../redux/actions.js";
import {
  handleLoginFromRefresh,
  updateUserData,
  updateProjectsCompleted,
} from "../../utils/backend.js";
import { setUser } from "../../redux/actions.js";
import { useStyles } from "./Styles.js";
import { useFirestoreConnect } from "react-redux-firebase";

function Learn(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [projects, setProjects] = React.useState([
    { Name: "Loading Projects", sections: [] },
  ]);

  let fireStoreConnectArg = [];

  function isLoggedIn(props) {
    return props.user.uid;
  }

  if (isLoggedIn(props)) {
    fireStoreConnectArg.push({
      collection: "users",
      doc: props.user.uid,
      storeAs: "userInfo",
    });
    if (getActiveProjectID(props)) {
      fireStoreConnectArg.push({
        collection: "users",
        doc: props.user.uid,
        subcollections: [
          {
            collection: "projects",
            doc: getActiveProjectID(props),
          },
        ],
        storeAs: "project",
      });
    }
  }
  useFirestoreConnect(fireStoreConnectArg);

  function getCuricVersion(userInfo) {
    const defaultCuricVersion = 1;
    if (!userInfo) {
      return defaultCuricVersion;
    }
    return userInfo.curicVersion || defaultCuricVersion;
  }

  function getActiveProject(props) {
    if (props.userInfo) {
      return props.userInfo.activeProject;
    }
    return null;
  }
  function getActiveProjectID(props) {
    if (props.userInfo) {
      return props.userInfo.activeProjectID;
    }
    return null;
  }

  const handleProjectClick = (index) => {
    updateUserData({
      activeProject: index,
      activeProjectID: projects.length > index ? projects[index].id : "",
    });
    // TODO put into helper function
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // get projects from JSON file
  useEffect(() => {
    fetch(`/curic/se${getCuricVersion(props.userInfo)}.json`)
      .then((response) => response.json())
      .then((json) => {
        const projects = json.content;
        // store projects in local state
        setProjects(projects);
      })
      .catch((error) => console.log(error));
  }, [props, props.userInfo]);

  function getProject(index) {
    if (typeof projects[index] === "object") {
      return projects[index];
    } else {
      // return first project
      return projects[0];
    }
  }

  function getCompletedSections(props) {
    if (props.project && Array.isArray(props.project.completedSections)) {
      return props.project.completedSections;
    }
    // return empty array if not already defined
    return [];
  }

  useEffect(() => {
    handleLoginFromRefresh(props.setUser);
  }, [props.setUser]);

  function handleProjectCompelted() {
    updateProjectsCompleted(getActiveProject(props));
    // increment project index by one
    handleProjectClick(getActiveProject(props) + 1);
  }

  function isProjectCompleted(pIndex) {
    if (
      props.userInfo &&
      props.userInfo.completedProjects &&
      Array.isArray(props.userInfo.completedProjects)
    ) {
      return (
        props.userInfo.completedProjects[pIndex] === PROJECT_COMPLETE_CONSTANT
      );
    }
    return false;
  }

  function NextProject() {
    return (
      // TODO: make this only clickable when all requirements ar
      <Button
        variant="contained"
        color="primary"
        onClick={handleProjectCompelted}
      >
        MARK PROJECT COMPLETE
      </Button>
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            techIntern.school - Online Learning Portal
          </Typography>
          {isLoggedIn(props) ? (
            <GithubIssue />
          ) : (
            <LoginButton setUser={setUser} />
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <AccountButton />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {projects.map((projectInfo, index) => (
            <ListItem
              onClick={handleProjectClick.bind(null, index)}
              button
              key={projectInfo.name + { index }}
            >
              <ListItemText primary={`${index}. ${projectInfo.name}`} />
              {isProjectCompleted(index) ? (
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
              ) : null}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <ProjectContent
          project={getProject(getActiveProject(props))}
          completedSections={getCompletedSections(props)}
        />
        <NextProject />
      </main>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveProject: (id) => {
      dispatch(setActiveProject(id));
    },
    onProjectComplte: (id) => {
      dispatch(markProjectCompleted(id));
    },
    setUser: (user) => {
      dispatch(setUser(user));
    },
  };
};
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
const ConnectedLearn = connect(mapStateToProps, mapDispatchToProps)(Learn);

export default ConnectedLearn;
