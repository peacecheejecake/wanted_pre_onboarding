/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import TextBoxWithIcon from './bases/TextboxWithIcon';
import SliderDraggable from './bases/SliderDraggable';
import SliderCircle from './bases/SliderCircle';

export default function Slider() {
  const [currentValue, setCurrentValue] = useState(11);

  return (
    <div
      css={css`
        width: 380px;
        height: 110px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px 10px 40px 10px;
      `}
    >
      <SliderUpper currentValue={currentValue} />
      <SliderLower currentValue={currentValue} setCurrentValue={setCurrentValue} />
    </div>
  );
}

function SliderUpper({ currentValue }) {
  return (
    <TextBoxWithIcon
      css={css`
        width: 100%;
        height: 59px;
      `}
    >
      <span
        css={css`
          font-size: 1.1rem;
          font-weight: 700;
          color: #212529;
          text-align: right;
        `}
      >
        {currentValue}
      </span>
      <span
        css={css`
          color: #adb5bd;
          font-size: 0.8rem;
          text-align: center;
          align-self: center;
        `}
      >
        %
      </span>
    </TextBoxWithIcon>
  );
}

function SliderLower({ currentValue, setCurrentValue }) {
  const ref = useRef(null);
  const [startX, setStartX] = useState(0);
  const [width, setWidth] = useState(0);
  const [isDraggingCurruntCircle, setIsDraggingCurruntCircle] = useState(false);

  useEffect(() => {
    if (ref.current) {
      setStartX(ref.current.getBoundingClientRect().x);
      setWidth(ref.current.clientWidth);
    }
  }, [ref]);

  const quartileValues = [1, 25, 50, 75, 100];

  const syncWithCursor = (clientX) => {
    setCurrentValue(Math.min(100, Math.max(1, Math.round(((clientX - startX) / width) * 100))));
  };

  const onClickSlider = (event) => {
    syncWithCursor(event.clientX);
  };
  const onClickCurrentCircle = (event) => {
    const circleCenterX = event.target.getBoundingClientRect().x + 10;
    if (Math.abs(event.clientX - circleCenterX) > 2.5) {
      syncWithCursor(event.clientX);
    }
  };
  const onMouseMove = (event) => {
    if (isDraggingCurruntCircle) {
      syncWithCursor(event.clientX);
    }
  };
  const stopDragging = () => {
    setIsDraggingCurruntCircle(false);
  };

  return (
    <div
      css={css`
        width: 100%;
        height: 50%;
        margin-top: 14px;
        cursor: ${isDraggingCurruntCircle ? 'pointer' : 'auto'};
      `}
      onMouseMove={onMouseMove}
      onMouseLeave={stopDragging}
      onMouseUp={stopDragging}
    >
      <div
        css={css`
          width: 96%;
          height: 100%;
          position: relative;
          margin: 0 auto;
        `}
        ref={ref}
      >
        <SliderCircle
          css={css`
            border: 3px solid #fff;
            margin-top: 0;
            top: 1.5px;
            left: ${-1.5 + ((currentValue - 1) / 99) * (width - 18)}px;
            position: absolute;
            z-index: 99;
            background-color: #7048e8;
            box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.15);
            cursor: pointer;
            transition: left 0 ease-in-out;
          `}
          onMouseDown={() => {
            setIsDraggingCurruntCircle(true);
          }}
          onClick={onClickCurrentCircle}
        />
        <SliderDraggable quartileValues={quartileValues} color='#e9ecef' maxValue={100} onClick={onClickSlider} />
        <SliderDraggable
          quartileValues={quartileValues}
          color='#7048e8'
          maxValue={currentValue}
          onClick={onClickSlider}
        />
        <div
          css={css`
            width: 100%;
            display: flex;
            justify-content: space-between;
            position: absolute;
            bottom: 0;
          `}
        >
          {quartileValues.map((value, index) => (
            <QuartileButton
              index={index}
              quartileValue={value}
              setCurrentValue={setCurrentValue}
              numButtons={quartileValues.length}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
