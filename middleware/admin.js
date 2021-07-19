export default function ({ store, redirect }) {
  if (!store.state.auth?.user?.roles?.includes('admin')) redirect('/')
}
