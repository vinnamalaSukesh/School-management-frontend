import store from "@/store/data";
import mike from './mike.json';
import Lottie from "lottie-react";

function StatCard({ title, count, to, setCurView }) {
    return (
        <button className="flex flex-col items-center justify-center p-6 rounded-xl bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-zinc-700 sm:w-[170px] lg:w-[200px] w-[150px] mx-1 my-3" onClick={()=>setCurView(to)}>
            <p className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider mb-2">{title}</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 dark:from-red-500 dark:to-red-400 bg-clip-text text-transparent">{count}</p>
        </button>
    )
}
function AnnouncementCard({ message }) {
    return (
        <div className="p-4 mb-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-700 dark:to-zinc-800 border border-gray-200 dark:border-zinc-700 hover:border-red-300 dark:hover:border-red-500 transition-all duration-300 group">
            <div className="flex items-start">
                <div className="bg-red-500 p-1 rounded-full mr-3 mt-1 group-hover:bg-red-600 transition-colors"></div>
                <p className="text-gray-800 dark:text-gray-200 font-medium">{message}</p>
            </div>
        </div>
    );
}
function Home({ leftBar,setCurView }) {
    const { teachers, students, classes, announcements } = store((state) => state)
    return (
        <div className={`absolute top-0 right-0 transition-all duration-300 ${leftBar ? 'w-[80%]' : 'w-full'} min-h-screen bg-gray-50 dark:bg-zinc-900`}>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap justify-evenly gap-2 mb-10 mt-10 w-full items-center">
                    <StatCard title="Teachers" count={Object.keys(teachers || {}).length} to='teachers' setCurView={setCurView}/>
                    <StatCard title="Students" count={Object.keys(students || {}).length} to='students' setCurView={setCurView} />
                    <StatCard title="Classes" count={Object.keys(classes || {}).length} to='classes' setCurView={setCurView} />
                    <StatCard title="Announcements" count={Object.keys(announcements || {}).length} to='announcements' setCurView={setCurView} />
                </div>

                <div className="max-w-4xl mx-auto pb-3 px-5 bg-white dark:bg-zinc-800 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-[100px] h-[100px]">
                            <Lottie animationData={mike} loop={true} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white relative inline-block">
                            <span className="relative z-10 px-4">Latest Announcements</span>
                            <span className="absolute bottom-1 left-0 w-full h-2 bg-red-100 dark:bg-red-900/50 z-0"></span>
                        </h2>
                    </div>

                    {Object.keys(announcements)?.length > 0 ?
                        <div className="space-y-4">
                            {Object.keys(announcements).map((id) => (
                                <AnnouncementCard key={id} message={announcements[id].message} />
                            ))}
                        </div>
                     :
                        <div className="text-center py-8">
                            <div className="inline-block p-4 bg-gray-100 dark:bg-zinc-700 rounded-full mb-4">
                                <svg className="w-10 h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">No announcements available at this time</p>
                        </div>}
                </div>
            </div>
        </div>
    )
}
export default Home