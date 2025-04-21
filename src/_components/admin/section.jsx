import store from "@/store/data";
import { useState } from "react";
import AddStudent from "./AddStudent";
import AddSubject from "./AddSubjectToClass";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { faEye } from "@fortawesome/fontawesome-free-regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Student from "./Student";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function PopUp({ subPop, setSubPop }) {
  const { teachers, classes, sections, updateSection } = store((state) => state);
  const [teacher, setTeacher] = useState(subPop.teacherId);
  const section = sections[subPop.sect];
  const Class = classes[section.className];
  const [edit, setEdit] = useState(false);

  const handleSave = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/class/subject-teacher`, {
        sectionId: subPop.sect,
        subject: subPop.subject,
        teacherId: teacher,
      })
      if(res.status === 200){
      updateSection(res.data.section)
      setEdit(false)
      setSubPop(null)}
    } catch (err) {
      alert("Failed to save: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 text-gray-800 dark:text-white rounded-xl shadow-xl p-6 w-[90%] max-w-md">
        <div className="space-y-4">
          <div className="flex flex-col items-center text-center space-y-1">
            <p className="text-xl font-semibold">{Class.name}</p>
            <p className="text-md">{section.name} section</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium">{subPop.subject}</p>
            <select
              value={teacher}
              disabled={!edit}
              onChange={(e) => setTeacher(e.target.value)}
              className={`p-2 rounded-md border ${edit ? "bg-white dark:bg-zinc-800" : "bg-gray-100 dark:bg-zinc-700"
                } border-gray-300 dark:border-zinc-700`}
            >
              {Object.keys(teachers).map((id) => (
                <option key={id} value={id}>
                  {teachers[id].name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setSubPop(null)}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium"
            >
              Close
            </button>

            {!edit ? (
              <button
                onClick={() => setEdit(true)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
function ClassTeacherPopUp({ classTeacherPop, setClassTeacherPop }) {
  const { teachers, classes, updateSection } = store((state) => state);
  const [teacher, setTeacher] = useState(classTeacherPop.classTeacher)
  const Class = classes[classTeacherPop.className];
  const [edit, setEdit] = useState(false);

  const handleSave = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/class/class-teacher`, {
        sectionId: classTeacherPop._id,
        teacherId: teacher,
      })
      if (res.status === 200) {
        updateSection(res.data.section)
        setEdit(false)
        setClassTeacherPop(null)
      }
    } catch (err) {
      alert("Failed to save: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 text-gray-800 dark:text-white rounded-xl shadow-xl p-6 w-[90%] max-w-md">
        <div className="space-y-4">
          <div className="flex flex-col items-center text-center space-y-1">
            <p className="text-xl font-semibold">{Class.name}</p>
            <p className="text-md">{classTeacherPop.name} section</p>
          </div>

          <div className="flex flex-col gap-2" >
            <p className="font-medium">Class teacher</p>
            <select value={teacher} disabled={!edit} onChange={(e) => setTeacher(e.target.value)} className={`p-2 rounded-md border ${edit ? "bg-white dark:bg-zinc-800" : "bg-gray-100 dark:bg-zinc-700"} border-gray-300 dark:border-zinc-700`}>
              {Object.keys(teachers).map((id) => (
                <option key={id} value={id}>
                  {teachers[id].name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button onClick={() => setClassTeacherPop(null)} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium">Close</button>

            {!edit ?
              <button onClick={() => setEdit(true)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium">Edit</button>
              :
              <button onClick={handleSave} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium">Save</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ sect, leftBar }) {
  const [addStudent, setAddStudent] = useState(false);
  const [addSubject, setAddSubject] = useState(false)
  const [classTeacherPop, setClassTeacherPop] = useState(null)

  const { teachers, students, sections, classes, subjects } = store((state) => state)
  const section = sections[sect]
  const std = classes[section.className]
  const [subPop,setSubPop] = useState()
  const [studentPop, setStudentPop] = useState(null)

  if (!section) {
    return (
      <div className="w-full p-4 text-center text-red-600 bg-red-50 dark:bg-red-900 dark:text-red-200 rounded-lg">
        Section data not found for "{section}"
      </div>
    );
  }
  return (
    <div className={`${leftBar ? 'w-[65%] sm:w-[70%] lg:w-[75%]':'w-[95%]'} mx-auto right-5 absolute px-6 py-2 bg-gray-50 dark:bg-zinc-900 transition-colors rounded-md border dark:border-zinc-800`}>
      <div className="mb-10 text-center">
        <div className="flex flex-wrap justify-center gap-4 mb-5">
          <p className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-red-100 text-red-800 font-medium shadow-sm dark:bg-red-900 dark:text-red-100">
            <span className="font-bold text-sm">{std?.name}</span>
            <span className="text-sm">{section?.name} Section</span>
          </p>
        </div>

        <button className="inline-block px-6 py-4 rounded-xl bg-white dark:bg-zinc-700 shadow-md dark:shadow-lg border border-gray-200 dark:border-zinc-600" onClick={() => setClassTeacherPop(section)}>
          <p className="text-sm tracking-wide text-gray-600 dark:text-gray-400 mb-1 uppercase">Class Teacher</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{teachers[section.classTeacher]?.name || "Not Assigned"}</p>
        </button>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="students" className="mb-6 border rounded-lg overflow-hidden dark:border-zinc-700">
          <AccordionTrigger className="px-6 py-4 hover:no-underline bg-white dark:bg-zinc-800">
            <div className="flex items-center gap-4"><p className="text-lg font-medium text-gray-800 dark:text-gray-200">Students</p><span className="px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">{section.students.length}</span></div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col">
              <div className="w-full flex px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-700">
                <p className="lg:w-[25%] w-[40%]">Name</p>
                <p className="lg:w-[25%] w-[40%]">Phone</p>
                <p className="w-[30%] hidden lg:block">Email</p>
                <p className="w-[10%]"></p>
              </div>
              {section.students.map((id) => (
                <div key={id} className="w-full flex px-6 py-3 text-sm items-center border-t border-gray-100 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700/50">
                  <p className="lg:w-[25%] w-[40%] font-medium text-gray-800 dark:text-gray-200">{students[id]?.uname}</p>
                  <p className="lg:w-[25%] w-[40%] text-gray-600 dark:text-gray-400">{students[id]?.phone}</p>
                  <p className="w-[30%] text-gray-600 dark:text-gray-400 truncate hidden lg:block">{students[id]?.email}</p>
                  <button className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20" onClick={() => setStudentPop({ student: id, sect: sect })}><FontAwesomeIcon icon={faEye} className="hover:scale-150" /></button>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="teachers" className="mb-6 border rounded-lg overflow-hidden dark:border-zinc-700">
          <AccordionTrigger className="px-6 py-4 hover:no-underline bg-white dark:bg-zinc-800">
            <div className="flex items-center gap-4"><p className="text-lg font-medium text-gray-800 dark:text-gray-200">Subject and Teachers</p><span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">{section.subjects.length}</span></div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col">
              <div className="w-full flex px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-700">
                <p className="md:w-[25%] w-[40%]">Subject</p>
                <p className="md:w-[25%] w-[40%]">Teacher</p>
                <p className="w-[20%] hidden lg:block">Phone</p>
                <p className="w-[20%] hidden md:block">Qualification</p>
                <p className="md:w-[5%] w-[20%]"></p>
              </div>
              {section.subjects.map((tws, index) => (
                <div key={index} className="w-full flex px-6 py-3 text-sm items-center border-t border-gray-100 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700/50">
                  <p className="md:w-[25%] w-[40%] font-medium text-gray-800 dark:text-gray-200">{subjects[tws?.subject]?.name}</p>
                  <p className="md:w-[25%] w-[40%] text-gray-600 dark:text-gray-400">{teachers[tws?.teacher]?.name || null}</p>
                  <p className="w-[20%] hidden lg:block text-gray-600 dark:text-gray-400">{teachers[tws?.teacher]?.phone || null}</p>
                  <p className="w-[20%] hidden md:block text-gray-600 dark:text-gray-400">{teachers[tws?.teacher]?.qualification || null}</p>
                  <button className="md:w-[5%] w-[20%]" onClick={()=>setSubPop({teacherId : tws?.teacher || null,subject : tws.subject,sect : sect})}><FontAwesomeIcon icon={faEye} className="text-blue-800 dark:text-blue-300 hover:scale-125"/></button>
                 </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 flex justify-end gap-4">
        <button onClick={() => setAddStudent(true)} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md">+ Add Student</button>
        <button onClick={() => setAddSubject(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">+ Add Subject</button>
      </div>

      {addStudent && <AddStudent section={section} setAddStudent={setAddStudent}/>}
      {addSubject && <AddSubject sect={sect} setAddSubject={setAddSubject}/>}
      {subPop && <PopUp subPop={subPop} setSubPop={setSubPop} />}
      {classTeacherPop && <ClassTeacherPopUp classTeacherPop={classTeacherPop} setClassTeacherPop={setClassTeacherPop} />}
      {studentPop && <Student studentPop={studentPop} setStudentPop={setStudentPop} />}
    </div>
  )
}
export default Section