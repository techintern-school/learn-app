import React from 'react'
import Header from "../../mk-components/Header/Header.js";
import { connect } from 'react-redux'


// core components
import Button from "../../mk-components/CustomButtons/Button.js";
import GridContainer from "../../mk-components/Grid/GridContainer.js";
import GridItem from "../../mk-components/Grid/GridItem.js";
import CustomInput from '../../mk-components/CustomInput/CustomInput.js';

import Timelapse from "@material-ui/icons/Timelapse";

// core components
import InfoArea from "../../mk-components/InfoArea/InfoArea.js";

class SignupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValue: '',
            mHours: ''
        };
    }

    onEmailInputChange(e) {
        const urlParams = new URLSearchParams(window.location.search);
        this.setState({
            emailValue: e.target.value,
            mHours: urlParams.get('mHours')
        }); 
    } 

    render() {
        return (
            <div>
                <Header
                    brand="techIntern.school"
                    fixed
                    color="primary"
                />
                <GridContainer
                    justify="center"
                    alignItems="center">
                    <GridItem xs={10} sm={10} md={12}>
                        <h2  style={{ paddingTop: 70, textAlign: 'center'  }}>Thanks for your interest in enrolling in techIntern.school</h2>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>

                    <InfoArea
                        title="We're currently in alpha"
                        description="Enter your email below to subscribe to our newsletter. You will get notified when we start accepting more students."
                        icon={Timelapse}
                        iconColor="rose"
                    />
                    </GridItem>
                    <GridItem xs={10} sm={10} md={8} lg={8}>
                            <CustomInput
                                id="regular"
                                labelText="Enter your email address"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    placeholder: "Your Email Address",
                                    onChange: this.onEmailInputChange.bind(this),
                                    type: "text"
                                }}
                            />
                    </GridItem>
                    <form action="https://school.us19.list-manage.com/subscribe/post" method="POST" noValidate>
                        <input type="hidden" name="u" value="1489a6b87612b4e8ed744e47e" />
                        <input type="hidden" name="id" value="c0f77afcb9" />
                        <input type="hidden" name="MMERGE7" id="mce-MMERGE7" value={this.state.mHours} />
                        
                        <input 
                            type="hidden" 
                            name="EMAIL" 
                            id="MERGE0"
                            value={this.state.emailValue} 
                            autoCapitalize="off" 
                            autoCorrect="off"
                        /> 
                        <div style={{position: "absolute", left: "-5000px", "ariaHidden": "true"}}><input type="text" name="b_1489a6b87612b4e8ed744e47e_c0f77afcb9" tabIndex="-1" defaultValue=""/></div>
                        <GridItem xs={12} sm={12} md={8} lg={8}>
                            <Button color="success" type="submit" className="submit" name="subscribe" id="mc-embedded-subscribe">Subscribe</Button>
                        </GridItem>
                        
                    </form>
                </GridContainer>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const query = state.router.location && state.router.location.query;
    const mHours = query ? query.mHours : '';
    return { mHours }
  }
  
export default connect(mapStateToProps)(SignupPage)