import { create } from "zustand";

const store = create((set) => ({
    teachers: {},
    students: {},
    classes: {},
    sections : {},
    subjectTeachers: {},
    announcements: {},
    markSheets : {},
    logined : {},
    classTeacherFor : {},
    assignedSubjects : {},
    subjects : {},
    class : {},

    setClass : (data) => set({class : data}),
    setMarkSheets: (Marks) => set({ markSheets : Marks}),

    setSubjects : (Subjects) => set({subjects : Subjects}),
    updateSubject : (Subject)=> set((state)=>({subjects : {...state.subjects,[Subject._id]:Subject}})),
    addSubject : (Subject) => set((state)=>({subjects : {...state.subjects,[Subject._id] : Subject}})),
    deleteSubject : (id) => set((state)=>{
        const Subjects = {...state.subjects}
        delete Subjects[id]
        return {subjects : Subjects}
    }),

    setAssignedSubjects : (sections) => set({assignedSubjects : sections}),
    setClassTeacherFor : (Class)=>set({classTeacherFor : Class}),
    setLogined : (data)=> set({logined:data}),

    setTeachers : (Teachers)=> set({teachers:Teachers}),
    addTeacher: (teacher) =>
        set((state) => ({
            teachers: { ...state.teachers, [teacher._id]: teacher }
        })),
    updateTeacher: (teacher) =>
        set((state) => ({
            teachers: {
                ...state.teachers,
                [teacher._id]: { ...state.teachers[teacher._id], ...teacher }
            }
        })),
    deleteTeacher : (_id) =>
        set((state) => {
            const updated = { ...state.teachers };
            delete updated[_id];
            return { teachers: updated };
        }),

    setStudents : (Students)=>set({students:Students}),
    addStudent : (student)=>
        set((state)=>({students:{...state.students,[student._id]:student}})),
    updateStudent: (student) =>
        set((state) => ({
            students: {
                ...state.students,
                [student._id]: { ...state.students[student._id], ...student }
            }
        })),
    deleteStudent: (_id) =>
        set((state) => {
            const updated = { ...state.students };
            delete updated[_id];
            return { students: updated };
        }),

    setAnnouncements :(Announcements) =>set({announcements:Announcements}),
    addAnnouncement: (announcement) =>
        set((state) => ({
            announcements: {...state.announcements,[announcement._id]: announcement}
        })),
    updateAnnouncement: (announcement) =>
        set((state) => ({
            announcements: {
                ...state.announcements,
                [announcement._id]: {
                    ...state.announcements[announcement._id],
                    ...announcement
                }
            }
        })),
    deleteAnnouncement: (_id) =>
        set((state) => {
            const updated = { ...state.announcements };
            delete updated[_id];
            return { announcements: updated };
        }),

    setClasses : (Classes)=>set({classes : Classes}),
    addClass : (Class)=>
        set((state)=> ({classes:{...state.classes,[Class.name]:Class}})),
    updateClass : (Class)=>
        set((state)=>({classes:{...state.classes,Class}})),
    deleteClass : (year)=>
        set((state)=> {
            const updateClasses = {...state.classes};
            delete updateClasses[year]
            return {classes : updateClasses};
        }),

    setSections : (Sections)=>set({sections : Sections}),
    updateSection : (Section)=>set((state)=>({sections : {...state.sections,[Section._id]:Section}})),
    addSections : (Sections) =>
        set((state)=> ({sections : {...state.sections,...Sections}})),
}))
export default store