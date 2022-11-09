import {Route, Routes} from 'react-router-dom'

import SignUp from './pages/SignUp/SignUp'
import SignIn from "./pages/SignIn/SignIn";
import Header from "./components/Header/Header";

import {useLayoutEffect} from 'react'
import {connect} from 'react-redux'
import {setCurrentUser} from './redux/auth/auth.actions'
import LandingPage from "./pages/LandingPage/LandingPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import ServerPanel from "./pages/ServerPanel/ServerPanel"

function App({setCurrentUser}) {
    useLayoutEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            setCurrentUser(JSON.parse(user))
        }
    }, [setCurrentUser])

    return (
        <div>
            <Header/>
            <Routes>
                <Route
                    path="/panel"
                    element={
                        <ProtectedRoute>
                            <ServerPanel/>
                        </ProtectedRoute>
                    }
                />
                <Route path="/">
                    <Route index element={<LandingPage/>}/>
                    <Route path="sign-up" element={<SignUp/>}/>
                    <Route path="sign-in" element={<SignIn/>}/>
                    <Route path="permutations" element={<Dashboard/>}/>
                </Route>
            </Routes>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})

export default connect(null, mapDispatchToProps)(App)
