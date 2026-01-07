import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Task, TaskStatus } from '~/types/task';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);
  const statusFilter = ref<TaskStatus | 'all'>('all');

  const filteredTasks = computed(() => {
    if (statusFilter.value === 'all') return tasks.value;
    return tasks.value.filter((task) => task.status === statusFilter.value);
  });

  function setTasks(newTasks: Task[]) {
    tasks.value = newTasks;
  }

  function setFilter(status: TaskStatus | 'all') {
    statusFilter.value = status;
  }

  return {
    tasks,
    statusFilter,
    filteredTasks,
    setTasks,
    setFilter,
  };
});
