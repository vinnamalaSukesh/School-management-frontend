import store from "@/store/data";
import { Section } from "lucide-react";
import { useState } from "react";

function AddSection({ year, setAddSection }) {
    const [section, setSection] = useState('')
    const { addSection } = store((state) => state)

    const handleSave = () => {
        addSection(year,section)
        setAddSection(false)
    }
    return (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 w-full max-w-xl space-y-4">
                <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white">Add New Section to {year}</h2>
                <input type="text" value={section} onChange={(e) => setSection(e.target.value)} placeholder="Enter Section name:" className="input-field w-full p-2 border rounded dark:bg-zinc-800 dark:text-white" />

                <div className="flex justify-between">
                    <button onClick={() => setAddSection(null)} className="text-red-700 font-semibold px-4 py-2 bg-red-100 rounded-sm">Close</button>
                    <button onClick={handleSave} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Save Section</button>
                </div>
            </div>
        </div>
    )
}
export default AddSection