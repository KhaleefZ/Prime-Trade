'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';
import PlanExplorer from '@/components/PlanExplorer';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  Layout, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  Zap, 
  RefreshCw,
  MoreVertical,
  Crown
} from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [userRes, tasksRes, statsRes] = await Promise.all([
        axios.get('/api/user/profile'),
        axios.get(`/api/tasks?search=${search}&status=${statusFilter}&priority=${priorityFilter}&sort=${sortBy}`),
        axios.get('/api/stats')
      ]);
      setUser(userRes.data.user);
      setTasks(tasksRes.data.tasks);
      setStats(statsRes.data.stats);
    } catch (error: any) {
      console.error('Error fetching data', error);
      if (error.response?.status === 401) {
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, statusFilter, priorityFilter, sortBy]);

  const handleCreateOrUpdate = async (taskData: any) => {
    try {
      if (editingTask) {
        await axios.patch(`/api/tasks/${editingTask._id}`, taskData);
      } else {
        await axios.post('/api/tasks', taskData);
      }
      setIsModalOpen(false);
      setEditingTask(null);
      fetchData();
    } catch (error) {
      alert('Error saving task');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/api/tasks/${id}`);
        fetchData();
      } catch (error) {
        alert('Error deleting task');
      }
    }
  };

  const handleToggleStatus = async (task: any) => {
    try {
      const nextStatus = task.status === 'todo' ? 'in-progress' : 'done';
      await axios.patch(`/api/tasks/${task._id}`, { status: nextStatus });
      fetchData();
    } catch (error) {
      alert('Error updating status');
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, trend }: any) => {
    const colorClasses: any = {
      indigo: 'bg-indigo-50 text-indigo-600',
      amber: 'bg-amber-50 text-amber-600',
      emerald: 'bg-emerald-50 text-emerald-600',
      rose: 'bg-rose-50 text-rose-600',
    };
    const circleClasses: any = {
      indigo: 'bg-indigo-50/50',
      amber: 'bg-amber-50/50',
      emerald: 'bg-emerald-50/50',
      rose: 'bg-rose-50/50',
    };

    return (
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
        <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 ${circleClasses[color]} rounded-full transition-transform group-hover:scale-150 duration-500`} />
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl ${colorClasses[color]} group-hover:scale-110 transition-transform`}>
              <Icon size={24} />
            </div>
            {trend && (
              <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full text-[10px] font-bold">
                <TrendingUp size={12} />
                {trend}
              </div>
            )}
          </div>
          <h3 className="text-gray-500 text-sm font-semibold mb-1 uppercase tracking-wider">{title}</h3>
          <p className="text-3xl font-black text-gray-900 tracking-tight">{value || 0}</p>
        </div>
      </div>
    );
  };

  if (loading && !refreshing) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-bold animate-pulse">Syncing Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar user={user} />
      
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Overall Progress Section */}
        {stats && stats.total > 0 && (
          <div className="mb-10 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <div className="flex justify-between items-end mb-3 px-1">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 block mb-1">Total Completion</span>
                <h2 className="text-xl font-black text-gray-900 leading-none">
                  {Math.round((stats.done / stats.total) * 100)}% <span className="text-gray-400 font-bold font-sans">Productivity</span>
                </h2>
              </div>
              <span className="text-sm font-bold text-gray-400">{stats.done}/{stats.total} Tasks</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex">
              <div 
                className="h-full bg-indigo-600 transition-all duration-1000 ease-out"
                style={{ width: `${(stats.done / stats.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Task Analytics
              </span>
              <button 
                onClick={fetchData} 
                className={`p-1 text-gray-400 hover:text-indigo-600 transition-colors ${refreshing ? 'animate-spin' : ''}`}
                title="Refresh Cache"
              >
                <RefreshCw size={14} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-none">
                Tasks <span className="text-indigo-600">Hub</span>
              </h1>
              <button 
                onClick={() => setIsPlanOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-amber-100 transition-colors shadow-sm shadow-amber-200/50 group"
              >
                <Crown size={12} className="group-hover:rotate-12 transition-transform" />
                Explore Plans
              </button>
              <Link 
                href="/dashboard/profile"
                className="text-[10px] bg-gray-100/80 hover:bg-gray-200 text-gray-500 px-3 py-1.5 rounded-lg font-black uppercase tracking-wider transition-colors"
                title="Manage Account"
              >
                Profile
              </Link>
            </div>
            <p className="text-gray-500 font-medium mt-2">
              Welcome back, <span className="text-indigo-600 font-bold">{user?.name?.split(' ')[0]}</span>. You have <span className="text-indigo-600 font-bold">{stats?.todo || 0} items</span> to focus on.
            </p>
          </div>
          
          <button
            onClick={() => { setEditingTask(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
            <span>Create New Task</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Tasks" value={stats?.total} icon={Layout} color="indigo" trend="+4%" />
          <StatCard title="In Progress" value={stats?.inProgress} icon={Clock} color="amber" trend="Active" />
          <StatCard title="Completed" value={stats?.done} icon={CheckCircle2} color="emerald" trend="88%" />
          <StatCard title="High Priority" value={stats?.highPriority} icon={AlertCircle} color="rose" />
        </div>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 p-8 min-h-[600px]">
          {/* Controls Bar */}
          <div className="flex flex-col gap-8 mb-10">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6 w-full lg:w-auto">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight whitespace-nowrap">Inventory</h2>
                <div className="relative flex-1 lg:w-80 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-transparent border-2 focus:border-indigo-500/20 focus:bg-white rounded-2xl text-sm font-semibold outline-none transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 w-full lg:w-auto bg-gray-50 p-1.5 rounded-2xl">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border-transparent text-sm font-bold text-gray-700 px-4 py-2 rounded-xl outline-none cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="priority-high">High Priority</option>
                  <option value="priority-low">Low Priority</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pt-6 border-t border-gray-50">
              <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2 flex items-center gap-1">
                  <Filter size={12} /> Status:
                </span>
                {[
                  { label: 'All', value: '' },
                  { label: 'Todo', value: 'todo' },
                  { label: 'Working', value: 'in-progress' },
                  { label: 'Done', value: 'done' }
                ].map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setStatusFilter(s.value)}
                    className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-tighter transition-all whitespace-nowrap ${
                      statusFilter === s.value
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-gray-100/50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 no-scrollbar md:border-l md:pl-6 md:border-gray-100">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2 flex items-center gap-1">
                  <TrendingUp size={12} /> Priority:
                </span>
                {[
                  { label: 'Default', value: '' },
                  { label: 'High', value: 'high' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'Low', value: 'low' }
                ].map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setPriorityFilter(p.value)}
                    className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-tighter transition-all whitespace-nowrap ${
                      priorityFilter === p.value
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                        : 'bg-gray-100/50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task: any) => (
              <TaskCard 
                key={task._id} 
                task={task} 
                onEdit={(task) => { setEditingTask(task); setIsModalOpen(true); }}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
          
          {tasks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Zap size={40} className="text-gray-200" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Empty Space</h3>
              <p className="text-gray-500 max-w-xs">No tasks match your current criteria. Create something meaningful today.</p>
              <button 
                onClick={() => { setSearch(''); setStatusFilter(''); }}
                className="mt-6 text-indigo-600 font-bold hover:underline"
              >
                Reset Dashboard View
              </button>
            </div>
          )}
        </div>
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateOrUpdate}
        task={editingTask}
      />

      <PlanExplorer 
        isOpen={isPlanOpen} 
        onClose={() => setIsPlanOpen(false)} 
      />
    </div>
  );
}
