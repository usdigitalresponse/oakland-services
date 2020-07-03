import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { BackButton } from "components/Button";
import { ListLoader } from "components/Loader";

export const ServicePage = () => {
  const { serviceId } = useParams();
  const { data } = useSWR(`/api/resources/${serviceId}`);

  return (
    <section>
      <ServiceHeader>
        <BackButton />
      </ServiceHeader>
      {!data ? (
        <ListLoader />
      ) : (
        <Service>
          <h4>{data.name}</h4>
          <p>{data.description}</p>
          <p>
            <a href={data.website}>{data.website}</a>
          </p>
          <p>{data.phone_number}</p>
          <p>{data.email}</p>
          <p>{data.address}</p>
        </Service>
      )}
    </section>
  );
};

const ServiceHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.spacings(5)};
`;

const Service = styled.section``;
