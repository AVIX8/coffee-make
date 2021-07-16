export default async (context) => {
  // await context.store.dispatch('api/nuxtClientInit', context)
  await context.store.dispatch('nuxtClientInit', context)
}
