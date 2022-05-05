import styled from '@emotion/styled';

const TextBoxWithIcon = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.iconOnLeft ? '1fr 10fr' : '10fr 1fr')};
  align-content: center;
  height: 38px;
  border-radius: 3px;
  background-color: #f1f3f5;
  border: 1px solid ${(props) => (props.isOnFocus ? '#212529' : '#dee2e6')};
  color: #212529;
`;

export default TextBoxWithIcon