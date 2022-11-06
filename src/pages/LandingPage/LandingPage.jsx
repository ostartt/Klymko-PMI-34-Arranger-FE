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
                <h2>About us</h2>
                <p className="about-us-paragraph">
                    By the way by the way by the way by the way by the way
                    by the way by the way by the way by the way by the way
                    by the way by the way by the way by the way by the way
                    by the way by the way by the way by the way by the way
                    by the way by the way by the way by the way by the way
                    by the way by the way by the way by the way by the way.
                </p>
                <p className="about-us-author">- Arranger team</p>
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
                        Web application application application application application
                        application application application application application
                        application application application application application
                    </p>
                </div>

                <img src={rightSideCircles} alt="rightSideCircles"/>
            </div>

            <div className="app-features">
                <div className="feature-box" id="creative-design">
                    <img src={Auth} alt="auth"/>
                    <h4>Auth system</h4>
                    <p>
                        Complete some some some some some some some some some some some
                        some some some some some some some
                    </p>
                </div>
                <div className="feature-box" id="eco-tasks">
                    <img src={Number} alt="number"/>
                    <h4>Permutations</h4>
                    <p>
                        Complete some some some some some some some some some some some
                        some some some some some some some
                    </p>
                </div>
                <div className="feature-box" id="points-exchange">
                    <img src={Logs} alt="logs"/>
                    <h4>Logs recording</h4>
                    <p>
                        Complete some some some some some some some some some some some
                        some some some some some some some
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
