import styled from "styled-components";
import { Card } from "ui";
import { useAuth } from "hooks";
import Image from "next/image";

const Hello = (props) => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Card {...props}>
      <Wrapper>
        <Avatar
          alt="Profile picture"
          src={`${user.picture}`}
          unoptimized
          width={48}
          height={48}
          referrerpolicy="no-referrer"
        />
        <Message>{`Hello${user.givenName ? `, ${user.givenName}!` : "!"}`}</Message>
      </Wrapper>
    </Card>
  );
};

/********************* 
  STYLED COMPONENTS 
*********************/

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 1rem;
`;

const Avatar = styled(Image)`
  width: 4rem;
  height: 4rem;

  border-radius: 50%;
`;

const Message = styled.h2`
  margin: 0;
  font-weight: 700;
`;

export default Hello;
