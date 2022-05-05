/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

export default function QuartileButton({ index, quartileValue, setCurrentValue, numButtons, isForCurrent }) {
  const dx = index === 0 || index === numButtons - 1 ? 0 : (34 / numButtons) * (index - (numButtons - 1) / 2);
  const onClickButton = () => {
    if (isForCurrent) return;
    setCurrentValue(quartileValue);
  };
  return (
    <button
      css={css`
        all: unset;
        width: 34px;
        height: 17px;
        border-radius: 12px;
        background-color: #eee;
        font-size: 0.5rem;
        text-align: center;
        color: #868e96;
        position: relative;
        left: ${dx}px;
        &:hover {
          background-color: #7048e8;
          color: #e9ecef;
        }
        cursor: pointer;
      `}
      onClick={onClickButton}
      type='button'
    >
      {quartileValue}%
    </button>
  );
}
