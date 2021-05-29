import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import ButtonLink from "../../components/ButtonLink"
import Card from "../../components/Card"
import ActionCard from "../../components/ActionCard"
import CalloutBanner from "../../components/CalloutBanner"
import Emoji from "../../components/Emoji"
import Eth2Articles from "../../components/Eth2Articles"
import ExpandableCard from "../../components/ExpandableCard"
import GhostCard from "../../components/GhostCard"
import InfoBanner from "../../components/InfoBanner"
import Link from "../../components/Link"
import PageMetadata from "../../components/PageMetadata"
import BannerNotification from "../../components/BannerNotification"
import Translation from "../../components/Translation"
import PageHero from "../../components/PageHero"
import {
  CardContainer,
  Content,
  Page,
  Divider,
} from "../../components/SharedStyledComponents"
import { translateMessageId } from "../../utils/translations"

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const H2 = styled.h2`
  text-align: left;
  margin-top: 0;
  margin-bottom: 1rem;
`

const CentreCard = styled(Card)`
  flex: 1 1 30%;
  min-width: 240px;
  margin: 1rem;
  padding: 1.5rem;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }
`

const StyledCardContainer = styled(CardContainer)`
  margin-top: 2rem;
  margin-bottom: 3rem;
`

const StyledCard = styled(Card)`
  flex: 1 1 30%;
  min-width: 240px;
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  margin: 1rem;
  padding: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }

  &:hover {
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background: ${(props) => props.theme.colors.tableBackgroundHover};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const Disclaimer = styled.div`
  margin: 0rem 12rem;
  display: flex;
  text-align: center;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0rem 2rem;
  }
`

const StyledInfoBanner = styled(InfoBanner)`
  margin-left: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 2rem 0;
  }
`

const Vision = styled.div`
  margin-top: 4rem;
`

const ContributeCard = styled.div`
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0rem 3rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-left: 0rem;
    margin-right: 0rem;
    flex-direction: column;
    align-items: flex-start;
  }
`

const StyledCallout = styled(CalloutBanner)`
  margin-left: 0rem;
  margin-right: 0rem;
`

const ContributeButton = styled(ButtonLink)`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    margin-top: 1.5rem;
  }
`

const Staking = styled.div`
  padding: 4rem;
  background: ${(props) => props.theme.colors.cardGradient};
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 2rem;
  }
`

const StakingColumns = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const CenterH2 = styled(H2)`
  text-align: center;
`

const StakingLeftColumn = styled.div``

const StakingRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0rem 2rem;
  margin-left: 8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    align-items: flex-start;
    flex-direction: column-reverse;
    margin: 0rem;
    margin-top: 2rem;
  }
`

const StakingCard = styled(StyledCard)`
  margin: 0;
`

const StakingImage = styled(Img)`
  margin: 3rem 0;
  align-self: center;
  width: 100%;
  max-width: 320px;
`

const LeftColumn = styled.div`
  width: 100%;
`

const RightColumn = styled.div`
  width: 100%;
  margin-left: 2rem;
  flex-direction: column;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-left: 0rem;
    flex-direction: column;
  }
`

const Faq = styled.div`
  display: flex;
  margin-top: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const ResearchContainer = styled.div`
  margin-top: 2rem;
`

const StyledBannerNotification = styled(BannerNotification)`
  display: flex;
  justify-content: center;
`

const StyledEmoji = styled(Emoji)`
  margin-right: 1rem;
  flex-shrink: 0;
`

const paths = [
  {
    emoji: ":robot:",
    title: <Translation id="page-iot-scalable" />,
    description: <Translation id="page-iot-scalable-desc" />,
  },
  {
    emoji: ":brain:",
    title: <Translation id="page-iot-secure" />,
    description: <Translation id="page-iot-secure-desc" />,
  },
  {
    emoji: ":doughnut:",
    title: <Translation id="page-iot-index-staking-sustainability" />,
    description: <Translation id="page-iot-sustainable-desc" />,
  },
]

const Eth2IndexPage = ({ data }) => {
  const intl = useIntl()

  const heroContent = {
    title: translateMessageId("page-iot-upgrades", intl),
    header: translateMessageId("page-iot-upgrading", intl),
    subtitle: translateMessageId("page-iot-upgrade-desc", intl),
    image: data.merge.childImageSharp.fluid,
    alt: translateMessageId("page-dapps-doge-img-alt", intl),
    buttons: [
      {
        content: translateMessageId("page-iot-whats-ethereum", intl),
        path: "/que-es-newinntech/",
      },
    ],
  }

  const upgrades = [
    {
      image: data.beaconchain.childImageSharp.fixed,
      title: <Translation id="page-iot-beacon-chain-title" />,
      description: <Translation id="page-iot-beacon-chain-desc" />,
      to: "/eth2/beacon-chain/",
    },
    {
      image: data.themerge.childImageSharp.fixed,
      title: <Translation id="page-iot-docking" />,
      description: <Translation id="page-iot-docking-desc" />,
      to: "/eth2/merge/",
    },
    {
      image: data.shards.childImageSharp.fixed,
      title: <Translation id="page-iot-shard-title" />,
      description: <Translation id="page-iot-shard-desc" />,
      to: "/eth2/shard-chains/",
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-iot-meta-title", intl)}
        description={translateMessageId("page-iot-meta-desc", intl)}
      />
      <StyledBannerNotification shouldShow>
        <StyledEmoji text=":electric_light_bulb:" />
        <div>
          <b>Latest:</b> Desarrolla con nosotros, soluciones IOT
          <Link to="https://www.newinntech.com/">
            Informacion especifica sobre productos desarrollados.
          </Link>
        </div>
      </StyledBannerNotification>
      <PageHero content={heroContent} />
      <Divider />
      <Content>
        <Row>
          <GhostCard>
            <H2>
              <Translation id="page-iot-whats-eth2" />
            </H2>
            <Translation id="page-iot-whats-eth2-desc" />
          </GhostCard>
          <StyledInfoBanner isWarning={true}>
            <H2>
              <Translation id="page-iot-what-to-do" />
            </H2>
            <Translation id="page-iot-what-to-do-desc" /> <br />
          </StyledInfoBanner>
        </Row>
        <Vision>
          <H2>
            <Translation id="page-iot-vision" />
            <Emoji ml={`0.5rem`} text=":sparkles:" />
          </H2>
          <p>
            <Translation id="page-iot-vision-desc" />
          </p>
          <CardContainer>
            {paths.map((path, idx) => (
              <CentreCard
                key={idx}
                emoji={path.emoji}
                title={path.title}
                description={path.description}
              />
            ))}
          </CardContainer>
        </Vision>
      </Content>
      <StyledCallout
        image={data.oldship.childImageSharp.fluid}
        alt={translateMessageId("page-eth-whats-eth-hero-alt", intl)}
        title={translateMessageId("page-iot-dive", intl)}
        description={translateMessageId("page-iot-dive-desc", intl)}
      >
        <div></div>
      </StyledCallout>
      <Content>
        <H2>
          <Translation id="page-iot-the-upgrades" />
        </H2>
        <p>
          <Translation id="page-iot-the-upgrades-desc" />
        </p>
        <StyledCardContainer>
          {upgrades.map((upgrade, idx) => (
            <ActionCard
              isRight
              key={idx}
              image={upgrade.image}
              title={upgrade.title}
              description={upgrade.description}
              to={upgrade.to}
            >
              <h6>{upgrade.date}</h6>
            </ActionCard>
          ))}
        </StyledCardContainer>
      </Content>
      {/* TODO: Upgrade existing Eth2Diagram with new plan, then reinstate here */}
      <Staking>
        <H2>
          <Translation id="page-iot-index-staking" />
        </H2>
        <StakingColumns>
          <StakingLeftColumn>
            <p>
              <Translation id="page-iot-index-staking-desc" />
            </p>
            <h3>
              <Translation id="page-iot-index-staking-step-1" />
            </h3>
            <p>
              <Translation id="page-iot-index-staking-step-1-desc" />
            </p>
            <h3>
              <Translation id="page-iot-index-staking-step-2" />
            </h3>
            <p>
              <Translation id="page-iot-index-staking-step-2-desc" />
            </p>
          </StakingLeftColumn>
          <StakingRightColumn>
            <StakingCard
              emoji=":robot:"
              title={translateMessageId("page-iot-index-staking-learn", intl)}
              description={translateMessageId(
                "page-iot-index-staking-learn-desc",
                intl
              )}
            ></StakingCard>
            <StakingImage fluid={data.rhino.childImageSharp.fluid} />
          </StakingRightColumn>
        </StakingColumns>
      </Staking>
    </Page>
  )
}

export default Eth2IndexPage

export const query = graphql`
  query {
    oldship: file(relativePath: { eq: "iot2.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    rhino: file(relativePath: { eq: "eth2/ai-frameworks3.png" }) {
      childImageSharp {
        fluid(maxWidth: 320) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    merge: file(relativePath: { eq: "iot/iot.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    beaconchain: file(relativePath: { eq: "eth2/platform-iot.png" }) {
      childImageSharp {
        fixed(width: 420) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    shards: file(relativePath: { eq: "eth2/software.png" }) {
      childImageSharp {
        fixed(width: 420) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    themerge: file(relativePath: { eq: "eth2/circuit.png" }) {
      childImageSharp {
        fixed(width: 420) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
