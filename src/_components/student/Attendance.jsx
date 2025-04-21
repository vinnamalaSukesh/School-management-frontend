import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import store from '@/store/data';

const Attendance = ({ leftBar }) => {
  const { sections } = store((state) => state);

  if (!sections || !sections.attendance || sections.attendance.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4 text-center text-gray-500 dark:text-gray-400">
        No attendance data found.
      </div>
    );
  }
  const attendanceByMonth = sections.attendance.reduce((acc, record) => {
    const date = new Date(record.date);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const monthYearKey = `${year}-${month}`;

    if (!acc[monthYearKey]) {
      acc[monthYearKey] = [];
    }
    acc[monthYearKey].push(record);
    return acc;
  }, {})
  return (
    <div className={`absolute top-[10vh] flex items-start justify-center right-0 transition-all duration-300 ${leftBar ? "w-[75%]" : "w-full"} min-h-[90vh] bg-gray-50 dark:bg-zinc-900 px-4 sm:px-8 py-6`}>
      <div className='w-[400px] '>
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(attendanceByMonth).sort((a, b) => new Date(a[0]) - new Date(b[0])).map(([monthYear, records]) => {
            const [year, month] = monthYear.split('-');
            return (
              <AccordionItem key={monthYear} value={monthYear} className="border-b border-gray-200 dark:border-gray-700 last:border-none">
                <AccordionTrigger className="py-3 font-semibold text-gray-900 dark:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors duration-200 w-full">
                  {month} {year}
                </AccordionTrigger>
                <AccordionContent className="pl-4 mt-2 space-y-2">
                  {records.map((record) => (
                    <div key={record.date} className="flex items-center justify-between py-1 w-full ">
                      <p className="text-sm text-gray-600 dark:text-gray-300">{new Date(record.date).toLocaleDateString()}</p>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${record.records[0]?.status === 'P' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : record.records[0]?.status === 'A' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' }`}> {record.records[0]?.status || '-'}</span>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default Attendance
