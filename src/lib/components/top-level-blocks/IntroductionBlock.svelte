<script>
  import { goto } from "$app/navigation";
  import { Block } from "@urbaninstitute/dataviz-components";

  function goToHighlights() {
    goto("#check-out-more");
  }

  let width = 100;
</script>

<svelte:window bind:innerWidth={width} />

<Block width="wide">
  <div class="pad-on-mobile" style="margin-top: 52px; margin-bottom: 30px;">
    {#if width > 1000}
    <h1 style="margin-bottom: 0px;">
      The Changing Medical Debt<br />Landscape in the United States
    </h1>
    {:else}
    <h1 style="margin-bottom: 0px;">
      The Changing Medical Debt Landscape in the United States
    </h1>
    {/if}
    <p style="margin-top: 10px; line-height: 100%; color: var(--color-gray-shade-darker); font-weight: 400; font-size: .875rem;">
      July 10, 2024
    </p>
  </div>
  
</Block>

<div class="container">
  <Block width="wide">
    <div class="inner pad-on-mobile">
      <div class="left">
        <div>
          {#if width > 1000}
            <h3>
              <a
                href="https://kffhealthnews.org/news/article/diagnosis-debt-investigation-100-million-americans-hidden-medical-debt/"
                target="_blank">Millions of Americans</a
              >
              have <br /> medical debt in collections.
            </h3>
          {:else}
            <h3>
              <a
                href="https://kffhealthnews.org/news/article/diagnosis-debt-investigation-100-million-americans-hidden-medical-debt/"
                target="_blank">Millions of Americans</a
              >
              have medical debt in collections.
            </h3>
          {/if}
          <p>
            Medical debt can intensify
            <a href="https://www.aeaweb.org/articles?id=10.1257/aer.20161038" target="_blank"
              >financial challenges</a
            >, affect
            <a
              href="https://www.kff.org/health-costs/report/kff-health-care-debt-survey/"
              target="_blank">health care access</a
            >, and potentially
            <a href="https://pubmed.ncbi.nlm.nih.gov/23849243/" target="_blank">worsen health</a>
            outcomes. Starting in 2022, the three nationwide credit reporting companies made significant
            changes to medical debt reporting. Paid medical collections were removed from credit reports,
            debt in collections would no longer be used in calculating Vantage credit scores, the grace
            period for medical debt was extended to one year, and collections under $500 were excluded
            from consumer credit reports.<br /><br />These changes helped
            <a
              href="https://www.urban.org/urban-wire/medical-debt-was-erased-credit-records-most-consumers-potentially-improving-many"
              target="_blank"
              >cut the number of Americans with medical debt in collections in half and improve
              credit scores</a
            >. But,
            <a
              href="https://www.consumerfinance.gov/about-us/newsroom/cfpb-finds-15-million-americans-have-medical-bills-on-their-credit-reports/"
              target="_blank">15 million Americans still have medical debt in collections</a
            >, and most debt balances remain on credit reports. The Biden-Harris Administration has
            called on states and localities to reduce the burden of medical debt and has
            <a
              href="https://www.whitehouse.gov/briefing-room/statements-releases/2024/06/11/fact-sheet-vice-president-harris-announces-proposal-to-prohibit-medical-bills-from-being-included-on-credit-reports-and-calls-on-states-and-localities-to-take-further-actions-to-reduce-medical-debt/"
              target="_blank">announced new actions</a
            >
            to remove medical debt from credit reports altogether.
          </p>
          <button class="explore-me" on:click={goToHighlights}>
            View Highlighted Geographies &#8594;
          </button>
        </div>
      </div>

      <div class="right">
        <img
          id="intro-img"
          src="./map-state-share-debt-053024.svg"
          alt="A map of the United States showing states colored by the share of households with medical debt. Wyoming and Oklahoma stand out with the most households with debt."
        />
        <div class="map-legend">
          <div class="map-legend-title">2023 Share with Medical Debt in Collections</div>
          <div class="map-legend-color">
            <div class="map-legend-color-labels">
              <div class="bottom">0%</div>
              <div class="top">10.1%</div>
            </div>
            <div class="map-legend-color-band" />
          </div>
        </div>
      </div>
    </div>
  </Block>
</div>

<style>
  .container {
    background-color: var(--color-gray-shade-lightest);
    padding: 20px 0 40px;
  }

  .inner {
    padding: 20px 0 40px;
    display: flex;
    gap: 40px;
    justify-content: space-between;
    align-items: center;
  }
  .explore-me {
    display: block;
    margin-top: 30px;
    padding-left: 0px;
    border: none;
    cursor: pointer;
    background-color: transparent;
    color: var(--color-blue);
    font-size: 18px;
    font-weight: 700;
  }
  .explore-me:hover {
    color: var(--color-blue-shade-darker);
  }

  #intro-img {
    max-height: 420px;
    width: 100%;
  }
  .map-legend {
    display: flex;
    gap: 20px;
    align-items: center;
    margin: 0px 20px;
  }
  .map-legend-title {
    font-size: 14px;
    margin: 6px 0px;
    font-weight: 700;
    flex: 0 1 auto;
  }
  .map-legend-color {
    flex: 0 1 auto;
    width: 100%;
  }
  .map-legend-color-labels {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .bottom,
  .top {
    flex: 0 1 auto;
    width: fit-content;
  }
  .right {
    flex: 0 1 45%;
  }
  .left {
    width: fit-content;
    flex: 0 1 55%;
    font-size: 14px;
  }
  .map-legend-color-band {
    height: 10px;
    width: 100%;
    margin-top: 5px;
    background-image: linear-gradient(
      to right,
      var(--color-blue-shade-lightest),
      var(--color-blue-shade-lighter),
      var(--color-blue-shade-light),
      var(--color-blue-shade-medium),
      var(--color-blue),
      var(--color-blue-shade-dark),
      var(--color-blue-shade-darker),
      var(--color-blue-shade-darkest)
    );
  }

  @media screen and (max-width: 1000px) {
    .inner {
      display: block;
    }
    .right {
      display: none;
    }
  }
  @media screen and (max-width: 1227px) {
    .pad-on-mobile {
      padding: 0 20px;
    }
  }
</style>
