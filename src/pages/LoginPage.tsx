import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../styles/ColorStyle";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (!username || !password) {
      alert("아이디와 패스워드를 모두 입력해주세요.");
      return;
    }
    localStorage.setItem("username", username);
    navigate("/main");
  };

  const gotoJoin = () => {
    navigate("/join");
  };

  return (
    <Wrapper className="login-container">
      <Input
        type="text"
        name="username"
        value={username}
        placeholder="전화번호, 사용자 이름 또는 이메일"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        name="password"
        value={password}
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSubmit}>로그인</Button>
      <Links className="join-box">
        계정이 없으신가요? <span onClick={gotoJoin}>가입하기</span>
      </Links>
    </Wrapper>
  );
};

export default LoginPage;

const Wrapper = styled.div`
  max-width: 300px;
  height: auto;
  margin: 50px auto;
  padding: 2.3rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  line-height: 2rem;
  font-size: 0.8rem;
  padding: 1% 0%;
  margin: 1.2% 0;
  background-color: ${Colors.borderGrey};
  border: 1px solid rgb(219, 219, 219);
  border-radius: 3px;
  &:focus {
    outline: 2px solid ${Colors.buttonBlue};
  }
`;

interface ButtonProps {
  width?: string;
  bgcolor?: string;
}

const Button = styled.button<ButtonProps>`
  width: ${(props) => props.width || "100%"};
  line-height: 2rem;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  margin-top: 10px;
  background-color: ${(props) => props.bgcolor || Colors.buttonBlue};
  border: none;
  border-radius: 7px;
  box-shadow: ${Colors.shadow};
  &:hover {
    cursor: pointer;
  }
`;

const Links = styled.div`
  width: 100%;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 7%;

  span {
    color: ${Colors.buttonBlue};
    font-weight: bold;
    &:hover {
      cursor: pointer;
    }
  }
`;
