

import { Link, useNavigate } from "react-router-dom";

import { api } from "../../service/api";
import { toast } from "react-toastify";
import imagemFundo from "../assets/imagem-fundo-login.png";

// import "./Login.css";
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

            <label>Senha:</label>
            <InputContainer>
              <Input
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(e) =>
                  setSenha(e.target.value)
                }
                placeholder="••••••••••••"
              />

              <TogglePassword
                type="button"
                onClick={() =>
                  setMostrarSenha(!mostrarSenha)
                }
              >
                {mostrarSenha ? (
                  <FiEyeOff />
                ) : (
                  <FiEye />
                )}
              </TogglePassword>
            </InputContainer>

            <LoginButton
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Entrando..."
                : "LOGIN →"}
            </LoginButton>

            <RegisterText>
              Não tem conta?

              <RegisterLink
                type="button"
                onClick={() =>
                  navigate("/cadastro")
                }
              >
                Cadastre-se
              </RegisterLink>
</RegisterText>
            
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
  // background: #eec6db;
`;

export const LeftSide = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 40px;

  @media (max-width: 900px) {
    flex: none;
    min-height: 100vh;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 350px;
`;

export const Logo = styled.h1`
  color: #fa7ec0;

  font-size: 2.2rem;
  font-weight: 700;

  margin-bottom: 12px;
`;

export const Welcome = styled.span`
  display: block;

  color: #2b2b2b;
  font-size: 0.85rem;

  margin-bottom: 8px;
`;

export const Title = styled.h2`
  font-size: 3rem;
  font-weight: 800;

  color: #fefefe;

  margin-bottom: 32px;

  @media (max-width: 900px) {
    font-size: 2.4rem;
  }
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


export const LoginButton = styled.button`
  width: 120px;
  height: 38px;

  border: none;
  border-radius: 30px;

  background: #d88ab3;
  color: white;

  margin-top: 10px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.3s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
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

export const RegisterText = styled.p`
  margin-top: 24px;

  text-align: center;

  color: #666;
  font-size: 0.9rem;
`;

export const RegisterLink = styled.button`
  margin-left: 4px;

  border: none;
  background: transparent;

  color: #f73b9f;
  font-weight: 600;

  cursor: pointer;

  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;


// import "./Login.css";
// import imagemFundo from "../assets/imagem-fundo-login.png";

// export function Login() {
//   return (
//     <div className="login-container">
//       <div className="login-left">
//         <div className="login-content">
//           <h1 className="logo">+Mães</h1>

//           <span className="welcome">Bem-vindo(a)!</span>

//           <h2 className="title">LOGIN</h2>

//           <form className="login-form">
//             <div className="input-group">
//               <label>Email:</label>
//               <input
//                 type="email"
//                 placeholder="seuemail@gmail.com"
//               />
//             </div>

//             <div className="input-group">
//               <label>Senha:</label>
//               <input
//                 type="password"
//                 placeholder="••••••••••••"
//               />
//             </div>

//             <button type="submit">
//               LOGIN →
//             </button>
//           </form>
//         </div>
//       </div>

//       <div className="login-right">
//         <img
//           src={imagemFundo}
//           alt="Imagem de Login"
//         />
//       </div>
//     </div>
//   );
// }