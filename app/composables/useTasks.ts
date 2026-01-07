import type { Task, TaskStatus } from '~/types/task';

export const useTasks = () => {
  const tasksStore = useTasksStore();
  
  const { data, pending, error, refresh } = useAsyncData<Task[]>('tasks-list', () => 
    $fetch('/api/tasks')
  );

  watch(data, (newTasks) => {
    if (newTasks) {
      tasksStore.setTasks(newTasks);
    }
  }, { immediate: true });

  return {
    tasks: computed(() => tasksStore.filteredTasks),
    pending,
    error,
    refresh,
    statusFilter: computed(() => tasksStore.statusFilter),
    setFilter: tasksStore.setFilter,
  };
};

