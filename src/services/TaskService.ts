import Task from '@/models/Task';
import dbConnect from '@/lib/mongodb';

export class TaskService {
  static async getTasks(userId: string, query: { search?: string, status?: string, priority?: string, sort?: string }) {
    await dbConnect();
    const { search, status, priority, sort } = query;
    
    let filter: any = { userId };
    if (search) filter.title = { $regex: search, $options: 'i' };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    let sortOption: any = { createdAt: -1 };
    if (sort === 'oldest') sortOption = { createdAt: 1 };
    if (sort === 'priority-high') sortOption = { priority: 1 };
    if (sort === 'priority-low') sortOption = { priority: -1 };

    return await Task.find(filter).sort(sortOption);
  }

  static async createTask(userId: string, data: any) {
    await dbConnect();
    return await Task.create({ ...data, userId });
  }

  static async updateTask(taskId: string, userId: string, data: any) {
    await dbConnect();
    return await Task.findOneAndUpdate(
      { _id: taskId, userId },
      data,
      { new: true, runValidators: true }
    );
  }

  static async deleteTask(taskId: string, userId: string) {
    await dbConnect();
    return await Task.findOneAndDelete({ _id: taskId, userId });
  }

  static async getStats(userId: string) {
    await dbConnect();
    const tasks = await Task.find({ userId });
    
    return {
      total: tasks.length,
      todo: tasks.filter(t => t.status === 'todo').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      done: tasks.filter(t => t.status === 'done').length,
      highPriority: tasks.filter(t => t.priority === 'high').length
    };
  }
}
