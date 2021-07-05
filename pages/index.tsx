import { useContext } from 'react'
import { authStore } from '../global-contexts/auth-state'





export default function Home() {
  const authState = useContext(authStore);

  const login = (context) => {
    const { dispatch } = context;
    dispatch({ type: 'UPDATE_SESSION', payload: { session_token: 'test-session', user_id: 23 } })
  }

  const logout = (context) => {
    const { dispatch } = context;
    dispatch({ type: 'LOGOUT' })
  }
  if (!authState.state.session_token) {
    return (
      <div>
        <div>Log in first </div>
        <button type="button" onClick={() => login(authState)}>Login</button>
      </div>
    )
  }
  return (
    <div>
      <div>Log out from here as user : {authState.state.user_id}</div>
      <button type="button" onClick={() => logout(authState)}>Logout</button>
    </div>)
}
