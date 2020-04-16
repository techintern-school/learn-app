import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import { titleCaseFromKebabCase } from "../../utils/strings.js"

function TextContent(content) {
    return (
        <Typography variant={'body1'} paragraph>
            {content}
        </Typography>
    )

}

function HintContent(content) {

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    }));

    const classes = useStyles();
    return (
        <div className={classes.root}>
            {content.map((hintText, index) =>
                <ExpansionPanel style={{ paddingBottom: "20px" }} key={`expansionHint${index}`}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}><b>Hint {index}</b></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            {hintText}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )}
            <br/>
        </div>
    )
}

function DiscriptionContent(content) {
    return (
        <div>
            <Typography variant={'h4'} paragraph>
                Project:
            </Typography>
            <Typography variant={'body1'} paragraph>
                <b>Overview</b>: {content.overview}
            </Typography>
            <Typography variant={'body1'} paragraph>
                <b>Requirements</b>: 
            </Typography>
            <CheckList items={content.requirements}/>
        </div>
    )
}



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
    // TODO keep this in global state using the ids
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <List className={classes.root}>
            {props.items.map((item, i) => {
                const labelId = `checkbox-list-label-${i}`;

                return (
                    <ListItem key={i} role={undefined} dense button onClick={handleToggle(item)}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={checked.indexOf(item) !== -1}
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

function DiscussionContent(content) {
    return (
        <Typography variant={'caption'} paragraph style={{ paddingTop: "10px" }}>
            <b>Discussion:</b> {content}
        </Typography>
    )
}

function NextStepContent(content) {
    return (
        <div>
            <Typography variant={'body1'} paragraph style={{ paddingTop: "10px" }}>
                <b>Next Steps:</b>
            </Typography>
            <CheckList items={content}/>
        </div>
    )
}

function getSectionContent(section, i) {
    const type = section.type || 'text';
    const lookup = {
        text: TextContent,
        hints: HintContent,
        description: DiscriptionContent,
        discussion: DiscussionContent,
        steps: NextStepContent
    }
    if (typeof lookup[type] !== 'function') {
        return `<div> BAD TYPE: ${type}</div>`;
    }
    return (<span key={`section${i}`} style={{ paddingTop: "10px" }}>
        {lookup[type](section.content)}
        <Divider/>
        <div style={{ paddingTop: "20px" }}></div>
    </span>)
}


export default function ProjectContent(props) {

    const useStyles = makeStyles((theme) => ({
        container: {
            display: "flex",
            flexDirection: 'column'
        },
        centered: {
            margin: "auto",
            auto: true,
            textAlign: "left",
            paddingRight: "15%",
            paddingLeft: "15%",
            paddingBottom: "40px"
        }
    }));

    const classes = useStyles();


    return (
        <div className={classes.container}>
            <Typography key={'header'} variant={'h3'} className={classes.centered} paragraph>
                {titleCaseFromKebabCase(props.project.name)}
            </Typography>
            <div className={classes.centered}>
                {props.project.sections.map((section, i) => getSectionContent(section, i))}
            </div>

        </div>
    )


}    