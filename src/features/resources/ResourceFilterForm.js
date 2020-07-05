import React from "react";
import styled from "styled-components";
import { Checkbox } from "components/Checkbox";
import { RadioSwitch } from "components/Radio";
import { Button } from "components/Button";

const neighborhoods = [
  "Central Business District",
  "Fruitvale",
  "Middle East Oakland",
];

export const ResourceFilterForm = ({ onComplete, filters, setFilters }) => {
  const onChangeNeighborhood = (neighborhood, checked) => {
    if (checked) {
      setFilters({
        ...filters,
        neighborhoods: filters.neighborhoods.filter((n) => n !== neighborhood),
      });
    } else {
      setFilters({
        ...filters,
        neighborhoods: [...filters.neighborhoods, neighborhood],
      });
    }
  };

  return (
    <FilterBody>
      {/* <div className="filter-group">
        <h4>Sort By</h4>
        <RadioSwitch
          selected="Alphabetical"
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
      </div> */}
      <div className="filter-group">
        <h4>Neighborhoods</h4>
        {neighborhoods.map((n) => {
          const checked = filters.neighborhoods.includes(n);
          return (
            <Checkbox
              key={n}
              checked={checked}
              onChange={() => onChangeNeighborhood(n, checked)}
            >
              {n}
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
