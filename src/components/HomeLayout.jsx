export default function HomeLayout({ handleLogin }) {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100svh-64px)]">
            <div className="w-3/4 md:w-2/6 text-center">
                <div className="flex flex-col gap-3">
                    <div className="dark:text-white">just-do is open source to-do without distracted stuffs</div>
                    <div className="dark:text-white text-xs">made by <a href="https://github.com/optim00s">optim00s</a></div>
                </div>
            </div>
            <div className="text-sm italic text-black/40 dark:text-white/30 mt-10 cursor-pointer hover:underline" onClick={handleLogin}>let's get started</div>
        </div>
    );
}