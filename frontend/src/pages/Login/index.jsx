import React from "react";
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';

import styles from "./Login.module.scss";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

 

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'dtricolici12345@lest.fr',
      password: '12345',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert('Failed to login!');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };


  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
      Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        className={styles.field}
        label="E-Mail"
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        type="email"
        {...register('email', { required: 'Enter your email' })}
          fullWidth
      />
      <TextField 
      className={styles.field} 
      label="Password" 
      error={Boolean(errors.password?.message)}
      helperText={errors.password?.message}
       {...register('password', { required: 'Enter your password' })}
       fullWidth
        />
      <Button  type="submit" size="large" variant="contained" fullWidth>
      Login
      </Button>
      </form>
    </Paper>
  );
};