<script>
  import { urbanColors } from "@urbaninstitute/dataviz-components/utils";
  import { logClickToGA } from "@urbaninstitute/dataviz-components";
  import {
    geo_data,
    updateGeo,
    selected_position,
    areWeSearching,
    first_geo,
    second_geo,
    third_geo,
    searchingPosition,
    updateURL
  } from "../../../stores/geographies";
  import { main_metric, metric_meta_data, selected_year } from "../../../stores/line-chart-control";

  let icon_close = "./icon-close.svg";
  export let position = 0;

  $: geoid = position == 0 ? $first_geo : position == 1 ? $second_geo : $third_geo;

  let colors = [urbanColors.blue, urbanColors.yellow, urbanColors.green];

  function removeMe() {
    updateGeo(position, "999999");
    updateSelectedRegion();
    updateURL();
    areWeSearching.set(false);
  }

  function updateSelectedRegion() {
    selected_position.set($geo_data.findIndex((d) => d != null));
  }

  $: myDataPoint = () => {
    let data = $metric_meta_data
      .find((d) => d.metric == $main_metric)
      .format.format($geo_data[position].find((d) => d.metric == $main_metric)[$selected_year]);
    if (data.includes("N")) {
      //NA, NaN
      data = "n/a";
    }
    return data;
  };
</script>

<!--when no geoid is selected-->
{#if geoid == "999999"}
  <button
    class="empty box"
    on:click={() => {
      searchingPosition.set(position);
      areWeSearching.set(true);
    }}
  >
    <div class="icon">
      <img class="plus" src="./icon-plus.svg" height="40" width="40" alt="" />
    </div>
    <div class="icon-label">
      <p>Click to add a county or state to compare.</p>
    </div>
  </button>
  <!--when we're looking for a geoid-->
{:else if $areWeSearching && $searchingPosition == position}
  <button class="empty box" on:click={() => areWeSearching.set(false)}>
    <div class="icon-label">
      <p>Searching for<br />a county or state...</p>
    </div>
  </button>
  <!--when we have a geoid-->
{:else}
  <div class="container">
    <button
      class="remove-region"
      on:click={() => {
        removeMe();
      }}
    >
      <img src={icon_close} alt="Clear this region." width="15" />
    </button>
    <button
      class="region-holder box {$selected_position == position ? 'selected' : ''}"
      on:click={(e) => {
        selected_position.set(position);
        logClickToGA(
          e.target,
          "new_selected_region--" + $geo_data[position][0].full_name.replace(" ", "_")
        );
      }}
    >
      <div class="left-side color-bar" style="background-color: {colors[position]};" />
      <div class="right-side">
        <h2 class="big-stat">{myDataPoint()}</h2>
        <div class="text-eyebrow stat-label">
          {@html $metric_meta_data.find((d) => d.metric == $main_metric).no_breaks_label}, {$selected_year}
        </div>
        <div class="region-name">{$geo_data[position][0].full_name}</div>
        {#if $selected_position == position}
          <div class="view-stats">Viewing Data</div>
        {:else}
          <div class="view-stats">View Data</div>
        {/if}
      </div>
    </button>
  </div>
{/if}

<style>
  .empty {
    cursor: pointer;
  }

  .box {
    flex: 1 1 30%;
    background-color: var(--color-gray-shade-lightest);
    padding: 24px;
    min-width: 180px;
    transition: 300ms ease-in-out;
    border: 1px solid white;
    position: relative;
    cursor: pointer;
    width: 100%;
  }

  .selected {
    outline: 2px solid var(--color-gray);
    background-color: var(--color-gray-shade-lighter);
  }

  .box:hover {
    background-color: var(--color-gray-shade-lighter);
  }

  .plus {
    background-color: var(--color-gray);
    border-radius: 40px;
    padding: 8px;
  }

  .icon-label {
    text-align: center;
  }
  .remove-region {
    position: absolute;
    cursor: pointer;
    z-index: 4;
    top: 15px;
    right: 15px;
    padding: 5px 7px;
    border: 1px solid transparent;
    background-color: transparent;
    transition: 300ms ease-in-out;
  }
  .remove-region:hover {
    border: 1px solid var(--color-gray);
  }

  .region-holder {
    display: flex;
    align-items: stretch;
    justify-content: space-around;
    gap: 20px;
  }

  .container {
    flex: 1 1 30%;
    position: relative;
    transition: 300ms ease-in-out;
    min-width: 180px;
    display: flex;
    align-items: stretch;
  }

  .left-side {
    flex: 1 1 auto;
    max-width: 8px;
    min-width: 8px;
    margin-left: 5px;
  }
  .right-side {
    flex: 1 1 auto;
  }

  .color-bar {
    border-radius: 8px;
  }

  .big-stat {
    line-height: 0% !important;
    width: fit-content;
  }

  .stat-label {
    text-transform: uppercase;
    font-style: normal;
    width: fit-content;
    text-align: left;
  }

  .region-name {
    font-size: 18px;
    font-weight: 700;
    margin-top: 18px;
    margin-bottom: 4px;
    width: fit-content;
    text-align: left;
    color: var(--color-black);
  }

  .view-stats {
    color: var(--color-blue-shade-darker);
    font-size: 14px;
    font-weight: 700;
    width: fit-content;
  }
</style>
