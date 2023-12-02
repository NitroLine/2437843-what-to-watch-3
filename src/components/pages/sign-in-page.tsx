import {Footer} from '../parts/footer';
import {Header} from '../parts/header';
import {FormEvent, useState} from 'react';
import {useAppDispatch} from '../../store/hooks/use-app-dispatch';
import {useAppSelector} from '../../store/hooks/use-app-selector';
import {AuthStatus} from '../../types/auth-status';
import {Navigate} from 'react-router-dom';
import {login} from '../../store/api/api-actions';
import {setAuthError} from '../../store/action';

export function SignInPage(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const error = useAppSelector((state) => state.authError);
  if (authStatus === AuthStatus.Authorized) {
    return <Navigate to={'/'}/>;
  }
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (/[a-z]/i.test(password) && /[0-9]/.test(password)) {
      dispatch(login({email, password}));
    } else {
      dispatch(setAuthError({message: 'Passwords must contain: a minimum of 1 letter and a minimum of 1 numeric character'}));
    }
  }
  return (
    <div className="user-page">
      <Header/>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={onSubmit}>
          {error && error.message && (
            <div className="sign-in__message">
              <p>{error.message}</p>
            </div>)}
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email"
                id="user-email" value={email} required onChange={(event) => setEmail(event.target.value)}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password"
                id="user-password" required value={password} onChange={(event) => setPassword(event.target.value)}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
}
