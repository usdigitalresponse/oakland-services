import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import { BackButton } from "components/Button";
import { ListLoader } from "components/Loader";
import { Header } from "./components/Header";

export const ResourcePage = () => {
  const { resourceId } = useParams();
  const { t } = useTranslation();
  const { data } = useSWR(`/api/resources/${resourceId}`);

  return (
    <section>
      <Header>
        <BackButton withIcon />
        {!!data && data.name}
      </Header>
      {!data ? (
        <ListLoader />
      ) : (
        <Resource>
          <div className="resource-header">
            {!!data.updated_at && (
              <p>
                <strong>{t("resource.last_updated")}:</strong>{" "}
                {new Date(data.updated_at).toDateString()}
              </p>
            )}
            {!!data.subcategories && (
              <p>
                <strong>{t("resource.categories")}:</strong>{" "}
                {data.subcategories.join(", ")}
              </p>
            )}
            {!!data.organization && (
              <p>
                <strong>{t("resource.provider")}:</strong> {data.organization}
              </p>
            )}
            {!!data.website && (
              <p>
                <strong>{t("resource.website")}:</strong>{" "}
                <a href={data.website}>{data.website}</a>
              </p>
            )}
            {!!data.address && (
              <p>
                <strong>{t("resource.address")}:</strong> {data.address}
              </p>
            )}
            {!!data.phone_number && (
              <p>
                <strong>{t("resource.phone_number")}:</strong>{" "}
                <a href={`tel:${data.phone_number}`}>{data.phone_number}</a>
              </p>
            )}
            {!!data.email && (
              <p>
                <strong>{t("resource.email")}:</strong>{" "}
                <a href={`mailto:${data.email}`}>{data.email}</a>
              </p>
            )}
          </div>
          <div className="resource-description">
            <h4>{t("resource.description")}</h4>
            <p>{data.description}</p>
          </div>
          <div className="resource-program-information">
            <h4>{t("resource.program_information")}</h4>
            {!!data.application && (
              <p>
                <strong>{t("resource.application")}:</strong> {data.application}
              </p>
            )}
            {!!data.eligibility && (
              <p>
                <strong>{t("resource.eligibility")}:</strong> {data.eligibility}
              </p>
            )}
            {!!data.fee && (
              <p>
                <strong>{t("resource.fee")}:</strong> {data.fee}
              </p>
            )}
            {!!data.languages && (
              <p>
                <strong>{t("resource.languages")}:</strong> {data.languages}
              </p>
            )}
          </div>
        </Resource>
      )}
    </section>
  );
};

const Resource = styled.section`
  .resource-header,
  .resource-description,
  .resource-program-information {
    margin-bottom: ${({ theme }) => theme.spacings(8)};
  }
  p {
    overflow-wrap: anywhere;
    line-height: 1.6;
  }
  a {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
