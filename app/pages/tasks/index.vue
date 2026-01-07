<script setup lang="ts">
import type { TaskStatus } from "~/types/task";

const { tasks, pending, error, refresh, statusFilter, setFilter } = useTasks();

const filterOptions: { label: string; value: TaskStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Done", value: "done" },
];
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6"
      >
        <div>
          <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight">
            Tasks Dashboard
          </h1>
          <p class="mt-2 text-lg text-gray-600">
            Manage and track your project tasks.
          </p>
        </div>

        <div
          class="flex flex-wrap gap-2 p-1 bg-gray-200/50 rounded-lg backdrop-blur-sm"
        >
          <button
            v-for="option in filterOptions"
            :key="option.value"
            @click="setFilter(option.value)"
            class="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
            :class="[
              statusFilter === option.value
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
            ]"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="pending"
        class="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"
        ></div>
        <p class="text-gray-500 font-medium">Loading tasks...</p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-xl shadow-sm"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">
              Error loading tasks.
              <button @click="refresh()" class="font-bold underline">
                Try again
              </button>
            </p>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Tasks Grid -->
        <div
          v-if="tasks && tasks.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
        </div>

        <!-- Empty State -->
        <div
          v-else
          class="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mx-auto h-16 w-16 text-gray-300 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          <h3 class="mt-2 text-lg font-medium text-gray-900">No tasks found</h3>
          <p class="mt-1 text-sm text-gray-500">
            There are no tasks that match the selected filter.
          </p>
          <div class="mt-6">
            <button
              @click="setFilter('all')"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
