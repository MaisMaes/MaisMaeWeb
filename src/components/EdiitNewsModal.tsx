import { useState } from "react";
import styled from "styled-components";
import type { News } from "../pages/Publicacoes";


interface Props {
  news: News;
  onClose: () => void;
  onSave: (data: News) => void;
}

export function EditNewsModal({ news, onClose, onSave }: Props) {
  const [titulo, setTitulo] = useState(news.titulo);
  const [descricao, setDescricao] = useState(news.descricao);
  const [imagem, setImagem] = useState(news.imagem);
  const [link, setLink] = useState(news.link);

  function handleSubmit() {
    onSave({
      ...news,
      titulo,
      descricao,
      imagem,
      link,
    });
  }

  return (
    <Overlay>
      <Modal>
        <Field>
          <label>Nome da notícia</label>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título"
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
            placeholder="Descrição"
          />
        </Field>

        <Buttons>
          <button onClick={handleSubmit}>Salvar</button>
          <button onClick={onClose}>Cancelar</button>
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
  width: 460px;
  background: #ffffff;
  border-radius: 14px;
  padding: 32px;

  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
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
    border-radius: 4px;
    padding: 12px;
    font-size: 0.85rem;
    outline: none;
  }

  textarea {
    height: 90px;
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
  }

  button:first-child {
    border: none;
    background: #65d3d4;
    color: #111;
  }

  button:last-child {
    border: 2px solid #e064cf;
    background: transparent;
    color: #e064cf;
  }
`;