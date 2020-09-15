import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Heading, Heading2, Heading3, Text } from "components/Text";
import { Button } from "components/Button";
import { Modal } from "components/Modal";
import { ListLoader } from "components/Loader";
import { Container } from "components/Page";
import { truncateString } from "utils/stringUtil";
import { useQueryParams, queryString } from "utils/useQueryParams";
import { ResourceFilterForm } from "./ResourceFilterForm";

export const ResourceListPage = () => {
  const { t } = useTranslation();
  const { categoryId } = useParams();
  const { categoryName } = useQueryParams();
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
      <HeaderContainer>
        <Container>
          <Heading>{categoryName}</Heading>
        </Container>
      </HeaderContainer>
      <FilterContainer>
        <Button fullWidth onClick={() => setIsFilterModalOpen(true)}>
          Select Filters
        </Button>
      </FilterContainer>
      <SubheaderContainer>
        <Heading2>{t("resources.resultTitle")}</Heading2>
        <Text>
          <strong>{t("resources.resultsDescription1")}</strong>{" "}
          {t("resources.resultsDescription2")}
        </Text>
      </SubheaderContainer>
      <Container>
        {!data ? (
          <ListLoader />
        ) : (
          data.map((s) => (
            <Resource key={s.id} to={`/resource/${s.id}`}>
              <Heading3>{s.name}</Heading3>
              <Text
                className="description"
                dangerouslySetInnerHTML={{
                  __html: truncateString(s.description),
                }}
              />
            </Resource>
          ))
        )}
      </Container>
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

export const HeaderContainer = styled.section`
  h1 {
    margin-bottom: ${({ theme }) => theme.spacings(2)};
  }
  background: ${({ theme }) => theme.colors.grayLightest};
  padding-top: ${({ theme }) => theme.spacings(3)};
  padding-bottom: ${({ theme }) => theme.spacings(3)};
  margin-bottom: ${({ theme }) => theme.spacings(6)};
`;

const FilterContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spacings(4)};
  margin-bottom: ${({ theme }) => theme.spacings(6)};
  button {
    justify-content: center;
  }
`;

const SubheaderContainer = styled(Container)`
  margin-bottom: ${({ theme }) => theme.spacings(8)};
  h2 {
    border-bottom: 1px solid;
    margin-bottom: ${({ theme }) => theme.spacings(2)};
  }
`;

const Resource = styled(Link)`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacings(8)};
  h3 {
    margin-bottom: ${({ theme }) => theme.spacings(2)};
  }
  p {
    overflow-wrap: anywhere;
  }
`;
