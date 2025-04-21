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
        <div className="min-h-[100vh] w-[100vw] flex flex-col items-center justify-between overflow-x-hidden gap-10 bg-white dark:bg-zinc-900 transition-all duration-300">
            <div className="h-[8vh] w-full shadow-md dark:shadow-white/20 flex items-center justify-center relative bg-white dark:bg-gray-800 transition-all duration-300">
                <p className="text-3xl font-bold font-[GreatVibes] text-blue-900 dark:text-blue-100">Student management</p>
                <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="absolute right-[5vw] bg-black dark:bg-white rounded-full w-[30px] h-[30px] shadow-md flex items-center justify-center transition-all duration-300"> {theme === "dark" ? <Sun className="text-yellow-400" /> : <Moon className="text-white" />}</button>
            </div>

            <div className="flex items-center justify-evenly w-full max-w-[1200px] px-4 flex-wrap">
                <img src="/kids.png" className="w-[500px] h-[300px] object-contain" alt="kids playing" />

                <div className="shadow-md p-6 rounded-md flex flex-col gap-5 items-center bg-white dark:bg-gray-800 dark:shadow-white/20 transition-all duration-300 w-[300px]">
                    <div className="w-full flex items-center justify-between mb-2">
                        <button onClick={() => setform("Login")} className={`w-1/2 text-md p-2 rounded-sm text-center transition-all duration-300 ${form === "Login"? "bg-green-950 text-white": "text-gray-800 dark:text-gray-200"}`}>Login</button>
                        <button onClick={() => setform("Register")} className={`w-1/2 text-md p-2 rounded-sm text-center transition-all duration-300 ${form === "Register"? "bg-green-950 text-white": "text-gray-800 dark:text-gray-200"}`}>Register</button>
                    </div>

                    {form !== "Login" ?
                        <input type="text" value={uname} onChange={(e) => setUname(e.target.value)} placeholder="Enter username : " className="w-full p-2 px-4 rounded-sm shadow-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"/>
                    :   <select value={option} onChange={(e)=>setOption(e.target.value)} className="p-1 shadow-[0px_0px_1px_black] dark:shadow-[0px_0px_1px_white] rounded-sm w-full">
                            <option value="Admin" className="dark:bg-slate-900">Login of admin</option>
                            <option value="Teacher" className="dark:bg-slate-900">Login of teacher</option>
                            <option value="Student" className="dark:bg-slate-900">Login of student</option>
                        </select>
                    }
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email : " className="w-full p-2 px-4 rounded-sm shadow-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"/>
                    <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Enter password : " className="w-full p-2 px-4 rounded-sm shadow-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"/>
                    <button onClick={handleSubmit} className="w-full bg-blue-950 text-white p-2 rounded-sm hover:bg-blue-900 transition-all duration-200">{form}</button>
                </div>
            </div>
            <div className="bg-blue-950 text-white flex items-center justify-center gap-10 text-md h-[7vh] w-full">
                <p>Designed by Sukesh reddy</p>
                <a href="https://drive.google.com/file/d/1immDyMffpnMEX1XN9VQL50TugHlMP0fz/view?usp=drive_link" className="hover:underline">My resume</a>
            </div>
        </div>

    )
}