import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import { Button, Card, Collapse, Flex, Input } from "ui";

const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 1rem;
  & > * + * {
    margin-left: 1rem;
  }
`;

const H1 = styled.h1`
  margin: 0;
`;

const StyledFlex = styled(Flex)`
  ${Card} + ${Card} {
    margin-top: 1rem;
  }
`;

const INITIAL_FORM = {
  name: "",
  email: "",
};

const Components = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const onChangeForm = (event) => setForm((prevForm) => ({ ...prevForm, [event.target.name]: event.target.value }));

  const [isCollapseOpen, setIsCollapseOpen] = useState(true);

  return (
    <>
      <Head>
        <title>Subscrib.io - Components</title>
        <meta name="description" content="Subscrib.io Components showcase" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledFlex direction="column" p={[0, 0, 10, 0]}>
        <Card>
          <Flex direction="column">
            <H1>Buttons</H1>
            <ButtonGroup>
              <Button>Primary</Button>
              <Button variant="outlined">Outlined</Button>
              <Button disabled>Disabled</Button>
              <Button variant="outlined" disabled>
                Disabled
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button color="secondary">Secondary</Button>
              <Button color="secondary" variant="outlined">
                Outlined
              </Button>
              <Button color="secondary" disabled>
                Disabled
              </Button>
              <Button color="secondary" variant="outlined" disabled>
                Disabled
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button color="alert">Alert</Button>
              <Button color="alert" variant="outlined">
                Outlined
              </Button>
              <Button color="alert" disabled>
                Disabled
              </Button>
              <Button color="alert" variant="outlined" disabled>
                Disabled
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button color="warning">Warning</Button>
              <Button color="warning" variant="outlined">
                Outlined
              </Button>
              <Button color="warning" disabled>
                Disabled
              </Button>
              <Button color="warning" variant="outlined" disabled>
                Disabled
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button color="success">Success</Button>
              <Button color="success" variant="outlined">
                Outlined
              </Button>
              <Button color="success" disabled>
                Disabled
              </Button>
              <Button color="success" variant="outlined" disabled>
                Disabled
              </Button>
            </ButtonGroup>
          </Flex>
        </Card>
        <Card>
          <Flex direction="column">
            <H1>Form components</H1>
            <Input name="name" label="Fullname" value={form.name} onChange={onChangeForm} />
            <Input name="email" label="Email" value={form.email} onChange={onChangeForm} type="email" />
          </Flex>
        </Card>
        <Card>
          <Flex direction="column">
            <H1>Collaspe</H1>
            <Collapse
              title="Completed"
              content={
                <>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt veritatis eius libero odio! Quos
                  quidem dolorum deleniti unde, culpa optio veritatis quia esse autem, consequatur doloremque tempore
                  corrupti facilis laborum porro hic obcaecati alias reiciendis! Quia sed nemo explicabo aut quam optio
                  nulla fugiat vel, provident assumenda architecto error porro quo sunt pariatur harum exercitationem
                  vitae necessitatibus temporibus? Error, earum! Aperiam blanditiis voluptate fugiat pariatur nulla
                  obcaecati incidunt eum inventore laboriosam debitis eius perspiciatis cumque, quaerat temporibus
                  quisquam! Corrupti aliquid, rem officia accusamus sed aliquam repellendus ipsum nam tempore obcaecati
                  vitae repellat numquam sunt enim aut nulla suscipit possimus minus.
                </>
              }
              open={isCollapseOpen}
              onToggle={() => setIsCollapseOpen((p) => !p)}
            />
          </Flex>
        </Card>
      </StyledFlex>
    </>
  );
};

export default Components;
