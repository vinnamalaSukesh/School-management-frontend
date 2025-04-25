import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import store from "@/store/data";
import axios from "axios";
import { useEffect, useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function Marks({ id, setData, subject, section }) {
    const { sections, students } = store((state) => state)
    const Subject = sections[section]?.subjects?.find((sub)=> sub.subject === subject)
    const Student = Subject?.markSheet.find(stu=> stu.student === id)

    const [quarter, setQuarter] = useState(Student?.quarter || "")
    const [half, setHalf] = useState(Student?.half || "")
    const [annual, setAnnual] = useState(Student?.annual || "")
    useEffect(() => {
        setData((prev) => {
            const existingIndex = prev.findIndex((s) => s.student === id);
            const newEntry = { student : id, quarter, half, annual };
            if (existingIndex !== -1) {
                const updated = [...prev];
                updated[existingIndex] = newEntry;
                return updated;
            } else {
                return [...prev, newEntry]
            }
        })
    }, [quarter, half, annual])

    return (
        <div className="flex items-center justify-around px-2 py-1 border border-gray-200 dark:border-zinc-700 rounded-md">
            <input className="text-gray-800 dark:text-white w-[30%] p-2 text-center bg-transparent  " value={students[id]?.uname} disabled/>
            <input type="number" className="w-[15%] p-2 rounded-md border text-center border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white " value={quarter} onChange={(e) => setQuarter(+e.target.value)}/>
            <input type="number" className="w-[15%] p-2 rounded-md border text-center border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white " value={half} onChange={(e) => setHalf(+e.target.value)}/>
            <input type="number" className="w-[15%] p-2 rounded-md border text-center border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white " value={annual} onChange={(e) => setAnnual(+e.target.value)}/>
        </div>
    )
}

function MarkSheet({ leftBar }) {
    const { sections, assignedSubjects, classes, subjects, updateSection } = store((state) => state)

    const [data,setData] = useState([])
    const handleSave = async({section, subject})=>{
        const res = await axios.post(`${BACKEND_URL}/marks/create`,{section,subject,data})
        if(res.status === 200){
            updateSection(res.data.section)
        }
    }
    return (
        <div className={`absolute top-10 right-0 transition-all duration-300 ${leftBar ? "w-[75%]" : "w-full"} min-h-screen bg-gray-50 dark:bg-zinc-900 px-6 py-8`}>
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Subject-wise Student Marks</h2>

            <Accordion type="single" collapsible className="w-full space-y-4">
                {assignedSubjects.map((subject) => (
                    <AccordionItem value={subject} key={subject} className="border rounded-lg dark:border-zinc-700">
                        <AccordionTrigger>
                            <div className="w-full flex items-center gap-4 p-2">
                                <p>{classes[sections[subject.section]?.className]?.name}</p>
                                <p>{sections[subject.section]?.name} section</p>
                                <p>{subjects[subject.subject]?.name}</p>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex items-center justify-around px-2 py-1 border border-gray-200 dark:border-zinc-700 rounded-md">
                                <p className="w-[30%] text-center  ">Student</p>
                                <p className="w-[15%] text-center  ">Quarterly</p>
                                <p className="w-[15%] text-center  ">Half yearly</p>
                                <p className="w-[15%] text-center  ">Annual</p>
                            </div>
                            {subject.students.map((id)=> <Marks key={id} id={id} setData={setData} subject={subject.subject} section={subject.section}/>)}
                            <div className="w-full flex items-center justify-center"><button className="dark:bg-blue-300 bg-blue-800 dark:text-black text-white p-2 px-10 rounded-sm mx-auto m-2" onClick={()=>handleSave({section : subject.section,subject : subject.subject})}>SAVE</button></div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

export default MarkSheet;
