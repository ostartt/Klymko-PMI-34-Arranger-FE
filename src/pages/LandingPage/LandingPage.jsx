import React from 'react'

import './landingPage.styles.scss'

// icons as an img
import {
    leftSideLines, leftSideCircles, rightSideCircles, Auth, Number, Logs
} from './images'
import {connect} from 'react-redux'

const LandingPage = ({user}) => {
    return (<main className="landing-page-content">
        <div className="landing-title-box">
            <div className="title-left-side">
                <h5>Discover a permutation finder</h5>
                <h1> <span className="site-name-arr">
                          Arra<span>nger</span>
            </span></h1>
                <h1><span className="site-name-arr">
                          Servi<span>ce</span>
            </span></h1>
            </div>
        </div>
        <div className="about-us-box">
            <div className="lines-img">
                <img src={leftSideLines} alt="bg-lines"/>
            </div>
            <div className="about-us-description">
                <h2>About app</h2>
                <p className="about-us-paragraph">
                    The project provides one of the unique possibilities of
                    performing tasks on different servers, performing the so-called load balancing.
                    Three servers perform their tasks asynchronously to provide the
                    user with a unique experience of interacting with the application. The web application
                    calculates the number of permutations of the entered string, the permutations themselves,
                    the execution time and much more!
                </p>
                <p className="about-us-author">- Arranger</p>
                <div>
                </div>
            </div>
        </div>
        <div className="app-features-box">
            <div className="app-features-title">
                <img src={leftSideCircles} alt="leftSideCircles"/>
                <div className="title-text">
                    <h2>Awesome App Features </h2>
                    <div className="line-box">
                    </div>
                    <p>
                        The web application offers indeed lots of special features.
                        All of them were made to create the most user-friendly design possible.
                        Here are just a few of them.
                    </p>
                </div>

                <img src={rightSideCircles} alt="rightSideCircles"/>
            </div>

            <div className="app-features">
                <div className="feature-box" id="creative-design">
                    <img src={Auth} alt="auth"/>
                    <h4>Auth system</h4>
                    <p>
                        The authorization and authentication system will provide access to your
                        logs anywhere and anytime. Admin also has its own additional functionality.
                    </p>
                </div>
                <div className="feature-box" id="eco-tasks">
                    <img src={Number} alt="number"/>
                    <h4>Permutations</h4>
                    <p>
                        The application has a user-friendly interface to
                        calculate tasks with pleasure
                    </p>
                </div>
                <div className="feature-box" id="points-exchange">
                    <img src={Logs} alt="logs"/>
                    <h4>Logs recording</h4>
                    <p>
                        Each of your tasks is recorded in the logs, there is also an additional
                        functionality for canceling the task and reviewing the execution process
                    </p>
                </div>
            </div>
        </div>
    </main>)
}
const mapStateToProps = (state) => ({
    user: state.auth.userObject,
})
export default connect(mapStateToProps)(LandingPage)
