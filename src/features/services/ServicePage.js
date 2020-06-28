import React from "react";
import styled from "styled-components";
import { BackButton } from "components/Button";

const service = { id: 0, title: "A place to sleep tonight", slug: "shelters" };

export const ServicePage = () => {
  return (
    <section>
      <ServiceHeader>
        <BackButton />
      </ServiceHeader>
      {service.title}
    </section>
  );
};

const ServiceHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.spacings(5)};
`;
