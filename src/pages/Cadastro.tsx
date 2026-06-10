// import "./Cadastro.css";
import imagemFundo from "../assets/imagem-fundo-login.png";
import { BackgroundImage, Container, Content, Form, Input, InputContainer, InputGroup, LeftSide, LoginButton, Logo, RegisterLink, RegisterText, RightSide, Title, TogglePassword, Welcome } from "./Login";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { api } from "../../service/api";





export function Cadastro () {
const navigate = useNavigate();
const [nome, setNome] = useState("");
const [email, setEmail] = useState("");
const [telefone, setTelefone] = useState("");
const [senha, setSenha] = useState("");
const [confirmarSenha, setConfirmarSenha] = useState("");
const [loading, setLoading] = useState(false);
const [mostrarSenha, setMostrarSenha] =
  useState(false);

const [
  mostrarConfirmacao,
  setMostrarConfirmacao,
] = useState(false);

const handleTelefoneChange = (
  value: string
) => {
  const numeros = value.replace(/\D/g, "");

  let telefoneFormatado = numeros;

  telefoneFormatado = telefoneFormatado.replace(
    /^(\d{2})(\d)/,
    "($1) $2"
  );

  telefoneFormatado = telefoneFormatado.replace(
    /(\d{5})(\d)/,
    "$1-$2"
  );

  setTelefone(
    telefoneFormatado.slice(0, 15)
  );
};

async function handleCadastro(
  event: React.SyntheticEvent
) {
  event.preventDefault();

  if (senha !== confirmarSenha) {
    toast.error("As senhas não coincidem.");
    return;
  }

  try {
    setLoading(true);

    await api.post(
      "/usuario/cadastro",
      {
        nome,
        email,
        telefone,
        senha,
      }
    );

    toast.success(
      "Cadastro realizado com sucesso!"
    );

    navigate("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const mensagem =
        error.response?.data?.mensagem ||
        error.response?.data?.message ||
        "Erro ao realizar cadastro.";

      toast.error(error.message);
    }
  } finally {
    setLoading(false);
  }
}
  return (
    <>
    <Container>
      <LeftSide>
        <Content>
          <Logo>+Mães</Logo>

          <Welcome>
            Crie sua conta
          </Welcome>

          <Title>Cadastre-se</Title>

          <Form onSubmit={handleCadastro}>
  <InputGroup>
    <label>Nome</label>

    <Input
      type="text"
      value={nome}
      onChange={(e) =>
        setNome(e.target.value)
      }
      placeholder="Digite seu nome"
    />
  </InputGroup>

  <InputGroup>
    <label>Email</label>

    <Input
      type="email"
      value={email}
      onChange={(e) =>
        setEmail(e.target.value)
      }
      placeholder="seuemail@gmail.com"
    />
  </InputGroup>

  <Input
  type="text"
  value={telefone}
  onChange={(e) =>
    handleTelefoneChange(
      e.target.value
    )
  }
  placeholder="(99) 99999-9999"
/>
 

  <InputGroup>
    <label>Senha</label>

    <InputContainer>
      <Input
        type={
          mostrarSenha
            ? "text"
            : "password"
        }
        value={senha}
        onChange={(e) =>
          setSenha(e.target.value)
        }
        placeholder="Digite sua senha"
      />

      <TogglePassword
        type="button"
        onClick={() =>
          setMostrarSenha(
            !mostrarSenha
          )
        }
      >
        {mostrarSenha
          ? <FiEyeOff />
          : <FiEye />}
      </TogglePassword>
    </InputContainer>
  </InputGroup>

  <InputGroup>
    <label>Confirmar Senha</label>

    <InputContainer>
      <Input
        type={
          mostrarConfirmacao
            ? "text"
            : "password"
        }
        value={confirmarSenha}
        onChange={(e) =>
          setConfirmarSenha(
            e.target.value
          )
        }
        placeholder="Confirme sua senha"
      />

      <TogglePassword
        type="button"
        onClick={() =>
          setMostrarConfirmacao(
            !mostrarConfirmacao
          )
        }
      >
        {mostrarConfirmacao
          ? <FiEyeOff />
          : <FiEye />}
      </TogglePassword>
    </InputContainer>
  </InputGroup>

  <LoginButton
    type="submit"
    disabled={loading}
  >
    {loading
      ? "Cadastrando..."
      : "cadastrar →"}
  </LoginButton>

  <RegisterText>
    Já possui conta?

    <RegisterLink
      type="button"
      onClick={() =>
        navigate("/")
      }
    >
      Faça login
    </RegisterLink>
  </RegisterText>
</Form>
        </Content>
      </LeftSide>

      <RightSide>
        <BackgroundImage
          src={imagemFundo}
          alt="Cadastro"
        />
      </RightSide>
    </Container>
    </>
  )
}

