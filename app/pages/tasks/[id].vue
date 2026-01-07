<script setup lang="ts">
import type { Task, TaskStatus } from "~/types/task";

definePageMeta({
  middleware: ["task-exists"],
});

const route = useRoute();
const taskId = route.params.id;

const {
  data: task,
  pending,
  error,
  refresh,
} = await useAsyncData<Task>(`task-${taskId}`, () =>
  $fetch(`/api/tasks/${taskId}`)
);

// If no task found, redirect to 404
if (!task.value && !pending.value) {
  await navigateTo("/404");
}

const isSaving = ref(false);
const saveError = ref<string | null>(null);
const editTitle = ref(task.value?.title || "");
const editStatus = ref<TaskStatus>(task.value?.status || "todo");

// Sync local state when data loads
watch(
  task,
  (newTask) => {
    if (newTask) {
      editTitle.value = newTask.title;
      editStatus.value = newTask.status;
    }
  },
  { immediate: true }
);

const handleSave = async () => {
  if (!editTitle.value.trim()) {
    saveError.value = "Title cannot be empty";
    return;
  }

  isSaving.value = true;
  saveError.value = null;

  try {
    await $fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      body: {
        title: editTitle.value,
        status: editStatus.value,
      },
    });

    await refresh();
    // Show success message or redirect? Assignment doesn't specify.
    // I'll just stay on page and show it's updated.
  } catch (e: any) {
    saveError.value = e.data?.statusMessage || "Failed to update task";
  } finally {
    isSaving.value = false;
  }
};

const statusClasses = {
  todo: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
  done: "bg-green-100 text-green-800 border-green-200",
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto">
      <NuxtLink
        to="/tasks"
        class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-8 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Dashboard
      </NuxtLink>

      <div
        v-if="pending && !task"
        class="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"
        ></div>
        <p class="text-gray-500 font-medium">Loading task...</p>
      </div>

      <div
        v-else-if="error"
        class="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-xl shadow-sm"
      >
        <h3 class="text-lg font-bold text-red-800">Task Error</h3>
        <p class="text-red-700 mt-1">
          Unable to load task details. It may not exist.
        </p>
        <NuxtLink
          to="/tasks"
          class="mt-4 inline-block text-red-800 font-bold underline"
          >Return to tasks</NuxtLink
        >
      </div>

      <div
        v-else-if="task"
        class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <div
          class="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50"
        >
          <h1 class="text-xl font-bold text-gray-900">Task #{{ task.id }}</h1>
          <span
            class="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border"
            :class="statusClasses[task.status]"
          >
            {{ task.status.replace("-", " ") }}
          </span>
        </div>

        <form @submit.prevent="handleSave" class="p-8 space-y-6">
          <div>
            <label
              for="title"
              class="block text-sm font-semibold text-gray-700 mb-2"
              >Task Title</label
            >
            <input
              id="title"
              v-model="editTitle"
              type="text"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-gray-800"
              :disabled="isSaving"
              placeholder="e.g. Fix the login bug"
            />
          </div>

          <div>
            <label
              for="status"
              class="block text-sm font-semibold text-gray-700 mb-2"
              >Status</label
            >
            <select
              id="status"
              v-model="editStatus"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-gray-800 bg-white"
              :disabled="isSaving"
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div
            v-if="saveError"
            class="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start text-red-700 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            {{ saveError }}
          </div>

          <div
            class="pt-4 flex items-center justify-end space-x-4 border-t border-gray-100"
          >
            <NuxtLink
              to="/tasks"
              class="px-6 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </NuxtLink>
            <button
              type="submit"
              class="px-8 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
              :disabled="isSaving"
            >
              <span v-if="isSaving" class="mr-2">
                <svg
                  class="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
              {{ isSaving ? "Saving Changes..." : "Save Task" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
