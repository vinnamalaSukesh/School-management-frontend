import store from "@/store/data";
import axios from "axios";
import { useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function AddClass({ setAddClass }) {
    const [className, setClassName] = useState("");
    const [selectedSections, setSelectedSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState("");
    const sections = ['A', 'B', 'C', 'D', 'E', 'F'];

    const [subjectTeachers, setSubjectTeachers] = useState({});
    const [subName, setSubName] = useState("");
    const [teacherName, setTeacherName] = useState("");
    const [classTeacher, setClassTeacher] = useState("");
    const [classTeachers, setClassTeachers] = useState({});
    const { addClass, teachers, addSections, subjects } = store((state) => state);

    const handleClassTeacher = () => {
        if (!selectedSection) return;
        setClassTeachers((prev) => ({
            ...prev,
            [selectedSection]: classTeacher || null
        }));
        setClassTeacher("");
    }
    const handleSections = (section, isChecked) => {
        setSelectedSections((prev) =>
            isChecked ? [...prev, section] : prev.filter((s) => s !== section)
        );
    }
    const handleSubTeachers = () => {
        if (!subName || !selectedSection) {
            alert("Please fill subject and section.");
            return;
        }

        setSubjectTeachers((prev) => {
            const updated = { ...prev };
            if (!updated[selectedSection]) {
                updated[selectedSection] = {};
            }
            updated[selectedSection][subName] = teacherName || null;
            return updated;
        });
        setSubName("");
        setTeacherName("");
    }
    const handleSave = async () => {
        const sectionData = selectedSections.map((section) => ({
            name: section,
            classTeacher: classTeachers[section] || null,
            subjects: subjectTeachers[section] || {}
        }))
        try {
            const res = await axios.post(`${BACKEND_URL}/class/create`, {
                name: className,
                sections: sectionData
            })
            if (res.status === 200) {
                addClass(res.data.class)
                addSections(res.data.sections)
                console.log(res.data.sections)
                setAddClass(false)
            }
        } catch (err) {
            alert(err.message || "Something went wrong.");
        }
    }
    return (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center left-0 top-[10vh] pt-0 min-h-[90vh] overflow-y-auto">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 w-full max-w-2xl space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Add New Class</h2>

                <input type="text" value={className} onChange={(e) => setClassName(e.target.value)} placeholder="Enter class name" className="w-full p-3 border rounded-lg dark:bg-zinc-800 dark:text-white"/>
                <div className="space-y-2">
                    <p className="font-semibold text-gray-700 dark:text-gray-200">Sections:</p>
                    <div className="flex flex-wrap gap-4">{sections.map((section) => (
                            <label key={section} className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-200">
                                <input type="checkbox" value={section} checked={selectedSections.includes(section)} onChange={(e) => handleSections(e.target.value, e.target.checked)} className="accent-blue-600"/>
                                {section}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between gap-6">
                    <div className="flex-1 space-y-2">
                        {selectedSection ? (
                            <div className="space-y-4">
                                <div className="p-3 rounded-md bg-blue-50 dark:bg-zinc-800 border dark:border-zinc-700">
                                    <p className="font-semibold text-blue-900 dark:text-white">Class Teacher for Section {selectedSection}:</p>
                                    <p className="text-gray-700 dark:text-gray-300">👨‍🏫 {classTeachers?.[selectedSection]? teachers[classTeachers[selectedSection]]?.name || "(ID only)": "Not assigned"}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <p className="font-semibold text-blue-900 dark:text-white">Subject Teachers:</p>
                                    {subjectTeachers[selectedSection] ? (
                                        Object.entries(subjectTeachers[selectedSection]).map(([subject, teacherId], idx) => (
                                            <div key={idx} className="bg-gray-100 dark:bg-zinc-800 rounded p-2 shadow text-sm">
                                                <p className="font-medium">📘 {subjects[subject]?.name}</p>
                                                <p className="text-gray-600 dark:text-gray-300">👨‍🏫 {teacherId? teachers[teacherId]?.name || "(ID only)": "Not assigned"}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-yellow-700 dark:text-yellow-300">No subjects assigned for this section yet.</div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center p-4 bg-yellow-50 dark:bg-zinc-800 border border-yellow-300 dark:border-zinc-700 rounded-md text-yellow-800 dark:text-yellow-200">
                                📚 Select a section to see details
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4">
                        <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="p-2 rounded border dark:bg-zinc-800 dark:text-white">
                            <option value="">Select Section</option>
                            {selectedSections.map((section) => (
                                <option key={section} value={section}>
                                    {section}
                                </option>
                            ))}
                        </select>

                        <div className="flex items-center w-full flex-wrap justify-between">
                            <p className="w-1/3">Class teacher:</p>
                            <select value={classTeacher} onChange={(e) => setClassTeacher(e.target.value)} className="p-2 rounded border dark:bg-zinc-800 dark:text-white w-1/3">
                                <option value="">Select Teacher</option>
                                {Object.keys(teachers).map((id) => (
                                    <option key={id} value={id}>
                                        {teachers[id].name}
                                    </option>
                                ))}
                            </select>
                            <div className="w-1/4 flex items-center justify-end">
                                <button onClick={handleClassTeacher} className="bg-blue-800 dark:bg-blue-500 px-3 p-1 rounded-sm text-white">Save</button>
                            </div>
                        </div>

                        <div className="flex gap-2 items-center w-full flex-wrap">
                            <select className="p-2 rounded border dark:bg-zinc-800 dark:text-white" value={subName} onChange={(e)=>setSubName(e.target.value)}>
                                <option>Select subject</option>
                                {Object.keys(subjects).map((id)=>(
                                    <option key={id} value={id}>{subjects[id]?.name}</option>
                                ))}
                            </select>
                            <select value={teacherName} onChange={(e) => setTeacherName(e.target.value)} className="p-2 rounded border dark:bg-zinc-800 dark:text-white">
                                <option value="">Select Teacher</option>
                                {Object.keys(teachers).map((id) => (
                                    <option key={id} value={id}>
                                        {teachers[id]?.name}
                                    </option>
                                ))}
                            </select>
                            <button onClick={handleSubTeachers} className="bg-blue-500 text-white px-3 py-1 rounded">Add</button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between">
                    <button onClick={() => setAddClass(false)} className="text-red-600 font-semibold px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md">❌ Close
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">✅ Save Class</button>
                </div>
            </div>
        </div>
    );
}

export default AddClass;
