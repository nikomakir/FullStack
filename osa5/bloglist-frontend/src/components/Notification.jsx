const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    if (message.startsWith('wrong') | message.startsWith('missing')) {
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