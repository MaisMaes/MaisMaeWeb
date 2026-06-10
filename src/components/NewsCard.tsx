import styled from "styled-components";
import { FiTrash2 } from "react-icons/fi";



interface Props {
  image: string;
  title: string;
  description: string;
  link: string;
  destaque: boolean;
  onToggleDestaque: () => void;
  onDelete: () => void;
  onEdit: () => void;
}


//novo
export function NewsCard({
  image,
  title,
  description,
  link,
  destaque,
  onToggleDestaque,
  onEdit,
  onDelete
}: Props) {
  return (
    <Card>


        <SwitchContainer
  $active={destaque}
  onClick={(e) => {
    e.stopPropagation();
    onToggleDestaque();
  }}
>
  <span>Destaque</span>

  <div className="track">
    <div className="thumb" />
  </div>
</SwitchContainer>
      <CardImage src={image} />

      <CardBody>
        <h2>{title}</h2>

        <p>{description}</p>

        <a href={link} target="_blank" rel="noreferrer">
          Acessar notícia
        </a>

        <Actions>
          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            Editar
          </button>
          
          <DeleteButton
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <FiTrash2 />
        </DeleteButton>
          
        </Actions>
      </CardBody>
    </Card>
  );
}

export const DeleteButton = styled.button`
  border: none;
  background: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.1rem;
  color: #d9534f;

  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    color: #c9302c;
    transform: scale(1.15);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SwitchContainer = styled.button<{ $active: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;

  border: none;
  background: white;

  border-radius: 20px;
  padding: 6px 10px;

  display: flex;
  align-items: center;
  gap: 8px;

  cursor: pointer;

  box-shadow: 0 2px 8px rgba(0,0,0,.15);

  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.04);
  }

  span {
    font-size: 0.7rem;
    font-weight: 600;
  }

  .track {
    width: 34px;
    height: 18px;
    border-radius: 20px;
    background: ${({ $active }) => ($active ? "#5FD36A" : "#D9D9D9")};
    position: relative;
  }

  .thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: white;
    position: absolute;
    top: 2px;
    left: ${({ $active }) => ($active ? "18px" : "2px")};
    transition: 0.2s;
  }
`;

export const Card = styled.article`
  position: relative;

  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  border-bottom: 4px solid #72d6e4;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  height: 100%;

  cursor: pointer;

  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-6px);

    box-shadow:
      0 12px 24px rgba(0, 0, 0, 0.12),
      0 4px 8px rgba(0, 0, 0, 0.08);

    border-bottom-color: #4cbfd0;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;


export const CardImage = styled.img`
  width: 100%;
  height: 130px; /* antes 170px */
  object-fit: cover;

  transition: transform 0.3s ease;
`;

export const CardBody = styled.div`
  // padding: 16px;
  padding: 12px; /* antes 16px */
  display: flex;
  flex-direction: column;
  flex: 1;

  h2 {
    color: #6b9eb3;
    // font-size: 2rem;
    font-size: 1.0rem;
    font-weight: 600;
    margin-bottom: 10px;

     min-height: 60px;

    // min-height: 115px; /* reserva espaço igual para títulos */
  }

  p {
    color: #666;
    font-size: 0.85rem;
    line-height: 1.6;
    margin-bottom: 16px;

    min-height: 45px; /* reserva espaço igual para descrição */
  }

  a {
    margin-bottom: 12px;
    display: inline-block;
  }`



const Actions = styled.div`
  margin-top: auto; /* 🔥 ISSO resolve tudo */

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;

  button:first-child {
    width: 100px;
    height: 34px;

    border: none;
    border-radius: 6px;

    background: #b68ab0;
    color: white;

    font-weight: 500;
    cursor: pointer;
  }

  button:last-child {
    border: none;
    background: transparent;

    font-size: 1.2rem;
    cursor: pointer;
    color: #d9534f;
  }
 `;

