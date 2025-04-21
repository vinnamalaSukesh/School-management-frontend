import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import store from "@/store/data";
import Section from "./nestedSection";
import { useState } from "react";
import AddClass from "./AddClass";
import AddSection from "./AddSection";

function Classes({ leftBar }) {
  const { classes,sections } = store((state) => state)
  const [addClass,setAddClass] = useState(false)
  const [addSection,setAddSection] = useState(null)
  return (
    <div className={`${leftBar ? "w-[75%]" : "w-full"} absolute right-0 top-[10vh] h-[90vh] overflow-y-auto px-6 py-4 bg-gray-50 dark:bg-zinc-900 transition-colors duration-300`}>
      <button onClick={()=>setAddClass(true)} className="flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 transition-all shadow-md hover:shadow-lg font-medium mx-auto mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Class
      </button>

      <Accordion type="single" collapsible className="w-full space-y-6">
        {Object.keys(classes).map((year) => (
          <AccordionItem value={year} key={year} className="rounded-xl border border-gray-300 dark:border-zinc-700 shadow-sm bg-white dark:bg-zinc-800">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex justify-between items-center w-full">
                <p className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-3"><span>{classes[year]?.name}</span>{classes[year]?.sections.length}<span>sections</span></p>
              </div>
            </AccordionTrigger>

            <AccordionContent className="bg-gray-50 dark:bg-zinc-800 px-3 sm:px-6 py-4 rounded-b-xl">
              <Accordion type="single" collapsible className="space-y-4">
                <div className="w-full flex items-center justify-center">
                  <button className=" p-2 rounded-sm bg-zinc-300 font-semibold dark:bg-zinc-700 dark:text-white" onClick={()=>setAddSection(year)}>Add section</button>
                </div>

                {classes[year].sections.map((sect) => (
                  <AccordionItem key={sect} value={sect} className="rounded-md border border-gray-200 dark:border-zinc-700">
                    <AccordionTrigger className="px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:no-underline">Section {sections[sect].name}</AccordionTrigger>
                    <AccordionContent className="pt-2">
                      <Section sect={sect} Class={year} leftBar={leftBar} />
                    </AccordionContent>
                  </AccordionItem>
                ))}

              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {addClass && <AddClass setAddClass={setAddClass}/>}
      {addSection && <AddSection id={addSection} setAddSection={setAddSection}/>}
    </div>
  );
}
export default Classes;
