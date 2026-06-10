import styled from "styled-components";


// interface Props {
//   image: string;
//   title: string;
//   description: string;
//   link: string;
// }

// interface Props {
//   id: string;
//   image: string;
//   title: string;
//   description: string;
//   link: string;
//   destaque: boolean;
//   ativo: boolean;
//   onEdit: (id: string) => void;
// }

interface Props {
  image: string;
  title: string;
  description: string;
  link: string;
  onEdit: () => void;
}


//novo
export function NewsCard({
  image,
  title,
  description,
  link,
  onEdit,
}: Props) {
  return (
    <Card>
      <CardImage src={image} />

      <CardBody>
        <h2>{title}</h2>

        <p>{description}</p>

        <a href={link} target="_blank" rel="noreferrer">
          Acessar notícia
        </a>

        <Actions>
          {/* <button onClick={() => onEdit(id)}>Editar</button> */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            Editar
          </button>
          <button>🗑</button>
        </Actions>
      </CardBody>
    </Card>
  );
}

// export function NewsCard({
//   image,
//   title,
//   description,
//   link,
// }: Props) {
//   return (
//     <Card>
//       <CardImage src={image} />

//       <CardBody>
//         <h2>{title}</h2>

//         <p>{description}</p>

//         <a href={link} target="_blank" rel="noreferrer">
//           Acessar notícia
//         </a>

//         <Actions>
//           <button>Editar</button>
//           <button>🗑</button>
//         </Actions>
//       </CardBody>
//     </Card>
//   );
// }


export const Card = styled.article`
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

// export const CardImage = styled.img`
//   width: 100%;
//   height: 170px;
//   object-fit: cover;
// `;

// export const CardImage = styled.img`
//   width: 100%;
//   height: 170px;
//   object-fit: cover;

//   transition: transform 0.3s ease;
// `;


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

