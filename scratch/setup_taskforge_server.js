const fs = require('fs');
const path = require('path');

const root = path.join('E:', 'WEB & BLOCKCHAIN PORTFOLIO', 'projects', 'taskforge');

let serverJs = fs.readFileSync(path.join(root, 'server', 'src', 'server.js'), 'utf8');

const seedScript = `
let activeBoard = {
  id: 'board-1',
  name: 'Q3 Product Roadmap',
  columns: [
    { id: 'col-todo', title: 'To Do', taskIds: [] },
    { id: 'col-doing', title: 'In Progress', taskIds: [] },
    { id: 'col-review', title: 'In Review', taskIds: [] },
    { id: 'col-done', title: 'Done', taskIds: [] },
  ],
  tasks: {}
};

for(let i=1; i<=25; i++) {
  const taskId = 'task-'+i;
  const colId = i <= 5 ? 'col-done' : (i <= 10 ? 'col-review' : (i <= 15 ? 'col-doing' : 'col-todo'));
  activeBoard.tasks[taskId] = {
    id: taskId,
    title: \`Implement feature \${i}\`,
    description: 'This is a generated task to demonstrate the kanban board.',
    priority: i % 3 === 0 ? 'High' : (i % 2 === 0 ? 'Medium' : 'Low'),
    labels: i % 2 === 0 ? ['frontend'] : ['backend'],
    assignee: i % 2 === 0 ? 'Demo user' : 'Admin user',
    dueDate: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
    comments: [
      { id: 'c-'+i, author: 'Admin user', text: 'Looking good', createdAt: new Date().toISOString() }
    ]
  };
  const col = activeBoard.columns.find(c => c.id === colId);
  if(col) col.taskIds.push(taskId);
}

function getBoard() {
  return activeBoard;
}
`;
serverJs = serverJs.replace(/const activeBoard = \{[\s\S]*?\};\n\nfunction getBoard\(\) \{\n  return activeBoard;\n\}/, seedScript);

// Add card:moved event
serverJs = serverJs.replace(/socket\.on\('comment:add'/, `
    socket.on('card:moved', ({ taskId, sourceCol, destCol, sourceIndex, destIndex }) => {
      const src = activeBoard.columns.find(c => c.id === sourceCol);
      const dest = activeBoard.columns.find(c => c.id === destCol);
      if(src && dest) {
        src.taskIds.splice(sourceIndex, 1);
        dest.taskIds.splice(destIndex, 0, taskId);
        io.to('launch-sprint').emit('board:updated', { board: activeBoard });
      }
    });
    socket.on('comment:add'`);

fs.writeFileSync(path.join(root, 'server', 'src', 'server.js'), serverJs);

console.log('TaskForge server setup done.');
