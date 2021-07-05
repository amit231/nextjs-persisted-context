import axios from 'axios'

export const cancelTokenObjectProducer = (calledFrom = 'NEW NEW NEW') => {
  const { CancelToken } = axios
  const source = CancelToken.source()
  return {
    ...source,
  }
}

export const instance = axios.create({
  baseURL: process.env.BACKEND_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
})

instance.interceptors.response.use(
  (req) => {
    let newResp: any = {
      ...req,
    }
    if (req.data && req.data.data && req.data.data.error) {
      newResp = {
        ...req,
        error: req.data.data.error.message,
        status: req.data.data.error.code,
      }
    }
    return Promise.resolve(newResp)
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

export function setAuthorizationToken(user: any) {
  if (user.session_token) {
    instance.defaults.headers.common['session-token'] = `${user.session_token}`
  } else {
    delete instance.defaults.headers.common['session-token']
  }
}

export default instance