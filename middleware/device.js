export default function ({ $device, redirect, route }) {
  const paths = route.path.match(/[^/]+/g)
  let changed = true
  if ($device.isMobile && paths[0] !== 'm') paths.unshift('m')
  else if (!$device.isMobile && paths[0] === 'm') paths.shift()
  else changed = false

  if (changed) {
    const newPath = '/' + paths.join('/')
    redirect(newPath)
  }
}
