import { useEffect, useState } from "react";


// import { Denuncia } from "../../types/denuncia";

interface Props {
  denuncia: Denuncia;
  fechar: () => void;
  atualizarLista: () => void;
}

export function ModalDenuncia({
  denuncia,
  fechar,
  atualizarLista,
}: Props) {
  const [status, setStatus] = useState(denuncia.status);

  const [verdadeira, setVerdadeira] = useState(
    denuncia.verdadeira
  );

  const [carregando, setCarregando] =
    useState(false);

  useEffect(() => {
    setStatus(denuncia.status);
    setVerdadeira(denuncia.verdadeira);
  }, [denuncia]);

  async function salvarAlteracoes() {
    try {
      setCarregando(true);

      await atualizarDenuncia(denuncia.id, {
        status,
        descricao: denuncia.descricao,
        verdadeira,
      });

      atualizarLista();

      fechar();
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar denúncia.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <Overlay>

      <Modal>

        <ModalTitulo>
          Detalhes da denúncia
        </ModalTitulo>

        <Campo>

          <label>Grupo</label>

          <input
            value={denuncia.grupoNome}
            disabled
          />

        </Campo>

        <Campo>

          <label>Denunciante</label>

          <input
            value={denuncia.usuarioNome}
            disabled
          />

        </Campo>

        <Campo>

          <label>Descrição</label>

          <textarea
            value={denuncia.descricao}
            disabled
          />

        </Campo>

        <Campo>

          <label>Status</label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as Denuncia["status"])
            }
          >
            <option value="PENDENTE">
              PENDENTE
            </option>

            <option value="EM_ANALISE">
              EM ANÁLISE
            </option>

            <option value="RESOLVIDA">
              RESOLVIDA
            </option>

            <option value="REJEITADA">
              REJEITADA
            </option>

          </select>

        </Campo>

        <Campo>

          <label>Consistência da denúncia</label>

          <select
            value={verdadeira}
            onChange={(e) =>
              setVerdadeira(
                e.target.value as Denuncia["verdadeira"]
              )
            }
          >
            <option value="VERIFICANDO">
              VERIFICANDO
            </option>

            <option value="SIM">
              SIM
            </option>

            <option value="NAO">
              NÃO
            </option>

          </select>

        </Campo>

        <Datas>

          <div>

            <strong>Aberta em</strong>

            <span>{denuncia.abertoEm}</span>

          </div>

          <div>

            <strong>Última alteração</strong>

            <span>{denuncia.atualizadoEm}</span>

          </div>

        </Datas>

        <Acoes>

          <BotaoCancelar
            type="button"
            onClick={fechar}
          >
            Cancelar
          </BotaoCancelar>

          <BotaoSalvar
            type="button"
            onClick={salvarAlteracoes}
            disabled={carregando}
          >
            {carregando
              ? "Salvando..."
              : "Salvar alterações"}
          </BotaoSalvar>

        </Acoes>

      </Modal>

    </Overlay>
  );
}

import styled from "styled-components";
import { atualizarDenuncia } from "../../service/api";
import type { Denuncia } from "../pages/Denuncias";

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
  width: 700px;
  max-width: 95%;

  background: white;

  border-radius: 14px;

  padding: 28px;

  display: flex;
  flex-direction: column;

  gap: 18px;

  box-shadow: 0 10px 30px rgba(0,0,0,.2);
`;

 const ModalTitulo = styled.h2`
  color: #444;
  margin: 0;
`;

const Campo = styled.div`
  display: flex;
  flex-direction: column;

  gap: 6px;

  label {
    font-weight: 600;
    color: #666;
  }

  input,
  textarea,
  select {

    width: 100%;

    border: 1px solid #DDD;

    border-radius: 8px;

    padding: 12px;

    font-size: .95rem;

    outline: none;

    transition: .2s;

    &:focus{

      border-color:#B68AB0;

    }

  }

  textarea{

    resize: none;

    min-height: 120px;

  }

  input:disabled,
  textarea:disabled{

    background:#F5F5F5;

    color:#555;

    cursor:not-allowed;

  }
`;

 const Datas = styled.div`
  display: flex;

  justify-content: space-between;

  gap: 20px;

  div{

    display:flex;

    flex-direction:column;

  }

  strong{

    color:#777;

    margin-bottom:5px;

  }

  span{

    color:#444;

  }
`;

 const Acoes = styled.div`
  display:flex;

  justify-content:flex-end;

  gap:12px;

  margin-top:10px;
`;

 const BotaoCancelar = styled.button`
  height:42px;

  padding:0 20px;

  border-radius:8px;

  border:1px solid #DDD;

  background:white;

  cursor:pointer;

  transition:.2s;

  &:hover{

    background:#F2F2F2;

  }
`;

 const BotaoSalvar = styled.button`
  height:42px;

  padding:0 20px;

  border:none;

  border-radius:8px;

  background:#B68AB0;

  color:white;

  font-weight:600;

  cursor:pointer;

  transition:.2s;

  &:hover{

    background:#a770a0;

  }

  &:disabled{

    opacity:.6;

    cursor:not-allowed;

  }
`;