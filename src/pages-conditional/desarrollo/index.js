import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { useIntl } from "gatsby-plugin-intl"
import { graphql } from "gatsby"
import { shuffle } from "lodash"

import PageHero from "../../components/PageHero"
import Translation from "../../components/Translation"
import Callout from "../../components/Callout"
import Card from "../../components/Card"
import Link from "../../components/Link"
import ButtonLink from "../../components/ButtonLink"
import PageMetadata from "../../components/PageMetadata"
import HorizontalCard from "../../components/HorizontalCard"
import CardList from "../../components/CardList"
import {
  CardContainer,
  Content,
  Divider,
  GrayContainer,
  Page,
  StyledCard,
  TwoColumnContent,
} from "../../components/SharedStyledComponents"

import { translateMessageId } from "../../utils/translations"

const StyledTwoColumnContent = styled(TwoColumnContent)`
  margin-bottom: -2rem;
  margin-top: 2rem;
`

const LeftColumn = styled.div`
  flex: 0 1 50%;
  margin-right: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    max-width: 100%;
    margin-right: 0;
    margin-top: 0;
  }
`

const RightColumn = styled.div`
  flex: 0 1 50%;
  margin-left: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 3rem;
    max-width: 100%;
    margin-left: 0;
  }
`

const StyledRightColumn = styled(RightColumn)`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 0rem;
  }
`

const StyledGrayContainer = styled(GrayContainer)`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 1rem;
  }
`

const SubtitleTwo = styled.div`
  font-size: 20px;
  line-height: 140%;
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.colors.text300};
`

const SubtitleThree = styled.div`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1.5rem;
  text-align: center;
`

const FindWallet = styled(Img)`
  margin-top: 2rem;
  max-width: 800px;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
`

const Intro = styled(Content)`
  padding-bottom: 0;
  h2 {
    margin-bottom: 0;
  }
`

const IntroTwoColumnContent = styled(TwoColumnContent)`
  margin-bottom: 0;
  padding-bottom: 0;
`

const GradientContainer = styled(GrayContainer)`
  background: linear-gradient(
    49.21deg,
    rgba(127, 127, 213, 0.2) 19.87%,
    rgba(134, 168, 231, 0.2) 58.46%,
    rgba(145, 234, 228, 0.2) 97.05%
  );
  margin: 3rem 0rem;
  width: 100%;
`

const ContainerCard = styled(Card)`
  height: 100%;
  justify-content: flex-start;
`

const CodeBox = styled.div`
  background: #000000;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
`

const Code = styled.p`
  font-family: monospace;
  color: #ffffff;
  margin-bottom: 0rem;
`

const ChecklistItem = styled(HorizontalCard)`
  border: 0px;
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
`

const WalletType = styled(HorizontalCard)`
  min-width: 100%;
  margin: 0.5rem 0rem;
  border-radius: 0px;
  align-items: center;
`

const StyledCallout = styled(Callout)`
  flex: 1 1 424px;
  min-height: 100%;
`

const CentralColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`

const CalloutCardContainer = styled(CardContainer)`
  margin-top: 4rem;
`

const H2 = styled.h2`
  /* margin: 0; */
`

const cards = [
  {
    emoji: ":rocket:",
    title: <Translation id="page-desarrollo-manage-funds" />,
    description: <Translation id="page-desarrollo-manage-funds-desc" />,
  },
  {
    emoji: ":construction:",
    title: <Translation id="page-desarrollo-your-ethereum-account" />,
    description: (
      <Translation id="page-desarrollo-your-ethereum-account-desc" />
    ),
  },
  {
    emoji: ":office:",
    title: <Translation id="page-desarrollo-your-login" />,
    description: <Translation id="page-desarrollo-your-login-desc" />,
  },
]

const types = [
  {
    emoji: ":zap:",
    description: <Translation id="page-desarrollo-cd" />,
  },
  {
    emoji: " :rocket:",
    description: <Translation id="page-desarrollo-mobile" />,
  },
  {
    emoji: ":doughnut:",
    description: <Translation id="page-desarrollo-web-browser" />,
  },
  {
    emoji: ":lollipop:",
    description: <Translation id="page-desarrollo-desktop" />,
  },
]

const articles = [
  {
    title: <Translation id="page-desarrollo-protecting-yourself" />,
    description:
      "Expertos en DevSecOps garantizando el ciclo de vida del Software CI y CD",
    link: "/wallets/devsecops/",
  },
  {
    title: <Translation id="page-desarrollo-keys-to-safety" />,
    description: <Translation id="page-desarrollo-blog" />,
    link: "/que-es-newinntech/",
  },
  {
    title: <Translation id="page-desarrollo-how-to-store" />,
    description:
      "Consultoría en diferentes plataformas. Puedes contratar directamente nuestros expertos para que trabajen tiempo completo para tu organización",
    link: "/",
  },
  {
    title: "Blockchain",
    description:
      "Creamos soluciones en Blockchain, despliegue de Smart Contracts en plataformas Ethereum",
    link: "/blockchain2/",
  },
  {
    title: "Inteligencia artificial (Machine Learning)",
    description:
      "uedes contactar con nosotros, servicios de Machine Learning y creación de modelos personalizados",
    link: "/ai-service/",
  },
  {
    title: "Internet de las cosas (IOT)",
    description:
      "Implementamos Software y diseñamos Hardware a la medida. Extraemos información de cualquier dispositivo hacia la nube o sistemas On-Premise.",
    link: "/iot/",
  },
]

const WalletsPage = ({ data }) => {
  const intl = useIntl()
  const [wallets, setWallets] = useState([])

  useEffect(() => {
    const nodes = data.allWallets.nodes
    // Add fields for CardList
    const randomWallets = shuffle(
      nodes.map((node) => {
        node.image = data[node.id].childImageSharp.fixed
        node.title = node.name
        node.description = translateMessageId(
          `page-find-wallet-description-${node.id}`,
          intl
        )
        node.link = node.url
        return node
      })
    )

    setWallets(randomWallets)
  }, [data, intl])

  const cryptoCurious = wallets
    .filter((wallet) => wallet.frontend === "TRUE")
    .slice(0, 4)

  const cryptoConverted = wallets
    .filter((wallet) => wallet.backend === "TRUE")
    .slice(0, 4)

  const heroContent = {
    title: translateMessageId("page-desarrollo-title", intl),
    header: translateMessageId("page-desarrollo-slogan", intl),
    subtitle: translateMessageId("page-desarrollo-subtitle", intl),
    image: data.hero.childImageSharp.fluid,
    alt: translateMessageId("page-desarrollo-alt", intl),
    buttons: [
      {
        path: "/wallets/find-wallet/",
        content: translateMessageId("page-desarrollo-find-wallet-link", intl),
      },
    ],
  }

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-wallets-meta-title", intl)}
        description={translateMessageId("page-wallets-meta-description", intl)}
        image={data.ogImage.childImageSharp.fixed.src}
      />
      <PageHero content={heroContent} />
      <StyledGrayContainer>
        <Intro>
          <H2>
            <Translation id="page-desarrollo-whats-a-wallet" />
          </H2>
        </Intro>
        <IntroTwoColumnContent>
          <LeftColumn>
            <p>
              <Translation id="page-desarrollo-description" />
            </p>
          </LeftColumn>
        </IntroTwoColumnContent>
        <Content>
          <CardContainer>
            {cards.map((card, idx) => (
              <StyledCard
                key={idx}
                emoji={card.emoji}
                title={card.title}
                description={card.description}
              />
            ))}
          </CardContainer>
        </Content>
      </StyledGrayContainer>
      <StyledTwoColumnContent>
        <LeftColumn>
          <H2>
            <Translation id="page-desarrollo-accounts-addresses" />
          </H2>
          <p>
            <Translation id="page-desarrollo-accounts-addresses-desc" />
          </p>
          <ul>
            <li>
              <p>
                <Translation id="page-desarrollo-account" />
              </p>
            </li>
            <li>
              <p>
                <Translation id="page-desarrollo-accounts-ethereum-addresses" />
              </p>
            </li>
            <li>
              <p>
                <Translation id="page-desarrollo-ethereum-wallet" />
              </p>
            </li>
          </ul>
          <p>
            <Translation id="page-desarrollo-most-wallets" />
          </p>
        </LeftColumn>
        <RightColumn>
          <H2>
            <Translation id="page-desarrollo-types" />
          </H2>
          <div>
            {types.map((type, idx) => (
              <WalletType
                key={idx}
                emoji={type.emoji}
                title={type.title}
                description={type.description}
                size={2.5}
              />
            ))}
          </div>
        </RightColumn>
      </StyledTwoColumnContent>
      <GradientContainer>
        <Content>
          <H2>
            <Translation id="page-desarrollo-get-wallet" />
          </H2>
          <p>
            <Translation id="page-desarrollo-get-wallet-desc" />
          </p>
          <p>
            <em>
              <Translation id="page-desarrollo-get-wallet-desc-2" />
            </em>
          </p>
        </Content>
        <TwoColumnContent>
          <LeftColumn>
            <ContainerCard
              emoji=":sunrise:"
              title={translateMessageId("page-desarrollo-curious", intl)}
              description={translateMessageId(
                "page-desarrollo-curious-desc",
                intl
              )}
            >
              <CardList content={cryptoCurious} />
            </ContainerCard>
          </LeftColumn>
          <RightColumn>
            <ContainerCard
              emoji=":octopus:"
              title={translateMessageId("page-desarrollo-converted", intl)}
              description={translateMessageId(
                "page-desarrollo-converted-desc",
                intl
              )}
            >
              <CardList content={cryptoConverted} />
            </ContainerCard>
          </RightColumn>
        </TwoColumnContent>
      </GradientContainer>
      <TwoColumnContent>
        <LeftColumn>
          <H2>
            <Translation id="page-desarrollo-stay-safe" />
          </H2>
          <SubtitleTwo>
            <Translation id="page-desarrollo-stay-safe-desc" />
          </SubtitleTwo>
          <div>
            <ChecklistItem
              key="0"
              emoji=":white_check_mark:"
              title={translateMessageId(
                "page-desarrollo-take-responsibility",
                intl
              )}
              description={translateMessageId(
                "page-desarrollo-take-responsibility-desc",
                intl
              )}
            />
            <ChecklistItem
              key="1"
              emoji=":white_check_mark:"
              title={translateMessageId("page-desarrollo-seed-phrase", intl)}
              description={translateMessageId(
                "page-desarrollo-seed-phrase-desc",
                intl
              )}
            >
              <p>
                <Translation id="page-desarollo-seed-phrase-example" />
              </p>
              <CodeBox>
                <Code>
                  <Translation id="page-desarrollo-seed-phrase-snippet" />
                </Code>
              </CodeBox>
              <p>
                <Translation id="page-desarrollo-seed-phrase-write-down" />
              </p>
            </ChecklistItem>
          </div>
        </LeftColumn>
        <RightColumn>
          <H2>
            <Translation id="page-desarrollo-tips" />
          </H2>
          <SubtitleTwo>
            <Translation id="page-desarrollo-tips-community" />
          </SubtitleTwo>
          <CardList content={articles} />
        </RightColumn>
      </TwoColumnContent>
    </Page>
  )
}

export default WalletsPage

export const calloutImage = graphql`
  fragment calloutImage on File {
    childImageSharp {
      fixed(height: 200) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const listImage = graphql`
  fragment listImage on File {
    childImageSharp {
      fixed(height: 20) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "wallet.png" }) {
      childImageSharp {
        fluid(maxHeight: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    findWallet: file(relativePath: { eq: "wallets/find-wallet.png" }) {
      childImageSharp {
        fluid(maxWidth: 800, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ogImage: file(relativePath: { eq: "wallet-cropped.png" }) {
      childImageSharp {
        fixed(width: 738) {
          src
        }
      }
    }
    eth: file(relativePath: { eq: "eth-logo.png" }) {
      ...calloutImage
    }
    dapps: file(relativePath: { eq: "doge-computer.png" }) {
      ...calloutImage
    }
    allWallets: allWalletsCsv {
      nodes {
        id
        name
        url
        brand_color
        frontend
        backend
        has_mobile
        has_desktop
        has_web
        has_hardware
        has_card_deposits
        has_explore_dapps
        has_defi_integrations
        has_bank_withdrawals
        has_limits_protection
        has_high_volume_purchases
        has_dex_integrations
        has_multisig
      }
    }
    timestamp: walletsCsv {
      parent {
        ... on File {
          id
          name
          fields {
            gitLogLatestDate
          }
        }
      }
    }

    reactjs: file(relativePath: { eq: "frontend/reactjs.png" }) {
      ...listImage
    }
    angular: file(relativePath: { eq: "frontend/angular.png" }) {
      ...listImage
    }
    remix: file(relativePath: { eq: "frontend/remix.png" }) {
      ...listImage
    }
    vite: file(relativePath: { eq: "frontend/vite.png" }) {
      ...listImage
    }
    nodejs: file(relativePath: { eq: "frontend/nodejs.png" }) {
      ...listImage
    }
    python: file(relativePath: { eq: "frontend/python.webp" }) {
      ...listImage
    }
    java: file(relativePath: { eq: "frontend/java.webp" }) {
      ...listImage
    }
    netcore: file(relativePath: { eq: "frontend/netcore.webp" }) {
      ...listImage
    }
  }
`
