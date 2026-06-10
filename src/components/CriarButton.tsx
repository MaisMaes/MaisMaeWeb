import { FiPlus } from "react-icons/fi";
import styled from "styled-components";


// export function CriarButton() {
//   return (
//     <Container>
//       <Button>
//         <FiPlus />
//         <span>Criar publicação</span>
//       </Button>
//     </Container>
//   );
// }

interface Props {
  onClick: () => void;
}

export function CriarButton({ onClick }: Props) {
  return (
    <Container>
      <Button type="button" onClick={onClick}>
        <FiPlus />
        <span>Criar publicação</span>
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const Button = styled.button`
  height: 42px;
  padding: 0 18px;

  border: none;
  border-radius: 8px;

  background: #d764c8;
  color: white;

  display: flex;
  align-items: center;
  gap: 8px;

  cursor: pointer;

  font-size: 0.9rem;
  font-weight: 600;

  transition: all 0.2s ease;

  svg {
    font-size: 1rem;
  }

  &:hover {
    background: #c84db7;
    transform: translateY(-2px);

    box-shadow: 0 4px 12px rgba(215, 100, 200, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;
