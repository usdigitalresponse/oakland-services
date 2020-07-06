import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import { Checkbox } from "components/Checkbox";
import { RadioSwitch } from "components/Radio";
import { Button } from "components/Button";

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

  return (
    <FilterBody>
      <div className="filter-group">
        <h4>Sort By</h4>
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
        <h4>Neighborhoods</h4>
        {data &&
          data.map((n) => {
            const checked = filters.neighborhoods.includes(n.id);
            return (
              <Checkbox
                key={n.id}
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
