import userService from '../services/users'
import { useState,useEffect } from 'react'

const UserLine = ({ name, blogcount }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{blogcount}</td>
    </tr>
  )
}

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll()
      .then(response =>
        setUsers(response.sort(
          (a, b) => b.blogs.length - a.blogs.length
        )))
  }, [])

  return (
    <div>
      <h3>Users</h3>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>
              <strong>
                blogs created
              </strong>
            </td>
          </tr>
          {users.map(user =>
            <UserLine key={user.username}
              name={user.name}
              blogcount={user.blogs.length}
            />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users