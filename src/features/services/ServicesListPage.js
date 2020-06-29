import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button, ButtonOutlined } from "components/Button";
import { Modal } from "components/Modal";

const services = [
  {
    id: 0,
    title: "Shelter 1",
    address: "100 Pine Street",
    hours: "8:00am - 6:00pm",
    description:
      "Provides emergency transitional housing to clean and sober females with or without small children that are small enough to sleep with mother",
  },
  {
    id: 1,
    title: "Shelter 2",
    address: "100 Pine Street",
    hours: "8:00am - 6:00pm",
    description:
      "Provides emergency transitional housing to clean and sober females with or without small children that are small enough to sleep with mother",
  },
];

export const ServicesListPage = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <section>
      <ServicesHeader>
        <ButtonOutlined onClick={() => setIsFilterModalOpen(true)}>
          Filters
        </ButtonOutlined>
      </ServicesHeader>
      {services.map((s) => (
        <ServiceLink key={s.id} to={`/service/${s.id}`}>
          <h4>{s.title}</h4>
          <p>{s.address}</p>
          <p>{s.hours}</p>
          <p>{s.description}</p>
        </ServiceLink>
      ))}
      <Modal
        open={isFilterModalOpen}
        onRequestClose={() => setIsFilterModalOpen(false)}
        maxWidth={600}
        closeButton
      >
        <h4>Sort By</h4>
        <Button>Open Now</Button>
        <h4>Neighborhoods</h4>
      </Modal>
    </section>
  );
};

const ServicesHeader = styled.header`
  padding: ${({ theme }) => theme.spacings(5)};
  background-color: ${({ theme }) => theme.colors.lightGrey};
  margin: ${({ theme }) => `0 ${theme.spacings(-5)}`};

  button {
    background: #fff;
    padding: ${({ theme }) => `${theme.spacings(2)} ${theme.spacings(3)}`};
  }
`;

const ServiceLink = styled(Link)``;
