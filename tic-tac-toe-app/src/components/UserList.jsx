import React from 'react';

function UserList({ users, onPlay }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.username} <button onClick={() => onPlay(user.id)}>Play</button>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
