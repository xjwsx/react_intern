import { useEffect, useState } from "react";
import styled from "styled-components";
import { Colors } from "../styles/ColorStyle";
import useUserStore from "../store/useUserStore";
import api from "../api/axios";

const MyPage: React.FC = () => {
  const [nickname, setNickname] = useState<string>("");
  const [isChange, setIsChange] = useState<boolean>(false);
  const { znickname, isSaved, setUser } = useUserStore();

  const OnChangeUI = () => {
    setIsChange(!isChange);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token && !isSaved) {
        try {
          const response = await api.patch("/profile", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response);
          if (response.data.success) {
            setUser(response.data.id, response.data.nickname);
          }
        } catch (e) {
          console.error(e);
        }
      }
    };
    if (isSaved && znickname) {
      setNickname(znickname);
    }
  }, []);

  return (
    <>
      {isChange ? (
        <Wrapper>
          <ProfilePhoto>
            <img />
          </ProfilePhoto>
          <Input
            type="text"
            name="nickname"
            value={nickname}
            placeholder="닉네임"
            onChange={(e) => setNickname(e.target.value)}
          />
          <Button onClick={OnChangeUI}>완료</Button>
        </Wrapper>
      ) : (
        <Wrapper>
          <ProfilePhoto>
            <img />
          </ProfilePhoto>
          <Layout>nickname : {nickname}</Layout>
          <Button onClick={OnChangeUI}>수정하기</Button>
        </Wrapper>
      )}
    </>
  );
};

export default MyPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 300px;
  max-height: 400px;
  width: auto;
  height: auto;
  margin: 50px auto;
  padding: 2.3rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
`;

const Input = styled.input`
  display: flex;
  width: 280px;
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

const Layout = styled.div`
  display: flex;
  width: 280px;
  line-height: 2rem;
  font-size: 0.8rem;
  padding: 5px 8px;
  margin: 1.5% 0;
  border-radius: 3px;
`;

interface ButtonProps {
  bgcolor?: string;
}

const Button = styled.button<ButtonProps>`
  width: 100%;
  line-height: 2rem;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  margin-top: 20px;
  background-color: ${(props) => props.bgcolor || Colors.buttonBlue};
  border: none;
  border-radius: 7px;
  box-shadow: ${Colors.shadow};
  &:hover {
    cursor: pointer;
  }
`;

const ProfilePhoto = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 30px;
  padding: 2px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    background-color: black;
    border: 2.5px solid #fff;
    border-radius: 50%;
  }
`;
