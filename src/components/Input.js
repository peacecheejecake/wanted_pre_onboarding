/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useReducer, useState } from 'react';
import InputSectionBase from './bases/InputSectionBase';
import { ReactComponent as CheckSVG } from '../assets/check_circle_24dp.svg';
import { ReactComponent as VisibilityOffSVG } from '../assets/visibility_off_black_24dp.svg';
import { ReactComponent as VisibilityOnSVG } from '../assets/visibility_black_24dp.svg';

export default function Input() {
  return (
    <div
      css={css`
        width: 380px;
        background-color: #f8f9fa;
        margin: 10px 10px 40px 10px;
      `}
    >
      <EmailInputSection />
      <PasswordInputSection />
    </div>
  );
}

function EmailInputSection() {
  const [isValid, setIsValid] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [email, setEmail] = useState('');

  const checkOnChangeInput = (event) => {
    const regex = /^[\w\d.-]+@[\w\d-]+\.\w+$/;
    const { value } = event.target;

    setIsValid((prev) => {
      const toUpdate = Boolean(value.match(regex));
      if (value === '' || (!prev && toUpdate)) {
        setShowPrompt(false);
      }
      return toUpdate;
    });

    setEmail(value);
  };

  const checkOnBlurInput = () => {
    setShowPrompt(!(email === '' || isValid));
  };

  return (
    <InputSectionBase
      title='E-mail'
      type='email'
      IconSVG={CheckSVG}
      isIconActive={isValid}
      iconActiveColor='#12b886'
      showPrompt={showPrompt}
      prompt='Invalid E-mail address.'
      onChange={checkOnChangeInput}
      onBlur={checkOnBlurInput}
    />
  );
}

function PasswordInputSection() {
  const [isPrivate, toggleIsPrivate] = useReducer((prev) => !prev, true);

  return (
    <InputSectionBase
      title='Password'
      type={isPrivate ? 'password' : 'text'}
      IconSVG={isPrivate ? VisibilityOffSVG : VisibilityOnSVG}
      isIconActive={!isPrivate}
      onClickIcon={toggleIsPrivate}
    />
  );
}
