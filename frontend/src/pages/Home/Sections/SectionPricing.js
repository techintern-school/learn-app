import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "../../../mk-components/Grid/GridContainer.js";
import GridItem from "../../../mk-components/Grid/GridItem.js";
import Button from "../../../mk-components/CustomButtons/Button.js";
import Card from "../../../mk-components/Card/Card.js";
import CardBody from "../../../mk-components/Card/CardBody.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import pricingStyle from "../../../assets/jss/material-kit-pro-react/views/presentationSections/pricingStyle.js";

const useStyles = makeStyles(pricingStyle);

export default function SectionPricing() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem
            md={8}
            sm={10}
            className={classNames(classes.mlAuto, classes.mrAuto)}
          >
            <h2 className={classes.title}>Start learning today for $9.</h2>
            <h4 className={classes.description}>
              Choose between our different mentoring options below - you will be
              able to adjust your choice at any time. Your mentoring will begin
              after you complete the first month of studying. All options will
              charge $9 platform fee for your first month, and $49/month
              thereafter. Mentoring is charged at $100/hour in 30 minute
              increments.
            </h4>
            <GridContainer justify="center">
              <GridItem lg={4} md={12} sm={12}>
                <Card className={classNames(classes.card, classes.cardMargin)}>
                  <CardBody className={classes.cardBody}>
                    <h6 className={classes.cardCategory}>Minimal Mentoring</h6>
                    <h1 className={classes.cardTitle}>
                      <small>$</small>
                      99<small>/mo</small>
                    </h1>
                    <ul>
                      <li>Online Learning Platform</li>
                      <li>
                        <b>0.5 hours</b> of mentoring<small>/mo</small>
                      </li>
                    </ul>
                    <Link to="/enroll?mHours=0.5">
                      <Button round color="rose">
                        Enroll Now!
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem lg={4} md={12} sm={12}>
                <Card className={classes.card}>
                  <CardBody className={classes.cardBody}>
                    <h6 className={classes.cardCategory}>More Mentoring</h6>
                    <h1 className={classes.cardTitle}>
                      <small>$</small>
                      199<small>/mo</small>
                    </h1>
                    <ul>
                      <li>Online Learning Platform</li>
                      <li>
                        <b>1.5 hours</b> of mentoring<small>/mo</small>
                      </li>
                      <li>
                        <b>Recommended</b>
                      </li>
                    </ul>
                    <Link to="/enroll?mHours=1.5">
                      <Button round color="rose">
                        Enroll Now!
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem lg={4} md={12} sm={12}>
                <Card className={classNames(classes.card, classes.cardMargin)}>
                  <CardBody className={classes.cardBody}>
                    <h6 className={classes.cardCategory}>Most Mentoring</h6>
                    <h1 className={classes.cardTitle}>
                      <small>$</small>
                      499<small>/mo</small>
                    </h1>
                    <ul>
                      <li>Online Learning Platform</li>
                      <li>
                        <b>4.5 hours</b> of mentoring<small>/mo</small>
                      </li>
                    </ul>

                    <Link to="/enroll?mHours=4.5">
                      <Button round color="rose">
                        Enroll Now!
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
