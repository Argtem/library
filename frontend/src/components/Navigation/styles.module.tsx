import styled from 'styled-components';

export interface IWrapper {
  rollup?: boolean;
}

export const Wrapper = styled.nav<IWrapper>`
  width: ${({ rollup }) => (rollup ? '56px' : '264px')};
  height: calc(100vh - 64px);
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Article = styled.div`
  width: calc(100% - 16px);
  min-width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  h5 {
    margin: 0 8px 8px 8px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
  }
`;
