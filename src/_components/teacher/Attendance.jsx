import store from "@/store/data";
import axios from "axios";
import { useEffect, useState } from "react"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function Attendance({ leftBar }) {
    const today = new Date().toISOString().split("T")[0]
    const { classTeacherFor, classes, students, updateSection, setClassTeacherFor } = store((state) => state)

    const [view, setView] = useState("today")
    const [attendance, setAttendance] = useState({})

    const handleAttendanceChange = (studentId, value) => {
        setAttendance((prev) => ({
            ...prev,[studentId]: value,
        }))
    }
    const handleSave = async()=>{
        const res = await axios.post(`${BACKEND_URL}/attendance/create`,{today,section : classTeacherFor._id,attendance})
        if(res.status === 200){
            updateSection(res.data.section)
            setClassTeacherFor(res.data.section)
        }
    }
    useEffect(() => {
        if (!classTeacherFor?.attendance || !classTeacherFor?.students) return;

        const todayDate = new Date(today).toISOString().split("T")[0];
        const todayRecord = classTeacherFor.attendance.find(
            (a) => new Date(a.date).toISOString().split("T")[0] === todayDate
        );

        if (todayRecord) {
            const initialAttendance = {};
            todayRecord.records.forEach((record) => {
                initialAttendance[record.student] = record.status;
            });
            setAttendance(initialAttendance);
        }
        else {
            const defaultAttendance = {};
            classTeacherFor.students.forEach((id) => {
                defaultAttendance[id] = "N/A";
            });
            setAttendance(defaultAttendance);
        }
    }, [classTeacherFor, today])
    const [groupedAttendance, setGroupedAttendance] = useState({});

    useEffect(() => {
        if (!classTeacherFor?.attendance || !classTeacherFor?.students) return;

        const todayDate = new Date(today).toISOString().split("T")[0];

        const previousRecords = classTeacherFor.attendance.filter(
            (a) => new Date(a.date).toISOString().split("T")[0] !== todayDate
        );

        const grouped = groupAttendance(previousRecords, students);
        setGroupedAttendance(grouped);
    }, [classTeacherFor, today])

    function groupAttendance(attendanceArray, students) {
        const grouped = {};

        attendanceArray.forEach((entry) => {
            const date = new Date(entry.date);
            const monthKey = date.toLocaleString("default", { month: "long", year: "numeric" }); // eg: April 2025
            const dayKey = date.toISOString().split("T")[0]; // eg: 2025-04-18

            if (!grouped[monthKey]) grouped[monthKey] = {};
            if (!grouped[monthKey][dayKey]) grouped[monthKey][dayKey] = [];

            const enrichedRecords = entry.records.map((rec) => ({
                studentName: students[rec.student]?.uname || "Unknown",
                status: rec.status
            }));

            grouped[monthKey][dayKey].push(...enrichedRecords);
        });

        return grouped;
    }
    return (
    <div className={`absolute top-[10vh] right-0 transition-all duration-300 ${leftBar ? "w-[75%]" : "w-full"} min-h-[90vh] bg-gray-50 dark:bg-zinc-900 px-4 sm:px-8 py-6`}>
        <div className="bg-white dark:bg-zinc-800 px-6 py-4 rounded-lg shadow border border-gray-200 dark:border-zinc-700 w-fit mx-auto mb-6">
            <p className="text-center text-gray-500 dark:text-gray-400 tracking-wide mb-2 text-lg">CLASS TEACHER</p>
            <p className="text-base font-semibold text-gray-800 dark:text-white flex gap-3 justify-center">
                <span className="px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-700 dark:text-white text-emerald-800 text-sm">{classes[classTeacherFor.className]?.name}</span>
                <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-700 dark:text-white text-blue-800 text-sm">{classTeacherFor?.name} Section</span>
            </p>
        </div>

        <div className="flex items-center justify-center gap-5 mb-8">
            <button className={`px-6 py-2 rounded-sm font-semibold transition-all ${view === "today" ? "bg-blue-800 text-white dark:bg-blue-400 dark:text-black" : "bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-white"}`} onClick={() => setView("today")}>Today</button>
            <button className={`px-6 py-2 rounded-sm font-semibold transition-all ${view === "previous" ? "bg-blue-800 text-white dark:bg-blue-400 dark:text-black" : "bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-white"}`} onClick={() => setView("previous")}>Previous</button>
        </div>

        {view === "today" && (
            <div className="flex flex-col items-center">
                <div className="w-full max-w-md flex py-3 border-b border-gray-200 dark:border-zinc-700 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <p className="w-1/4 text-center">Student Name</p>
                    <p className="w-1/4 text-center">Present</p>
                    <p className="w-1/4 text-center">Absent</p>
                    <p className="w-1/4 text-center">N/A</p>
                </div>

                {classTeacherFor.students.map((id) => (
                    <div key={id} className="flex items-center justify-between w-full max-w-md px-2 py-3 text-sm">
                        <p className="text-gray-800 dark:text-white font-medium w-1/4 text-center truncate">{students[id]?.uname}</p>
                        <input type="radio" name={`attendance-${id}`} value="P" checked={attendance[id] === "P"} onChange={() => handleAttendanceChange(id, "P")} className="form-radio accent-green-500 h-4 w-1/4" />
                        <input type="radio" name={`attendance-${id}`} value="A" checked={attendance[id] === "A"} onChange={() => handleAttendanceChange(id, "A")} className="form-radio accent-red-500 h-4 w-1/4"/>
                        <input type="radio" name={`attendance-${id}`} value="N/A" checked={attendance[id] === "N/A"} onChange={() => handleAttendanceChange(id, "N/A")} className="form-radio accent-yellow-500 h-4 w-1/4"/>
                    </div>
                ))}

                <button onClick={handleSave} className="mt-6 px-6 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-400 dark:text-black dark:hover:bg-blue-500 transition-all">Save</button>
            </div>
        )}

        {view === "previous" && (
        <div className="w-full max-w-2xl mx-auto">
            { Object.entries(groupedAttendance).length > 0 ? Object.entries(groupedAttendance).map(([month, days]) => (
                <details key={month} className="mb-4 border border-gray-300 dark:border-zinc-700 rounded overflow-hidden">
                    <summary className="bg-gray-200 dark:bg-zinc-800 px-4 py-2 cursor-pointer font-semibold dark:text-white">{month}</summary>

                    <div className="pl-4 pr-2 py-2">
                        {Object.entries(days).map(([day, records]) => (
                            <details key={day} className="mb-2 border border-gray-200 dark:border-zinc-700 rounded">
                                <summary className="bg-white dark:bg-zinc-900 px-4 py-2 cursor-pointer font-medium dark:text-gray-200">{new Date(day).toDateString()}</summary>

                                <div className="px-6 py-3">
                                    {records.map((record, idx) => (
                                        <div key={idx} className="flex justify-between py-1 border-b border-gray-100 dark:border-zinc-800">
                                            <span className="text-gray-800 dark:text-white">{record.studentName}</span>
                                            <span className={`font-semibold ${record.status === "P" ? "text-green-600" : record.status === "A" ? "text-red-600" : "text-yellow-500"}`}>
                                                {record.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </details>
                        ))}
                    </div>
                </details>
            ))
            : (
                <div className="text-center mt-8 p-4 bg-yellow-50 dark:bg-zinc-800 border border-yellow-300 dark:border-zinc-600 text-yellow-800 dark:text-yellow-300 rounded-md shadow-sm">
                    🚫 No previous attendance records found
                </div>
            ) }
        </div>
        )}
    </div>
    )
}

export default Attendance;
