import jwt from 'jsonwebtoken'
export default function ({ store, redirect, $cookies }) {
  const decodedData = jwt.decode($cookies.get('accessToken'))
  if (!decodedData?.roles?.includes('admin')) redirect('/')
}
