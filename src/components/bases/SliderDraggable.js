/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import SliderCircle from './SliderCircle';

export default function SliderDraggable({ quartileValues, color, maxValue, onClick, children, currentValue }) {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        cursor: pointer;
        position: absolute;
        overflow: hidden;
      `}
      onClick={onClick}
      role='slider'
      tabIndex={-1}
      aria-valuenow={currentValue}
    >
      <div
        css={css`
          width: 100%;
          height: 50%;
          margin: 0 auto;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <div
          css={css`
            width: 100%;
            height: 5px;
            background-color: ${color};
            margin: auto 0;
            position: absolute;
            z-index: 1;
            left: ${-100 + maxValue}%;
            transition: left 0 ease-in-out;
          `}
        />
        {quartileValues.map((value, index) => (
          <SliderCircle
            css={css`
              background-color: ${maxValue >= value ? color : 'auto'};
              transition-delay: 0;
            `}
            key={`slider-circle-${index}`}
          />
        ))}
        {children}
      </div>
    </div>
  );
}
