import { useEffect, useState } from "react"
import Home from "./home"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/fontawesome-free-regular"
import { faBars, faCaretDown } from "@fortawesome/fontawesome-free-solid"
import Teachers from "./teachers"
import ClassesNav from "./classNav"
import Section from "./section"
import { useTheme } from "@/components/ui/theme-provider"
import { Moon, Sun } from "lucide-react"
import Announcements from "./Announcements"
import Class from "./Class"
import Students from "./Students"
import Student from "./Student"
import axios from "axios"
import store from "@/store/data"
import Subject from "./Subject"
import Classes from "./Classes"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
import { useNavigate } from "react-router-dom"

function Admin() {
  const [curView, setCurView] = useState('home')
  const [rightBar, setRightBar] = useState(false)
  const [leftBar, setLeftBar] = useState(false)
  const [sect, setSect] = useState(null)
  const { theme, setTheme } = useTheme()
  const { setTeachers, setStudents, setSubjects, setAnnouncements, setClasses, setLogined, logined, setSections } = store((state) => state)
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile viewport
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  // Close sidebars when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && leftBar && !e.target.closest('.sidebar') && !e.target.closest('.sidebar-toggle')) {
        setLeftBar(false)
      }
      if (isMobile && rightBar && !e.target.closest('.right-sidebar') && !e.target.closest('.user-menu-toggle')) {
        setRightBar(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobile, leftBar, rightBar])

  const handleChange = (changeTo) => {
    setCurView(changeTo)
    if (isMobile) setLeftBar(false) // Close sidebar on mobile when selecting an item
    if (changeTo === 'home' || changeTo === 'teachers') {
      setSect(null)
    }
  }
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/')
  }
  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token == null) {
          navigate('/')
          return
        }
        const res = await axios.post(`${BACKEND_URL}/admin-verify`, { token })
        if (res.status === 200) {
          setTeachers(res.data.teachers)
          setStudents(res.data.students)
          setAnnouncements(res.data.announcements)
          setClasses(res.data.classes)
          setLogined(res.data.admin)
          setSections(res.data.sections)
          setSubjects(res.data.subjects)
        }
      }
      catch (err) {
        if (err.response?.status === 400) {
          localStorage.removeItem('token')
          navigate('/')
          return
        }
        else { alert(err) }
      }
    }
    fetch()
  }, [])
  return (
    <div className={`h-screen transition-colors duration-300 overflow-hidden ${theme === 'dark' ? 'dark bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`h-[10vh] w-full shadow flex items-center fixed z-[100] px-4 transition-colors duration-300 top-0 left-0 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
        <button onClick={() => setLeftBar(!leftBar)} className="z-[110] md:z-auto sidebar-toggle">
          <FontAwesomeIcon icon={faBars} className={`text-xl p-2 transition ${theme === 'dark' ? 'hover:shadow-white' : 'hover:shadow-gray-600'}`}/>
        </button>
        <p className="ml-5 font-semibold text-lg">logo</p>
        <button className={`absolute right-4 flex items-center gap-2 px-3 py-2 rounded-full shadow transition user-menu-toggle ${theme === 'dark'     ? 'bg-zinc-800 hover:bg-zinc-600'     : 'bg-gray-200 hover:bg-gray-300'   }`} onClick={() => setRightBar(!rightBar)}>
          <FontAwesomeIcon icon={faUser} className="text-xl" />
          <p className="capitalize">{logined.uname}</p>
          <FontAwesomeIcon icon={faCaretDown} />
        </button>
      </div>

      <div className="flex  min-h-[90vh]">
        {leftBar && (
          <div className={`sidebar fixed md:relative w-[250px] xl:w-[20%] z-[90] flex flex-col top-[10vh] h-[90vh]  transition-all duration-300 left-0 bottom-0 overflow-y-auto scrollbar-hide ${theme === 'dark' ? 'bg-zinc-900 shadow-[0px_4px_5px_gray]' : 'bg-emerald-700 shadow-[0px_4px_5px_green]'}`}>
            {['home', 'announcements', 'teachers', 'subjects', 'classes'].map((item) => (
              <button key={item} onClick={() => handleChange(item)} className={`text-left px-6 py-5 text-sm capitalize transition-all duration-200 ${curView === item? theme === 'dark' ? 'bg-zinc-800 text-white font-bold border-l-4 border-white' : 'bg-emerald-900 text-white font-bold border-l-4 border-white' : theme === 'dark' ? 'text-white hover:bg-zinc-800 font-medium' : 'text-white hover:bg-emerald-600 font-medium'}`}>{item}</button>
            ))}

            {curView === 'classes' && (
              <div className="pl-4 pr-2">
                <ClassesNav setSect={setSect} setCurView={setCurView} />
              </div>
            )}
          </div>
        )}

        <div className={` flex-1 ${leftBar ? 'ml-0 md:ml-[200px]' : ''} overflow-y-auto h-full ${leftBar ? 'mr-0' : ''} ${theme === 'dark' ? 'dark:bg-gray-950' : 'bg-gray-50'}`}>
          {curView === 'home' && <Home leftBar={leftBar} setCurView={setCurView} />}
          {curView === 'announcements' && <Announcements leftBar={leftBar} />}
          {curView === 'teachers' && <Teachers leftBar={leftBar} />}
          {curView === 'classes' && <Classes leftBar={leftBar} />}
          {curView === 'class' && <Class leftBar={leftBar} />}
          {curView === 'section' && <Section sect={sect} leftBar={leftBar} />}
          {curView === 'students' && <Students leftBar={leftBar} />}
          {curView === 'student' && <Student leftBar={leftBar} />}
          {curView === 'subjects' && <Subject leftBar={leftBar} />}
        </div>

        {rightBar && (
          <div className={` right-sidebar w-[230px] fixed z-[95] top-[10vh] right-0 backdrop-blur-md shadow-xl rounded-lg p-5 flex flex-col items-center gap-3 ${theme === 'dark' ? 'bg-zinc-800/90 text-white' : 'bg-white/90 text-gray-800'}`}>
            <p className={`text-center text-md font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800' }`}>{logined.email}</p>

            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md border transition ${theme === 'dark' ? 'border-white hover:shadow-white' : 'border-black hover:shadow-gray-600'}`}>
              Theme {theme === 'dark' ?<Sun className="w-[24px] h-[24px] text-yellow-500" /> :<Moon className="w-[24px] h-[24px]" />}
            </button>

            <button className={` px-4 py-2 mt-1 rounded transition ${theme === 'dark' ? 'bg-red-900 text-white hover:bg-red-700' : 'bg-red-100 text-red-700 hover:bg-red-600 hover:text-white'}`} onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin