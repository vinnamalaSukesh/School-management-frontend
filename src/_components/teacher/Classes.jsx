import store from "@/store/data"

function Classes({ leftBar }) {
  const { sections, classes, assignedSubjects, subjects } = store((state)=>state)
  return (
    <div className={`absolute top-10 right-0 transition-all duration-300 ${leftBar ? 'w-[75%]' : 'w-full'} min-h-screen bg-gray-50 dark:bg-zinc-900 px-6 py-8`}>
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Assigned Subjects</h1>

      <div className="flex items-center justify-around w-full px-4 py-3 rounded-t-md bg-emerald-200 text-emerald-900 dark:bg-zinc-800 dark:text-white font-semibold text-sm border-b border-gray-300 dark:border-zinc-700">
        <p className="w-[40%] text-center">Class</p>
        <p className="w-[20%] text-center">Section</p>
        <p className="w-[40%] text-center">Subject</p>
      </div>

      {assignedSubjects?.map((obj, index) => (
        <div key={index} className="flex items-center justify-around px-4 py-3 border-b border-gray-100 dark:border-zinc-700 text-sm hover:bg-emerald-100 dark:hover:bg-zinc-800 transition">
          <p className="text-gray-800 dark:text-white w-[40%] text-center">{classes[sections[obj.section]?.className]?.name}</p>
          <p className="text-gray-600 dark:text-gray-300 w-[20%] text-center">{sections[obj.section]?.name}</p>
          <p className="text-gray-700 dark:text-gray-200 w-[40%] text-center">{subjects[obj.subject]?.name}</p>
        </div>
      ))}
    </div>
  )
}
export default Classes
