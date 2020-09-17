import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import { Checkbox } from "components/Checkbox";
import { RadioSwitch } from "components/Radio";
import { Button } from "components/Button";
import { Heading } from "components/Text";

export const ResourceFilterForm = ({ onComplete, filters, setFilters }) => {
  const { data } = useSWR("/api/neighborhoods");

  const onChangeNeighborhood = (neighborhood, checked) => {
    if (checked) {
      setFilters({
        ...filters,
        neighborhoods: filters.neighborhoods.filter(
          (n) => n !== neighborhood.id
        ),
      });
    } else {
      setFilters({
        ...filters,
        neighborhoods: [...filters.neighborhoods, neighborhood.id],
      });
    }
  };

  const onChangeOrder = (order) => {
    setFilters({
      ...filters,
      order: order.id,
    });
  };

  const onToggleNeighborhoodSelectAll = () => {
    if (filters.neighborhoods.length) {
      setFilters({
        ...filters,
        neighborhoods: [],
      });
    } else {
      setFilters({
        ...filters,
        neighborhoods: [...data.map((n) => n.id)],
      });
    }
  };

  const onChangeLanguage = (e) => {
    setFilters({
      ...filters,
      language: e.target.value,
    });
  };

  return (
    <FilterBody>
      <Heading>Filters</Heading>
      <div className="filter-group">
        <h4 className="filter-title">Languages Offered</h4>
        <select value={filters.language} onChange={onChangeLanguage}>
          <option value="english">English</option>
          <option value="spanish">Español</option>
        </select>
      </div>
      <div className="filter-group">
        <h4 className="filter-title">Sort By</h4>
        <RadioSwitch
          selected={filters.order}
          setSelected={onChangeOrder}
          switch1={{
            id: 1,
            name: "sort",
            label: "Alphabetical",
          }}
          switch2={{
            id: 2,
            name: "sort",
            label: "Last Updated",
          }}
        />
      </div>
      <div className="filter-group">
        <h4 className="filter-title">
          Neighborhoods{" "}
          <Button variant="link" onClick={onToggleNeighborhoodSelectAll}>
            {filters.neighborhoods.length ? "Select none" : "Select all"}
          </Button>
        </h4>
        {data &&
          data.map((n) => {
            const checked = filters.neighborhoods.includes(n.id);
            return (
              <Checkbox
                key={n.id}
                id={`n-${n.id}`}
                checked={checked}
                onChange={() => onChangeNeighborhood(n, checked)}
              >
                {n.name}
              </Checkbox>
            );
          })}
      </div>
      <footer className="submit-container">
        <Button onClick={onComplete}>Apply Filters</Button>
      </footer>
    </FilterBody>
  );
};

const FilterBody = styled.section`
  padding: ${({ theme }) => `${theme.spacings(5)} ${theme.spacings(5)}`};

  h1 {
    margin-bottom: ${({ theme }) => theme.spacings(5)};
  }

  select {
    width: 100%;
  }

  .filter-group {
    margin-bottom: ${({ theme }) => theme.spacings(5)};
  }

  .filter-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      font-size: 0.8rem;
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  .checkbox {
    margin-right: ${({ theme }) => theme.spacings(2)};
    margin-bottom: ${({ theme }) => theme.spacings(2)};
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
