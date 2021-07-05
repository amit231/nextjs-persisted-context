import { useContext } from 'react'
import { authStore } from '../global-contexts/auth-state'
import {setAuthorizationToken} from '../api-config/axios'


const USER = { session_token: 'test-session', user_id: 23 }


export default function Home() {
  const authState = useContext(authStore);

  const login = (context,user) => {
    const { dispatch } = context;
    setAuthorizationToken(USER)
    dispatch({ type: 'UPDATE_SESSION', payload: user})
  }

  const logout = (context) => {
    const { dispatch } = context;
    setAuthorizationToken({})
    dispatch({ type: 'LOGOUT' })
  }


  if (!authState.state.session_token) {
    return (
      <div>
        <div>Log in first </div>
        <button type="button" onClick={() => login(authState,USER)}>Login</button>
      </div>
    )
  }
  return (
    <div>
      <div>Log out from here as user : {authState.state.user_id}</div>
      <button type="button" onClick={() => logout(authState)}>Logout</button>
    </div>)
}
