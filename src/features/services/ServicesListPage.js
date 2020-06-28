import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BackButton } from "components/Button";

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
  return (
    <section>
      <ServicesHeader>
        <BackButton />
      </ServicesHeader>
      {services.map((s) => (
        <ServiceLink key={s.id} to={`/service/${s.id}`}>
          <h4>{s.title}</h4>
          <p>{s.address}</p>
          <p>{s.hours}</p>
          <p>{s.description}</p>
        </ServiceLink>
      ))}
    </section>
  );
};

const ServicesHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.spacings(5)};
`;

const ServiceLink = styled(Link)``;
