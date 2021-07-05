import { createContext, useReducer, useEffect } from 'react'


const persistState = (storageKey, state) => {
  window.localStorage.setItem(storageKey, JSON.stringify(state));
}
const getIntialState = (storageKey) => {
  const isServer = typeof window === undefined;
  let savedState = null;
  if (!isServer) {
    console.log(typeof window)
    if (typeof window === 'object')
      savedState = window.localStorage.getItem(storageKey);
  }
  try {
    if (isServer) {
      return undefined;
    }
    return JSON.parse(savedState);
  } catch (e) {
    console.error('Error loading state : ' + storageKey);
    return undefined;
  }
}


const STORAGE_KEY = 'user-context';
interface AuthState {
  session_token?: string,
  user_id?: number | null
}
type AuthActions =
 | { type: 'UPDATE_SESSION', payload: AuthState }
 | { type: 'LOGOUT' }

const defaultState: AuthState = {
  session_token: '',
  user_id:null
}
const initialState = getIntialState(STORAGE_KEY) || defaultState;

export interface AuthProviderValue {
  state?: AuthState,
  dispatch(action: AuthActions): void;
}
// Create an initial provider value.
const providerValue: AuthProviderValue = {
  state: initialState,
  dispatch: (action) => { } // << This will be overwritten
}
// Create the store or 'context'.
const authStore = createContext(providerValue);
const { Provider } = authStore;
const reducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case 'UPDATE_SESSION':
      return {
        ...state,
        
          session_token: action.payload.session_token,
          user_id: action.payload.user_id,
        
      };
    case 'LOGOUT':
      return {
        ...state,
        ...defaultState
      };
    default:
      throw new Error('Action invalid.');
  }
}
type Reducer<AuthState, AuthActions> = (prevState: AuthState, action: AuthActions) => AuthState;
const AuthStateProvider = ({ children }: any) => {

  const [state, dispatch] = useReducer < Reducer < AuthState, any>> (reducer, initialState)
  const providerValue = { state, dispatch };
  useEffect(() => persistState(STORAGE_KEY, state), [state])
  return <Provider value={providerValue}>{children}</Provider>;
};
export { authStore, AuthStateProvider }