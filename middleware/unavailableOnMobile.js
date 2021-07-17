export default function ({ $device, redirect, route }) {
  if ($device.isMobile) redirect('/')
}
