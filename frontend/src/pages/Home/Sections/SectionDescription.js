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
    color: '#40514e'
  };
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem md={8} sm={8}>
            <h4 className={classes.description} style={headlineStyles}>
              techIntern.school will teach you how think like a software engineer by solving real business problems.
            </h4>
            <br/>
            <h4 className={classes.description} style={headlineStyles}>
              Our curicculum will give you the foundational skills you need to start your software engineering career.
            </h4>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
