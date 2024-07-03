<script>
  import {
    isMainChartMagnitude,
    main_metric,
    metric_meta_data,
    selected_minor_metrics,
    selected_year
  } from "../../../stores/line-chart-control";
  import { areWeSearching, selected_position, updateGeo } from "../../../stores/geographies";
  import LineChartBlock from "../charts/LineChartBlock.svelte";
  import RegionSelector from "../region-selection/RegionSelector.svelte";
  import Sidebar from "../sidebar/Sidebar.svelte";
  import SearchPopup from "../region-selection/SearchPopup.svelte";
  import Toggle from "../smallest-atoms/Toggle.svelte";
  import CollapsingSection from "../sidebar/CollapsingSection.svelte";
  import SidebarFilters from "../sidebar/SidebarFilters.svelte";
  import SidebarMostRecentData from "../sidebar/SidebarMostRecentData.svelte";
  import SidebarMetrics from "../sidebar/SidebarMetrics.svelte";
  import { Block, logClickToGA } from "@urbaninstitute/dataviz-components";
  import NoChart from "../charts/NoChart.svelte";
  import SharePopup from "$components/smallest-atoms/SharePopup.svelte";

  let active_amount = $isMainChartMagnitude,
    active_share = !$isMainChartMagnitude;

  let isSharePopupOpen = false;

  let onMainToggleClick = () => {
    isMainChartMagnitude.set(!$isMainChartMagnitude);
    active_amount = !active_amount;
    active_share = !active_share;
  };

  let removeAllRegions = (e) => {
    selected_position.set(-1);
    updateGeo(0, "999999");
    updateGeo(1, "999999");
    updateGeo(2, "999999");
    selected_year.set("2022");
    logClickToGA(e.target, "reset_regions--all_removed");
  };

  let openSharePopup = () => {
    isSharePopupOpen = true;
  };

  let width = 100;
  $: mobile = width <= 780;
</script>

<svelte:window bind:innerWidth={width} />
<Block width="wide">
  <div class="flex-container">
    <div class="right {mobile ? 'full' : ''}">
      <h2 id="chart-area">Explore Medical Debt in Collections by Geography over Time</h2>
      <div class="region-selector-container">
        <RegionSelector position={0} />
        <RegionSelector position={1} />
        <RegionSelector position={2} />
        {#if $areWeSearching}
          <SearchPopup />
        {/if}
      </div>

      <div class="button-row">
        <div class="button-row-item">
          <button
            class="minor-button"
            style="color: #1696D2; font-weight: 700; {$selected_position == -1
              ? 'outline: 2px solid var(--color-gray);'
              : ''}"
            on:click={(e) => {
              selected_position.set(-1);
              logClickToGA(e.target, "new_selected_region--national");
            }}
          >
            {$selected_position == -1 ? "Viewing" : "View"} nationwide data
          </button>
          <span> | </span>
          <button
            class="minor-button"
            style="color: #1696D2; font-weight: 700;"
            on:click={openSharePopup}
          >
            Share Selection
          </button>
        </div>

        <button
          class="minor-button button-row-item button-row-item-smaller"
          on:click={removeAllRegions}
        >
          <img src="./refresh.svg" alt="Refresh" />
          RESET
        </button>
        {#if isSharePopupOpen}
          <SharePopup
            {mobile}
            onClose={() => {
              isSharePopupOpen = false;
            }}
          />
        {/if}
      </div>

      <div class="heading-and-toggles">
        <div class="main-chart-header">
          <h4 class="chart-title">
            {$metric_meta_data.find((d) => d.metric == $main_metric).chart_title}
          </h4>
        </div>
        {#if !mobile}
          <div class="toggles">
            <Toggle
              labelPosition="right"
              bind:active={active_share}
              label="Share"
              onClick={(e) => {
                onMainToggleClick();
                logClickToGA(e.target, "metric_change--share_debt_all");
              }}
            />
            <Toggle
              labelPosition="right"
              bind:active={active_amount}
              label="Amount"
              onClick={(e) => {
                onMainToggleClick();
                logClickToGA(e.target, "metric_change--amount_debt_all");
              }}
            />
          </div>
        {/if}
      </div>

      <div style="height: 400px;"><LineChartBlock metric={$main_metric} /></div>
      <div class="notes">
        <strong>Notes:</strong>
        July 2022: Stopped reporting collections less than a year old. April 2023: Stopped reporting
        collections less than $500. Data are collected annually in August.
      </div>

      {#if mobile}
        <div class="section">
          <CollapsingSection headingContent="Filters">
            <SidebarFilters />
          </CollapsingSection>
          <CollapsingSection headingContent="Selected Geography Data">
            <SidebarMostRecentData mobile={true} />
          </CollapsingSection>
          <CollapsingSection headingContent="Potential Debt Drivers">
            <SidebarMetrics mobile={true} />
          </CollapsingSection>
        </div>
      {/if}

      <div class="divider-header">
        <div class="divider"></div>
        <h3>Potential&nbsp;Debt&nbsp;Drivers</h3>
        <div class="divider"></div>
      </div>

      <div class="minor-charts">
        <div class="chart-block">
          {#if $selected_minor_metrics[0] != ""}
            <h4 class="chart-title">
              {$metric_meta_data.find((d) => d.metric == $selected_minor_metrics[0])?.chart_title}
            </h4>
            <div class="minor-chart-block">
              <LineChartBlock metric={$selected_minor_metrics[0]} />
            </div>
          {:else}
            <div class="minor-chart-block">
              <NoChart />
            </div>
          {/if}
        </div>
        <div class="chart-block">
          {#if $selected_minor_metrics[1] != ""}
            <h4 class="chart-title">
              {$metric_meta_data.find((d) => d.metric == $selected_minor_metrics[1])?.chart_title}
            </h4>
            <div class="minor-chart-block">
              <LineChartBlock metric={$selected_minor_metrics[1]} />
            </div>
          {:else}
            <div class="minor-chart-block">
              <NoChart />
            </div>
          {/if}
        </div>
      </div>
    </div>
    {#if !mobile}
      <div class="left">
        <Sidebar />
      </div>
    {/if}
  </div>
</Block>

<style>
  .flex-container {
    display: flex;
    gap: 30px;
    height: fit-content;
    margin: 60px 0 100px 0;
    /* max-width: 1190px; */
    flex-direction: row-reverse;
  }
  .right {
    flex: 1 1 auto;
    width: 100%;
  }
  .left {
    flex: 0 0 auto;
    width: 310px;
    border-right: 1px solid var(--color-gray);
  }
  .right {
    height: fit-content;
  }
  .region-selector-container {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    gap: 10px;
    margin-bottom: 10px;
  }
  .button-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 56px;
    position: relative;
    flex-wrap: wrap;
  }
  .button-row-item {
    flex: 0 0 auto;
    text-align: end;
    font-size: 18px;
    font-weight: 700;
    width: fit-content;
  }
  .button-row-item-smaller {
    font-size: 16px;
  }
  .minor-button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    margin: 0;
    padding: 5px 5px;
    color: var(--color-black);
  }

  .main-chart-header {
    display: flex;
    justify-content: space-between;
  }
  .heading-and-toggles {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 30px 0px;
  }
  .main-chart-header > .chart-title {
    margin: 0px;
  }
  .chart-title {
    background-color: var(--color-gray-shade-lighter);
    padding: 6px 12px;
    line-height: 1.25;
    display: inline-block;
    text-align: center;
    width: fit-content;
    margin: 0 auto;
  }
  .notes {
    margin-top: 20px;
    margin-left: 20px;
    font-size: 14px;
  }
  .section {
    margin: 40px 0px;
    padding-top: 25px;
    border-top: 1px solid var(--color-gray-shade-light);
  }
  .divider-header {
    display: flex;
    gap: 4px;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 30px;
  }
  .divider {
    flex: 1 1 50%;
    height: 1px;
    background-color: var(--color-gray-shade-lighter);
  }
  .minor-charts {
    display: flex;
    gap: 40px;
    height: fit-content;
  }
  .chart-block {
    flex: 1 1 50%;
    display: flex;
    flex-direction: column;
  }
  .minor-charts .minor-chart-block {
    height: 300px;
  }
  @media screen and (max-width: 1270px) {
    /* .container {
      margin: 60px 40px 100px;
    } */
    .heading-and-toggles {
      flex-direction: column;
    }
  }
  @media screen and (max-width: 1000px) {
    .flex-container {
      margin: 0px 0px 56px;
    }
    .minor-charts {
      flex-direction: column;
    }
    .chart-title {
      width: 100%;
      text-align: center;
    }
    .toggles {
      margin: 0 auto;
    }
    .button-row {
      max-height: fit-content;
      min-height: 57px;
    }
    .button-row-item {
      height: fit-content;
    }
    .minor-button {
      font-size: 16px;
    }
    .region-selector-container {
      flex-direction: column;
    }
  }
  @media screen and (max-width: 1227px) {
    .flex-container {
      padding: 0 20px;
    }
  }
  @media screen and (max-width: 780px) {
    .button-row {
      margin-bottom: 0px;
    }

    .heading-and-toggles {
      margin-top: 0px;
    }
    .main-chart-header {
      margin: 12px auto 0;
    }
  }
</style>
