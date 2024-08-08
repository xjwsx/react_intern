import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../styles/ColorStyle";
import { login } from "../api/login";

interface LoginFormValues {
  id: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!id || !password) {
      alert("아이디와 패스워드를 모두 입력해주세요.");
      return;
    }
    onFinish({ id, password });
  };

  const gotoJoin = () => {
    navigate("/join");
  };

  const onFinish = async (values: LoginFormValues): Promise<void> => {
    try {
      const response = await login(values);
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        if (response.data && response.data.accessToken) {
          const { accessToken } = response.data;
          localStorage.setItem("token", accessToken);
          setId(values.id);
        }
        navigate("/main");
      }
    } catch (e: any) {
      alert("아이디 비밀번호가 일치하지 않습니다.");
      console.log(e);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/korean");
    }
  }, []);

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
  width: 93%;
  line-height: 2rem;
  font-size: 0.8rem;
  padding: 5px 8px;
  margin: 1.5% 0;
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
