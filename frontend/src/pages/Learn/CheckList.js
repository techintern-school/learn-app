import React from 'react';
import { connect } from 'react-redux'
import { setSectionComplete, setSectionIncomplete } from '../../redux/actions.js';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

function CheckList(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            marginLeft: '10%',
            width: '100%',
            maxWidth: '70%',
            backgroundColor: theme.palette.background.paper,
        },
    }));
    const classes = useStyles();

    const updateCheckboxState = (item) => () => {
        const { id } = item
        if (props.completedSections.indexOf(id) > -1) {
            props.setSectionIncomplete(id)
        } else {
            props.setSectionComplete(id)
        }
    };

    return (
        <List className={classes.root}>
            {props.items.map((item, i) => {
                const labelId = `checkbox-list-label-${i}`;

                return (
                    <ListItem key={i} role={undefined} dense button onClick={item.isCheckable ? updateCheckboxState(item) : null}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={props.completedSections.indexOf(item.id) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={item.text} />
                    </ListItem>
                );
            })}
        </List>
    );
}

const mapDispatchToProps = dispatch => {
    return { 
        setSectionComplete: (id) => { dispatch(setSectionComplete(id)) }, 
        setSectionIncomplete: (id) => { dispatch(setSectionIncomplete(id)) }
    }
};
const mapStateToProps = state => {
    const { learning: {completedSections} } = state;
    return {
        completedSections
    }
}
const ConnectedChecklist = connect(mapStateToProps, mapDispatchToProps)(CheckList)

export default ConnectedChecklist

