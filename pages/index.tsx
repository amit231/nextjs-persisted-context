import { useContext } from 'react'
import { authStore } from '../global-contexts/auth-state'
import {setAuthorizationToken} from '../api-config/axios'
import Background from '../components/Home'

const USER = { session_token: 'test-session', user_id: 23 }

export default function App() {
  const authState = useContext(authStore);
  let auth = authState.state.session_token?true:false;
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
  
  return (
    <Background loggedin={auth}>
      <div style={{width:'50vw',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',height:'20vh',backgroundColor:'pink',color:'red',fontSize:'3rem',margin:'0 auto'}}>
        {auth?'Log out from here as user : ' + authState.state.user_id : 'Log in as ROOT-USER'}
      </div>
      <button style={{width:'10vw',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',height:'5vh',backgroundColor:'yellow',color:'red',fontSize:'3rem',margin:'0 auto'}} type="button" onClick={() => {auth?logout(authState):login(authState,USER)}}>
        {auth?'Logout':'Login'}
      </button>
    </Background>)
}
