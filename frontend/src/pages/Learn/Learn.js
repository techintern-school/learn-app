import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ProjectContent from './ProjectContent'
import GithubIssue from '../../components/GithubIssue'
import Button from '@material-ui/core/Button';
import { setActiveProject, markProjectCompleted } from '../../redux/actions.js';
import { updateUserData, handleLoginFromRefresh } from '../../utils/backend.js'
import { setUser } from '../../redux/actions.js';
import { useStyles } from "./Styles.js"


function Learn(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [projects, setProjects] = React.useState([{Name: "Loading Projects"}]);

    const handleProjectClick = (index) => {
        props.setActiveProject(index);
        updateUserData({activeProject: index})
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // get projects from JSON file
    useEffect(() => {
        
        fetch(`/curic/se${props.curicVersion}.json`)
        .then(response => response.json())
        .then(json => {
            setProjects(json.content)
        })
        .catch(error => console.log(error))
    }, [props.curicVersion])

    function getProject(index) {
        if (typeof projects[index] === "object") {
            return projects[index];
        } else {
            console.log(`unknown project ${index}`)
            return {
                "content": [],
                "version": "0.0.1",
                "name": "Unknown project"
            }
        }
        
    }
    useEffect(() => {
        handleLoginFromRefresh(props.setUser, props.setActiveProject);
    }, [props.setUser, props.setActiveProject])
    
    function NextProject(){
        return(
            <Button variant="contained" color="primary" onClick={handleProjectClick.bind(null, props.activeProject + 1)}>NEXT PROJECT</Button>
        )
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
                    <GithubIssue/>
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
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {projects.map((projectInfo, index) => (
                        <ListItem onClick={handleProjectClick.bind(null, index)} button key={projectInfo.name}>
                            <ListItemText primary={`${index}. ${projectInfo.name}`} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            {props.user.uid ? (
                <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <ProjectContent project={getProject(props.activeProject)} />
                <NextProject/>
            </main>
            ) : <div><br/><br/><br/><br/>TODO: Need to login</div>}
            
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return { 
        setActiveProject: (id) => { dispatch(setActiveProject(id)) }, 
        onProjectComplte: (id) => { dispatch(markProjectCompleted(id)) }, 
        setUser: (user) => { 
            dispatch(setUser(user)) 
        }
    }
};
const mapStateToProps = state => {
    const { learning: {activeProject, completedProjects, curicVersion}, user } = state;
    return {
        activeProject, completedProjects, curicVersion, user
    }
}
const ConnectedLearn = connect(mapStateToProps, mapDispatchToProps)(Learn)

export default ConnectedLearn;