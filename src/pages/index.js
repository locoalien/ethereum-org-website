import React, { useState } from "react"
import { useIntl } from "gatsby-plugin-intl"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import ActionCard from "../components/ActionCard"
import ButtonLink from "../components/ButtonLink"
import Icon from "../components/Icon"
import CalloutBanner from "../components/CalloutBanner"
import CodeModal from "../components/CodeModal"
import Codeblock from "../components/Codeblock"
import LegacyPageHome from "../components/LegacyPageHome"
import Morpher from "../components/Morpher"
import PageMetadata from "../components/PageMetadata"
import StatsBoxGrid from "../components/StatsBoxGrid"
import Translation from "../components/Translation"
import TitleCardList from "../components/TitleCardList"
import {
  CardContainer,
  Content,
  GrayContainer,
  LeftColumn,
} from "../components/SharedStyledComponents"
import {
  getLangContentVersion,
  translateMessageId,
} from "../utils/translations"

const Hero = styled(Img)`
  width: 100%;
  min-height: 380px;
  max-height: 440px;
  background-size: cover;
  background: no-repeat 50px;
  margin-bottom: 2rem;
`

const StyledContent = styled(Content)`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 1rem;
  }
`

const H1 = styled.h1`
  font-size: 40px;
  font-weight: 700;
  margin: 0;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 32px;
  }
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 0 auto;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
  padding: 0 2rem;
`

const ButtonRow = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const StyledButtonLink = styled(ButtonLink)`
  margin-left: 0.5rem;
  margin-top: 0rem;
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 1rem;
    margin-left: 0rem;
  }
`

const CodeExampleContent = styled(Content)`
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    padding: 1rem;
  }
`

const CodeboxModal = styled(CodeModal)`
  .modal-component-container {
    padding: 0;
    left: 0;
    right: 0;
    bottom: 0;
    top: 50%;
  }
  .modal-component {
    max-width: 100%;
    max-height: 50%;
    padding: 0rem;
  }
  .modal-component-content {
    margin-top: 3rem;
    width: 100%;
    overflow: auto;
  }
`

const IntroRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  margin-top: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
    margin: 0rem;
  }
`

const RowReverse = styled.div`
  display: flex;
  flex-direction: row-reverse;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    align-items: center;
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    align-items: center;
  }
`

const ImageContainer = styled.div`
  background: "#F1FFFD";
  display: flex;
  height: 100%;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 75%;
  }
`

const Description = styled.p`
  color: ${(props) => props.theme.colors.text200};
  max-width: 55ch;
  text-align: center;
  align-self: center;
  font-size: 20px;
  margin-top: 1rem;
`

const StyledGrayContainer = styled(GrayContainer)`
  box-shadow: inset 0px 0px 0px
    ${(props) => props.theme.colors.tableItemBoxShadow};
  padding: 0rem;
  padding-bottom: 4rem;
  margin-top: 0rem;
`
const StyledCard = styled(ActionCard)`
  min-width: 480px;
  margin: 1rem;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0;
    min-width: min(100%, 240px);
  }
`
const Tout = styled(ActionCard)`
  min-width: 400px;
  margin: 1rem;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0;
    min-width: min(100%, 240px);
  }
`
const StyledCardContainer = styled(CardContainer)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-template-columns: 1fr;
  }
`

const IntroImage = styled(Img)`
  width: 100%;
  background-size: cover;
  background: no-repeat 50px;
`

const FeatureImage = styled(Img)`
  width: 100%;
`

const Subtitle = styled.div`
  margin-bottom: 2rem;
  font-size: 20px;
  line-height: 140%;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 16px;
  }
`

const EthereumIntroContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxTurquoise};
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  padding-left: 2rem;
  width: 100%;
  height: 720px;
  margin-top: -1px;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    height: 100%;
    padding-top: 2rem;
    padding-left: 0rem;
    padding-bottom: 2rem;
  }
`

const FinanceContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxOrange};
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 720px;
  margin-top: -1px;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    height: 100%;
    height: 100%;
    padding-top: 2rem;
    padding-right: 0rem;
    padding-bottom: 2rem;
  }
`

const NftContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxMint};
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 720px;
  margin-top: -1px;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    height: 100%;
    height: 100%;
    padding-top: 2rem;
    padding-right: 0rem;
    padding-bottom: 2rem;
  }
`

const InternetContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxPink};
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  padding-left: 2rem;
  height: 720px;
  width: 100%;
  margin-top: -1px;
  margin-bottom: 0rem;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    height: 100%;
    padding-top: 2rem;
    padding-left: 0rem;
    padding-bottom: 2rem;
  }
`

const DeveloperContainer = styled.div`
  background: ${(props) => props.theme.colors.homeBoxPurple};
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 720px;
  width: 100%;
  margin-top: -1px;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    height: 100%;
  }
`

const FeatureContent = styled(LeftColumn)`
  padding: 6rem;
  height: 100%;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 2rem;
  }
`

const LeftColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const IntroLeftColumn = styled(LeftColumn)`
  padding: 6rem;
  height: 100%;
  width: 100%;
  margin: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 2rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding: 0rem;
  }
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
  margin-right: 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
  }
  &:hover {
    fill: ${(props) => props.theme.colors.primary};
  }
  &:active {
    fill: ${(props) => props.theme.colors.primary};
  }
  &:focus {
    fill: ${(props) => props.theme.colors.primary};
  }
`

const H2 = styled.h2`
  margin: 0 0 1.5rem;
`

const StyledH2 = styled.h2`
  margin-bottom: 0.5rem;
  font-family: serif;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 24px;
  }
`

const StyledCardList = styled(TitleCardList)`
  margin-left: 4rem;
  max-width: 624px;
  border: 1px solid ${(props) => props.theme.colors.text};
  box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-left: 0rem;
    max-width: 100%;
  }
`

const StyledCalloutBanner = styled(CalloutBanner)`
  margin: 8rem 0 4rem;
  padding: 2rem 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-bottom: 4rem;
    padding: 2rem;
  }
`

const HomePage = ({ data }) => {
  const intl = useIntl()
  const [isModalOpen, setModalOpen] = useState(false)
  const [activeCode, setActiveCode] = useState(0)

  // Language versions 2.4 & above support this homepage content
  // If current language is below, render LegacyPageHome
  if (getLangContentVersion(intl.locale) < 2.4) {
    return <LegacyPageHome />
  }

  const toggleCodeExample = (id) => {
    setActiveCode(id)
    setModalOpen(true)
  }

  const cards = [
    {
      image: data.robotfixed.childImageSharp.fixed,
      title: translateMessageId("page-index-get-started-wallet-title", intl),
      description: translateMessageId(
        "page-index-get-started-wallet-description",
        intl
      ),
      alt: translateMessageId("page-index-get-started-wallet-image-alt", intl),
      to: "/wallets/devsecops/",
    },

    {
      image: data.ethfixed.childImageSharp.fixed,
      title: translateMessageId("page-index-get-started-eth-title", intl),
      description: translateMessageId(
        "page-index-get-started-eth-description",
        intl
      ),
      alt: translateMessageId("page-index-get-started-eth-image-alt", intl),
      to: "/ai-service/",
    },
    {
      image: data.dogefixed.childImageSharp.fixed,
      title: translateMessageId("page-index-get-started-dapps-title", intl),
      description: translateMessageId(
        "page-index-get-started-dapps-description",
        intl
      ),
      alt: translateMessageId("page-index-get-started-dapps-image-alt", intl),
      to: "/desarrollo/",
    },
    {
      image: data.devfixed.childImageSharp.fixed,
      title: translateMessageId("page-index-get-started-devs-title", intl),
      description: translateMessageId(
        "page-index-get-started-devs-description",
        intl
      ),
      alt: translateMessageId("page-index-get-started-devs-image-alt", intl),
      to: "/developers/",
    },
  ]

  const touts = [
    {
      image: data.merge.childImageSharp.fixed,
      alt: translateMessageId("page-index-tout-eth2-image-alt", intl),
      title: translateMessageId("page-index-tout-eth2-title", intl),
      description: translateMessageId("page-index-tout-eth2-description", intl),
      to: "/eth2/",
    },
    {
      image: data.infrastructurefixed.childImageSharp.fixed,
      alt: translateMessageId("page-index-tout-enterprise-image-alt", intl),
      title: translateMessageId("page-index-tout-enterprise-title", intl),
      description: translateMessageId(
        "page-index-tout-enterprise-description",
        intl
      ),
      to: "/enterprise/",
    },
    {
      image: data.enterprise.childImageSharp.fixed,
      alt: translateMessageId("page-index-tout-community-image-alt", intl),
      title: translateMessageId("page-index-tout-community-title", intl),
      description: translateMessageId(
        "page-index-tout-community-description",
        intl
      ),
      to: "/community/",
    },
  ]

  // TODO import code content from source file for easier maintenance
  // so we don't have to set here as plain text, e.g.
  // import { SimpleToken } from "../data/SimpleToken.sol"
  const codeExamples = [
    {
      title: translateMessageId(
        "page-index-developers-code-example-title-0",
        intl
      ),
      description: translateMessageId(
        "page-index-developers-code-example-description-0",
        intl
      ),
      codeLanguage: "language-solidity",
      code: `from flask import Flask

      app = Flask(__name__)
      
      @app.route('/')
      def index():
          return 'Web App with Python Flask!'
      
      app.run(host='0.0.0.0', port=81)
      `,
    },
    {
      title: translateMessageId(
        "page-index-developers-code-example-title-1",
        intl
      ),
      description: translateMessageId(
        "page-index-developers-code-example-description-1",
        intl
      ),
      codeLanguage: "language-solidity",
      code: ` 
      const express = require('express')
      const app = express()
      const port = 3000
      
      app.get('/', (req, res) => {
        res.send('Hello World!')
      })
      
      app.listen(port, () => {
        console.log('Example app listening on port ')
      })
      
      
      `,
    },
    {
      title: translateMessageId(
        "page-index-developers-code-example-title-2",
        intl
      ),
      description: translateMessageId(
        "page-index-developers-code-example-description-2",
        intl
      ),
      codeLanguage: "language-javascript",
      code: `    package com.javatpoint.controller;  
      import org.springframework.web.bind.annotation.RequestMapping;  
      import org.springframework.web.bind.annotation.RestController;  
      @RestController  
      public class HelloWorldController   
      {  
      @RequestMapping("/")  
      public String hello()   
      {  
      return "Hello javaTpoint";  
      }  
      }  
      `,
    },
    {
      title: translateMessageId(
        "page-index-developers-code-example-title-3",
        intl
      ),
      description: translateMessageId(
        "page-index-developers-code-example-description-3",
        intl
      ),
      codeLanguage: "language-solidity",
      code: `var builder = WebApplication.CreateBuilder(args);

      // Add services to the container.
      // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
      builder.Services.AddEndpointsApiExplorer();
      builder.Services.AddSwaggerGen();
      
      var app = builder.Build();
      
      // Configure the HTTP request pipeline.
      if (app.Environment.IsDevelopment())
      {
          app.UseSwagger();
          app.UseSwaggerUI();
      }
      
      app.UseHttpsRedirection();
      
      var summaries = new[]
      {
          "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
      };
      
      app.MapGet("/weatherforecast", () =>
      {
          var forecast = Enumerable.Range(1, 5).Select(index =>
             new WeatherForecast
             (
                 DateTime.Now.AddDays(index),
                 Random.Shared.Next(-20, 55),
                 summaries[Random.Shared.Next(summaries.Length)]
             ))
              .ToArray();
          return forecast;
      })
      .WithName("GetWeatherForecast");
      
      app.Run();
      
      internal record WeatherForecast(DateTime Date, int TemperatureC, string? Summary)
      {
          public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
      }
      `,
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-index-meta-title", intl)}
        description={translateMessageId("page-index-meta-description", intl)}
      />
      <Hero
        fluid={data.hero.childImageSharp.fluid}
        alt={translateMessageId("page-index-hero-image-alt", intl)}
        loading="eager"
      />
      <Morpher />
      <Header>
        <H1>
          <Translation id="page-index-title" />
        </H1>
        <Description>
          <Translation id="page-index-description" />
        </Description>
        <ButtonLink isSecondary to="/que-es-newinntech/">
          <Translation id="page-index-title-button" />
        </ButtonLink>
      </Header>
      <StyledGrayContainer>
        <StyledContent>
          <IntroRow>
            <IntroLeftColumn>
              <H2>
                <Translation id="page-index-get-started" />
              </H2>
              <Subtitle>
                <Translation id="page-index-get-started-description" />
              </Subtitle>
            </IntroLeftColumn>
            <ImageContainer>
              <IntroImage
                fluid={data.hackathon.childImageSharp.fluid}
                alt={translateMessageId(
                  "page-index-get-started-image-alt",
                  intl
                )}
              />
            </ImageContainer>
          </IntroRow>
          <StyledCardContainer>
            {cards.map((card, idx) => (
              <StyledCard
                key={idx}
                title={card.title}
                description={card.description}
                to={card.to}
                image={card.image}
                alt={card.alt}
              />
            ))}
          </StyledCardContainer>
        </StyledContent>
      </StyledGrayContainer>
      <EthereumIntroContainer>
        <RowReverse>
          <FeatureContent>
            <StyledH2>
              <Translation id="page-index-what-is-ethereum" />
            </StyledH2>
            <Subtitle>
              <Translation id="page-index-what-is-ethereum-description" />
            </Subtitle>
            <ButtonRow>
              <ButtonLink to="/que-es-newinntech/">
                <Translation id="page-index-what-is-ethereum-button" />
              </ButtonLink>
            </ButtonRow>
          </FeatureContent>
          <ImageContainer>
            <FeatureImage
              fluid={data.ethereum.childImageSharp.fluid}
              alt={translateMessageId(
                "page-index-what-is-ethereum-image-alt",
                intl
              )}
            />
          </ImageContainer>
        </RowReverse>
      </EthereumIntroContainer>
      <FinanceContainer>
        <Row>
          <FeatureContent>
            <LeftColumnContent>
              <StyledH2>
                <Translation id="page-index-defi" />
              </StyledH2>
              <Subtitle>
                <Translation id="page-index-defi-description" />
              </Subtitle>
              <div>
                <ButtonLink to="/defi/">
                  <Translation id="page-index-defi-button" />
                </ButtonLink>
              </div>
            </LeftColumnContent>
          </FeatureContent>
          <ImageContainer>
            <FeatureImage
              fluid={data.impact.childImageSharp.fluid}
              alt={translateMessageId("page-index-defi-image-alt", intl)}
            />
          </ImageContainer>
        </Row>
      </FinanceContainer>
      <DeveloperContainer>
        <CodeExampleContent>
          <StyledCardList
            content={codeExamples}
            limit={5}
            clickHandler={toggleCodeExample}
            header="Código de ejemplo"
            icon="code"
            isCode
          />
        </CodeExampleContent>
        <FeatureContent>
          <LeftColumnContent>
            <StyledH2>
              <Translation id="page-index-developers" />
            </StyledH2>
            <Subtitle>
              <Translation id="page-index-developers-description" />
            </Subtitle>
            <ButtonRow>
              <ButtonLink to="/developers/">
                <Translation id="page-index-developers-button" />
              </ButtonLink>
            </ButtonRow>
          </LeftColumnContent>
        </FeatureContent>
        <CodeboxModal
          isOpen={isModalOpen}
          setIsOpen={setModalOpen}
          title={codeExamples[activeCode].title}
        >
          <Codeblock
            codeLanguage={codeExamples[activeCode].codeLanguage}
            allowCollapse={false}
            fromHomepage
          >
            {codeExamples[activeCode].code}
          </Codeblock>
        </CodeboxModal>
      </DeveloperContainer>
      <StyledGrayContainer>
        <StyledContent>
          <h2>
            <Translation id="page-index-network-stats-title" />
          </h2>
          <Subtitle>
            <Translation id="page-index-network-stats-subtitle" />
          </Subtitle>
        </StyledContent>
        <StatsBoxGrid />
      </StyledGrayContainer>
      <StyledContent>
        <h2>
          <Translation id="page-index-touts-header" />
        </h2>
      </StyledContent>
      <StyledContent>
        <StyledCardContainer>
          {touts.map((tout, idx) => {
            return (
              <Tout
                key={idx}
                title={tout.title}
                description={tout.description}
                to={tout.to}
                image={tout.image}
              />
            )
          })}
        </StyledCardContainer>
        <StyledCalloutBanner
          title={translateMessageId(
            "page-index-contribution-banner-title",
            intl
          )}
          description={translateMessageId(
            "page-index-contribution-banner-description",
            intl
          )}
          image={data.finance.childImageSharp.fluid}
          maxImageWidth={600}
          alt={translateMessageId(
            "page-index-contribution-banner-image-alt",
            intl
          )}
        >
          <ButtonRow>
            <ButtonLink to="/en/contributing/">
              <Translation id="page-index-contribution-banner-button" />
            </ButtonLink>
            <StyledButtonLink isSecondary to="https://github.com/newinntech">
              <StyledIcon name="github" /> GitHub
            </StyledButtonLink>
          </ButtonRow>
        </StyledCalloutBanner>
      </StyledContent>
    </Page>
  )
}

export default HomePage

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "home/hero.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ethereum: file(relativePath: { eq: "newinntech5.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    enterprise: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    dogefixed: file(relativePath: { eq: "software-development1.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    robotfixed: file(relativePath: { eq: "devops5.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    ethfixed: file(relativePath: { eq: "ai-dev3.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    devfixed: file(relativePath: { eq: "web-design6.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    future: file(relativePath: { eq: "future_transparent.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    impact: file(relativePath: { eq: "consulting.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    finance: file(relativePath: { eq: "finance_transparent.png" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    hackathon: file(relativePath: { eq: "development.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    infrastructure: file(
      relativePath: { eq: "infrastructure_transparent.png" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    infrastructurefixed: file(
      relativePath: { eq: "infrastructure_transparent.png" }
    ) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    merge: file(relativePath: { eq: "eth2/merge.png" }) {
      childImageSharp {
        fixed(width: 320) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
