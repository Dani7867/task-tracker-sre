import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, deleteTask } from '../api';

interface Task {
    id: number;
    title: string;
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        fetchTasks().then(res => setTasks(res.data));
    }, []);

    const handleAdd = async () => {
        if (!title.trim()) return;
        const res = await createTask(title);
        setTasks([...tasks, res.data]);
        setTitle('');
    };

    const handleDelete = async (id: number) => {
        await deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div style={{ maxWidth: 500, margin: 'auto', textAlign: 'center' }}>
            <h2>📋 Task Tracker</h2>
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="New task"
            />
            <button onClick={handleAdd}>Add</button>
            <ul>
                {tasks.map(t => (
                    <li key={t.id}>
                        {t.title} <button onClick={() => handleDelete(t.id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
