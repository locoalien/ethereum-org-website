import React, { useState } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import { translateMessageId } from "../../utils/translations"
import Translation from "../../components/Translation"
import Breadcrumbs from "../../components/Breadcrumbs"
import ButtonLink from "../../components/ButtonLink"
import Card from "../../components/Card"
import Emoji from "../../components/Emoji"
import GhostCard from "../../components/GhostCard"
import PageHero from "../../components/PageHero"
import InfoBanner from "../../components/InfoBanner"
import CalloutBanner from "../../components/CalloutBanner"
import Link from "../../components/Link"

import PageMetadata from "../../components/PageMetadata"
import {
  CardContainer,
  Content,
  Page,
  Divider,
} from "../../components/SharedStyledComponents"

const StyledCallout = styled(CalloutBanner)`
  margin-left: 0rem;
  margin-right: 0rem;
`

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const H2 = styled.h2`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  margin-top: 0.5rem;
`

const H3 = styled.h3`
  margin-top: 0rem;
`

const Column = styled.div`
  flex: 1 1 33%;
  margin-bottom: 1.5rem;
  margin-right: 2rem;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-right: 0rem;
    margin-left: 0rem;
  }
`

const StyledCard = styled(Card)`
  flex: 1 1 30%;
  min-width: 240px;
  margin: 1rem;
  padding: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }
`

const BoxText = styled.div`
  font-size: 20px;
`

const Box = styled.div`
  padding: 1.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  margin: 2rem 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin: 2rem 0;
  }
`

const Vision = styled.div`
  margin-top: 4rem;
`

const OptionContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column;
  }
`

const Option = styled.div`
  border-radius: 32px;
  border: 1px solid
    ${(props) =>
      props.isActive ? props.theme.colors.primary : props.theme.colors.text};
  color: ${(props) =>
    props.isActive ? props.theme.colors.primary : props.theme.colors.text};
  box-shadow: ${(props) =>
    props.isActive ? props.theme.colors.tableBoxShadow : `none`};
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  margin: 0.5rem;
  cursor: pointer;
`

const OptionText = styled.div`
  font-size: 24px;
  line-height: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 16px;
    font-weight: 600;
  }
`

const StakeContainer = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.breakpoints.m};
  display: flex;
  flex-direction: column;
  text-align: center;
`

const paths = [
  {
    emoji: ":bar_chart:",
    title: <Translation id="page-arquitectura-staking-title-1" />,
    description: <Translation id="page-arquitectura-staking-desc-1" />,
  },
  {
    emoji: ":pencil2:",
    title: <Translation id="page-arquitectura-staking-title-2" />,
    description: <Translation id="page-arquitectura-staking-desc-2" />,
  },
  {
    emoji: ":blue_book:",
    title: <Translation id="page-arquitectura-staking-title-3" />,
    description: <Translation id="page-arquitectura-staking-desc-3" />,
  },
]

const StakingPage = ({ data, location }) => {
  const intl = useIntl()
  const [isSoloStaking, setIsSoloStaking] = useState(true)

  const heroContent = {
    title: translateMessageId("page-arquitectura-staking-title-4", intl),
    header: translateMessageId("page-arquitectura-staking-header-1", intl),
    subtitle: translateMessageId("page-arquitectura-staking-subtitle", intl),
    image: data.rhino.childImageSharp.fluid,
    alt: translateMessageId("page-arquitectura-staking-image-alt", intl),
    buttons: [
      {
        path: "#stake",
        content: translateMessageId("page-arquitectura-staking-start", intl),
      },
    ],
  }

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-arquitectura-staking-meta-title", intl)}
        description={translateMessageId(
          "page-arquitectura-staking-meta-description",
          intl
        )}
      />
      <PageHero content={heroContent} />
      <Divider />
      <Content>
        <Vision>
          <h2>
            <Translation id="page-arquitectura-just-staking" />
          </h2>
          <p>
            <Translation id="page-arquitectura-staking-description" />{" "}
          </p>
          <CardContainer>
            {paths.map((path, idx) => (
              <StyledCard
                key={idx}
                emoji={path.emoji}
                title={path.title}
                description={path.description}
              >
                {path.url && <Link to={path.url}>{path.link}</Link>}
              </StyledCard>
            ))}
          </CardContainer>
        </Vision>
      </Content>
      <Divider id="stake" />
      <Content>
        <StakeContainer>
          <h2>
            <Translation id="page-arquitectura-staking-how-to-stake" />
          </h2>
          <p>
            <Translation id="page-arquitectura-staking-how-to-stake-desc" />{" "}
          </p>
          <h3>
            <Translation id="page-arquitectura-staking-how-much" />
          </h3>
          <OptionContainer>
            <Option
              isActive={isSoloStaking}
              onClick={() => setIsSoloStaking(true)}
            >
              <Emoji mr={`1rem`} text=":diamonds:" />
              <OptionText>DevSecOps</OptionText>
            </Option>
            <Option
              isActive={!isSoloStaking}
              onClick={() => setIsSoloStaking(false)}
            >
              <Emoji mr={`1rem`} text=":gem:" />
              <OptionText>
                <Translation id="page-arquitectura-staking-less-than" />
              </OptionText>
            </Option>
          </OptionContainer>
        </StakeContainer>
      </Content>
      <Divider />
      <StyledCallout
        image={data.arquitectura2.childImageSharp.fluid}
        alt={translateMessageId("eth2-rhino-img-alt", intl)}
        title={translateMessageId(
          "page-arquitectura-staking-join-community",
          intl
        )}
        description={translateMessageId(
          "page-arquitectura-staking-join-community-desc",
          intl
        )}
      >
        <div>
          <ButtonLink to="mailto:gerencia@newinntech.com">
            <Translation id="page-arquitectura-staking-join" /> Contáctanos
          </ButtonLink>
        </div>
      </StyledCallout>
      <Content>
        <H2>
          <Translation id="page-arquitectura-staking-benefits" />
        </H2>
        <CardContainer>
          <StyledCard
            emoji=":evergreen_tree:"
            title={translateMessageId(
              "page-arquitectura-staking-sustainability",
              intl
            )}
            description={translateMessageId(
              "page-arquitectura-staking-sustainability-desc",
              intl
            )}
          />
          <StyledCard
            emoji=":globe_showing_americas:"
            title={translateMessageId(
              "page-arquitectura-staking-accessibility",
              intl
            )}
            description={translateMessageId(
              "page-arquitectura-staking-accessibility-desc",
              intl
            )}
          />
          <StyledCard
            emoji=":old_key:"
            title={translateMessageId(
              "page-arquitectura-staking-sharding",
              intl
            )}
            description={translateMessageId(
              "page-arquitectura-staking-sharding-desc",
              intl
            )}
          >
            <Link to="/arquitectura/shard-chains/">
              <Translation id="page-arquitectura-staking-more-sharding" />
            </Link>
          </StyledCard>
        </CardContainer>
      </Content>
    </Page>
  )
}

export default StakingPage

export const poolImage = graphql`
  fragment poolImage on File {
    childImageSharp {
      fixed(height: 20) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const query = graphql`
  query {
    rhino: file(relativePath: { eq: "arquitectura/arquitectura.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    arquitectura2: file(
      relativePath: { eq: "arquitectura/arquitectura2.jpeg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    consensys: file(relativePath: { eq: "projects/consensys.png" }) {
      ...poolImage
    }
    ethhub: file(relativePath: { eq: "projects/ethhub.png" }) {
      ...poolImage
    }
    etherscan: file(
      relativePath: { eq: "projects/etherscan-logo-circle.png" }
    ) {
      ...poolImage
    }
  }
`
