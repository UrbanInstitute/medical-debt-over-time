<script>
  import {
    Block,
    HeadingAlt,
    TextBlock,
    ProjectCredits,
    Button,
    logClickToGA
  } from "@urbaninstitute/dataviz-components";
  import IconDownload from "../smallest-atoms/IconDownload.svelte";

  let width = 100;
</script>

<svelte:window bind:innerWidth={width} />
<div style="margin-top: {width < 1000 ? 38 : 100}px;" />
<Block width="body">
  <HeadingAlt content="About the Data" />
</Block>
<TextBlock>
  Below we list definitions of the indicators included in this tool.
  <div style="margin-top: 15px;" />
  <strong>Share with medical debt in collections</strong> is the share of adults with a credit
  bureau record who have medical debt in collections in their records.
  <div style="margin-top: 15px;" />
  <strong>Median amount of medical debt</strong> is the median amount of medical debt in collections
  among those with medical debt in collections in their records.
  <div style="margin-top: 15px;" />
  <strong>White communities</strong> are zip code tabulation areas where at least 50 percent of the
  population is white.
  <div style="margin-top: 15px;" />
  <strong>Communities of color</strong> are zip code tabulation areas where at least 50 percent of
  the population is people of color.
  <div style="margin-top: 15px;" />
  <strong>Hospital market concentration</strong> uses the Herfindahl–Hirschman index (HHI), based on
  adjusted admissions of nonfederal general medical/surgical hospitals within a health system.
  Measured on a 0 to 10,000 scale, where 0 indicates a perfectly competitive market while 10,000
  indicates a monopoly.
  <div style="margin-top: 15px;" />
  <strong>Hospital closures and mergers</strong> refer to the number of short-term and critical
  access hospitals that have closed or merged.
  <div style="margin-top: 15px;" />
  The <strong>uninsured</strong> is defined as the share of the total population that does not have
  health insurance.
  <div style="margin-top: 15px;" />
  <strong>Disabled adults</strong> are the share of the nonelderly adult population (ages 18 to 64)
  that reports having any one of six disability types.
  <div style="margin-top: 15px;" />
  <strong>Average household income</strong> is the average household income measured in 2023
  dollars.
  <div style="margin-top: 35px;" />
  Our medical debt estimates are derived from the Urban Institute Credit Bureau Panel. This dashboard
  is based on annual data collected from August 2011 through August 2023, which consists of a 2 percent
  random sample of consumers in each year from 2011 through 2019 (i.e., more than 5 million consumers
  in each year) and a 4 percent random sample from 2020 through 2023 (i.e., more than 10 million consumers).
  The consumer panel is refreshed at each data pull to keep the sample representative at the national
  level. Hospital market concentration estimates are derived from the American Hospital Association Annual
  Survey Database. Closures and mergers data are derived from the Provider of Services File provided
  by the Centers for Medicare & Medicaid Services.
  <br /><br />
  The estimates of uninsured, disabled adults, average household income, and racial composition are from
  the US Census Bureau’s American Community Survey (ACS) summary tables. We use ACS one-year estimates
  for state—and national-level statistics, but we use the ACS five-year estimates for counties and zip
  code tabulation area-level information.
</TextBlock>

<Block>
  <br />
  <Button variant="secondary-black" on:click={(e) => {
    window.open(
      "https://datacatalog.urban.org/",
      "_blank"
    );
    logClickToGA(e.target, "button-click__download-technical-appendix");
  }}
    >Download Data <svelte:fragment slot="icon" let:iconColor
      ><IconDownload size={16} fill={iconColor} /></svelte:fragment
    ></Button
  >
  <span style="display:inline-block; width: 15px;" />
  {#if width < 520}
    <div style="height: 25px;" />
  {/if}
  <Button
    variant="secondary-black"
    on:click={(e) => {
      window.open(
        "./Appendix_The Changing Medical Debt Landscape in the United States final.pdf",
        "_blank"
      );
      logClickToGA(e.target, "button-click__download-technical-appendix");
    }}
    >Technical appendix <svelte:fragment slot="icon" let:iconColor
      ><IconDownload size={16} fill={iconColor} /></svelte:fragment
    ></Button
  >
</Block>

<div style="margin-top: 100px;" />

<Block width="body">
  <HeadingAlt content="Additional Resources" />
</Block>

<TextBlock>
  <a href="https://apps.urban.org/features/debt-interactive-map/" target="_blank"
    >Debt in America: An Interactive Map</a
  >
  <div style="margin-top: 15px;" />
  <a
    href="https://www.urban.org/research/publication/which-county-characteristics-predict-medical-debt"
    target="_blank">Which County Characteristics Predict Medical Debt?</a
  >
  <div style="margin-top: 15px;" />
  <a
    href="https://www.urban.org/urban-wire/medical-debt-was-erased-credit-records-most-consumers-potentially-improving-many"
    target="_blank"
    >Medical Debt Was Erased from Credit Records for Most Consumers, Potentially Improving Many
    Americans' Lives</a
  >
  <div style="margin-top: 15px;" />
  <a
    href="https://www.urban.org/urban-wire/how-address-medical-debt-burdens-immigrant-communities"
    target="_blank">How to Address Medical Debt Burdens in Immigrant Communities</a
  >
  <div style="margin-top: 15px;" />
  <a href="https://docs.iza.org/dp16448.pdf" target="_blank"
    >The Impact of Hospital Closures on Medical Debt in Collections: Analysis Using Consumer Credit
    Bureau Data</a
  >
  (PDF)
  <div style="margin-top: 15px;" />
  <a
    href="https://www.urban.org/research/publication/which-hospital-financial-characteristics-are-associated-medical-debt"
    target="_blank">Which Hospital Financial Characteristics Are Associated with Medical Debt?</a
  >
  <div style="margin-top: 15px;" />
  <a
    href="https://www.urban.org/research/publication/how-many-adults-have-past-due-medical-bills-credit-cards"
    target="_blank">How Many Adults Have Past-Due Medical Bills on Credit Cards?</a
  >
  <div style="margin-top: 15px;" />
  <a
    href="https://www.urban.org/research/publication/medical-debt-new-york-state-and-its-unequal-burden-across-communities"
    target="_blank">Medical Debt in New York State and Its Unequal Burden across Communities</a
  >
  <div style="margin-top: 15px;" />
  <a
    href="https://www.urban.org/research/publication/medical-debt-new-york-state-varies-widely-across-regions-and-communities"
    target="_blank"
    >Medical Debt in New York State: Estimates for Large Cities and Towns, State Legislative
    Districts, Congressional Districts, and Other Geographic Areas</a
  >
  <div style="margin-top: 15px;" />
  <a
    href="https://www.urban.org/research/publication/most-adults-past-due-medical-debt-owe-money-hospitals"
    target="_blank">Most Adults with Past-Due Medical Debt Owe Money to Hospitals</a
  >
  <div style="margin-top: 15px;" />
  <a
    href="https://www.urban.org/research/publication/medical-debt-fell-during-pandemic-how-can-decline-be-sustained"
    target="_blank">Medical Debt Fell during the Pandemic. How Can the Decline Be Sustained?</a
  >
</TextBlock>

<div style="margin-top: 100px;" />

<ProjectCredits
  heading="Project credits"
  items={[
    {
      label: "Research",
      content:
        "<a href='https://www.urban.org/author/fredric-blavin' target = '_blank'>Fredric Blavin</a>, <a href='https://www.urban.org/author/breno-braga' target = '_blank'>Breno Braga</a>, <a href='https://www.urban.org/author/noah-johnson' target ='_blank'>Noah Johnson</a>, and <a href='https://www.urban.org/author/apueela-wekulom' target = '_blank'>Apueela Wekulom</a>"
    },
    {
      label: "Design",
      content: "<a href='https://www.urban.org/author/brittney-spinner' target='_blank'>Brittney Spinner</a>"
    },
    {
      label: "Data visualization and development",
      content: "<a href='https://www.urban.org/author/rachel-marconi' target='_blank'>Rachel Marconi</a>"
    },
    {
      label: "Writing",
      content: "<a href='https://www.urban.org/author/wesley-jenkins' target='_blank'>Wesley Jenkins</a>"
    }
  ]}
  githubUrl="https://github.com/UrbanInstitute/medical-debt-over-time"
>
  <TextBlock slot="intro">
    This data tool was supported by Arnold Ventures. We are grateful to them and to all our funders,
    who make it possible for Urban to advance its mission. The views expressed are those of the
    authors and should not be attributed to the Urban Institute, its trustees, or its funders.
    Funders do not determine research findings or the insights and recommendations of our experts.
    More information on our funding principles is available <a
      href="https://www.urban.org/about/organizational-principles"
      target="_blank">here</a
    >. Read our terms of service
    <a href="https://www.urban.org/terms-service" target="_blank">here</a>.
  </TextBlock>
</ProjectCredits>

<style>
</style>
