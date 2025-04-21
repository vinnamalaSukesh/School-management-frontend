import store from "@/store/data";
import mike from '../admin/mike.json'
import Lottie from "lottie-react";

function AnnouncementCard({ message }) {
    return (
        <div className="p-4 mb-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-700 dark:to-zinc-800 border border-gray-200 dark:border-zinc-700 hover:border-red-300 dark:hover:border-red-500 transition-all duration-300 group">
            <div className="flex items-start">
                <div className="bg-red-500 p-1 rounded-full mr-3 mt-1 group-hover:bg-red-600 transition-colors"></div>
                <p className="text-gray-800 dark:text-gray-200 font-medium">{message}</p>
            </div>
        </div>
    )
}
function Home({ leftBar }) {
    const { announcements } = store((state) => state)
    return (
        <div className={`absolute top-10 right-0 transition-all duration-300 ${leftBar ? 'w-[80%]' : 'w-full'} min-h-screen bg-gray-50 dark:bg-zinc-900`}>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto pb-3 px-5 bg-white dark:bg-zinc-800 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-[100px] h-[100px]"><Lottie animationData={mike} loop={true} /></div>
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