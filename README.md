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
### `Slider`
  * 
### `Input`
  * 공통 기능을 `InputSectionBase`에 구현했습니다. 세부 내용은 아래와 같습니다.
    * `Label`: 위, 아래로 `Label`이 하나씩 있습니다. `Label`은 텍스트 색상을 지정할 수 있는 label입니다. 첫 번째 `Label`은 각 섹션의 제목을 타나태고, 두 번째 `Label`은 prompt가 필요한 경우에만 나타납니다. prompt와 그것이 필요한지 여부는 props로 전달받습니다. 
    * `TextBoxWithIcon`: 입력 창을 나타내는 wrapper 컴포넌트입니다. 배경과 테두리를 나타내고, 입력 창과 아이콘을 자식으로 갖습니다.
    * `IconSVG`: 어떤 SVG가 필요한지 props를 통해 전달받습니다. 색과 클릭 이벤트를 지정할 수 있습니다. 
  * e-mail과 비밀번호 섹션에 각각 필요한 기능을 컴포넌트 합성을 통해 구체화했습니다.
    * `EmailInputSection`
      * `isValid` state는 입력한 이메일이 형식에 맞는지를 나타냅니다. 형식 검사는 정규표현식으로 구현했으며, 이를 담은 onChange 핸들러를 `InputSectionBase`에 전달합니다.
      * 
  * 필요한 아이콘은 SVG 파일로 다운로드 받았습니다. assets 폴더에 저장하여 사용했습니다.
### `Dropdown`

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

## Dependencies
* React
* @emotion/react
* @emotion/styled
