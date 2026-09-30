import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { setAccessToken,setUser } from '../state/auth.slice'

const Login = () => {

  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post("http://localhost:5173/api/auth/login", {
      email:email,
      password:password
    })
    console.log(response.data);
    dispatch(setAccessToken(response.data.accessToken))
    dispatch(setUser(response.data.user))
    navigate("/me");
  }
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Login</h1>
          <h2 className="mt-2 text-sm text-gray-500">
            Please fill in the following information to login.
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  )
}

export default Login;
