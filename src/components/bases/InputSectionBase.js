/** @jsxImportSource @emotion/react */

import { useState } from 'react';
import { css } from '@emotion/react';
import Label from './Label';
import TextBoxWithIcon from './TextboxWithIcon';

export default function InputSectionBase({
  title,
  type = 'text',
  IconSVG,
  isIconActive,
  iconActiveColor,
  showPrompt = false,
  prompt,
  onChange,
  onBlur,
  onClickIcon,
}) {
  const [isOnFocus, setIsOnFocus] = useState(false);
  const handleOnFocus = () => {
    setIsOnFocus(true);
  };
  const handleOnBlur = () => {
    setIsOnFocus(false);
    if (onBlur) onBlur();
  };
  return (
    <div
      css={css`
        min-height: 60px;
        margin: 10px;
        display: flex;
        flex-direction: column;
        justify-content: baseline;
      `}
    >
      <form>
        <Label textColor='#495057'>{title}</Label>
        <TextBoxWithIcon isOnFocus={isOnFocus}>
          <input
            css={css`
              all: unset;
              margin: 0 10px;
              font-size: 0.9rem;
              &::placeholder {
                color: #ced4da;
              }
            `}
            type={type}
            placeholder={title}
            onChange={onChange}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
          />
          <IconSVG
            fill={isIconActive ? iconActiveColor || '#6741d9' : '#495047'}
            onClick={onClickIcon}
            style={{
              cursor: onClickIcon ? 'pointer' : 'auto',
              transform: 'scale(0.9)',
            }}
          />
        </TextBoxWithIcon>
        {showPrompt && <Label textColor='#e03131'>{prompt}</Label>}
      </form>
    </div>
  );
}
