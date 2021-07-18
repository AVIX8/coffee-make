export default function ({ $device, redirect, route }) {
  const paths = route.path.match(/[^/]+/g)
  if ($device.isMobile && paths[0] === 'business') {
    paths.length = 0
  } else return

  const newPath = '/' + paths.join('/')
  redirect(newPath)
}
