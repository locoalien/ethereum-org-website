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
    emoji: ":bookmark_tabs:",
    title: <Translation id="page-blockchain-scalable" />,
    description: <Translation id="page-blockchain-scalable-desc" />,
  },
  {
    emoji: ":desktop_computer:",
    title: <Translation id="page-blockchain-secure" />,
    description: <Translation id="page-blockchain-secure-desc" />,
  },
  {
    emoji: ":money_bag:",
    title: <Translation id="page-blockchain-index-staking-sustainability" />,
    description: <Translation id="page-blockchain-sustainable-desc" />,
  },
]

const Eth2IndexPage = ({ data }) => {
  const intl = useIntl()

  const heroContent = {
    title: translateMessageId("page-blockchain-upgrades", intl),
    header: translateMessageId("page-blockchain-upgrading", intl),
    subtitle: translateMessageId("page-blockchain-upgrade-desc", intl),
    image: data.merge.childImageSharp.fluid,
    alt: translateMessageId("page-dapps-doge-img-alt", intl),
    buttons: [
      {
        content: translateMessageId("page-blockchain-quienes-somos", intl),
        path: "/que-es-newinntech/",
      },
      {
        content: translateMessageId("page-blockchain-blockchain-quees", intl),
        path: "/blockchain/",
      },
    ],
  }

  const upgrades = [
    {
      image: data.beaconchain.childImageSharp.fixed,
      title: <Translation id="page-blockchain-beacon-chain-title" />,
      description: <Translation id="page-blockchain-beacon-chain-desc" />,
      to: "/eth2/beacon-chain/",
    },
    {
      image: data.themerge.childImageSharp.fixed,
      title: <Translation id="page-blockchain-docking" />,
      description: <Translation id="page-blockchain-docking-desc" />,
      to: "/eth2/merge/",
    },
    {
      image: data.shards.childImageSharp.fixed,
      title: <Translation id="page-blockchain-shard-title" />,
      description: <Translation id="page-blockchain-shard-desc" />,
      to: "/eth2/shard-chains/",
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-blockchain-meta-title", intl)}
        description={translateMessageId("page-blockchain-meta-desc", intl)}
      />
      <StyledBannerNotification shouldShow>
        <StyledEmoji text=":electric_light_bulb:" />
        <div>
          <b>Latest:</b> Desarrolla con nosotros, soluciones Blockchain
          <Link to="https://www.newinntech.com/">Obtén mas Información.</Link>
        </div>
      </StyledBannerNotification>
      <PageHero content={heroContent} />
      <Divider />
      <Content>
        <Row>
          <GhostCard>
            <H2>
              <Translation id="page-blockchain-whats-eth2" />
            </H2>
            <Translation id="page-blockchain-whats-eth2-desc" />
          </GhostCard>
          <StyledInfoBanner isWarning={true}>
            <H2>
              <Translation id="page-blockchain-what-to-do" />
            </H2>
            <Translation id="page-blockchain-what-to-do-desc" /> <br />
          </StyledInfoBanner>
        </Row>
        <Vision>
          <H2>
            <Translation id="page-blockchain-vision" />
            <Emoji ml={`0.5rem`} text=":sparkles:" />
          </H2>
          <p>
            <Translation id="page-blockchain-vision-desc" />
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
        title={translateMessageId("page-blockchain-dive", intl)}
        description={translateMessageId("page-blockchain-dive-desc", intl)}
      >
        <div></div>
      </StyledCallout>
      <Content>
        <H2>
          <Translation id="page-blockchain-the-upgrades" />
        </H2>
        <p>
          <Translation id="page-blockchain-the-upgrades-desc" />
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
          <Translation id="page-blockchain-index-staking" />
        </H2>
        <StakingColumns>
          <StakingLeftColumn>
            <p>
              <Translation id="page-blockchain-index-staking-desc" />
            </p>
            <h3>
              <Translation id="page-blockchain-index-staking-step-1" />
            </h3>
            <p>
              <Translation id="page-blockchain-index-staking-step-1-desc" />
            </p>
          </StakingLeftColumn>
          <StakingRightColumn>
            <StakingCard
              emoji=":office:"
              title={translateMessageId(
                "page-blockchain-index-staking-learn",
                intl
              )}
              description={translateMessageId(
                "page-blockchain-index-staking-learn-desc",
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
    oldship: file(relativePath: { eq: "blockchain2.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    rhino: file(relativePath: { eq: "eth2/tecnologiasblock.png" }) {
      childImageSharp {
        fluid(maxWidth: 320) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    merge: file(relativePath: { eq: "blockchain/blockchain.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    beaconchain: file(relativePath: { eq: "eth2/smartcontract.png" }) {
      childImageSharp {
        fixed(width: 420) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    shards: file(relativePath: { eq: "eth2/learnblockchain.png" }) {
      childImageSharp {
        fixed(width: 420) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    themerge: file(relativePath: { eq: "eth2/tradingbot.png" }) {
      childImageSharp {
        fixed(width: 420) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
