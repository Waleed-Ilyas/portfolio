const fs = require('fs');
const path = require('path');

const file = path.join('E:', 'WEB & BLOCKCHAIN PORTFOLIO', 'projects', 'taskforge', 'client', 'src', 'App.tsx');
let content = fs.readFileSync(file, 'utf8');

// Replace imports to include dnd-kit
content = content.replace(
  /import \{ io, type Socket \} from "socket\.io-client";/,
  `import { io, type Socket } from "socket.io-client";
import { DndContext, closestCorners, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';`
);

// Add SortableTask component
const sortableTask = `
function SortableTask({ task, onDelete, onAddComment }: { task: Task, onDelete: () => void, onAddComment: (t: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id, data: { type: 'Task', task } });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} onDelete={onDelete} onAddComment={onAddComment} />
    </div>
  );
}

function TaskCard({ task, onDelete, onAddComment }: { task: Task, onDelete: () => void, onAddComment: (t: string) => void }) {
  return (
    <div style={styles.taskCard}>
      <div style={styles.taskTopRow}>
        <span style={{ ...styles.priorityPill, background: task.priority === 'High' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)', color: task.priority === 'High' ? '#fca5a5' : '#fcd34d' }}>{task.priority}</span>
        <span style={styles.taskMeta}>{task.id}</span>
      </div>
      <h4 style={styles.taskTitle}>{task.title}</h4>
      <p style={styles.taskDescription}>{task.description}</p>
      <div style={styles.taskMetaRow}>
        {task.labels.length > 0 ? task.labels.map((l) => <span key={l} style={styles.labelPill}>{l}</span>) : <span style={styles.emptyLabel}>No labels</span>}
      </div>
      <div style={styles.taskFooter}>
        <div>
          <span style={styles.assignee}>{task.assignee || 'Unassigned'}</span>
          <div style={styles.dueDate}>{task.dueDate ? 'Due ' + task.dueDate : 'No due date'}</div>
        </div>
        <div style={styles.taskActions}>
          <button style={styles.deleteButton} onClick={onDelete}>Delete</button>
        </div>
      </div>
      <div style={styles.commentBox}>
        {task.comments.map(c => (
          <div key={c.id} style={styles.commentItem}>
            <span style={styles.commentAuthor}>{c.author}:</span> {c.text}
          </div>
        ))}
        <form style={styles.commentComposer} onSubmit={(e) => { e.preventDefault(); const t = (e.target as any).text.value; if(t) onAddComment(t); (e.target as any).reset(); }}>
          <input name="text" style={styles.commentInput} placeholder="Write a comment..." />
          <button style={styles.smallButton}>Send</button>
        </form>
      </div>
    </div>
  );
}
`;

content = content.replace(/export default function App/, sortableTask + '\\nexport default function App');

// Inject DndContext inside the render
const dndContextWrap = `
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragStart = (e: any) => {
    const { active } = e;
    if (active.data.current?.type === 'Task') {
      setActiveTask(active.data.current.task);
    }
  };

  const handleDragEnd = (e: any) => {
    setActiveTask(null);
    const { active, over } = e;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // Find source and destination columns
    let sourceCol = '';
    let destCol = '';
    let sourceIndex = -1;
    let destIndex = -1;

    for (const col of board.columns) {
      const sIdx = col.taskIds.indexOf(activeId);
      if (sIdx !== -1) {
        sourceCol = col.id;
        sourceIndex = sIdx;
      }
      const dIdx = col.taskIds.indexOf(overId);
      if (dIdx !== -1) {
        destCol = col.id;
        destIndex = dIdx;
      }
      if (col.id === overId) {
        destCol = col.id;
        destIndex = col.taskIds.length;
      }
    }

    if (sourceCol && destCol) {
      if (sourceCol === destCol) {
        // Same column reorder
        const newBoard = { ...board };
        const col = newBoard.columns.find(c => c.id === sourceCol)!;
        const [removed] = col.taskIds.splice(sourceIndex, 1);
        col.taskIds.splice(destIndex, 0, removed);
        setBoard(newBoard);
        socket?.emit('card:moved', { taskId: activeId, sourceCol, destCol, sourceIndex, destIndex });
      } else {
        // Different column
        const newBoard = { ...board };
        const sCol = newBoard.columns.find(c => c.id === sourceCol)!;
        const dCol = newBoard.columns.find(c => c.id === destCol)!;
        const [removed] = sCol.taskIds.splice(sourceIndex, 1);
        dCol.taskIds.splice(destIndex, 0, removed);
        setBoard(newBoard);
        socket?.emit('card:moved', { taskId: activeId, sourceCol, destCol, sourceIndex, destIndex });
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
`;

content = content.replace(/return \(\n\s*<div style=\{styles\.shell\}>/, dndContextWrap + '\\n    <div style={styles.shell}>');
content = content.replace(/<\/div>\n\s*\);\n\}/, '</div>\\n    </DndContext>\\n  );\\n}');

// Add SortableContext to columns
content = content.replace(
  /\{col\.taskIds\.map\(\(id\) => \{\n\s*const task = board\.tasks\[id\];\n\s*if \(\!task\) return null;\n\s*return \([\s\S]*?<\/div>\n\s*\);\n\s*\}\)\}/g,
  `<SortableContext items={col.taskIds} strategy={verticalListSortingStrategy}>
    {col.taskIds.map((id) => {
      const task = board.tasks[id];
      if (!task) return null;
      return <SortableTask key={id} task={task} onDelete={() => socket?.emit('task:delete', id)} onAddComment={(text) => socket?.emit('comment:add', { taskId: id, text })} />;
    })}
  </SortableContext>`
);

// Add Overlay
content = content.replace(
  /<\/div>\n\s*<\/main>\n\s*<\/div>/,
  `</div>
          </main>
        </div>
        <DragOverlay dropAnimation={{ sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.4' } } }) }}>
          {activeTask ? <TaskCard task={activeTask} onDelete={() => {}} onAddComment={() => {}} /> : null}
        </DragOverlay>`
);

fs.writeFileSync(file, content);
console.log('App.tsx rewritten for TaskForge');
