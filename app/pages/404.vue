<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4"
  >
    <div class="text-center">
      <h1 class="text-9xl font-black text-blue-600/10">404</h1>
      <div class="relative -mt-20">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Task Not Found</h2>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          The task you are looking for might have been removed or never existed
          in the first place.
        </p>
        <NuxtLink
          to="/tasks"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
        >
          Go Back to Dashboard
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
