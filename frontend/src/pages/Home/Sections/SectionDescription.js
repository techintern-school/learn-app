import React from "react";
// core components
import GridContainer from "../../../mk-components/Grid/GridContainer.js";
import GridItem from "../../../mk-components/Grid/GridItem.js";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import descriptionStyle from "../../../assets/jss/material-kit-pro-react/views/presentationSections/descriptionStyle.js";


const useStyles = makeStyles(descriptionStyle);

export default function SectionDescription() {
  const classes = useStyles();
  let headlineStyles = {
    color: '#40514e', 
    textAlign: 'center'
  };
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center" >
          <GridItem md={8} sm={8}text-align="center">
          <h2 className={classes.title} style={headlineStyles}>What will you learn?</h2>
            <h4 className={classes.description} style={headlineStyles}>
              techIntern.school will teach you to think like a software engineer by solving real business problems.
            </h4>
            <h5 className={classes.description} style={headlineStyles}>
            You will be guided through solving problems for a fictitious ecommerce company - <b>onandon.com</b> You will learn to create web applications, analyze log files, build a recommendation service, debug legacy applications, run A/B tests, and much more. Through our project based curicculum, you will learn the foundational skills you need to start your software engineering career. 
            </h5>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
