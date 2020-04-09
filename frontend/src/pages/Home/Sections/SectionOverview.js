import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "../../../mk-components/Grid/GridContainer.js";
import GridItem from "../../../mk-components/Grid/GridItem.js";
import InfoArea from "../../../mk-components/InfoArea/InfoArea.js";

// @material-ui icons
import FaceIcon from "@material-ui/icons/Face";
import AccessTime from "@material-ui/icons/AccessTime";
import AttachMoney from "@material-ui/icons/AttachMoney";
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import overviewStyle from "../../../assets/jss/material-kit-pro-react/views/presentationSections/overviewStyle.js";

const useStyles = makeStyles(overviewStyle);

export default function SectionOverview() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div
        className={classes.features5}
        style={{
          backgroundImage: `url(${require("../../../assets/img/books.jpg")})`
        }}
      >
        <GridItem md={8} className={classNames(classes.mlAuto, classes.mrAuto)}>
          <h2 className={classes.title}>Why should you choose techIntern.school?</h2>
        </GridItem>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem sm={3} className={classes.featuresShow}>
              <InfoArea
                title="Learn by doing."
                description={
                  <p>
                    In our project based curicclum, you will learn to solve real problems you will encounter in your career. These projects will help build out your resume, and demonstrate you can learn the skills employers need. 
                  </p>
                }
                icon={WbIncandescentIcon}
                iconColor="gray"
                vertical={true}
              />
            </GridItem>
            <GridItem sm={3} className={classes.featuresShow}>
              <InfoArea
                title="1 on 1 Mentoring"
                description={
                  <p>
                    Get mentored by an experienced software engineer. Get feedback on your progress and expand your perspective. All our mentors have 3+ years professional software engineering experience, and want to help you learn. 
                  </p>
                }
                icon={FaceIcon}
                iconColor="gray"
                vertical={true}
              />
            </GridItem>
            <GridItem sm={3} className={classes.featuresShow}>
              <InfoArea
                title="Cheaper than a bootcamp"
                description={
                  <p>
                    We designed our learning platform to be a fraction of the cost of a traditional bootcamp. Without sacrificing the valubale mentorship that bootcamps offer. We charge a monthly tuition fee, and you are able to cancel at anytime. 
                  </p>
                }
                icon={AttachMoney}
                iconColor="gray"
                vertical={true}
              />
            </GridItem>
            <GridItem sm={3} className={classes.featuresShow}>
              <InfoArea
                title="Save Time"
                description={
                  <p>
                    It is possible to become a software engineer through self guided study. The problem isn't a lack of resources, but too many. Our curicclum will focus your time the right skills, and help you becine a software engineer faster. 
                  </p>
                }
                icon={AccessTime}
                iconColor="gray"
                vertical={true}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
