/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useReducer, useState } from "react";
import { ReactComponent as CheckSVG } from "../assets/check_circle_24dp.svg";
import { ReactComponent as VisibilityOffSVG } from "../assets/visibility_off_black_24dp.svg";
import { ReactComponent as VisibilityOnSVG } from "../assets/visibility_black_24dp.svg";

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
  const [text, setText] = useState("");

  const checkOnChangeInput = (event) => {
    const regex = /^[\w\d.-]+@[\w\d-]+\.\w+$/;
    const value = event.target.value;

    setIsValid((prev) => {
      const toUpdate = Boolean(value.match(regex));
      if (value === "" || (!prev && toUpdate)) {
        setShowPrompt(false);
      }
      return toUpdate;
    });

    setText(value);
  };

  const checkOnBlurInput = () => {
    setShowPrompt(!(text === "" || isValid));
  };

  return (
    <InputSectionBase
      title="E-mail"
      type="email"
      IconSVG={CheckSVG}
      isIconActive={isValid}
      iconActiveColor="#12b886"
      showPrompt={showPrompt}
      prompt="Invalid E-mail address."
      onChange={checkOnChangeInput}
      onBlur={checkOnBlurInput}
    />
  );
}

function PasswordInputSection() {
  const [isPrivate, toggleIsPrivate] = useReducer((prev) => !prev, true);

  return (
    <InputSectionBase
      title="Password"
      type={isPrivate ? "password" : "text"}
      IconSVG={isPrivate ? VisibilityOffSVG : VisibilityOnSVG}
      isIconActive={!isPrivate}
      onClickIcon={toggleIsPrivate}
    />
  );
}

function InputSectionBase({
  title,
  type = "text",
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
        <Label textColor="#495057">{title}</Label>
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
            fill={isIconActive ? iconActiveColor || "#6741d9" : "#495047"}
            onClick={onClickIcon}
            style={{
              cursor: onClickIcon ? "pointer" : "auto",
              transform: "scale(0.9)",
            }}
          />
        </TextBoxWithIcon>
        {showPrompt && <Label textColor="#e03131">{prompt}</Label>}
      </form>
    </div>
  );
}

export const TextBoxWithIcon = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.iconOnLeft ? "1fr 10fr" : "10fr 1fr"};
  align-content: center;
  height: 38px;
  border-radius: 3px;
  background-color: #f1f3f5;
  border: 1px solid ${(props) => (props.isOnFocus ? "#212529" : "#dee2e6")};
  color: #212529;
`;

const Label = styled.label`
  font-size: 0.65rem;
  color: ${(props) => props.textColor};
  min-height: 0.65rem;
  margin-left: 3px;
`;
