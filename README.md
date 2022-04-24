# 원티드 프리온보딩 선발 과제

원티드 프리온보딩 프론트엔드 코스(4기) 선발 과제입니다.

## 사용한 라이브러리
* `React v18.0`으로 구현했습니다.
* 스타일링에는 `@emotion/react`와 `@emotion/styled`를 사용했습니다.

## 컴포넌트별 구현 내용
### `Toggle`, `Tab`
  * 세부 스타일링을 제외하고, 두 컴포넌트를 거의 같은 구조로 구현했습니다. 실제 프로젝트에서는 이를 추상화하여 재사용할 수 있다고 생각합니다.
  * 전체 길이, 높이를 지정하여 사용할 수 있습니다. (코드에는 상수로 선언되어 있습니다.)
  * 내용은 배열 형식의 prop으로 전달받습니다. 1개 이상이라면 데이터만 변경해 사용할 수 있습니다.
  * 각각의 항목을 나타내는 `Item` 컴포넌트를 공유하고 있습니다. `Item`은 button 요소의 dataset에 인덱스를 담아 놓고, 부모 컴포넌트에서 이를 활용해 클릭 이벤트를 핸들링합니다.
### `Input`
  * 공통 기능을 `InputSectionBase`에 구현했습니다. 세부 내용은 아래와 같습니다.
    * `Label`: 위, 아래로 `Label`이 하나씩 있습니다. `Label`은 텍스트 색상을 지정할 수 있는 label입니다. 첫 번째 `Label`은 각 섹션의 제목을 타나태고, 두 번째 `Label`은 prompt가 필요한 경우에만 나타납니다. prompt와 그것이 필요한지 여부는 props로 전달받습니다. 
    * `TextBoxWithIcon`: 입력 창을 나타내는 wrapper 컴포넌트입니다. 배경과 테두리를 나타내고, 입력 창과 아이콘을 자식으로 갖습니다.
    * `IconSVG`: 어떤 SVG가 필요한지 props를 통해 전달받습니다. 색과 클릭 이벤트를 지정할 수 있습니다. 
  * e-mail과 비밀번호 섹션에 각각 필요한 기능을 컴포넌트 합성을 통해 구체화했습니다.
    * `EmailInputSection`
      * `isValid`는 입력한 이메일이 형식에 맞는지를 나타내는 state니다. 형식 검사는 정규표현식으로 구현했으며, 이를 담은 onChange 핸들러를 `InputSectionBase`에 전달합니다.
      * `showPrompt`는 이메일 형식에 따라 안내 문구가 표시되게 합니다. 1자 이상의 이메일이 형식에 맞지 않을 때, 그리고 입력창을 한 번 이상 벗어났을 때 `true`가 됩니다. onChange, onBlur 핸들러에 의해 변경됩니다.
    * `PasswordInputSection`
      * 아이콘을 클릭할 때마다 `isPrivate` state의 toggle이 일어나게 합니다.
  * 필요한 아이콘은 SVG 파일로 다운로드 받았습니다. assets 폴더에 저장하고, `ReactComponent`로 import하여 사용했습니다.
### `Dropdown`
  * `Selected` 컴포넌트는 현재 선택된 항목을 나타내고 클릭시 메뉴를 여닫는 역할을 합니다.
    * `Input`에서 구현한 `TextBotWithIcon` 컴포넌트를 재사용했습니다.
    * 현재 선택된 항목은 `selectedItem` state로 관리합니다.
    * `isDropped`가 `true`일 때만 `SelectMenu` 컴포넌트가 나타납니다.
  * 검색 기능
    * `itemsDisplayed`는 현재 화면에 표시되는 item 목록을 갖고 있는 배열 state 입니다. 
    * onChange 함수는 사용자가 입력한 keyword로 시작하는 item을 검색합니다. 이를 위해 정규표현식 객체를 생성하고, 전체 데이터에 `filter` 함수를 적용해서 필터링했습니다.
    * `useRef`와 `useEffect` hook을 활용해 드롭메뉴가 열리면 기본적으로 focus 되도록 했습니다.
    * 검색바 역시 `TextBoxWithIcon` 컴포넌트를 사용해 구현했습니다.
  * 드롭다운 메뉴
    * item 개수 만큼의 `MenuItem` 컴포넌트로 표현했습니다.
    * 최상단에는 항상 모든 객체를 나타내는 메뉴가 표시됩니다. 이어서 검색 keyword에 맞는 item들이 위치합니다.
    * `setIsDropped`와 `setSelectedItem`을 `MenuItem`까지 전달해서 메뉴 클릭시 동작을 구현했습니다.
  * 필요한 item(코인 리스트)들은 `App.js`에서 하드코딩했습니다.
### `Slider`
  * `currentValue`는 현재 값을 나타냅니다. 이를 `SliderUpper`와 `SliderLower`에서 공유합니다.
  * `SliderUpper`
    * 현재 값이 숫자로 표시되는 윗부분입니다.
    * `Input`에서 구현한 `TextBoxWithIcon`을 활용했습니다.
    * `Input`과 `Dropdown`에 SVG가 들어간 부분에 % 기호가 포함된 span이 위치합니다.
  * `SliderLower`
    * 슬라이더와 하단 버튼을 포함합니다.
    * 슬라이더(`SliderDraggable`)을 두 개 겹치는 방식으로 현재 값을 시각화했습니다. 회색 슬라이더는 고정하고, 보라색 슬라이더의 left 값이 변하도록 했습니다.
    * 특정 값을 나타내는 동그라미(`SliderCircle`)는 별도의 layer에 배치하여 겹쳐서 표현했습니다. 동그라미가 의미하는 값보다 커지면 배경색이 변하도록 했습니다.
    * 현재 값 드레그 표현
      * 현재 값을 나타내는 동그라미를 새로 그려주고, 이 동그라미 위에서 mousedown 이벤트가 발생하면 `isDraggingCurruntCircle`를 `true`로 바꾸었습니다.
      * `isDraggingCurruntCircle`가 `true`일 때 현재 값이 마우스 위치에 맞게 변하도록 했습니다. mousemove 이벤트를 이용하되 슬라이드 위 어디서든 일어날 수 있도록 했습니다. 마우스가 동그라미 밖으로 벗어나는 경우가 더 많을 것이기 때문입니다.
      * 드레그 상태를 해제하는 mouseup 이벤트도 마찬가지로 슬라이더 전체에서 동일하게 처리했습니다. 또한 슬라이더 밖으로 커서가 벗어날 때 드레그 상태를 `false`로 바꿔서 변화를 멈추도록 했습니다.
    * 임의의 수(1 이상)를 `quartilevalues` 배열에 오름차순으로 담아 주면 그에 맞춰 슬라이더가 표현되도록 했습니다.
  * **어려웠던 점**
    * 슬라이더를 클릭했을 때 값이 변하는 기능을 `offsetX`를 이용하여 구현했더니, 동그라미를 클릭했을 때와 슬라이더 바를 클릭했을 때 동작이 달라지는 문제가 있었습니다. 동그라미와 슬라이더 바를 겹치는 방식을 택했기 때문입니다. 막대를 쪼개는 방법 등을 고민하다가 `getBoundingClientRect`를 통해 가장 왼쪽 `clientX`를 계산하는 방식으로 해결했습니다.
    * 최소값이 0이 아니라 1이기 때문에 현재 값과 슬라이더 위치가 맞지 않아 조금 애를 먹었습니다. 


## 폴더 구조
```
  /src
    /assets
    /components
      Toggle.js
      Tab.js
      Slider.js
      Input.js
      Dropdown.js
```
