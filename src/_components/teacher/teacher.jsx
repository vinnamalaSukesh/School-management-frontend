import { useTheme } from "@/components/ui/theme-provider"
import { faUser } from "@fortawesome/fontawesome-free-regular"
import { faBars, faCaretDown } from "@fortawesome/fontawesome-free-solid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import Home from "./home"
import store from "@/store/data"
import Classes from "./Classes"
import MarkSheet from "./markSheets"
import Attendance from "./Attendance"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function Teacher() {
  const { setSections, setClasses, setClassTeacherFor, setSubjects, classTeacherFor, setStudents, setAnnouncements, setAssignedSubjects } = store((state) => state)

  const [leftBar,setLeftBar] = useState(false)
  const [rightBar,setRightBar] = useState(false)
  const [curView,setCurView] = useState('home')
  const {theme,setTheme} = useTheme()
  const [teacher,setTeacher] = useState()
  const navigate = useNavigate()

  useEffect(()=>{
    const verify = async()=>{
      const token = localStorage.getItem('token')
      if(!token){
        navigate('/')
        return
      }
      const res = await axios.post(`${BACKEND_URL}/teacher/verify`,{token})
      if(res.status === 200){
        setSections(res.data.sections)
        setAssignedSubjects(res.data.assignedSubjects)
        setClasses(res.data.classes)
        setClassTeacherFor(res.data.classTeacherFor)
        setTeacher(res.data.teacher)
        setAnnouncements(res.data.announcements)
        setStudents(res.data.students)
        setAssignedSubjects(res.data.assignedSubjects)
        setSubjects(res.data.subjects)
      }
      else if(res.status === 400){
        localStorage.removeItem('token')
        navigate('/')
        return
      }
    }
    verify()
  },[])
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/')
  }
  return (
    <div className="h-screen dark:bg-gray-950 dark:text-white transition-colors duration-300">
      <div className="h-[10vh] w-full shadow flex items-center fixed z-10 bg-white dark:bg-zinc-900 px-4 transition-colors duration-300">
        <button onClick={() => setLeftBar(!leftBar)}><FontAwesomeIcon icon={faBars} className="text-xl p-2 transition hover:shadow dark:hover:shadow-white" /></button>
        <p className="ml-5 font-semibold text-lg">logo</p>
        <button className="absolute right-4 flex items-center gap-2 px-3 py-2 rounded-full shadow hover:bg-gray-300 bg-gray-200 dark:hover:bg-zinc-600 hover:font-medium dark:bg-zinc-800 transition" onClick={() => setRightBar(!rightBar)}>
          <FontAwesomeIcon icon={faUser} className="text-xl" />
          <p className="capitalize">{teacher?.name}</p>
          <FontAwesomeIcon icon={faCaretDown} />
        </button>
      </div>

      <div className="flex w-full h-[90vh] pt-[10vh]">
        {leftBar && (
          <div className="xl:w-[20%] w-[200px] z-10 flex flex-col h-[90vh] bg-emerald-700 dark:bg-zinc-900 shadow-[0px_4px_5px_green] dark:shadow-[0px_4px_5px_gray] transition-all duration-300 fixed left-0 bottom-0 overflow-y-auto scrollbar-hidden">
            {['home', 'classes', 'mark sheets', 'attendance'].map((item) => (
              <button key={item} onClick={() => setCurView(item)} className={`text-left px-6 py-5 text-sm capitalize transition-all duration-200 ${curView === item ? 'bg-emerald-900 dark:bg-zinc-800 text-white font-bold border-l-4 border-white' : 'text-white hover:bg-emerald-600 dark:hover:bg-zinc-800 font-medium'}`}>{item}</button>))}
          </div>
        )}
      </div>

      {curView === 'home' && <Home leftBar={leftBar} classTeacherFor={classTeacherFor}/>}
      {curView === 'classes' && <Classes leftBar={leftBar} loginedId={teacher}/>}
      {curView === 'mark sheets' && <MarkSheet leftBar={leftBar} loginedId={teacher}/>}
      {curView === 'attendance' && <Attendance leftBar={leftBar} loginedId={teacher}/>}

      {rightBar && (
        <div className="w-[230px] fixed z-11 top-[10vh] right-4 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md shadow-xl rounded-lg p-5 flex flex-col items-center gap-3">
          <p className="text-center text-md text-gray-800 dark:text-white font-medium">{teacher.email}</p>

          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border dark:border-white border-black hover:shadow transition">
            Theme {theme === 'dark' ? <Sun className="w-[24px] h-[24px] text-yellow-500" /> : <Moon className="w-[24px] h-[24px] text-gray-800" />}
          </button>

          <button className="px-4 py-2 mt-1 rounded bg-red-100 text-red-700 hover:bg-red-600 hover:text-white transition dark:bg-red-900 dark:text-white dark:hover:bg-red-700" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  )
}
export default Teacher
