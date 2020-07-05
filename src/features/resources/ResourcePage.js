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
          <div className="resource-header">
            {!!data.last_updated && (
              <p>
                <strong>Last updated:</strong> {data.last_updated}
              </p>
            )}
            {!!data.categories && (
              <p>
                <strong>Categories:</strong> {data.categories}
              </p>
            )}
            {!!data.provider && (
              <p>
                <strong>Provider:</strong> {data.provider}
              </p>
            )}
            {!!data.website && (
              <p>
                <strong>Website:</strong>{" "}
                <a href={data.website}>{data.website}</a>
              </p>
            )}
            {!!data.address && (
              <p>
                <strong>Address:</strong> {data.address}
              </p>
            )}
            {!!data.phone_number && (
              <p>
                <strong>Phone number:</strong>{" "}
                <a href={`tel:${data.phone_number}`}>{data.phone_number}</a>
              </p>
            )}
            {!!data.email && (
              <p>
                <strong>Email:</strong> {data.email}
              </p>
            )}
          </div>
          <p>{data.description}</p>
        </Resource>
      )}
    </section>
  );
};

const Resource = styled.section`
  .resource-header {
    margin-bottom: ${({ theme }) => theme.spacings(5)};
  }
  a {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
