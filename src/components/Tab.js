/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useState } from "react";
import { Item } from "./Toggle";

const WIDTH = 450;
const HEIGHT = 38;

export default function Tab({ items }) {
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
        display: grid;
        grid-template-columns: repeat(${items.length}, 1fr);
        border-bottom: #dee2e6 solid 3px;
        position: relative;
        margin: 10px 10px 40px 10px;
      `}
    >
      {items.map((title, index) => (
        <Item
          isSelected={index === selectedIndex}
          index={index}
          text={title}
          onClick={onClickItem}
          key={index}
        />
      ))}
      <div
        css={css`
          width: ${itemWidth - 4}px;
          height: 100%;
          border-bottom: #7048e8 solid 3px;
          position: absolute;
          left: ${2 + selectedIndex * (itemWidth)}px;
          z-index: 0;
          transition: left 200ms ease-in-out;
        `}
      />
    </div>
  );
}
