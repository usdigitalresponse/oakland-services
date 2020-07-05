import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { Button } from "components/Button";
import { Modal } from "components/Modal";
import { ListLoader } from "components/Loader";
import { Icon } from "components/Icon";
import { ResourceFilterForm } from "./ResourceFilterForm";

export const ResourceListPage = () => {
  const [filters, setFilters] = useState({
    neighborhoods: [],
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const { categoryId } = useParams();
  const { data } = useSWR(
    `/api/categories/${categoryId}/resources?${queryString.stringify(filters)}`
  );

  return (
    <section>
      <Header>
        <Button variant="outline" onClick={() => setIsFilterModalOpen(true)}>
          Filters
        </Button>
      </Header>
      {!data ? (
        <ListLoader />
      ) : (
        data.map((s) => (
          <Resource key={s.id} to={`/resource/${s.id}`}>
            <div>
              <h4>{s.name}</h4>
              <p>{s.address}</p>
              <p>{s.service_hours}</p>
              <p>{s.description}</p>
            </div>
            <Icon icon="chevronRight" />
          </Resource>
        ))
      )}
      <Modal
        open={isFilterModalOpen}
        onRequestClose={() => setIsFilterModalOpen(false)}
        maxWidth={600}
        closeButton
      >
        <ResourceFilterForm
          onComplete={() => setIsFilterModalOpen(false)}
          filters={filters}
          setFilters={setFilters}
        />
      </Modal>
    </section>
  );
};

const Header = styled.header`
  padding: ${({ theme }) => theme.spacings(5)};
  background-color: ${({ theme }) => theme.colors.lightGrey};
  margin: ${({ theme }) => `0 ${theme.spacings(-5)} ${theme.spacings(5)}`};

  button {
    background: #fff;
    padding: ${({ theme }) => `${theme.spacings(2)} ${theme.spacings(3)}`};
    &:hover {
      background-color: #fff;
    }
  }
`;

const Resource = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacings(3)} 0`};
  margin-bottom: ${({ theme }) => theme.spacings(5)};

  h4 {
    text-decoration: underline;
  }
`;
