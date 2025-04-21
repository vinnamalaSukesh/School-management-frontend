import store from "@/store/data"

function MarkSheets({ leftBar }) {
  const { classes, sections, subjects, teachers } = store((state) => state)
  return (
    <div className={`flex flex-col items-center absolute top-[10vh] right-0 transition-all duration-300 ${leftBar ? 'w-[75%]' : 'w-full'} min-h-[90vh] bg-gray-50 dark:bg-zinc-900 px-6 py-8 shadow-xl rounded-l-2xl`}>

      <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white tracking-wide">Mark Sheet</h2>

      <div className="flex items-center justify-center gap-2 text-lg font-medium text-emerald-700 dark:text-emerald-300 mb-8">
        <span className="capitalize">{classes?.name}</span>
        <span>|</span>
        <span className="capitalize">{sections?.name} Section</span>
      </div>

      <div className="flex justify-between px-6 py-3 w-full bg-emerald-300 text-emerald-900 dark:bg-emerald-800 dark:text-white font-semibold text-sm rounded-t-md shadow-sm border-b border-gray-300 dark:border-zinc-700">
        <p className="w-[20%] text-left">Subject</p>
        <p className="w-[20%] text-left">Teacher</p>
        <p className="w-[20%] text-center">Quarterly</p>
        <p className="w-[20%] text-center">Half-Yearly</p>
        <p className="w-[20%] text-center">Annually</p>
      </div>

      <div className="w-full">
        {
          sections?.studentMarks?.map((sub, index) => (
            <div key={sub.subject} className={`flex justify-between px-6 py-3 w-full font-medium text-sm border-b border-gray-200 dark:border-zinc-700 transition duration-200${index % 2 === 0 ? 'bg-white dark:bg-zinc-800' : 'bg-gray-100 dark:bg-zinc-700'}hover:bg-emerald-100 dark:hover:bg-emerald-900`}>
              <p className="w-[20%] text-left capitalize">{subjects[sub.subject]?.name}</p>
              <p className="w-[20%] text-left capitalize">{teachers[sub.teacher]?.name || 'N/A'}</p>
              <p className="w-[20%] text-center">{sub?.marks?.quarter ?? 'N/A'}</p>
              <p className="w-[20%] text-center">{sub?.marks?.half ?? 'N/A'}</p>
              <p className="w-[20%] text-center">{sub?.marks?.annual ?? 'N/A'}</p>
            </div>
          ))
        }
      </div>
    </div>

  )
}
export default MarkSheets