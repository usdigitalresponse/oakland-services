import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { BackButton } from "components/Button";
import { ListLoader } from "components/Loader";
import { Header } from "./components/Header";

export const ResourcePage = () => {
  const { resourceId } = useParams();
  const { data } = useSWR(`/api/resources/${resourceId}`);

  return (
    <section>
      <Header>
        <BackButton withIcon />
        {!!data && data.name}
      </Header>
      {!data ? (
        <ListLoader />
      ) : (
        <Resource>
          <p>
            <a href={data.website}>{data.website}</a>
          </p>
          <p>{data.phone_number}</p>
          <p>{data.email}</p>
          <p>{data.address}</p>
          <p>{data.description}</p>
        </Resource>
      )}
    </section>
  );
};

const Resource = styled.section`
  a {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
