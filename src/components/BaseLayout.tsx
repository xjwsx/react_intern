import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ButtonData {
  id: string;
  text: string;
  path: string;
}

const buttonsData: ButtonData[] = [
  {
    id: "home",
    text: "마이페이지",
    path: "/my",
  },
];

interface ButtonProps {
  data: ButtonData;
  isActive: boolean;
  onClick: (id: string) => void;
}

const Button: React.FC<ButtonProps> = ({ data, isActive, onClick }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (data.path) {
      navigate(data.path);
    }
    onClick(data.id);
  };
  return (
    <Buttons onClick={handleButtonClick}>
      <ButtonText>{data.text}</ButtonText>
    </Buttons>
  );
};

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const [activeButton, setActiveButton] = useState("home");

  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
  };

  return (
    <BaseLayoutMain className="BaseLayoutMain">
      <Side className="Side">
        <SidebarContainer>
          <SidebarLayout>
            {buttonsData.map((button) => (
              <Button
                key={button.id}
                data={button}
                isActive={activeButton === button.id}
                onClick={handleButtonClick}
              />
            ))}
          </SidebarLayout>
        </SidebarContainer>
      </Side>
      <MiddleMain>{children}</MiddleMain>
    </BaseLayoutMain>
  );
};

export default BaseLayout;

const BaseLayoutMain = styled.div`
  display: flex;
  width: 100%;
`;

const Side = styled.div`
  width: 100%;
  max-width: 235px;
  height: 100vh;
  position: sticky;
  left: 0;
  top: 0;
  z-index: 200;
`;

const MiddleMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Logo = styled.img`
  margin: 30px 10px;
  margin-bottom: 30px;
  width: 120px;
  &:hover {
    cursor: pointer;
  }
`;

const SidebarContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: white;
  border-right: 1px solid #d3d2d2;
  position: relative;
`;

const SidebarLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1px;
  margin-right: 8px;
`;

const Buttons = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 10px;
  background-color: transparent;
  border: none;
  font-size: 23px;
  margin-bottom: 18px;
  &:hover {
    background-color: #ececec;
    border-radius: 8px;
    cursor: pointer;
  }
`;

const ButtonText = styled.span`
  font-size: 18px;
  margin-left: 20px;
`;
