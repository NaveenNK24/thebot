import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../actions/authActions';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const dispatch = useDispatch();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData));
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="username" value={formData.username} onChange={onChange} />
      <input type="email" name="email" value={formData.email} onChange={onChange} />
      <input type="password" name="password" value={formData.password} onChange={onChange} />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
