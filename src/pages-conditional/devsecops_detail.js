import React, { useRef, useState, useEffect } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { useIntl, navigate } from "gatsby-plugin-intl"
import { translateMessageId } from "../utils/translations"
import Translation from "../components/Translation"
import Pill from "../components/Pill"
import BoxGrid from "../components/BoxGrid"
import Card from "../components/Card"
import Callout from "../components/Callout"
import CalloutBanner from "../components/CalloutBanner"
import ProductCard from "../components/ProductCard"
import GhostCard from "../components/GhostCard"
import Link from "../components/Link"
import InfoBanner from "../components/InfoBanner"
import DocLink from "../components/DocLink"
import Emoji from "../components/Emoji"
import ButtonLink from "../components/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import ProductList from "../components/ProductList"
import PageHero from "../components/PageHero"
import {
  ButtonSecondary,
  ButtonPrimary,
  CardGrid,
  Content,
  Page,
  CenterDivider,
  Divider,
} from "../components/SharedStyledComponents"

const MagiciansImage = styled(Img)`
  background-size: cover;
  background-repeat: no-repeat;
  align-self: center;
  width: 100%;
  min-width: 240px;
  max-width: 300px;
  margin: 2rem 6rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin: 2rem 2rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin: 2rem 0rem;
  }
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`

const StyledButtonSecondary = styled(ButtonSecondary)`
  margin-top: 0;
`

const StyledGhostCard = styled(GhostCard)`
  .ghost-card-base {
    display: flex;
    justify-content: center;
  }
`

const Subtitle = styled.div`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  margin-top: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 20px;
  }
`

const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const IntroRow = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  background: ${(props) => props.theme.colors.background};
  border-radius: 32px;
  padding: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const TwoColumnContent = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-right: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0rem;
    margin-right: 0rem;
  }
`

const H2 = styled.h2`
  font-size: 24px;
  font-style: normal;
  margin-top: 0.5rem;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
`

const StyledInfoBanner = styled(InfoBanner)`
  width: 50%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
  }
`

const OptionContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 2rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    width: 100%;
  }
`

const StyledCalloutBanner = styled(CalloutBanner)`
  margin: 8rem 0 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-bottom: 0;
  }
`

const MobileOptionContainer = styled(OptionContainer)`
  text-align: center;
  @media (min-width: ${(props) => props.theme.breakpoints.m}) {
    display: none;
  }
`

const Option = styled.div`
  border-radius: 2rem;
  border: 1px solid
    ${(props) =>
      props.isActive ? props.theme.colors.primary : props.theme.colors.text};
  box-shadow: ${(props) =>
    props.isActive ? props.theme.colors.tableBoxShadow : `none`};
  display: flex;
  color: ${(props) =>
    props.isActive ? props.theme.colors.primary : props.theme.colors.text};
  align-items: center;
  padding: 1rem 1.5rem;
  margin: 0.5rem;
  cursor: pointer;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    justify-content: center;
    margin-left: 0;
    margin-right: 0;
  }
`

const OptionText = styled.div`
  font-size: 24px;
  line-height: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 16px;
    font-weight: 600;
  }
`

const Column = styled.div`
  flex: 1 1 75%;
  margin-bottom: 1.5rem;
  margin-right: 2rem;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-right: 0rem;
    margin-left: 0rem;
  }
`

const FullWidthContainer = styled(Page)`
  margin: 0rem 0rem;
  margin-bottom: 4rem;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.ednBackground};
  padding: 2rem 0rem;
  padding-top: 4rem;
`

const CardContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-template-columns: 1fr;
  }
`

const CenteredCard = styled(Card)`
  text-align: center;
`

const StepBoxContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem 0rem;
  margin-bottom: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-wrap: wrap;
  }
`

const StepBox = styled(Link)`
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.background};
  padding: 0rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  width: 100%;
  &:hover {
    background: ${(props) => props.theme.colors.ednBackground};
    transition: transform 0.2s;
    transform: scale(1.05);
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 2rem;
  }
`

const H3 = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 0.5rem;
  margin-top: 1.5rem;
  a {
    display: none;
  }
`

const CenterText = styled.p`
  text-align: center;
  max-width: 800px;
  margin-bottom: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: auto 1.5rem;
    margin-bottom: 1rem;
  }
`

const LeftColumn = styled.div`
  margin-right: 2rem;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: auto 0rem;
  }
`

const RightColumn = styled.div`
  margin-left: 2rem;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: auto 0rem;
  }
`
const About = styled.div`
  margin-top: 3rem;
`

const Box = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    align-items: flex-start;
  }
`

const BoxText = styled.p`
  text-align: center;
  max-width: 800px;
  margin-bottom: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    text-align: left;
  }
`

const TextNoMargin = styled.p`
  margin-bottom: 0rem;
  margin-right: 1rem;
`
const AddDapp = styled.div`
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 1.5rem;
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const AddDappButton = styled(ButtonLink)`
  margin-left: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-left: 1rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-top: 2rem;
    margin-left: 0rem;
  }
`

const StyledDocLink = styled(DocLink)``

const StyledCallout = styled(Callout)`
  flex: 1 1 416px;
  min-height: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 12rem;
  }
`

const StyledCardGrid = styled(CardGrid)`
  margin-bottom: 4rem;
  margin-top: 4rem;
`

const MoreButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 3rem;
  margin-bottom: 1rem;
`

const FINANCE = "finance"
const TECHNOLOGY = "technology"
const COLLECTIBLES = "collectibles"
const GAMING = "gaming"
const DEVOPS = "DevOps"

const DappsPage = ({ data, location }) => {
  const intl = useIntl()
  const [selectedCategory, setCategory] = useState(FINANCE)
  const explore = useRef(null)

  useEffect(() => {
    // Fetch category on load
    const queryParamCategories = new URLSearchParams(location.search || "").get(
      "category"
    ) // Comma separated string
    const selectedCategory = queryParamCategories
      ? queryParamCategories.split(",")[0]
      : FINANCE // Default to finance category if empty
    setCategory(
      [FINANCE, TECHNOLOGY, COLLECTIBLES, GAMING].includes(selectedCategory)
        ? selectedCategory
        : FINANCE
    )
    if (location.hash.length > 0 && location.hash[0] === "#") {
      navigate(location.hash)
    } else if (window && queryParamCategories && explore.current) {
      window.scrollTo({
        top: explore.current.offsetTop - 76,
        behavior: "smooth",
      })
    }
  }, [location.search])

  const updatePath = (selectedCategory, isMobile) => {
    // Update URL path with new filter query params
    let newPath = `/dapps/?category=${selectedCategory || FINANCE}`
    // If "mobile" option at bottom of the page...
    if (isMobile) {
      // Add #explore and refresh
      newPath += "#explore"
      navigate(newPath)
    } else {
      // If within `window` and not in the bottom mobile selection...
      if (window) {
        newPath = `/${intl.locale}${newPath}`
        // Apply new path without page refresh
        window.history.pushState(null, "", newPath)
      } else {
        // Otherwise refresh
        navigate(newPath)
      }
    }
  }

  const handleCategorySelect = (category, isMobile = false) => {
    setCategory(category)
    updatePath(category, isMobile)
  }

  const features = [
    {
      title: translateMessageId("page-devsecops-detail-features-1-title", intl),
      description: translateMessageId(
        "page-devsecops-detail-features-1-description",
        intl
      ),
      emoji: ":desktop_computer:",
    },
    {
      title: translateMessageId("page-devsecops-detail-features-2-title", intl),
      description: translateMessageId(
        "page-devsecops-detail-features-2-description",
        intl
      ),
      emoji: ":alarm_clock:",
    },
    {
      title: translateMessageId("page-devsecops-detail-features-3-title", intl),
      description: translateMessageId(
        "page-devsecops-detail-features-3-description",
        intl
      ),
      emoji: ":package:",
    },
    {
      title: translateMessageId("page-devsecops-detail-features-4-title", intl),
      description: translateMessageId(
        "page-devsecops-detail-features-4-description",
        intl
      ),
      emoji: ":artist_palette:",
    },
    {
      title: translateMessageId("page-devsecops-detail-features-5-title", intl),
      description: translateMessageId(
        "page-devsecops-detail-features-5-description",
        intl
      ),
      emoji: ":locked_with_key:",
    },
    {
      title: translateMessageId("page-devsecops-detail-features-6-title", intl),
      description: translateMessageId(
        "page-devsecops-detail-features-6-description",
        intl
      ),
      emoji: ":racing_car:",
    },
    {
      title: translateMessageId("page-devsecops-detail-features-7-title", intl),
      description: translateMessageId(
        "page-devsecops-detail-features-7-description",
        intl
      ),
      emoji: ":dress:",
    },
  ]

  const categories = {
    finance: {
      title: translateMessageId("page-devsecops-detail-finance-button", intl),
      emoji: ":soap:",
      benefitsTitle: translateMessageId(
        "page-devsecops-detail-finance-benefits-title",
        intl
      ),
      benefitsDescription: translateMessageId(
        "page-devsecops-detail-finance-benefits-description",
        intl
      ),
      benefits: [
        {
          emoji: ":open_lock:",
          title: translateMessageId(
            "page-devsecops-detail-finance-benefits-1-title",
            intl
          ),
          description: translateMessageId(
            "page-devsecops-detail-finance-benefits-1-description",
            intl
          ),
        },
        {
          emoji: ":bank:",
          title: translateMessageId(
            "page-devsecops-detail-finance-benefits-2-title",
            intl
          ),
          description: translateMessageId(
            "page-devsecops-detail-finance-benefits-2-description",
            intl
          ),
        },
        {
          emoji: ":scales:",
          title: translateMessageId(
            "page-devsecops-detail-finance-benefits-3-title",
            intl
          ),
          description: translateMessageId(
            "page-devsecops-detail-finance-benefits-3-description",
            intl
          ),
        },
        {
          emoji: ":chains:",
          title: translateMessageId(
            "page-devsecops-detail-finance-benefits-4-title",
            intl
          ),
          description: translateMessageId(
            "page-devsecops-detail-finance-benefits-4-description",
            intl
          ),
        },
      ],
    },
    collectibles: {
      title: translateMessageId(
        "page-devsecops-detail-collectibles-button",
        intl
      ),
      emoji: ":locked_with_key:",
      benefitsTitle: translateMessageId(
        "page-devsecops-detail-collectibles-benefits-title",
        intl
      ),
      benefitsDescription: translateMessageId(
        "page-devsecops-detail-collectibles-benefits-description",
        intl
      ),
      benefits: [
        {
          emoji: ":white_check_mark:",
          title: translateMessageId(
            "page-devsecops-detail-collectibles-benefits-1-title",
            intl
          ),
          description: translateMessageId(
            "page-devsecops-detail-collectibles-benefits-1-description",
            intl
          ),
        },
        {
          emoji: ":man_singer:",
          title: translateMessageId(
            "page-devsecops-detail-collectibles-benefits-2-title",
            intl
          ),
          description: translateMessageId(
            "page-devsecops-detail-collectibles-benefits-2-description",
            intl
          ),
        },
        {
          emoji: ":shopping_bags:",
          title: translateMessageId(
            "page-devsecops-detail-collectibles-benefits-3-title",
            intl
          ),
          description: translateMessageId(
            "page-devsecops-detail-collectibles-benefits-3-description",
            intl
          ),
        },
        {
          emoji: ":department_store:",
          title: translateMessageId(
            "page-devsecops-detail-collectibles-benefits-4-title",
            intl
          ),
          description: translateMessageId(
            "page-devsecops-detail-collectibles-benefits-4-description",
            intl
          ),
        },
      ],
    },
    gaming: {
      title: translateMessageId("page-devsecops-detail-gaming-button", intl),
      emoji: ":building_construction:",
      benefitsTitle: translateMessageId(
        "page-devsecops-detail-gaming-benefits-title",
        intl
      ),
      benefitsDescription: translateMessageId(
        "page-devsecops-detail-gaming-benefits-description",
        intl
      ),
      benefits: [
        {
          emoji: ":crossed_swords:",
          title: translateMessageId(
            "page-devsecops-detail-gaming-benefits-1-title",
            intl
          ),
          description: translateMessageId(
            "page-devsecops-detail-gaming-benefits-1-description",
            intl
          ),
        },
        {
          emoji: ":european_castle:",
          title: translateMessageId(
            "page-devsecops-detail-gaming-benefits-2-title",
            intl
          ),
          description: translateMessageId(
            "page-devsecops-detail-gaming-benefits-2-description",
            intl
          ),
        },
        {
          emoji: ":handshake:",
          title: translateMessageId(
            "page-devsecops-detail-gaming-benefits-3-title",
            intl
          ),
          description: translateMessageId(
            "page-devsecops-detail-gaming-benefits-3-description",
            intl
          ),
        },
      ],
    },
    technology: {
      title: translateMessageId(
        "page-devsecops-detail-technology-button",
        intl
      ),
      emoji: ":keyboard:",
    },
  }

  const categoryKeys = Object.keys(categories)

  const editorChoices = [
    {
      name: "Jenkins",
      description: translateMessageId(
        "page-devsecops-detail-editors-choice-uniswap",
        intl
      ),
      url: "https://www.jenkins.io/",
      image: data.uniswapec.childImageSharp.fixed,
      alt: translateMessageId("page-devsecops-detail-uniswap-logo-alt", intl),
      background: "#9EDFFF",
      type: DEVOPS,
      pillColor: "tagMint",
    },
    {
      name: "Gitlab DevOps",
      description: translateMessageId(
        "page-devsecops-detail-editors-choice-dark-forest",
        intl
      ),
      url: "https://about.gitlab.com/topics/devops/",
      image: data.darkforestec.childImageSharp.fixed,
      alt: translateMessageId(
        "page-devsecops-detail-dark-forest-logo-alt",
        intl
      ),
      background: "#9EDFFF",
      type: DEVOPS,
      pillColor: "tagOrange",
    },
    {
      name: "Azure DevOps",
      description: translateMessageId(
        "page-devsecops-detail-editors-choice-foundation",
        intl
      ),
      url: "https://azure.microsoft.com/es-es/services/devops/",
      image: data.foundationec.childImageSharp.fixed,
      alt: translateMessageId(
        "page-devsecops-detail-foundation-logo-alt",
        intl
      ),
      background: "#9EDFFF",
      type: DEVOPS,
      pillColor: "tagBlue",
    },
    {
      name: "Travis CI",
      description: translateMessageId(
        "page-devsecops-detail-editors-choice-pooltogether",
        intl
      ),
      url: "https://travis-ci.org/",
      image: data.pooltogetherec.childImageSharp.fixed,
      alt: translateMessageId(
        "page-devsecops-detail-pooltogether-logo-alt",
        intl
      ),
      background: "#9EDFFF",
      type: DEVOPS,
      pillColor: "tagMint",
    },
  ]

  const heroContent = {
    title: translateMessageId("decentralized-applications-dapps", intl),
    header: translateMessageId("page-devsecops-detail-hero-header", intl),
    subtitle: translateMessageId("page-devsecops-detail-hero-subtitle", intl),
    image: data.doge.childImageSharp.fluid,
    alt: translateMessageId("page-devsecops-detail-doge-img-alt", intl),
    buttons: [
      {
        content: translateMessageId(
          "page-devsecops-detail-explore-dapps-title",
          intl
        ),
        path: "#explore",
      },
      {
        content: translateMessageId(
          "page-devsecops-detail-what-are-dapps",
          intl
        ),
        path: "#what-are-dapps",
        isSecondary: "isSecondary",
      },
    ],
  }

  return (
    <Page>
      <Content>
        <h3>
          <Translation id="page-devsecops-detail-editors-choice-header" />{" "}
          <Emoji text=":+1:" size={1} />
        </h3>
        <p>
          <Translation id="page-devsecops-detail-editors-choice-description" />
        </p>
        <StyledCardGrid>
          {editorChoices.map((choice, idx) => (
            <ProductCard
              key={idx}
              background={choice.background}
              description={choice.description}
              url={choice.url}
              alt={choice.alt}
              image={choice.image}
              name={choice.name}
            >
              <Pill color={choice.pillColor}>{choice.type}</Pill>
            </ProductCard>
          ))}
        </StyledCardGrid>
      </Content>
      <FullWidthContainer ref={explore}>
        <h2 id="explore">
          <Translation id="page-devsecops-detail-explore-dapps-title" />
        </h2>
        <CenterText>
          <Translation id="page-devsecops-detail-explore-dapps-description" />
        </CenterText>
        <h3>
          <Translation id="page-devsecops-detail-choose-category" />
        </h3>
        <OptionContainer>
          {categoryKeys.map((key, idx) => {
            const category = categories[key]
            return (
              <Option
                key={idx}
                isActive={selectedCategory === key}
                onClick={() => handleCategorySelect(key, false)}
              >
                <Emoji mr={`1rem`} text={category.emoji} />
                <OptionText>{category.title}</OptionText>
              </Option>
            )
          })}
        </OptionContainer>
        {/* Category-specific content */}
        {selectedCategory === FINANCE && (
          <Content>
            <IntroRow>
              <Column>
                <H2>
                  <Translation id="page-devsecops-detail-finance-title" />{" "}
                  <Emoji size={"2rem"} ml={"0.5rem"} text=":soap:" />
                </H2>
                <Subtitle>
                  <Translation id="page-devsecops-detail-finance-description" />
                </Subtitle>
              </Column>
              <StyledInfoBanner isWarning={true}>
                <H2>
                  <Translation id="page-devsecops-detail-warning-header" />
                </H2>
                <Translation id="page-devsecops-detail-warning-message" />
              </StyledInfoBanner>
            </IntroRow>
          </Content>
        )}
        {selectedCategory === GAMING && (
          <Content>
            <IntroRow>
              <Column>
                <H2>
                  <Translation id="page-devsecops-detail-gaming-title" />{" "}
                  <Emoji size={"2rem"} ml={"0.5rem"} text=":video_game:" />
                </H2>
                <Subtitle>
                  <Translation id="page-devsecops-detail-gaming-description" />
                </Subtitle>
              </Column>
              <StyledInfoBanner isWarning={true}>
                <H2>
                  <Translation id="page-devsecops-detail-warning-header" />
                </H2>
                <Translation id="page-devsecops-detail-warning-message" />
              </StyledInfoBanner>
            </IntroRow>
          </Content>
        )}
        {selectedCategory === TECHNOLOGY && (
          <Content>
            <IntroRow>
              <Column>
                <H2>
                  <Translation id="page-devsecops-detail-technology-title" />{" "}
                  <Emoji size={"2rem"} ml={"0.5rem"} text=":keyboard:" />
                </H2>
                <Subtitle>
                  <Translation id="page-devsecops-detail-technology-description" />
                </Subtitle>
              </Column>
              <StyledInfoBanner isWarning={true}>
                <H2>
                  <Translation id="page-devsecops-detail-warning-header" />
                </H2>
                <Translation id="page-devsecops-detail-warning-message" />
              </StyledInfoBanner>
            </IntroRow>
          </Content>
        )}
        {selectedCategory === COLLECTIBLES && (
          <Content>
            <IntroRow>
              <Column>
                <H2>
                  <Translation id="page-devsecops-detail-collectibles-title" />{" "}
                  <Emoji size={"2rem"} ml={"0.5rem"} text=":locked_with_key:" />
                </H2>
                <Subtitle>
                  <Translation id="page-devsecops-detail-collectibles-description" />
                </Subtitle>
              </Column>
              <StyledInfoBanner isWarning={true}>
                <H2>
                  <Translation id="page-devsecops-detail-warning-header" />
                </H2>
                <Translation id="page-devsecops-detail-warning-message" />
              </StyledInfoBanner>
            </IntroRow>
          </Content>
        )}
        {/* General content for all categories */}
        <Content></Content>
      </FullWidthContainer>
      <Content>
        <Box>
          <h2>
            <Translation id="page-devsecops-detail-magic-behind-dapps-title" />
          </h2>
          <BoxText>
            <Translation id="page-devsecops-detail-magic-behind-dapps-description" />
          </BoxText>
          <Link to="/what-is-ethereum/">
            <Translation id="page-devsecops-detail-magic-behind-dapps-link" />
          </Link>
        </Box>
        <BoxGrid items={features} />
        <Row>
          <LeftColumn>
            <h2>
              <Translation id="page-devsecops-detail-how-dapps-work-title" />
            </h2>
            <p>
              <Translation id="page-devsecops-detail-how-dapps-work-p1" />
            </p>
            <p>
              <Translation id="page-devsecops-detail-how-dapps-work-p2" />
            </p>
            <p>
              <Translation id="page-devsecops-detail-how-dapps-work-p3" />
            </p>
            <StyledDocLink
              to="/developers/docs/dapps/"
              title="Intro to dapps"
            />
            <StyledDocLink
              to="/developers/docs/smart-contracts/"
              title="Smart contracts"
            />
          </LeftColumn>
          <RightColumn>
            <StyledCallout
              title={translateMessageId(
                "page-devsecops-detail-learn-callout-title",
                intl
              )}
              description={translateMessageId(
                "page-devsecops-detail-learn-callout-description",
                intl
              )}
              image={data.developers.childImageSharp.fixed}
              alt={translateMessageId(
                "page-devsecops-detail-learn-callout-image-alt",
                intl
              )}
            >
              <div>
                <ButtonLink to="/developers/">
                  <Translation id="page-devsecops-detail-learn-callout-button" />
                </ButtonLink>
              </div>
            </StyledCallout>
          </RightColumn>
        </Row>
      </Content>
    </Page>
  )
}

export default DappsPage

export const dappImage = graphql`
  fragment dappImage on File {
    childImageSharp {
      fluid(maxWidth: 80) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
export const editorImage = graphql`
  fragment editorImage on File {
    childImageSharp {
      fixed(height: 80, quality: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const query = graphql`
  query {
    doge: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        fluid(maxWidth: 624) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ogImage: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        fixed(width: 1200) {
          src
        }
      }
    }
    magicians: file(relativePath: { eq: "magicians.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    developers: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        fixed(height: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    wallet: file(relativePath: { eq: "wallet.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    uniswapec: file(relativePath: { eq: "dapps/jenkins.png" }) {
      ...editorImage
    }
    foundationec: file(relativePath: { eq: "dapps/azuredevops.png" }) {
      ...editorImage
    }
    darkforestec: file(relativePath: { eq: "dapps/gitlab.png" }) {
      ...editorImage
    }
    pooltogetherec: file(relativePath: { eq: "dapps/travisdevops.png" }) {
      ...editorImage
    }
    aave: file(relativePath: { eq: "dapps/aave.png" }) {
      ...dappImage
    }
    compound: file(relativePath: { eq: "dapps/compound.png" }) {
      ...dappImage
    }
    pooltogether: file(relativePath: { eq: "dapps/pooltogether.png" }) {
      ...dappImage
    }
    uniswap: file(relativePath: { eq: "dapps/uni.png" }) {
      ...dappImage
    }
    dai: file(relativePath: { eq: "dapps/stabledai.png" }) {
      ...dappImage
    }
    set: file(relativePath: { eq: "dapps/set.png" }) {
      ...dappImage
    }
    tornado: file(relativePath: { eq: "dapps/tornado.png" }) {
      ...dappImage
    }
    loopring: file(relativePath: { eq: "dapps/loopring.png" }) {
      ...dappImage
    }
    polymarket: file(relativePath: { eq: "dapps/polymarket.png" }) {
      ...dappImage
    }
    sablier: file(relativePath: { eq: "dapps/sablier.png" }) {
      ...dappImage
    }
    golem: file(relativePath: { eq: "dapps/golem.png" }) {
      ...dappImage
    }
    gitcoin: file(relativePath: { eq: "dapps/gitcoin.png" }) {
      ...dappImage
    }
    ens: file(relativePath: { eq: "dapps/ens.png" }) {
      ...dappImage
    }
    radicle: file(relativePath: { eq: "dapps/radicle.png" }) {
      ...dappImage
    }
    brave: file(relativePath: { eq: "dapps/brave.png" }) {
      ...dappImage
    }
    opera: file(relativePath: { eq: "dapps/opera.png" }) {
      ...dappImage
    }
    foundation: file(relativePath: { eq: "dapps/foundation.png" }) {
      ...dappImage
    }
    superrare: file(relativePath: { eq: "dapps/superrare.png" }) {
      ...dappImage
    }
    audius: file(relativePath: { eq: "dapps/audius.png" }) {
      ...dappImage
    }
    marble: file(relativePath: { eq: "dapps/marble.png" }) {
      ...dappImage
    }
    nifty: file(relativePath: { eq: "dapps/nifty.png" }) {
      ...dappImage
    }
    opensea: file(relativePath: { eq: "dapps/opensea.png" }) {
      ...dappImage
    }
    rarible: file(relativePath: { eq: "dapps/rarible.png" }) {
      ...dappImage
    }
    decentraland: file(relativePath: { eq: "dapps/decentraland.png" }) {
      ...dappImage
    }
    cryptopunks: file(relativePath: { eq: "dapps/cryptopunks.png" }) {
      ...dappImage
    }
    darkforest: file(relativePath: { eq: "dapps/darkforest.png" }) {
      ...dappImage
    }
    axie: file(relativePath: { eq: "dapps/axie.png" }) {
      ...dappImage
    }
    gods: file(relativePath: { eq: "dapps/gods.png" }) {
      ...dappImage
    }
    cryptovoxels: file(relativePath: { eq: "dapps/cryptovoxels.png" }) {
      ...dappImage
    }
    matcha: file(relativePath: { eq: "dapps/matcha.png" }) {
      ...dappImage
    }
    oneinch: file(relativePath: { eq: "exchanges/1inch.png" }) {
      ...dappImage
    }
    dydx: file(relativePath: { eq: "exchanges/dydx.png" }) {
      ...dappImage
    }
    augur: file(relativePath: { eq: "dapps/augur.png" }) {
      ...dappImage
    }
    asyncart: file(relativePath: { eq: "dapps/asyncart.png" }) {
      ...dappImage
    }
    index: file(relativePath: { eq: "dapps/index-coop.png" }) {
      ...dappImage
    }
    nexus: file(relativePath: { eq: "dapps/nexus.png" }) {
      ...dappImage
    }
    etherisc: file(relativePath: { eq: "dapps/etherisc.png" }) {
      ...dappImage
    }
    zapper: file(relativePath: { eq: "dapps/zapper.png" }) {
      ...dappImage
    }
    zerion: file(relativePath: { eq: "dapps/zerion.png" }) {
      ...dappImage
    }
    rotki: file(relativePath: { eq: "dapps/rotki.png" }) {
      ...dappImage
    }
  }
`
