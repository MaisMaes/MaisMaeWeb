import styled from "styled-components";
import type { News } from "../pages/Publicacoes";


interface Props {
  news: News;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteNewsModal({ news, onClose, onConfirm }: Props) {
  return (
    <Overlay>
      <Modal>
        <h2>Confirmar exclusão</h2>

        <p>
          Tem certeza que deseja excluir a notícia{" "}
          <strong>"{news.titulo}"</strong>?
        </p>

        <Buttons>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>

          <button type="button" onClick={onConfirm}>
            Excluir
          </button>
        </Buttons>
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 999;
`;

const Modal = styled.div`
  width: 420px;
  background: #ffffff;
  border-radius: 14px;
  padding: 28px;

  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

  h2 {
    color: #6b9eb3;
    font-size: 1.4rem;
    margin-bottom: 14px;
  }

  p {
    color: #555;
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 28px;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 14px;

  button {
    flex: 1;
    height: 42px;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
  }

  button:first-child {
    border: 2px solid #b68ab0;
    background: transparent;
    color: #b68ab0;
  }

  button:last-child {
    border: none;
    background: #d9534f;
    color: #fff;
  }
`;