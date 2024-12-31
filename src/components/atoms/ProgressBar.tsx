import styled, { keyframes } from "styled-components";

const ProgressBar = () => {
  return (
    <ProgressBarContainer>
      <Progress />
    </ProgressBarContainer>
  );
};

const loading = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`;

const ProgressBarContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 400px;
  height: 8px;
  background-color: #f3f3f3;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Progress = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #3b88ff;
  animation: ${loading} 2s linear infinite;
`;

export default ProgressBar;
