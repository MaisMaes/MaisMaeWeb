import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import styled from "styled-components";

interface UserProfile {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  role: string;
}

interface Props {
  user: UserProfile;
  onClose: () => void;
  onSave: (data: {
    nome: string;
    telefone: string;
    senha?: string;
    email: string;
  }) => void;
}

export function EditProfileModal({
  user,
  onClose,
  onSave,
}: Props) {
  const [nome, setNome] = useState(user.nome);
  const [email, setEmail] = useState(user.email);
  const [telefone, setTelefone] = useState(user.telefone);
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] =
    useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRegex =
  /^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,})?$/;

function handleSubmit() {
  if (senha && !passwordRegex.test(senha)) {
    toast.error(
      "A senha deve ter no mínimo 8 caracteres, letra maiúscula, letra minúscula, número e caractere especial."
    );
    return;
  }

  if (senha && senha !== confirmarSenha) {
    toast.error("As senhas não coincidem.");
    return;
  }

  onSave({
    nome,
    email,
    telefone,
    senha: senha || "",
  });
}


  return (
    <Overlay>
      <Modal>
        <Title>Editar perfil</Title>

        <Field>
          <label>Nome</label>

          <input
            value={nome}
            onChange={(e) =>
              setNome(e.target.value)
            }
          />
        </Field>

        <Field>
          <label>Email</label>

          <input
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </Field>

        <Field>
          <label>Telefone</label>

          <input
            value={telefone}
            onChange={(e) =>
              setTelefone(e.target.value)
            }
            placeholder="(99) 99999-9999"
          />
        </Field>

        <Field>
        
           <PasswordWrapper>
              <input
                type={showPassword ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite a nova senha"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
          </PasswordWrapper>
        </Field>


        

        <Field>
          <label>Confirmar senha</label>

          <PasswordWrapper>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="Confirme a nova senha"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
          </PasswordWrapper>
        </Field>

        <Buttons>
          <SaveButton onClick={handleSubmit}>
            Salvar
          </SaveButton>

          <CancelButton onClick={onClose}>
            Cancelar
          </CancelButton>
        </Buttons>
      </Modal>
    </Overlay>
  );
}


const PasswordWrapper = styled.div`
  position: relative;

  input {
    width: 100%;
    padding-right: 44px;
  }

  button {
    position: absolute;
    right: 12px;
    top: 50%;

    transform: translateY(-50%);

    border: none;
    background: transparent;

    color: #777;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      font-size: 1.1rem;
    }

    &:hover {
      color: #d764c8;
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.45);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 999;
`;

const Modal = styled.div`
  width: 500px;

  background: white;

  border-radius: 12px;

  padding: 30px;

  box-shadow: 0 10px 40px
    rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  color: #6b9eb3;
  margin-bottom: 24px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 16px;

  label {
    margin-bottom: 6px;

    color: #666;
    font-size: 0.85rem;
  }

  input {
    height: 42px;

    border: 1px solid #ddd;
    border-radius: 8px;

    padding: 0 12px;

    outline: none;

    &:focus {
      border-color: #6b9eb3;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 12px;

  margin-top: 24px;
`;

const SaveButton = styled.button`
  flex: 1;

  height: 42px;

  border: none;
  border-radius: 8px;

  background: #65d3d4;
  color: white;

  font-weight: 600;

  cursor: pointer;
`;

const CancelButton = styled.button`
  flex: 1;

  height: 42px;

  border-radius: 8px;

  border: 2px solid #e064cf;

  background: transparent;
  color: #e064cf;

  font-weight: 600;

  cursor: pointer;
`;
