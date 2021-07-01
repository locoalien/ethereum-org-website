import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useIntl, navigate } from "gatsby-plugin-intl"
import styled from "styled-components"
import { shuffle } from "lodash"

import ButtonLink from "./ButtonLink"
import Emoji from "./Emoji"
import Link from "./Link"
import SelectableCard from "./SelectableCard"
import Translation from "./Translation"
import Tag from "./Tag"
import WalletCard from "./WalletCard"
import { Content } from "./SharedStyledComponents"

import { getLocaleTimestamp } from "../utils/time"
import { trackCustomEvent } from "../utils/matomo"
import { translateMessageId } from "../utils/translations"

const Container = styled.div`
  margin-top: 2rem;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`

const Subtitle = styled.div`
  font-size: 20px;
  line-height: 140%;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.colors.text200};
`

const GradientContainer = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.cardGradient};
  padding: 3rem 2rem;
  border-top: 1px solid ${(props) => props.theme.colors.tableItemBoxShadow};
  border-bottom: 1px solid ${(props) => props.theme.colors.tableItemBoxShadow};
`

const WalletFeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`

const FilterContainer = styled.div`
  min-height: 82px;
`

const TagsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column;
  }
`

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 80%;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    max-width: 100%;
    margin-bottom: 1rem;
  }
`

const ClearLink = styled.button`
  color: ${(props) => props.theme.colors.primary};
  text-decoration: underline;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`

export const walletCardImage = graphql`
  fragment walletCardImage on File {
    childImageSharp {
      fluid(maxWidth: 64) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

const ResultsContainer = styled.div`
  margin-top: 0rem;
  text-align: center;
`

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
  gap: 2rem;
`

const Disclaimer = styled.div`
  margin-top: 2rem;
`

// `id` fields must match src/data/wallets.csv column headers
const walletFeatures = [
  {
    id: "has_card_deposits",
    emoji: ":locked_with_key:",
    title: <Translation id="page-find-devsecops-buy-card" />,
    description: <Translation id="page-find-devsecops-buy-card-desc" />,
  },
  {
    id: "has_explore_dapps",
    emoji: ":bulb:",
    title: <Translation id="page-find-devsecops-explore-dapps" />,
    description: <Translation id="page-find-devsecops-explore-dapps-desc" />,
  },
  {
    id: "has_defi_integrations",
    emoji: ":white_check_mark:",
    title: <Translation id="page-find-devsecops-fi-tools" />,
    description: <Translation id="page-find-devsecops-fi-tools-desc" />,
  },
  {
    id: "has_bank_withdrawals",
    emoji: ":laptop_computer:",
    title: <Translation id="page-find-devsecops-withdraw" />,
    description: <Translation id="page-find-devsecops-withdraw-desc" />,
  },
  {
    id: "has_limits_protection",
    emoji: ":building_construction:",
    title: <Translation id="page-find-devsecops-limits" />,
    description: <Translation id="page-find-devsecops-limits-desc" />,
  },
  {
    id: "has_high_volume_purchases",
    emoji: ":office_building:",
    title: <Translation id="page-find-devsecops-volume" />,
    description: <Translation id="page-find-devsecops-voluem-desc" />,
  },
  {
    id: "has_dex_integrations",
    emoji: ":delivery_truck:",
    title: <Translation id="page-find-devsecops-swaps" />,
    description: <Translation id="page-find-devsecops-swaps-desc" />,
  },
  {
    id: "has_multisig",
    emoji: ":busts_in_silhouette:",
    title: <Translation id="page-find-devsecops-multisig" />,
    description: <Translation id="page-find-devsecops-multisig-desc" />,
  },
]

const Devsecops_service = ({ location }) => {
  const [state, setState] = useState({
    selectedFeatureIds: [],
    wallets: [],
  })
  // image variables must match `id` column in src/data/wallets.csv
  const data = useStaticQuery(graphql`
    query {
      allWallets: allWalletsCsv {
        nodes {
          id
          name
          url
          brand_color
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
      alpha: file(relativePath: { eq: "wallets/alpha.png" }) {
        ...walletCardImage
      }
      ambo: file(relativePath: { eq: "wallets/ambo.png" }) {
        ...walletCardImage
      }
      argent: file(relativePath: { eq: "wallets/argent.png" }) {
        ...walletCardImage
      }
      coinbase: file(relativePath: { eq: "wallets/coinbase.png" }) {
        ...walletCardImage
      }
      coinomi: file(relativePath: { eq: "wallets/coinomi.png" }) {
        ...walletCardImage
      }
      dcent: file(relativePath: { eq: "wallets/dcent.png" }) {
        ...walletCardImage
      }
      dharma: file(relativePath: { eq: "wallets/dharma.png" }) {
        ...walletCardImage
      }
      enjin: file(relativePath: { eq: "wallets/enjin.png" }) {
        ...walletCardImage
      }
      fortmatic: file(relativePath: { eq: "wallets/fortmatic.png" }) {
        ...walletCardImage
      }
      gnosis: file(relativePath: { eq: "wallets/gnosis.png" }) {
        ...walletCardImage
      }
      guarda: file(relativePath: { eq: "wallets/guarda.png" }) {
        ...walletCardImage
      }
      hyperpay: file(relativePath: { eq: "wallets/hyperpay.png" }) {
        ...walletCardImage
      }
      imtoken: file(relativePath: { eq: "wallets/imtoken.png" }) {
        ...walletCardImage
      }
      ledger: file(relativePath: { eq: "wallets/ledger.png" }) {
        ...walletCardImage
      }
      linen: file(relativePath: { eq: "wallets/linen.png" }) {
        ...walletCardImage
      }
      mathwallet: file(relativePath: { eq: "wallets/mathwallet.png" }) {
        ...walletCardImage
      }
      metamask: file(relativePath: { eq: "wallets/metamask.png" }) {
        ...walletCardImage
      }
      monolith: file(relativePath: { eq: "wallets/monolith.png" }) {
        ...walletCardImage
      }
      multis: file(relativePath: { eq: "wallets/multis.png" }) {
        ...walletCardImage
      }
      mycrypto: file(relativePath: { eq: "wallets/mycrypto.png" }) {
        ...walletCardImage
      }
      myetherwallet: file(relativePath: { eq: "wallets/myetherwallet.png" }) {
        ...walletCardImage
      }
      pillar: file(relativePath: { eq: "wallets/pillar.png" }) {
        ...walletCardImage
      }
      portis: file(relativePath: { eq: "wallets/portis.png" }) {
        ...walletCardImage
      }
      rainbow: file(relativePath: { eq: "wallets/rainbow.png" }) {
        ...walletCardImage
      }
      squarelink: file(relativePath: { eq: "wallets/squarelink.png" }) {
        ...walletCardImage
      }
      status: file(relativePath: { eq: "wallets/status.png" }) {
        ...walletCardImage
      }
      torus: file(relativePath: { eq: "wallets/torus.png" }) {
        ...walletCardImage
      }
      trezor: file(relativePath: { eq: "wallets/trezor.png" }) {
        ...walletCardImage
      }
      trust: file(relativePath: { eq: "wallets/trust.png" }) {
        ...walletCardImage
      }
      unstoppable: file(relativePath: { eq: "wallets/unstoppable.png" }) {
        ...walletCardImage
      }
      zengo: file(relativePath: { eq: "wallets/zengo.png" }) {
        ...walletCardImage
      }
      tokenpocket: file(relativePath: { eq: "wallets/tokenpocket.png" }) {
        ...walletCardImage
      }
    }
  `)

  const intl = useIntl()

  useEffect(() => {
    // Fetch filters on load
    const queryParamFilters = new URLSearchParams(location.search || "").get(
      "filters"
    ) // Comma separated string
    const selectedFeatureIds = queryParamFilters
      ? queryParamFilters.split(",")
      : []

    const nodes = data.allWallets.nodes
    const wallets = shuffle(
      nodes.map((node) => {
        node.image = data[node.id]
        node.alt = translateMessageId(
          `page-find-devsecops-${node.id}-logo-alt`,
          intl
        )
        node.description = translateMessageId(
          `page-find-devsecops-description-${node.id}`,
          intl
        )
        return node
      })
    )
    setState({ selectedFeatureIds, wallets })
  }, [data, intl, location.search])

  let lastUpdated
  // TODO remove conditionals once file is registered in git
  if (data.timestamp.parent.fields) {
    lastUpdated = getLocaleTimestamp(
      intl.locale,
      data.timestamp.parent.fields.gitLogLatestDate
    )
  }

  const updatePath = (selectedFeatureIds) => {
    // Update URL path with new filter query params
    let newPath = "/wallets/find-wallet/"
    if (selectedFeatureIds.length > 0) {
      newPath += "?filters="
      for (const id of selectedFeatureIds) {
        newPath += `${id},`
      }
      newPath = newPath.substr(0, newPath.length - 1)
    }
    // Apply new path without refresh if within `window`
    if (window) {
      newPath = `/${intl.locale}` + newPath
      window.history.pushState(null, "", newPath)
    } else {
      navigate(newPath)
    }
  }

  const clearFilters = () => {
    setState({ ...state, selectedFeatureIds: [] })
    updatePath([])
  }

  // Add feature filter (or remove if already selected)
  const handleSelect = (featureId) => {
    const selectedFeatureIds = state.selectedFeatureIds

    const index = selectedFeatureIds.indexOf(featureId)
    if (index > -1) {
      selectedFeatureIds.splice(index, 1)
    } else {
      selectedFeatureIds.push(featureId)

      trackCustomEvent({
        eventCategory: `Wallet feature`,
        eventAction: `Selected`,
        eventName: featureId,
      })
    }
    setState({ selectedFeatureIds, wallets: state.wallets })
    updatePath(selectedFeatureIds)
  }

  return (
    <Container>
      <Content>
        <h2>
          <Translation id="page-find-devsecops-feature-h2" />
        </h2>
        <WalletFeaturesGrid>
          {walletFeatures.map((card, idx) => {
            const isSelected = state.selectedFeatureIds.includes(card.id)
            return (
              <SelectableCard
                key={idx}
                emoji={card.emoji}
                title={card.title}
                description={card.description}
                isSelected={isSelected}
                onSelect={handleSelect}
                value={card.id}
              />
            )
          })}
        </WalletFeaturesGrid>
      </Content>
    </Container>
  )
}

export default Devsecops_service
