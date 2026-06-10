

import { useState } from "react";
import styled from "styled-components";

interface Props {
  onClose: () => void;
  onSave: (data: {
    titulo: string;
    descricao: string;
    imagem: string;
    link: string;
  }) => void;
}

export function CreateNewsModal({ onClose, onSave }: Props) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit() {
    onSave({
      titulo,
      descricao,
      imagem,
      link,
    });
  }

  return (
    <Overlay>
      <Modal>
        <h2>Criar publicação</h2>

        <Field>
          <label>Nome da notícia</label>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Digite o título"
          />
        </Field>

        <Field>
          <label>Imagem</label>
          <input
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            placeholder="URL da imagem"
          />
        </Field>

        <Field>
          <label>Link</label>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link da notícia"
          />
        </Field>

        <Field>
          <label>Mensagem</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição da notícia"
          />
        </Field>

        <Buttons>
          <button type="button" onClick={handleSubmit}>
            Criar
          </button>

          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </Buttons>
      </Modal>
    </Overlay>
  );
}
const Modal = styled.div`
  width: 500px;

  background: #ffffff;
  border-radius: 14px;

  padding: 32px;

  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

  h2 {
    color: #6b9eb3;
    margin-bottom: 24px;
    font-size: 1.4rem;
  }
`;
const Overlay = styled.div`
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.45);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 999;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 18px;

  label {
    font-size: 0.75rem;
    color: #8b8bb0;
    margin-bottom: 8px;
  }

  input,
  textarea {
    border: 1px solid #70c7ff;
    border-radius: 6px;

    padding: 12px;

    font-size: 0.9rem;

    outline: none;

    transition: 0.2s;
  }

  input:focus,
  textarea:focus {
    border-color: #6b9eb3;
    box-shadow: 0 0 0 3px rgba(107, 158, 179, 0.15);
  }

  textarea {
    height: 100px;
    resize: none;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 16px;

  margin-top: 28px;

  button {
    flex: 1;
    height: 44px;

    border-radius: 8px;

    font-weight: 700;
    cursor: pointer;

    transition: 0.2s;
  }

  button:first-child {
    border: none;
    background: #65d3d4;
    color: #111;
  }

  button:first-child:hover {
    background: #54c2c3;
  }

  button:last-child {
    border: 2px solid #e064cf;
    background: transparent;
    color: #e064cf;
  }

  button:last-child:hover {
    background: rgba(224, 100, 207, 0.08);
  }
`;