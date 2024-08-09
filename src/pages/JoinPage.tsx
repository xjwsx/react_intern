import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../styles/ColorStyle";
import { join } from "../api/Join";

const JoinPage: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!id || !password || !nickname) {
      alert("아이디, 패스워드, 닉네임을 모두 입력해주세요.");
      return;
    }

    try {
      const response = await join({
        id,
        password,
        nickname,
      });

      if (response.data.success) {
        alert(response.data.message);
        navigate("/");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      alert("가입 실패" + (error.response?.data?.message || "네트워크 오류"));
    }
  };

  return (
    <Wrapper className="login-container">
      <Input
        type="text"
        name="id"
        value={id}
        placeholder="전화번호, 사용자 이름 또는 이메일"
        onChange={(e) => setId(e.target.value)}
      />
      <Input
        type="text"
        name="password"
        value={password}
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="text"
        name="nickname"
        value={nickname}
        placeholder="닉네임"
        onChange={(e) => setNickname(e.target.value)}
      />
      <Button onClick={handleSubmit}>가입</Button>
    </Wrapper>
  );
};

export default JoinPage;

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
