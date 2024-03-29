import { useSignUpEmailPassword } from '@nhost/react';
import { FormEvent, useState } from 'react';
import { LoginUser } from '../../utils/types';
import {
  Input,
  Button,
  Spinner,
  InputGroup,
  InputLeftElement,
  Icon,
} from '@chakra-ui/react';
import logo from '../../assets/todonelogo.png';
import { AiFillMail } from 'react-icons/ai';
import { MdPassword } from 'react-icons/md';
import styles from './SignUp.module.css';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState<LoginUser>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const {
    signUpEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignUpEmailPassword();
  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    signUpEmailPassword(loginUser.email, loginUser.password, {
      displayName: `${loginUser.firstname} ${loginUser.lastname}`.trim(),
      metadata: {
        firstname: loginUser.firstname,
        lastname: loginUser.lastname,
      },
    });
  };

  if (isSuccess) {
    return <Navigate to="/" replace={true} />;
  }

  const disableForm = isLoading || needsEmailVerification;

  return (
    <div className={styles.container}>
      {needsEmailVerification ? (
        <>
          <p className={styles['verification-text']}>
            Please check your mailbox and follow the verification link to verify
            your email.
          </p>
          <Button onClick={() => navigate('/')}>Done</Button>
        </>
      ) : (
        <form onSubmit={handleOnSubmit} className={styles.form}>
          <img className={styles.logo} src={logo} alt="todone logo" />
          <Input
            value={loginUser.firstname}
            onChange={(e) =>
              setLoginUser({ ...loginUser, firstname: e.target.value })
            }
            placeholder="First name"
            disabled={disableForm}
          />
          <Input
            value={loginUser.lastname}
            onChange={(e) =>
              setLoginUser({ ...loginUser, lastname: e.target.value })
            }
            placeholder="Last name"
            disabled={disableForm}
          />
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={AiFillMail} />}
            />
            <Input
              value={loginUser.email}
              onChange={(e) =>
                setLoginUser({ ...loginUser, email: e.target.value })
              }
              placeholder="Email"
              disabled={disableForm}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={MdPassword} />}
            />
            <Input
              value={loginUser.password}
              type="password"
              onChange={(e) =>
                setLoginUser({ ...loginUser, password: e.target.value })
              }
              placeholder="Password"
              disabled={disableForm}
            />
          </InputGroup>
          <Button type="submit" disabled={disableForm}>
            {isLoading ? <Spinner /> : 'Sign Up'}
          </Button>
          {isError ? (
            <p className={styles['error-text']}>{error?.message}</p>
          ) : null}
          <p className={styles.text}>
            Already have an account?{' '}
            <Link to="/" className={styles.link}>
              Sign in
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
