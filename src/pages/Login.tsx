

import { Link, useNavigate } from "react-router-dom";
import { api } from "../../service/api";
import { toast } from "react-toastify";
import imagemFundo from "../assets/imagem-fundo-login.png";


import { useState } from "react";
import styled from "styled-components";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  

  const [loading, setLoading] = useState(false);

  async function handleLogin(
     event: React.SyntheticEvent
  ) {
    event.preventDefault();

    if (!email.trim() && !senha.trim()) {
      toast.error("Preencha email e senha.");
      return;
    }

    if (!email.trim()) {
      toast.error("Informe seu email.");
      return;
    }


    if (!senha.trim()) {
      toast.error("Informe sua senha.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/login",
        {
          email,
          senha,
        }
      );

      const token = response.data.token;

      localStorage.setItem(
        "token",
        token
      );
      toast.success("Login realizado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      
      if (axios.isAxiosError(error)) {
        const mensagem =
          error.response?.data?.error ||
          error.response?.data?.mensagem ||
          error.response?.data?.message ||
          "Erro ao realizar login.";

        toast.error(mensagem);
      }

    } finally {
      setLoading(false);
    }
  }

  return (
     <Container>
      <LeftSide>
        <Content>
          <Logo>+Mães</Logo>

          <Welcome>
            Bem-vindo(a)!
          </Welcome>

          <Title>LOGIN</Title>

          <Form onSubmit={handleLogin}>
            
            <InputGroup>
              <label>Email:</label>

              <Input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="seuemail@gmail.com"
              />
            </InputGroup>

            <InputGroup>
            <label>Senha</label>

            <InputContainer>
              <Input
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••••••"
              />

              <TogglePassword
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <FiEyeOff /> : <FiEye />}
              </TogglePassword>
            </InputContainer>
          </InputGroup>

            <LoginButton
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Entrando..."
                : "LOGIN →"}
            </LoginButton>

            
            
          </Form>
        </Content>
      </LeftSide>

      <RightSide>
        <BackgroundImage
          src={imagemFundo}
          alt="Imagem de Login"
        />
      </RightSide>
    </Container>
    
  );
}
export const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;

  background: linear-gradient(135deg, #d764c8, #65d3d4);
`;

export const LoginButton = styled.button`
  width: 100%;
  height: 46px;

  border: none;
  border-radius: 12px;

  background: linear-gradient(135deg, #d764c8, #65d3d4);
  color: white;

  margin-top: 8px;

  font-size: 0.95rem;
  font-weight: 700;

  cursor: pointer;

  transition: 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(215, 100, 200, 0.28);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 390px;

  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);

  padding: 38px 36px;
  border-radius: 22px;

  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.18);
`;

export const LeftSide = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 40px;

  @media (max-width: 900px) {
    flex: none;
    width: 100%;
    min-height: 100vh;
  }
`;


export const Logo = styled.h1`
  color: #d764c8;
  font-size: 2.4rem;
  font-weight: 800;
  margin-bottom: 18px;
`;

export const Welcome = styled.span`
  display: block;

  color: #777;
  font-size: 0.9rem;
  font-weight: 500;

  margin-bottom: 6px;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;

  color: #2f2f2f;

  margin-bottom: 28px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  gap: 18px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  gap: 6px;

  label {
    font-size: rem;
    color: #000000;
  }
`;

export const RegisterLink = styled.button`
  margin-left: 5px;

  border: none;
  background: transparent;

  color: #d764c8;
  font-weight: 700;

  cursor: pointer;

  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;



export const RegisterText = styled.p`
  margin-top: 22px;

  text-align: center;

  color: #666;
  font-size: 0.9rem;
`;

export const RightSide = styled.div`
  flex: 1;

  overflow: hidden;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const BackgroundImage = styled.img`
  width: 100%;
  height: 100vh;

  object-fit: cover;
`;
//senha 

  export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

  export const TogglePassword =
  styled.button`
    position: absolute;

    right: 12px;
    top: 50%;

    transform: translateY(-50%);

    border: none;
    background: transparent;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    color: #777;

    font-size: 1.1rem;

    transition: 0.2s;

    &:hover {
      color: #d88ab3;
    }
  `;

  export const Input = styled.input`
  width: 100%;
  height: 42px;

  border: none;
  border-radius: 6px;

  background: #e7e7e7;

  padding-left: 12px;
  padding-right: 45px;

  outline: none;

  &:focus {
    border: 2px solid #d88ab3;
  }
`;

