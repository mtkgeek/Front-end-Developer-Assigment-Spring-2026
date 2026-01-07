<script setup lang="ts">
import type { Task } from "~/types/task";

defineProps<{
  task: Task;
}>();

const statusClasses = {
  todo: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
  done: "bg-green-100 text-green-800 border-green-200",
};
</script>

<template>
  <NuxtLink
    :to="`/tasks/${task.id}`"
    class="block p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 group"
  >
    <div class="flex items-center justify-between mb-3">
      <span
        class="px-2.5 py-1 rounded-full text-xs font-medium border"
        :class="statusClasses[task.status]"
      >
        {{ task.status.replace("-", " ") }}
      </span>
      <span class="text-xs text-gray-400 font-mono">#{{ task.id }}</span>
    </div>
    <h3
      class="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors"
    >
      {{ task.title }}
    </h3>
    <div
      class="mt-4 flex items-center text-sm text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
    >
      View Details
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 ml-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </NuxtLink>
</template>
