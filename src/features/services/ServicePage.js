import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { BackButton } from "components/Button";
import { ListLoader } from "components/Loader";

export const ServicePage = () => {
  const { serviceId } = useParams();
  const { data } = useSWR(`/api/services/${serviceId}`);

  return (
    <section>
      <ServiceHeader>
        <BackButton />
      </ServiceHeader>
      {!data ? <ListLoader /> : "Hello"}
    </section>
  );
};

const ServiceHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.spacings(5)};
`;
