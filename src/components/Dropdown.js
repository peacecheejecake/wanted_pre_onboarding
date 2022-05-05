/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import TextBoxWithIcon from "./bases/TextboxWithIcon";
import { ReactComponent as DropdownArrowSVG } from "../assets/drop_down_24dp.svg";
import { ReactComponent as SearchSVG } from "../assets/search.svg";

const TEXT_ALL = "ALL Symbols";

export default function Dropdown({ items }) {
  const [isDropped, setIsDropped] = useState(false);
  const [selectedItem, setSelectedItem] = useState(TEXT_ALL);

  const dropMenu = () => {
    setIsDropped((prev) => !prev);
  };

  return (
    <div
      css={css`
        width: 300px;
        min-height: 390px;
        padding: 10px;
        background-color: #f8f9fa;
        color: #212529;
        border-radius: 3px;
        font-size: 0.9rem;
        margin: 10px 10px 40px 10px;
      `}
    >
      <Selected item={selectedItem} onClick={dropMenu} />
      {isDropped && (
        <SelectMeun
          items={items}
          setIsDropped={setIsDropped}
          setSelectedItem={setSelectedItem}
        />
      )}
    </div>
  );
}

function Selected({ item, onClick }) {
  return (
    <TextBoxWithIcon onClick={onClick} style={{ cursor: "pointer" }}>
      <span
        css={css`
          margin: auto 12px;
        `}
      >
        {item}
      </span>
      <DropdownArrowSVG fill="#212529" />
    </TextBoxWithIcon>
  );
}

function SelectMeun({ items, setIsDropped, setSelectedItem }) {
  const [itemsDisplayed, setItemsDisplayed] = useState(items);
  const onChangeSearchKey = (event) => {
    const regexp = RegExp(`^${event.target.value}.+`, "i");
    setItemsDisplayed(items.filter((item) => item.match(regexp)));
  };
  return (
    <div
      css={css`
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
        background-color: #f1f3f5;
        margin-top: 10px;
      `}
    >
      <SearchBar onChange={onChangeSearchKey} />
      <MenuItems
        items={itemsDisplayed}
        setIsDropped={setIsDropped}
        setSelectedItem={setSelectedItem}
      />
    </div>
  );
}

function SearchBar({ onChange }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.focus();
  });
  return (
    <TextBoxWithIcon iconOnLeft={true}>
      <SearchSVG fill="#ced4da" style={{ transform: "scale(0.5)" }} />
      <input
        css={css`
          all: unset;
          &::placeholder {
            color: #ced4da;
          }
        `}
        type="text"
        placeholder="Search Symbol"
        ref={ref}
        onChange={onChange}
      ></input>
    </TextBoxWithIcon>
  );
}

function MenuItems({ items, setIsDropped, setSelectedItem }) {
  return (
    <div
      css={css`
        max-height: 300px;
        display: flex;
        flex-direction: column;
        border: 1px solid #dee2e6;
        border-radius: 3px;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          width: 0;
        }
      `}
    >
      <MenuItem
        name={TEXT_ALL}
        setIsDropped={setIsDropped}
        setSelectedItem={setSelectedItem}
      />
      {items.map((item, index) => (
        <MenuItem
          key={index}
          name={item}
          setIsDropped={setIsDropped}
          setSelectedItem={setSelectedItem}
        />
      ))}
    </div>
  );
}

function MenuItem({ name, setIsDropped, setSelectedItem }) {
  const onClickItem = () => {
    setIsDropped(false);
    setSelectedItem(name);
  };
  return (
    <span
      css={css`
        padding: 12px 25px;
        &:hover {
          background-color: #dee2e6;
          cursor: pointer;
        }
      `}
      onClick={onClickItem}
    >
      {name}
    </span>
  );
}
