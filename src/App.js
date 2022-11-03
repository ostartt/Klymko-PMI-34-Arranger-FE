import { Route, Routes } from 'react-router-dom'

import SignUp from './pages/SignUp/SignUp'

import { useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import { setCurrentUser } from './redux/auth/auth.actions'

function App({ setCurrentUser }) {
  useLayoutEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [setCurrentUser])

  return (
      <div>
        <Routes>
          <Route path="/">
            <Route path="sign-up" element={<SignUp />} />
          </Route>
        </Routes>
      </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})

export default connect(null, mapDispatchToProps)(App)
