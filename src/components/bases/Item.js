/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

export default function Item({ isSelected, index, text, onClick }) {
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
      data-index={index}
    >
      {text}
    </button>
  );
}
