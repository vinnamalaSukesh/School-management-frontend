import { Route, BrowserRouter, Routes } from 'react-router-dom'
import LoginRegister from './_components/loginRegister'
import Admin from './_components/admin/admin'
import Teacher from './_components/teacher/teacher'
import Student from './_components/student/student'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginRegister />} />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/Teacher' element={<Teacher />} />
        <Route path='/Student' element={<Student />} />
      </Routes>
    </BrowserRouter>
  )
}
