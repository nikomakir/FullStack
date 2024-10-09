const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    if (message.startsWith('Error:')) {
      return (
        <div className="error">
        {message}
        </div>
      )
    }
    return (
      <div className="notification">
        {message}
      </div>
    )
  }

export default Notification