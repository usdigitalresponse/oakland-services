import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";
import { Link } from "react-router-dom";
import { Button } from "components/Button";
import { Checkbox } from "components/Checkbox";
import { RadioSwitch } from "components/Radio";
import { Modal } from "components/Modal";
import { ListLoader } from "components/Loader";

export const ResourceListPage = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const { categoryId } = useParams();
  const { data } = useSWR(`/api/categories/${categoryId}/resources`);

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
          <Resource key={s.resource_id} to={`/resource/${s.resource_id}`}>
            <h4>{s.name}</h4>
            <p>{s.address}</p>
            <p>{s.phone_number}</p>
            <p>{s.service_hours}</p>
            <p>{s.description}</p>
          </Resource>
        ))
      )}
      <Modal
        open={isFilterModalOpen}
        onRequestClose={() => setIsFilterModalOpen(false)}
        maxWidth={600}
        closeButton
      >
        <FilterBody>
          <div className="filter-group">
            <h4>Sort By</h4>
            <RadioSwitch
              switch1={{ id: 1, name: "sort", checked: true, label: "Closest" }}
              switch2={{
                id: 2,
                name: "sort",
                checked: false,
                label: "Furthest",
              }}
            />
          </div>
          <div className="filter-group">
            <h4>Neighborhoods</h4>
            <Checkbox>Central Business District</Checkbox>
            <Checkbox>Fruitvale</Checkbox>
            <Checkbox>Middle East Oakland</Checkbox>
          </div>
          <footer className="submit-container">
            <Button onClick={() => setIsFilterModalOpen(false)}>
              Apply Filters
            </Button>
          </footer>
        </FilterBody>
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
  display: block;
  padding: ${({ theme }) => theme.spacings(3)};
  margin-bottom: ${({ theme }) => theme.spacings(5)};

  h4 {
    text-decoration: underline;
  }
`;

const FilterBody = styled.section`
  padding: ${({ theme }) => `${theme.spacings(5)} ${theme.spacings(5)}`};

  .filter-group {
    margin-bottom: ${({ theme }) => theme.spacings(5)};
  }

  .submit-container {
    display: flex;
    justify-content: center;
    margin-top: ${({ theme }) => theme.spacings(10)};
  }

  ${({ theme }) => theme.breakpoints.sm`
    .checkbox {
      width: 100%;
    }
  `}
`;
