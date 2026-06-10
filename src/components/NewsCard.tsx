import styled from "styled-components";


interface Props {
  image: string;
  title: string;
}

export function NewsCard({
  image,
  title,
}: Props) {
  return (
    <Card>
      <CardImage src={image} />

      <CardBody>
        <h2>{title}</h2>

        <p>
          Lorem ipsum dolor sit amet...
        </p>

        <Actions>
          <button>Editar</button>
          <button>🗑</button>
        </Actions>
      </CardBody>
    </Card>
  );
}

export const Card = styled.article`
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;

  border-bottom: 4px solid #72d6e4;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;

  transition: 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 170px;
  object-fit: cover;
`;

export const CardBody = styled.div`
  padding: 16px;

  h2 {
    color: #6b9eb3;
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 12px;
  }

  p {
    color: #666;
    font-size: 0.85rem;
    line-height: 1.6;
    margin-bottom: 16px;
  }
`;

 const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button:first-child {
    width: 110px;
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