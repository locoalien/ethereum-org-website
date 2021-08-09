import React from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import { translateMessageId } from "../utils/translations"
import Translation from "../components/Translation"
import CardList from "../components/CardList"
import EthExchanges from "../components/EthExchanges"
import EthPriceCard from "../components/EthPriceCard"
import InfoBanner from "../components/InfoBanner"
import Link from "../components/Link"
import ButtonLink from "../components/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import CalloutBanner from "../components/CalloutBanner"
import {
  Content,
  Divider,
  LeftColumn,
  Page,
  RightColumn,
  StyledCard,
  TwoColumnContent,
} from "../components/SharedStyledComponents"

const Title = styled.h1`
  font-weight: normal;
  font-size: 3rem;
  line-height: 140%;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 2rem;
  }
`

const Subtitle = styled.div`
  font-size: 20px;
  line-height: 140%;
  text-align: center;
  color: ${(props) => props.theme.colors.text200};
`

const SubtitleTwo = styled.div`
  font-size: 20px;
  line-height: 140%;
  margin-bottom: 2rem;
  text-align: center;
  color: ${(props) => props.theme.colors.text300};
`

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    max-width: 100vw;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column-reverse;
    margin-bottom: 0rem;
  }
`

const Hero = styled(Img)`
  position: absolute !important;
  z-index: -1;
  width: 100%;
  max-width: 1440px;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    max-width: 100vw;
  }
  min-height: 300px;
  max-height: 400px;
  background-size: cover;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 2rem;
  }
`

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0rem 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 1rem;
  }
`

const WalletImage = styled(Img)`
  align-self: center;
  width: 50%;
  max-width: 600px;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 60%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    width: 100%;
  }
`

const WalletLeftColumn = styled(LeftColumn)`
  display: flex;
  flex-direction: column;
`

const GradientContainer = styled.div`
  background: radial-gradient(
    46.28% 66.31% at 66.95% 58.35%,
    rgba(127, 127, 213, 0.2) 0%,
    rgba(134, 168, 231, 0.2) 50%,
    rgba(145, 234, 228, 0.2) 100%
  );
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem 4rem;
  padding: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding: 4rem 2rem;
  }
`

const CodeBox = styled.div`
  display: flex;
  justify-content: space-between;
  background: #191919;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
  }
`

const StyledEthPriceCard = styled(EthPriceCard)`
  margin-bottom: 2rem;
`

const Code = styled.p`
  font-family: monospace;
  color: #ffffff;
  margin-bottom: 0rem;
`

const CodeLabel = styled.p`
  text-transform: uppercase;
  font-size: 14px;
  color: ${(props) => props.theme.colors.fail300};
  margin-bottom: 0rem;
  margin-right: 1rem;
  margin-left: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0rem;
  }
`

const AllCapsTranslation = styled(Translation)`
  text-transform: uppercase;
`

const GetETHPage = ({ data }) => {
  const intl = useIntl()
  const decentralizedExchanges = [
    {
      title: "Localcryptos.com",
      link: "https://localcryptos.com/",
      image: data.localcryptos.childImageSharp.fixed,
    },
  ].sort((a, b) => a.title.localeCompare(b.title))

  const tokenSwaps = [
    {
      title: "Tensorflow",
      link: "https://www.tensorflow.org",
      image: data.tensorflow.childImageSharp.fixed,
    },
    {
      title: "Keras",
      link: "https://keras.io/",
      image: data.keras.childImageSharp.fixed,
    },
    {
      title: "scikit-learn",
      link: "https://scikit-learn.org/",
      image: data.learn.childImageSharp.fixed,
    },
    {
      title: "YoLo",
      link: "https://pjreddie.com/darknet/yolo/",
      image: data.yolo.childImageSharp.fixed,
    },
    {
      title: "Python",
      link: "https://www.python.org/",
      image: data.python.childImageSharp.fixed,
    },
    {
      title: "NodeJS",
      link: "https://nodejs.org/es/",
      image: data.nodejs.childImageSharp.fixed,
    },
  ].sort((a, b) => a.title.localeCompare(b.title))

  const safetyArticles = [
    {
      title: "Protecting yourself and your funds",
      link:
        "https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds",
      description: "MyCrypto",
    },
    {
      title: "The keys to keeping your crypto safe",
      link:
        "https://blog.coinbase.com/the-keys-to-keeping-your-crypto-safe-96d497cce6cf",
      description: "Coinbase blog",
    },
    {
      title: "How to store digital assets on Ethereum",
      link:
        "https://media.consensys.net/how-to-store-digital-assets-on-ethereum-a2bfdcf66bd0",
      description: "ConsenSys",
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-get-ai-meta-title", intl)}
        description={translateMessageId("page-get-ai-meta-description", intl)}
      />

      <HeroContainer>
        <Hero
          fluid={data.hero.childImageSharp.fluid}
          alt={translateMessageId("page-get-ai-hero-image-alt", intl)}
          loading="eager"
        />
        <Header>
          <h1>
            <Translation id="page-get-ai-where-to-buy-title" />
          </h1>
          <Subtitle>
            <Translation id="page-get-ai-where-to-buy-desc" />
          </Subtitle>
          <SubtitleTwo>
            <Translation id="page-get-ai-where-to-buy-desc-2" />
          </SubtitleTwo>

          <ButtonLink to="/ai/">
            <Translation id="page-get-ai-search-by-saber" />
          </ButtonLink>
        </Header>
      </HeroContainer>
      <CardContainer>
        <StyledCard
          emoji=":construction:"
          title={translateMessageId("page-get-ai-cex", intl)}
          description={translateMessageId("page-get-ai-cex-desc", intl)}
        />
        <StyledCard
          emoji=":rocket:"
          title={translateMessageId("page-get-ai-dex", intl)}
          description={translateMessageId("page-get-ai-dex-desc", intl)}
        ></StyledCard>
        <StyledCard
          emoji=":building_construction:"
          title={translateMessageId("page-get-ai-wallets", intl)}
          description={translateMessageId(
            "page-get-ai-wallets-purchasing",
            intl
          )}
        ></StyledCard>
      </CardContainer>

      <Content id="dex">
        <h2>
          <Translation id="page-get-ai-dexs" />
        </h2>
      </Content>
      <TwoColumnContent>
        <LeftColumn>
          <h3>
            <Translation id="page-get-ai-what-are-DEX's" />
          </h3>
          <p>
            <Translation id="page-get-ai-dexs-desc" />
          </p>
          <p>
            <Translation id="page-get-ai-dexs-desc-2" />{" "}
          </p>
          <p>
            <Translation id="page-get-ai-dexs-desc-3" />
          </p>
          <ButtonLink to="/ai/">
            <Translation id="page-get-ai-get-wallet-btn" />
          </ButtonLink>
        </LeftColumn>
        <RightColumn>
          <h3>
            <Translation id="page-get-ai-other-cryptos" />
          </h3>
          <p>
            <Translation id="page-get-ai-swapping" />
          </p>
          <CardList content={tokenSwaps} />
          <InfoBanner isWarning={true}>
            <Translation id="page-get-ai-warning" />
          </InfoBanner>
        </RightColumn>
      </TwoColumnContent>
    </Page>
  )
}

export default GetETHPage

export const listItemImage = graphql`
  fragment listItemImage on File {
    childImageSharp {
      fixed(width: 20) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "ai_banner10.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    wallet: file(relativePath: { eq: "wallet.png" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    dapps: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    localcryptos: file(relativePath: { eq: "exchanges/localcryptos.png" }) {
      ...listItemImage
    }
    nodejs: file(relativePath: { eq: "ai/nodejs.png" }) {
      ...listItemImage
    }
    matcha: file(relativePath: { eq: "exchanges/matcha.png" }) {
      ...listItemImage
    }
    yolo: file(relativePath: { eq: "ai/yolo.png" }) {
      ...listItemImage
    }
    python: file(relativePath: { eq: "ai/python.png" }) {
      ...listItemImage
    }
    tensorflow: file(relativePath: { eq: "ai/tensorflow.png" }) {
      ...listItemImage
    }
    keras: file(relativePath: { eq: "ai/keras.png" }) {
      ...listItemImage
    }
    learn: file(relativePath: { eq: "ai/learn.png" }) {
      ...listItemImage
    }
  }
`
