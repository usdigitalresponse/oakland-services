import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import { ListLoader } from "components/Loader";
import { Heading, Heading4, Heading5, Text } from "components/Text";
import { useQueryParams } from "utils/useQueryParams";

// Remove later
import JSONFormatter from "json-formatter-js";

const sortData = (d) => {
  const orderedData = {};
  Object.keys(d)
    .sort()
    .forEach((key) => {
      orderedData[key] = d[key];
    });
  return orderedData;
};

export const ResourcePage = () => {
  const { resourceId } = useParams();
  const { debug } = useQueryParams();
  const { t } = useTranslation();
  const { data } = useSWR(`/api/resources/${resourceId}`);
  const dataEl = useRef(null);

  useEffect(() => {
    if (data && dataEl && debug) {
      const formatter = new JSONFormatter(
        {
          ...sortData(data),
          data: sortData(data.data),
        },
        Infinity,
        {
          animateOpen: false,
          animateClose: false,
        }
      );
      dataEl.current.appendChild(formatter.render());
    }
  }, [data, dataEl, debug]);

  return (
    <section>
      <HeaderContainer>
        <Heading>{!!data && data.name}</Heading>
      </HeaderContainer>
      {!data ? (
        <ListLoader />
      ) : (
        <Resource>
          <div className="resource-provider-information">
            {!!data.phone_number && (
              <div>
                <Heading5>{t("resource.phoneNumber")}</Heading5>
                <Text>
                  <a href={`tel:${data.phone_number}`}>{data.phone_number}</a>
                </Text>
              </div>
            )}
            {!!data.data.contact__0__email && (
              <div>
                <Heading5>{t("resource.email")}</Heading5>
                <Text>
                  <a href={`mailto:${data.data.contact__0__email}`}>{data.data.contact__0__email}</a>
                </Text>
              </div>
            )}
            {!!data.website && (
              <div>
                <Heading5>{t("resource.website")}</Heading5>
                <Text>
                  <a href={data.website}>{data.website}</a>
                </Text>
              </div>
            )}
            {!!data.address && (
              <div>
                <Heading5>{t("resource.address")}</Heading5>
                <Text>{data.data.locations__0__physical_address__0__address1}, {data.data.locations__0__physical_address__0__city}, {data.data.locations__0__physical_address__0__state_province}</Text>
              </div>
            )}
          </div>
          <Text
            className="resource-description"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
          <div className="resource-program-information">
            {!!data.application && (
              <div>
                <Heading5>{t("resource.application")}</Heading5>
                <Text>{data.application}</Text>
              </div>
            )}
            {!!data.eligibility && (
              <div className="resource-highlight">
                <Heading5>{t("resource.eligibility")}</Heading5>
                <Text>{data.eligibility}</Text>
              </div>
            )}
            {!!data.organization && (
              <div>
                <Heading5>{t("resource.provider")}</Heading5>
                <Text>{data.organization}</Text>
              </div>
            )}
            {!!data.data.fee__fee && (
              <div>
                <Heading5>{t("resource.fee")}</Heading5>
                <Text>{data.fee}</Text>
              </div>
            )}
            {!!data.languages && (
              <div>
                <Heading5>{t("resource.languages")}</Heading5>
                <Text>{data.languages}</Text>
              </div>
            )}
          </div>
          <div className="resource-updated">
            {!!data.updated_at && (
              <Text>
                {t("resource.lastUpdated")}:{" "}
                {new Date(data.updated_at).toDateString()}
              </Text>
            )}
          </div>
          {!!debug && <pre ref={dataEl} />}
        </Resource>
      )}
    </section>
  );
};

export const HeaderContainer = styled.section`
  margin: ${({ theme }) => `${theme.spacings(4)} 0`};
`;

const Resource = styled.section`
  .resource-description {
    margin: ${({ theme }) => `0 0 ${theme.spacings(5)}`};
  }
  .resource-provider-information,
  .resource-program-information {
    margin-bottom: ${({ theme }) => theme.spacings(5)};
  }
  .resource-highlight {
    background: ${({ theme }) => theme.colors.secondaryLighter};
    border-radius: 4px;
    padding: ${({ theme }) => theme.spacings(1)};
    margin: ${({ theme }) => theme.spacings(-1)};
  }
  .resource-updated {
    text-align: center;
    font-style: italic;
    margin: ${({ theme }) => `${theme.spacings(5)} 0`};
  }
  h4 {
    text-decoration: underline;
    margin-bottom: ${({ theme }) => theme.spacings(3)};
  }
  p {
    overflow-wrap: anywhere;
  }
  a {
    color: ${({ theme }) => theme.colors.primary};
  }
  pre {
    margin-bottom: 20px;
  }
`;
