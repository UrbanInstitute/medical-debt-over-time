<script>
  import { logClickToGA } from "@urbaninstitute/dataviz-components";
  import {
    getNamefromPosition,
    selected_position,
    updateGeo,
    updateURL
  } from "../../../stores/geographies";
  import {
    isMainChartMagnitude,
    selected_minor_metrics,
    selected_year
  } from "../../../stores/line-chart-control";

  function loadNewRegion(e, geoid) {
    updateGeo(0, geoid);
    updateGeo(1, "999999");
    updateGeo(2, "999999");
    selected_position.set(0);
    logClickToGA(e.target, "highlight_region_selected--" + getNamefromPosition(0));
    updateURL();
    if (geoid == "48207") {
      selected_minor_metrics.set(["uninsured", ""]);
      selected_year.set("2022");
    } else if (geoid == "13301") {
      isMainChartMagnitude.set(false);
      selected_year.set("2021");
    } else {
      isMainChartMagnitude.set(false);
      selected_year.set("2023");
    }
  }

  let width;
  let currentPosition = 0;
  let side_arrow = "./side-arrow.svg";

  let check_more_data = [
    {
      position: 0,
      headline_stat: "0%",
      var_label: "with medical debt in 2023",
      location: "Colorado",
      statement: `In August 2023, Colorado <a href="https://copolicy.org/news/colorados-medical-debt-credit-reporting-law-takes-effect/" target = "_blank">enacted a consumer protection law</a> that excluded all medical debt information from credit reports, dropping the share of people with debt in collections to zero.`,
      region_code: "08"
    },
    {
      position: 1,
      headline_stat: "21%",
      var_label: "with medical debt in 2023",
      location: "Wyoming",
      statement: `Despite the changes in medical debt reporting to credit bureaus, Wyoming still has large discrepancies by race and ethnicity. While just under 10 percent of white communities have medical debt in collections, 21 percent of communities of color do.`,
      region_code: "56"
    },
    {
      position: 2,
      headline_stat: "50.5%",
      var_label: "with medical debt in 2021",
      location: "Warren County, Georgia",
      statement: `In 2021, Warren County, Georgia, <a href = "https://www.urban.org/research/publication/which-county-characteristics-predict-medical-debt" target = "_blank">had the highest share of residents with medical debt in collections</a> of any county nationwide. Following national reporting changes, that share fell to just under 18 percent in 2023.`,
      region_code: "13301"
    },
    {
      position: 3,
      headline_stat: "20%",
      var_label: "without health insurance in 2022",
      location: "Haskell County, Texas",
      statement: `Nationwide, just 9 percent of people lack health insurance coverage. That number more than doubles in Haskell County, Texas, partially explaining the disproportionately high share of residents with medical debt in collections.`,
      region_code: "48207"
    }
  ];
</script>

<svelte:window bind:innerWidth={width} />
<div class="container" id="check-out-more">
  <div class="block">
    <div class="heading">
      <h2 style="color: var(--color-gray-shade-darkest);">
        How Local Policies Impact Medical Debt
      </h2>
    </div>
    <div class="content">
      {#if width > 780}
        <div class="slice">
          <div class="one-item">
            <div class="headline-stat">{check_more_data[0].headline_stat}</div>
            <div class="var-label">{check_more_data[0].var_label}</div>
            <div class="location">{check_more_data[0].location}</div>
            <div class="statement">{@html check_more_data[0].statement}</div>
            <button
              class="explore-me"
              on:click={(e) => loadNewRegion(e, check_more_data[0].region_code)}
              >View charts &#8594;</button
            >
          </div>
          <div class="one-item">
            <div class="headline-stat">{check_more_data[1].headline_stat}</div>
            <div class="var-label">{check_more_data[1].var_label}</div>
            <div class="location">{check_more_data[1].location}</div>
            <div class="statement">{@html check_more_data[1].statement}</div>
            <button
              class="explore-me"
              on:click={(e) => loadNewRegion(e, check_more_data[1].region_code)}
              >View charts &#8594;</button
            >
          </div>
        </div>
        <div
          class="slice"
          style="border-top: 1px solid var(--color-gray-shade-dark); padding-top: 40px;"
        >
          <div class="one-item">
            <div class="headline-stat">{check_more_data[2].headline_stat}</div>
            <div class="var-label">{check_more_data[2].var_label}</div>
            <div class="location">{check_more_data[2].location}</div>
            <div class="statement">{@html check_more_data[2].statement}</div>
            <button
              class="explore-me"
              on:click={(e) => loadNewRegion(e, check_more_data[2].region_code)}
              >View charts &#8594;</button
            >
          </div>
          <div class="one-item">
            <div class="headline-stat">{check_more_data[3].headline_stat}</div>
            <div class="var-label">{check_more_data[3].var_label}</div>
            <div class="location">{check_more_data[3].location}</div>
            <div class="statement">{@html check_more_data[3].statement}</div>
            <button
              class="explore-me"
              on:click={(e) => loadNewRegion(e, check_more_data[3].region_code)}
              >View charts &#8594;</button
            >
          </div>
        </div>
      {:else}
        <div class="item-and-arrow">
          <div class="one-item">
            <div class="headline-stat">
              {check_more_data.find((d) => d.position == currentPosition)?.headline_stat}
            </div>
            <div class="var-label">
              {check_more_data.find((d) => d.position == currentPosition)?.var_label}
            </div>
            <div class="location">
              {check_more_data.find((d) => d.position == currentPosition)?.location}
            </div>
            <div class="statement">
              {@html check_more_data.find((d) => d.position == currentPosition)?.statement}
            </div>
            <button
              class="explore-me"
              on:click={(e) =>
                loadNewRegion(
                  e,
                  check_more_data.find((d) => d.position == currentPosition)?.region_code
                )}>View charts &#8594;</button
            >
          </div>
          <button
            class="see-more-button"
            on:click={(e) => {
              currentPosition = (currentPosition + 1) % 4;
              logClickToGA(e.target, "see_more_highlights--clicked");
            }}
            style="background-image: url({side_arrow});"
          />
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .container {
    background-color: var(--color-gray-shade-lighter);
    height: 500px fit-content;
    padding: 60px 0px 30px 0px;
  }
  .block {
    margin: 0px auto;
    max-width: 1190px;
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 50px;
  }
  .heading {
    flex: 0 1 25%;
  }
  .content {
    flex: 0 1 70%;
  }
  .slice {
    display: flex;
    margin: 20px 0px;
    gap: 60px;
  }
  .one-item {
    flex: 1 1 47%;
  }
  .item-and-arrow {
    display: flex;
    gap: 40px;
    align-items: top;
  }
  .headline-stat {
    font-size: 36px;
    font-weight: 700;
    color: var(--color-gray-shade-darkest);
    line-height: 41px;
  }
  .var-label {
    font-weight: 400;
    font-size: 14px;
    text-transform: uppercase;
    color: var(--color-gray-shade-darker);
  }
  .location {
    font-weight: 700;
    font-size: 18px;
    margin-top: 13px;
    margin-bottom: 5px;
  }
  .statement {
    font-size: 20px;
  }
  .see-more-button {
    flex: 0 0 auto;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    background-size: contain;
    transition: 300ms ease-in-out;
  }
  .see-more-button:hover {
    outline: 3px solid var(--color-blue-shade-dark);
  }

  .explore-me {
    border: none;
    cursor: pointer;
    background-color: transparent;
    color: var(--color-blue);
    padding: 0px;
    margin: 15px 0px;
    font-size: 18px;
    font-weight: 700;
  }
  .explore-me:hover {
    color: var(--color-blue-shade-darker);
  }
  @media screen and (max-width: 1270px) {
    .block {
      margin: 0px 40px;
    }
  }
  @media screen and (max-width: 1000px) {
    .block {
      flex-direction: column;
      margin-right: 60px;
      gap: 5px;
    }
    .container {
      padding-top: 15px;
      padding-bottom: 23px;
    }
  }
  @media screen and (max-width: 450px) {
    .item-and-arrow {
      gap: 15px;
    }
  }
</style>
