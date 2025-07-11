const express = require('express');
const promClient = require('prom-client');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const port = process.env.PORT || 3000;

// In-memory task list
let tasks = [];
let idCounter = 1;

// Prometheus metrics
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();
const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

// Middleware for metrics
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({ method: req.method, route: req.path, status: res.statusCode });
  });
  next();
});

app.get('/', (req, res) => res.send('📋 Task Tracker API is running!'));

app.get('/tasks', (req, res) => res.json(tasks));

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const task = { id: idCounter++, title };
  tasks.push(task);
  res.status(201).json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== id);
  res.status(204).send();
});

app.get('/health', (req, res) => res.status(200).json({ status: 'UP' }));

// Simulate crash
app.get('/error', (req, res) => res.status(500).json({ error: 'Simulated error' }));

// Simulate CPU spike
app.get('/cpu', (req, res) => {
  const end = Date.now() + 3000;
  while (Date.now() < end) { Math.random(); }
  res.send('CPU spike simulated');
});

app.get('/about', (req, res) => {
  res.send('This is a task tracker API built by Danish.');
});


// Prometheus metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

app.listen(port, () => console.log(`🚀 App running on port ${port}`));
