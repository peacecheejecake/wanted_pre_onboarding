/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

import "./App.css";
import Dropdown from "./components/Dropdown";
import Input from "./components/Input";
import Slider from "./components/Slider";
import Tab from "./components/Tab";
import Toggle from "./components/Toggle";

const toggleItems = ["기본", "상세"];
const tabItems = ["감자", "고구마", "카레라이스"]
const dropdownItems = [
  "BTCUSD.PERP", "ETHUSD.PERP", "APEUSD.PERP", "GMTUSD.PERP", "SQLUSD.PERP",
  "LUNAUSD.PERP", "NEARUSD.PERP", "LOOKSUSD.PERP", "ZILUSD.PERP", "KNCUSD.PERP",
  "DOGEUSD.PERP", "EOSUSD.PERP", "AVAXUSD.PERP", "DOTUSD.PERP", "RUNEUSD.PERP",
  "1000SHIBUSD.PERP", "JIWON", "WANTED"
]

function App() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        padding: 30px;
      `}
    >
      <h1>원티드 프리온보딩 선발과제</h1>
      <h2>1. Toggle</h2>
      <Toggle items={toggleItems} />
      <h2>2. Tab</h2>
      <Tab items={tabItems}/>
      <h2>3. Slider</h2>
      <Slider />
      <h2>4. Input</h2>
      <Input />
      <h2>5. Dropdown</h2>
      <Dropdown items={dropdownItems} />
    </div>
  );
}

export default App;
