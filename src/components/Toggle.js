/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useState } from "react";
import Item from "./Item";

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
