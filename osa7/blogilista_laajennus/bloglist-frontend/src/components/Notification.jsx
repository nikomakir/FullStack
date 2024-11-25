import { useNotification } from '../createNotificationContext'

const Notification = () => {
  const notification = useNotification()

  if (!notification) {
    return null
  }

  if (
    notification.startsWith('wrong') ||
    notification.startsWith('missing' || notification.startsWith('Error'))
  ) {
    return <div className="error">{notification}</div>
  }
  return <div className="notification">{notification}</div>
}

export default Notification
