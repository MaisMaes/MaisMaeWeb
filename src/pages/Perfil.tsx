import styled from "styled-components";
import { DashboardLayout } from "../components/DashboardLayout";


export function Perfil() {
  return (
    <DashboardLayout>
      <ProfileContainer>
        <ProfileCard>
          <EditButton>
            ✏️ Editar
          </EditButton>

          <Avatar />

          <Field>
            <Label>Nome completo</Label>
            <Value>Aman Admin</Value>
          </Field>

          <Field>
            <Label>Email</Label>
            <Value>
              Aman.Admin@email.com
            </Value>
          </Field>

          <Field>
            <Label>Senha</Label>
            <Value>••••••••••••••</Value>
          </Field>

          <Field>
            <Label>Confirmar senha</Label>
            <Value>••••••••••••••</Value>
          </Field>
        </ProfileCard>
      </ProfileContainer>
    </DashboardLayout>
  );
}

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
`;

export const ProfileCard = styled.div`
  width: 100%;
  max-width: 650px;

  background: white;

  border-radius: 12px;

  padding: 40px;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 0 2px 8px
    rgba(0, 0, 0, 0.08);
`;

export const EditButton = styled.button`
  position: absolute;

  top: 20px;
  right: 20px;

  border: none;
  background: transparent;

  cursor: pointer;

  font-weight: 600;
  color: #555;

  transition: 0.2s;

  &:hover {
    color: #d764c8;
  }
`;

export const Avatar = styled.div`
  width: 110px;
  height: 110px;

  border-radius: 50%;

  background: #fbbc04;

  margin-bottom: 20px;
`;

export const Field = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const Label = styled.p`
  color: #777;
  font-size: 0.85rem;
`;

export const Value = styled.h3`
  color: #222;
  font-weight: 700;
`;