import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';

const state = {
  name: '',
  isLoginEmpty: false,
};

const Login = () => {
  const [name, setName] = useState(state.name);
  const [isLoginEmpty, setisLoginEmpty] = useState(state.isLoginEmpty);
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
    setisLoginEmpty(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (name.length === 0) {
      setisLoginEmpty(true);

      return;
    }

    navigate('/list');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className={styles.title}>Login:</h1>
      <input
        name='name'
        placeholder='Login'
        value={name}
        className={styles.input}
        type='text'
        onChange={handleChange}
      />
      {isLoginEmpty && <div className={styles.fieldError}>Login is empty!</div>}
      <button className={styles.button} type='submit'>
        Enter
      </button>
    </form>
  );
};

export default Login;
