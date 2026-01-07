export default defineNuxtRouteMiddleware((to) => {
  const id = Number(to.params.id);
  
  if (isNaN(id) || id < 0) {
    return navigateTo('/404');
  }
});

