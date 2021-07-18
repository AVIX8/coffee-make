export default function ({ store, redirect, $auth }) {
  if (!$auth.user?.roles?.includes('admin')) {
    return redirect('/')
  }
}
