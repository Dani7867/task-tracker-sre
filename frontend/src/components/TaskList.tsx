import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, deleteTask } from '../api';
import {
    Container,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
        <Container maxWidth="sm">
            <Box mt={5} textAlign="center">
                <Typography variant="h4" gutterBottom>
                    📋 Task Tracker
                </Typography>

                <Box display="flex" gap={2} justifyContent="center" mt={2}>
                    <TextField
                        variant="outlined"
                        label="New Task"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" onClick={handleAdd}>
                        Add
                    </Button>
                </Box>

                <List sx={{ mt: 4 }}>
                    {tasks.map(task => (
                        <ListItem
                            key={task.id}
                            secondaryAction={
                                <IconButton edge="end" color="error" onClick={() => handleDelete(task.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText primary={task.title} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default TaskList;
