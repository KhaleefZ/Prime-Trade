'use client';

import { Trash2, Edit2, Calendar, MoreHorizontal, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt?: string;
}

export default function TaskCard({ 
  task, 
  onEdit, 
  onDelete,
  onToggleStatus 
}: { 
  task: Task; 
  onEdit: (task: Task) => void; 
  onDelete: (id: string) => void;
  onToggleStatus?: (task: Task) => void;
}) {
  const statusStyles = {
    todo: {
      bg: 'bg-slate-100',
      text: 'text-slate-600',
      icon: AlertCircle,
      label: 'To Do'
    },
    'in-progress': {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      icon: Clock,
      label: 'In Progress'
    },
    done: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      icon: CheckCircle2,
      label: 'Done'
    },
  };

  const priorityStyles = {
    low: 'bg-blue-50 text-blue-600 border-blue-100',
    medium: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    high: 'bg-rose-50 text-rose-600 border-rose-100',
  };

  const StatusIcon = statusStyles[task.status].icon;

  return (
    <div className="group bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 flex flex-col h-full active:scale-[0.98]">
      <div className="flex justify-between items-start mb-4">
        <div 
          onClick={() => onToggleStatus && task.status !== 'done' && onToggleStatus(task)}
          className={`px-3 py-1.5 rounded-xl flex items-center gap-2 cursor-pointer transition-all hover:brightness-95 active:scale-95 ${statusStyles[task.status].bg} ${statusStyles[task.status].text}`}
        >
          <StatusIcon size={14} className={task.status !== 'done' ? 'animate-pulse' : ''} />
          <span className="text-[10px] font-black uppercase tracking-wider">{statusStyles[task.status].label}</span>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(task)} 
            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            title="Edit Task"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => onDelete(task._id)} 
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            title="Delete Task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="mb-4 flex-1">
        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">{task.title}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 font-medium leading-relaxed">
          {task.description || 'No detailed description provided for this task.'}
        </p>
      </div>

      <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className={`text-[10px] font-black px-3 py-1 rounded-lg border uppercase tracking-widest ${priorityStyles[task.priority]}`}>
          {task.priority} Priority
        </div>
        <div className="flex items-center gap-1.5 text-gray-400">
          <Calendar size={14} />
          <span className="text-[10px] font-bold">
            {task.createdAt ? new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Today'}
          </span>
        </div>
      </div>
    </div>
  );
}
