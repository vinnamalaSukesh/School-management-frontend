import { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useTheme } from "@/components/ui/theme-provider"
import { Moon, Sun } from "lucide-react"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export default function LoginRegister() {
    const [form, setform] = useState('Login')
    const [uname, setUname] = useState("")
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const { theme, setTheme } = useTheme()
    const [option,setOption] = useState("Admin")
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if (form === "Login") {
            if(option === "Admin"){
            try {
                const res = await axios.post(`${BACKEND_URL}/login`, { email, pwd })
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.token)
                    navigate(`/admin`)
                }
                else {alert('Login details not match')}
            }
            catch (err) {console.log(err)}
            }
            else if (option === "Teacher") {
                try {
                    const res = await axios.post(`${BACKEND_URL}/teacher/login`, { email, pwd })
                    if (res.status === 200) {
                        localStorage.setItem('token', res.data.token)
                        navigate(`/teacher`)
                    }
                    else { alert('Login details not match') }
                }
                catch (err) {console.log(err)}
            }
            else if (option === "Student") {
                try {
                    const res = await axios.post(`${BACKEND_URL}/student/login`, { email, pwd })
                    if (res.status === 200) {
                        localStorage.setItem('token', res.data.token)
                        navigate(`/student`)
                    }
                    else { alert('Login details not match') }
                }
                catch (err) { console.log(err) }
            }
        }
        else if (form === "Register") {
            try {
                const res = await axios.post(`${BACKEND_URL}/register`, { uname, email, pwd })
                if (res.status === 200) {
                    window.location.reload()
                }
                else {
                    alert('Registration failed')
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    }
    return (
    <div className="min-h-screen w-screen flex flex-col bg-white dark:bg-zinc-900 text-gray-900 dark:text-white transition-colors duration-300 overflow-x-hidden">
        <div className="h-[10vh] w-full flex items-center justify-center relative shadow-md bg-white dark:bg-gray-800">
            <h1 className="text-2xl sm:text-3xl font-bold font-[GreatVibes] text-blue-900 dark:text-blue-100">
                Student Management
            </h1>
            <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="absolute right-[5vw] rounded-full w-[36px] h-[36px] flex items-center justify-center bg-black dark:bg-white transition-all duration-300 shadow"
            >
                {theme === "dark" ? (
                    <Sun className="text-yellow-400" />
                ) : (
                    <Moon className="text-white" />
                )}
            </button>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center px-4 py-6 gap-6">
            <a href="https://www.canva.com/design/DAGlipS9LkU/E4xNfcAVfoD4ygeUeTYbWQ/view?utm_content=DAGlipS9LkU&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hd5cc29e3ae" className="text-red-600 font-semibold hover:underline">OBJECTIVE</a>

            <div className="flex flex-wrap justify-evenly items-center gap-10 max-w-7xl w-full">
                <img src="/kids.png" alt="Kids playing" className="max-w-md w-full h-auto object-contain"/>

                <div className="w-[300px] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-5 transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <button onClick={() => setform("Login")} className={`w-1/2 text-sm font-semibold py-2 rounded transition-all duration-200 ${form === "Login"? "bg-blue-900 text-white": "text-gray-700 dark:text-gray-300"}`}>Login
                        </button>
                        <button onClick={() => setform("Register")} className={`w-1/2 text-sm font-semibold py-2 rounded transition-all duration-200 ${form === "Register"? "bg-blue-900 text-white": "text-gray-700 dark:text-gray-300"}`}>Register</button>
                    </div>

                    {form !== "Login" ? (
                        <input type="text" value={uname} onChange={(e) => setUname(e.target.value)} placeholder="Enter username" className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    ) : (
                        <select value={option} onChange={(e) => setOption(e.target.value)} className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option value="Admin" className="dark:bg-gray-800">Admin</option>
                            <option value="Teacher" className="dark:bg-gray-800">Teacher</option>
                            <option value="Student" className="dark:bg-gray-800">Student</option>
                        </select>
                    )}

                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-white text-black"/>
                    <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Enter password" className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-white text-black"/>
                    <button onClick={handleSubmit} className="w-full bg-blue-950 text-white p-2 rounded hover:bg-blue-900 transition-all">{form}</button>
                </div>
            </div>
        </div>

        <div className="bg-blue-950 text-white py-3 text-center text-sm">
            <p>
                Designed by Sukesh Reddy —&nbsp;
                <a href="https://drive.google.com/file/d/1immDyMffpnMEX1XN9VQL50TugHlMP0fz/view?usp=drive_link"  className="underline hover:text-gray-300">View Resume</a>
            </p>
        </div>
    </div>
    )
}