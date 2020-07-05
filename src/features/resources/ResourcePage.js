import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { BackButton } from "components/Button";
import { ListLoader } from "components/Loader";

export const ResourcePage = () => {
  const { resourceId } = useParams();
  const { data } = useSWR(`/api/resources/${resourceId}`);

  return (
    <section>
      <Header>
        <BackButton withIcon />
      </Header>
      {!data ? (
        <ListLoader />
      ) : (
        <Resource>
          <h4>{data.name}</h4>
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

const Header = styled.header`
  margin: ${({ theme }) => `0 ${theme.spacings(-5)} ${theme.spacings(5)}`};
`;

const Resource = styled.section`
  a {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
