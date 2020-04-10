/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// core components
import Header from "../../mk-components/Header/Header.js";
import Parallax from "../../mk-components/Parallax/Parallax.js";
import Footer from "../../mk-components/Footer/Footer.js";
import GridContainer from "../../mk-components/Grid/GridContainer.js";
import GridItem from "../../mk-components/Grid/GridItem.js";
import Button from "../../mk-components/CustomButtons/Button.js";
// sections for this page
import SectionDescription from "./Sections/SectionDescription.js";
import SectionOverview from "./Sections/SectionOverview.js";
import SectionPricing from "./Sections/SectionPricing.js";

import presentationStyle from "../../assets/jss/material-kit-pro-react/views/presentationStyle.js";

const useStyles = makeStyles(presentationStyle);

export default function HomePage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  let headlineStyles = {
    color: 'primary'
  };
  return (
    <div>
      <Header
        brand="techIntern.school"
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "primary"
        }}
      />
      <Parallax
        image={require("../../assets/img/coding.jpg")}
        className={classes.parallax}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title} style={headlineStyles}>
                Become a software engineer
                </h1>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionDescription />
        <SectionOverview />
        <SectionPricing />
      </div>
      
      <Footer
        theme="white"
        content={
          <div>
            <div className={classes.left}>
              <a
                href="#"
                target="_blank"
                className={classes.footerBrand}
              >
                techIntern.school
              </a>
            </div>
            <div className={classes.rightLinks}>
              <ul>
                <li>
                  <Button
                    href="https://www.linkedin.com/company/techintern-school"
                    target="_blank"
                    color="instagram"
                    justIcon
                    simple
                  >
                    <i className="fab fa-linkedin" />
                  </Button>
                </li>
                <li>
                  <Button
                    href="https://twitter.com/techinternschl"
                    target="_blank"
                    color="twitter"
                    justIcon
                    simple
                  >
                    <i className="fab fa-twitter" />
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        }
      />
    </div>
  );
}
