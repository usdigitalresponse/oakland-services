import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import { Checkbox } from "components/Checkbox";
import { RadioSwitch } from "components/Radio";
import { Button } from "components/Button";
import { Heading } from "components/Text";
import { ApplyFiltersButton } from "components/Button";

export const ResourceFilterForm = ({ onComplete, filters, setFilters }) => {
  const { data } = useSWR("/api/cities");

  const onChangeCity = (city, checked) => {
    if (checked) {
      setFilters({
        ...filters,
        cities: filters.cities.filter((n) => n !== city.id),
      });
    } else {
      setFilters({
        ...filters,
        cities: [...filters.cities, city.id],
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
    if (filters.cities.length) {
      setFilters({
        ...filters,
        cities: [],
      });
    } else {
      setFilters({
        ...filters,
        cities: [...data.map((n) => n.id)],
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
          Cities{" "}
          <Button variant="link" onClick={onToggleNeighborhoodSelectAll}>
            {filters.cities.length ? "Select none" : "Select all"}
          </Button>
        </h4>
        {data &&
          data.map((n) => {
            const checked = filters.cities.includes(n.id);
            return (
              <Checkbox
                key={n.id}
                id={`n-${n.id}`}
                checked={checked}
                onChange={() => onChangeCity(n, checked)}
              >
                {n.name}
              </Checkbox>
            );
          })}
      </div>
      <footer className="submit-container">
        <ApplyFiltersButton onClick={onComplete}>Apply Filters</ApplyFiltersButton>
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
      font-size: 1rem;
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
    font-size: 1.1rem;
    margin-top: ${({ theme }) => theme.spacings(10)};
  }

  ${({ theme }) => theme.breakpoints.sm`
    .checkbox {
      width: 100%;
    }
  `}
`;
