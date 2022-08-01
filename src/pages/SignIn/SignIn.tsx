import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
} from '@chakra-ui/react';
import { useSignInEmailPassword } from '@nhost/react';
import { FormEvent, useState } from 'react';
import { AiFillMail } from 'react-icons/ai';
import { MdPassword } from 'react-icons/md';
import { Link, Navigate } from 'react-router-dom';
import logo from '../../assets/todonelogo.png';

import styles from './SignIn.module.css';

export default function SignIn(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    signInEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignInEmailPassword();

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInEmailPassword(email, password);
  };

  if (isSuccess) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  const disableForm = isLoading || needsEmailVerification;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img className={styles.logo} src={logo} alt="todone logo" />

        {needsEmailVerification ? (
          <p className={styles['verification-text']}>
            Please check your mailbox and follow the verification link to verify
            your email.
          </p>
        ) : (
          <form onSubmit={handleOnSubmit} className={styles.form}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={AiFillMail} />}
              />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={disableForm}
                required
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={MdPassword} />}
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={disableForm}
                required
              />
            </InputGroup>

            <Button
              type="submit"
              disabled={disableForm}
              className={styles.button}
            >
              {isLoading ? <Spinner size="sm" /> : 'Sign in'}
            </Button>

            {isError ? (
              <p className={styles['error-text']}>{error?.message}</p>
            ) : null}
          </form>
        )}
        <p className={styles.text}>
          No account yet?{' '}
          <Link to="/signup" className={styles.link}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
