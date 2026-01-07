<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header
      class="bg-white border-b border-gray-100 sticky top-0 z-10 backdrop-blur-md bg-white/80"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center space-x-3">
            <div
              class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <NuxtLink
              to="/tasks"
              class="text-xl font-black text-gray-900 tracking-tight"
            >
              Task<span class="text-blue-600">Dash</span>
            </NuxtLink>
          </div>

          <nav class="hidden sm:flex space-x-8">
            <NuxtLink
              to="/tasks"
              class="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
              active-class="text-blue-600"
            >
              Dashboard
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="bg-white border-t border-gray-100 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-sm text-gray-400">
          Built for Localazy Assignment &copy; {{ new Date().getFullYear() }}
        </p>
      </div>
    </footer>
  </div>
</template>
