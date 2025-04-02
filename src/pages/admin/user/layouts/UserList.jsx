import React from 'react';
import UserCard from '../components/UserCard';

const UserList = ({ users }) => {
  return users.map((item, index) => (
    <UserCard key={item.id} user={item} index={index + 1} />
  ));
};

export default UserList;
