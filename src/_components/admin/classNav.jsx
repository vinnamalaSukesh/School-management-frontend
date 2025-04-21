import { useState } from "react";
import store from "@/store/data";

function ClassesNav({ setSect,setCurView }) {
    const {classes,sections} = store((state) => state);
    const [openYear, setOpenYear] = useState(null);

    const toggleYear = (year) => {
        setOpenYear((prev) => (prev === year ? null : year));
    }
    return (
        <div className="w-full p-4 text-sm">
            {Object.keys(classes).map((year) => (
                <div key={year} className="mb-3">
                    <button onClick={() => toggleYear(year)} className="w-full text-left px-4 py-3 rounded bg-emerald-600 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 hover:bg-emerald-700 transition-all duration-200 font-semibold flex justify-between items-center">
                        <span>{classes[year].name}</span>
                        <span>{openYear === year ? "▲" : "▼"}</span>
                    </button>

                    {openYear === year && (
                        <div className="pl-4 mt-2 space-y-2 transition-all duration-300">
                            {(classes[year].sections).map((id) => (
                                <button key={id} className="w-full text-left px-4 py-2 bg-emerald-100 hover:bg-emerald-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-black dark:text-white rounded transition-all duration-200" onClick={() => {setSect(id)
                                setCurView('section')}}>
                                    Section {sections[id].name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ClassesNav;
