import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import Divider from "@material-ui/core/Divider";
import { titleCaseFromKebabCase } from "../../utils/strings.js";
import CheckList from "./CheckList.js";

function renderHTML(html) {
  const htmlArg = { __html: html };
  return <div dangerouslySetInnerHTML={htmlArg} />;
}

function TextContent(content) {
  return (
    <Typography variant={"body1"} paragraph>
      {content}
    </Typography>
  );
}

function MarkdownContent(content) {
  return renderHTML(content);
}

function HintContent(content) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {content.map((hintText, index) => (
        <ExpansionPanel
          style={{ paddingBottom: "20px" }}
          key={`expansionHint${index}`}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              <b>Hint {index}</b>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>{hintText}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
      <br />
    </div>
  );
}
function isCompletedSection(id, completed) {
  if (Array.isArray(completed)) {
    return completed.indexOf(id) > -1;
  } else {
    return false;
  }
}

function ChallengeRequirement(content, completedSections) {
  return (
    <div>
      <Typography variant={"h6"} paragraph>
        {isCompletedSection(content.id, completedSections) ? (
          <div>
            <AssignmentTurnedInIcon /> Complete
          </div>
        ) : (
          <div>
            <AssignmentIcon /> Incomplete
          </div>
        )}
        {` ^ ${content.text}`}
      </Typography>
    </div>
  );
}

function ChallengeContent(content, completedSections) {
  return (
    <div>
      <Typography variant={"h4"} paragraph>
        Challenge:
      </Typography>
      <Typography variant={"body1"} paragraph>
        <b>Overview</b>: {content.overview}
      </Typography>
      <Typography variant={"body1"} paragraph>
        <b>Requirements</b>:
      </Typography>
      {content.requirements.map((requirement) =>
        ChallengeRequirement(requirement, completedSections)
      )}
    </div>
  );
}

function NextStepContent(content) {
  return (
    <div>
      <Typography variant={"h4"} paragraph>
        Next Steps:
      </Typography>
      <CheckList items={content.requirements} />
    </div>
  );
}

function getSectionContent(section, i, completedSections) {
  const type = section.type || "text";
  const lookup = {
    text: TextContent,
    markdown: MarkdownContent,
    hints: HintContent,
    challenge: ChallengeContent,
    steps: NextStepContent,
  };
  if (typeof lookup[type] !== "function") {
    return `<div> BAD TYPE: ${type}</div>`;
  }
  return (
    <span key={`section${i}`} style={{ paddingTop: "10px" }}>
      {lookup[type](section.content, completedSections)}
      <Divider />
      <div style={{ paddingTop: "20px" }}></div>
    </span>
  );
}

export default function ProjectContent(props) {
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexDirection: "column",
    },
    centered: {
      margin: "auto",
      auto: true,
      textAlign: "left",
      paddingRight: "15%",
      paddingLeft: "15%",
      paddingBottom: "40px",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography
        key={"header"}
        variant={"h3"}
        className={classes.centered}
        paragraph
      >
        {titleCaseFromKebabCase(props.project.name)}
      </Typography>
      <div className={classes.centered}>
        {props.project.sections.map((section, i) =>
          getSectionContent(section, i, props.completedSections)
        )}
      </div>
    </div>
  );
}
