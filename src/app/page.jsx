"use client";
import ToDoLayout from "@/components/ToDoLayout";
import HomeLayout from "@/components/HomeLayout";
import { CircleUserRound, SunMoon } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const themeSwitch = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', '');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') { 
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen">
      <header className="p-3 bg-zinc-300/70 dark:bg-gray-100/10 backdrop-blur-lg">
        <nav className="flex items-center justify-between">
          <div className="text-sm tracking-wider">just-do</div>
          {session ? (
            <div className="flex items-center">
              <SunMoon className="mr-5 cursor-pointer" onClick={themeSwitch}/>
              <button onClick={handleLogout} className="flex items-center">
                <CircleUserRound className="mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <SunMoon className="mr-5 cursor-pointer" onClick={themeSwitch}/>
              <button onClick={handleLogin} className="flex items-center">
                <CircleUserRound className="mr-2" />
                Login
              </button>
            </div>
          )}
        </nav>
      </header>
      {session ? <ToDoLayout session={session} /> : <HomeLayout handleLogin={handleLogin} />}
    </div>
  );
}
