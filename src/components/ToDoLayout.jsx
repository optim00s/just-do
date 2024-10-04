"use client";
import { useState, useEffect } from "react";
import { supabase } from '../lib/supabaseClient';

export default function ToDoLayout({ session }) {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, [session]);

    async function fetchTasks() {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: true });
        
        if (error) {
            console.error('Error fetching tasks:', error);
            setError('Failed to fetch tasks. Please try again.');
        } else {
            setTasks(data);
            setError(null);
        }
    }

    const addTask = async () => {
        if (newTask.trim()) {
            const { data, error } = await supabase
                .from('tasks')
                .insert([{ 
                    text: newTask, 
                    user_id: session.user.id,
                    created_at: new Date().toISOString()
                }])
                .select();
            
            if (error) {
                console.error('Error adding task:', error);
                setError('Failed to add task. Please try again.');
            } else {
                setTasks([...tasks, data[0]]);
                setNewTask('');
                setError(null);
            }
        }
    }

    const deleteTask = async (id) => {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .match({ id, user_id: session.user.id });
        
        if (error) {
            console.error('Error deleting task:', error);
            setError('Failed to delete task. Please try again.');
        } else {
            setTasks(tasks.filter(task => task.id !== id));
            setError(null);
        }
    }

    return (
        <main className="flex flex-col items-center justify-center mt-20 gap-6">
            <div className="w-3/4 md:w-2/5 max-w-2xl">
                <div className="todo-input flex items-center justify-between gap-3">
                    <input
                        className="flex-grow px-2 bg-zinc-300/50 text-black dark:bg-zinc-700 dark:text-white py-2 rounded-md outline-none"
                        type="text"
                        placeholder="add your task..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTask()}
                    />
                    <button 
                        className="bg-green-700 dark:bg-blue-600 text-white px-5 py-2 rounded-md whitespace-nowrap" 
                        onClick={addTask}
                    >
                        Add
                    </button>
                </div>        
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <div className="w-3/4 md:w-2/5 max-w-2xl max-h-[calc(100vh-230px)] overflow-y-auto">
                <div className="todo-table grid grid-cols-1 place-content-center gap-3">
                    {tasks.map(task => (
                        <div key={task.id} className="flex items-center gap-3">
                            <div className="flex-grow w-3/4 md:w-2/5 max-w-2xl truncate" title={task.text}>
                                {task.text}
                            </div>
                            <button 
                                className="bg-red-700 dark:bg-indigo-900 text-white px-4 py-2 rounded-md" 
                                onClick={() => deleteTask(task.id)}
                            >
                                Done
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}