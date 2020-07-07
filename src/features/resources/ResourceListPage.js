import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, BackButton } from "components/Button";
import { Modal } from "components/Modal";
import { ListLoader } from "components/Loader";
import { Icon } from "components/Icon";
import { Header } from "./components/Header";
import { ResourceFilterForm } from "./ResourceFilterForm";

export const ResourceListPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { categoryId } = useParams();
  const { categoryName } = queryString.parse(location.search);
  const [filters, setFilters] = useState({
    order: 1,
    neighborhoods: [],
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const { data } = useSWR(
    `/api/categories/${categoryId}/resources?${queryString.stringify(filters)}`
  );

  return (
    <section>
      <Header>
        <BackButton withIcon />
        {categoryName}
      </Header>
      <Subheader>
        <Button onClick={() => setIsFilterModalOpen(true)}>Filters</Button>
      </Subheader>
      {!data ? (
        <ListLoader />
      ) : (
        data.map((s) => (
          <Resource key={s.id} to={`/resource/${s.id}`}>
            <div>
              <h4>{s.name}</h4>
              {!!data.categories && (
                <p>
                  <strong>{t("resource.categories")}:</strong> {data.categories}
                </p>
              )}
              {!!data.provider && (
                <p>
                  <strong>{t("resource.provider")}:</strong> {data.provider}
                </p>
              )}
              {!!s.website && (
                <p>
                  <a href={s.website}>{s.website}</a>
                </p>
              )}
              {!!s.address && <p>{s.address}</p>}
              <p className="description">{s.description}</p>
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

const Subheader = styled.header`
  padding: ${({ theme }) => theme.spacings(5)};
  background-color: ${({ theme }) => theme.colors.lightGrey};
  margin: ${({ theme }) => `0 ${theme.spacings(-5)} ${theme.spacings(5)}`};

  button {
    box-shadow: none;
    padding: ${({ theme }) => `${theme.spacings(2)} ${theme.spacings(3)}`};
  }
`;

const Resource = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacings(2)} 0`};
  margin-bottom: ${({ theme }) => theme.spacings(4)};

  h4 {
    text-decoration: underline;
  }

  p {
    margin: 0;
  }

  .description {
    overflow-wrap: anywhere;
    line-height: 1.6;
  }
`;
