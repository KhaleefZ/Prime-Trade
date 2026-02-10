'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles, Layout, AlignLeft, Flag, CheckCircle } from 'lucide-react';

export default function TaskModal({ 
  isOpen, 
  onClose, 
  onSave, 
  task 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (task: any) => void; 
  task?: any 
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
      setPriority(task.priority || 'medium');
    } else {
      setTitle('');
      setDescription('');
      setStatus('todo');
      setPriority('medium');
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div 
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
          onClick={onClose} 
        />
        
        <div className="relative transform overflow-hidden rounded-[2.5rem] bg-white p-8 text-left shadow-2xl transition-all w-full max-w-lg border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                <Sparkles size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-none">
                  {task ? 'Update' : 'Create'} <span className="text-indigo-600">Task</span>
                </h2>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Management Studio</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-900"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">
                <Layout size={14} /> Title
              </label>
              <input
                type="text"
                autoFocus
                className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl px-5 py-4 text-gray-900 font-bold placeholder:text-gray-300 outline-none transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">
                <AlignLeft size={14} /> Description
              </label>
              <textarea
                className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl px-5 py-4 text-gray-900 font-semibold placeholder:text-gray-300 outline-none transition-all min-h-[120px] resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add some details about this task..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">
                  <CheckCircle size={14} /> Status
                </label>
                <select
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl px-5 py-4 text-gray-900 font-bold outline-none transition-all appearance-none cursor-pointer"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">
                  <Flag size={14} /> Priority
                </label>
                <select
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl px-5 py-4 text-gray-900 font-bold outline-none transition-all appearance-none cursor-pointer"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-10 flex gap-3">
            <button 
              onClick={onClose} 
              className="flex-1 px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all border-2 border-transparent"
            >
              Discard
            </button>
            <button
              onClick={() => onSave({ title, description, status, priority })}
              disabled={!title}
              className="flex-[2] bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50 disabled:shadow-none active:scale-95"
            >
              {task ? 'Update Changes' : 'Create Task'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
