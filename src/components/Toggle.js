/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useState, useRef, useEffect } from "react";

const WIDTH = 400
const HEIGHT = 38

export default function Toggle({ items }) {
  const width = WIDTH;
  const height = HEIGHT;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const onClickItem = (event) => {
    setSelectedIndex(Number(event.target.dataset.index));
  };
  const itemWidth = width / items.length;
  return (
    <div
      css={css`
        width: ${width}px;
        height: ${height}px;
        background-color: #dee2e6;
        border-radius: ${height / 2}px;
        display: grid;
        grid-template-columns: repeat(${items.length}, 1fr);
        position: relative;
        margin: 10px 10px 40px 10px;
      `}
    >
      {items.map((item, index) => (
        <Item
          isSelected={index === selectedIndex}
          onClick={onClickItem}
          text={item}
          index={index}
          key={index}
        />
      ))}
      <div
        css={css`
          width: ${itemWidth - 2}px;
          height: ${height - 4}px;
          background-color: #fff;
          border-radius: ${(height - 4) / 2}px;
          position: absolute;
          top: 2px;
          left: ${2 + selectedIndex * (itemWidth - 2)}px;
          z-index: 0;
          transition: left 300ms ease-in-out;
        `}
      />
    </div>
  );
}

export function Item({ isSelected, index, text, onClick }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.dataset.index = index;
    }
  }, []);

  return (
    <button
      css={css`
        all: unset;
        width: 100%;
        margin: auto 0;
        color: ${isSelected ? "#212529" : "#adb5bd"};
        font-weight: 700;
        text-align: center;
        cursor: pointer;
        z-index: 99;
        transition: color 300ms ease-in;
      `}
      onClick={onClick}
      ref={ref}
    >
      {text}
    </button>
  );
}
