

interface Props{

    denuncia:any;

}

export function ComplaintCard({denuncia}:Props){

    return(

        <Card>

            <Header>

                <Badge status={denuncia.status}>
                    {denuncia.status}
                </Badge>

            </Header>

            <Body>

                <Label>Grupo</Label>

                <Value>{denuncia.grupoNome}</Value>

                <Label>Usuário</Label>

                <Value>{denuncia.usuarioNome}</Value>

                <Divider/>

                <Label>Descrição</Label>

                <p>{denuncia.descricao}</p>

                <Divider/>

                <Footer>

                    <div>

                        <Label>Veracidade</Label>

                        <Value>
                            {denuncia.verdadeira}
                        </Value>

                    </div>

                    <div>

                        <Label>Aberta em</Label>

                        <Value>

                            {new Date(
                                denuncia.abertoEm
                            ).toLocaleString()}

                        </Value>

                    </div>

                </Footer>

                <Footer>

                    <div>

                        <Label>Atualizada em</Label>

                        <Value>

                            {new Date(
                                denuncia.atualizadoEm
                            ).toLocaleString()}

                        </Value>

                    </div>

                </Footer>

                <Button>

                    Visualizar detalhes

                </Button>

            </Body>

        </Card>

    );

}

import styled from "styled-components";

const Card = styled.article`

background:white;

border-radius:10px;

box-shadow:0 3px 10px rgba(0,0,0,.08);

border-bottom:4px solid #72D6E4;

display:flex;

flex-direction:column;

transition:.3s;

:hover{

transform:translateY(-5px);

}

`;

 const Header = styled.div`

padding:20px;

`;

 const Badge=styled.span<{status:string}>`

padding:8px 15px;

border-radius:20px;

font-weight:600;

font-size:.8rem;

background:${props=>{

if(props.status==="PENDENTE")
return "#FFE8A3";

if(props.status==="APROVADA")
return "#CFF3D1";

return "#FFD4D4";

}};

color:${props=>{

if(props.status==="PENDENTE")
return "#AA7600";

if(props.status==="APROVADA")
return "#288B38";

return "#D32F2F";

}};

`;

 const Body=styled.div`

padding:0 20px 20px;

display:flex;

flex-direction:column;

gap:8px;

p{

line-height:1.5;

color:#666;

}

`;

 const Label=styled.small`

color:#999;

`;

 const Value=styled.div`

font-weight:600;

`;

 const Divider=styled.hr`

border:none;

border-top:1px solid #eee;

margin:10px 0;

`;

 const Footer=styled.div`

display:flex;

justify-content:space-between;

margin-top:10px;

`;

 const Button = styled.button`

margin-top:20px;

height:42px;

border:none;

background:#B68AB0;

color:white;

border-radius:8px;

cursor:pointer;

font-weight:600;

`;