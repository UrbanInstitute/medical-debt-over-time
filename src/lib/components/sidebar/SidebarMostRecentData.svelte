<script>
  import { BasicDropdown } from "@urbaninstitute/dataviz-components";
  import {
    geo_data,
    selected_position,
    color_palette,
    national_data
  } from "../../../stores/geographies";
  import {
    isMainChartMagnitude,
    metric_meta_data,
    yearsLabelsObj,
    selected_year
  } from "../../../stores/line-chart-control";
  import Popup from "../smallest-atoms/Popup.svelte";
  import IconChevronFull from "$components/smallest-atoms/IconChevronFull.svelte";

  export let mobile = false;

  $: my_data =
    $selected_position != -1
      ? $geo_data[$selected_position]
      : $national_data != null
        ? $national_data
        : [];

  let max_share_value = 0.68;
  let max_amount_value = 4500;

  /**
   *
   * @param met metric to be pulled
   * @param data data for this region
   * @param format_me either formatted or not
   * @return value asked and note whether data was there or not
   */
  function getDatapoint(met, data, year, format_me = true) {
    if (data == []) return { value: "", note: "" };
    let found_data = data.find((d) => d.metric == met);

    if (!format_me) {
      if (!found_data || found_data[parseInt(year)] == "NA")
        return { value: 0, note: "No data available." };
      return { value: found_data[parseInt(year)], note: "" };
    } else {
      let format = $metric_meta_data.find((d) => d.metric == met).format;
      if (!found_data || found_data[parseInt(year)] == "NA") return { value: "n/a", note: "n/a" };
      return { value: format.format(found_data[parseInt(year)]), note: "" };
    }
  }

  $: debtors_oc_share_perc_width =
    (getDatapoint("share_debt_poc", my_data, $selected_year, false).value / max_share_value) * 100;

  $: debtors_oc_amount_perc_width =
    (getDatapoint("amount_debt_poc", my_data, $selected_year, false).value / max_amount_value) *
    100;

  $: debtors_white_share_perc_width =
    (getDatapoint("share_debt_white", my_data, $selected_year, false).value / max_share_value) *
    100;

  $: debtors_white_amount_perc_width =
    (getDatapoint("amount_debt_white", my_data, $selected_year, false).value / max_amount_value) *
    100;

  $: my_color = $selected_position == -1 ? color_palette[3] : color_palette[$selected_position];
</script>

<h4 style="margin-bottom: 15px;">
  <span style="border-bottom: 3px solid {my_color};"
    >{$selected_position != -1 ? $geo_data[$selected_position][0].full_name : "Nationwide"}</span
  >
</h4>
<div class="dropdown-icon-holder">
  <BasicDropdown
    id="dropdown-selector"
    variant="primary"
    bind:value={$selected_year}
    placeholder={null}
    inlineLabel="Dropdown to select a year of data to display."
    data={yearsLabelsObj}
  >
    <div slot="icon"><IconChevronFull fill="black" /></div>
  </BasicDropdown>
  <div class="popup-wrapper">
    <Popup
      width={300}
      text="<strong>n/a</strong> indicates the data are missing. Data could be missing if the sample size is too small or because the
      data are not available in that particular year. See About the Data for metric definitions."
    />
  </div>
</div>

{#each ["share_debt_all", "amount_debt_all", "hospital_density", "closes_merges", "hh_income", "uninsured", "share_disabled"] as metric}
  {@const data_pair = getDatapoint(metric, my_data, $selected_year)}
  <div class="data-section bordered">
    <p
      class="title"
      style="color: black; {metric == 'uninsured' || metric == 'share_disabled' || mobile
        ? 'line-height: 162.5%;'
        : ''}"
    >
      {@html mobile
        ? $metric_meta_data.find((d) => d.metric == metric).no_breaks_label
        : $metric_meta_data.find((d) => d.metric == metric).label}
    </p>
    <p class="strong datapoint" style="color: black;">
      {data_pair.note != "" ? data_pair.note : data_pair.value}
    </p>
  </div>
{/each}

<div style="margin-top: 30px; margin-bottom: 20px;">
  <h5 style="display: inline;">
    {$isMainChartMagnitude ? "Median medical debt" : "Share with medical debt"}
  </h5>
  <div class="popup-wrapper">
    <Popup
      width={300}
      text="<strong>White communities</strong>: Zip codes where at least 50 percent of the population is White.<span style='display: block; height: 12px;'></span>
      <strong>Communities of color</strong>: Zip codes where at least 50 percent of the population is people of color."
    />
  </div>
</div>

<div class="bars-chunk bordered">
  <div class="single-bar-chunk">
    <p class="strong bar-value" style="color: black;">
      {$isMainChartMagnitude
        ? getDatapoint("amount_debt_poc", my_data, $selected_year).value
        : getDatapoint("share_debt_poc", my_data, $selected_year).value}
    </p>
    <div class="bar-holder">
      <div
        class="poc-debtors bar"
        style="width: {$isMainChartMagnitude
          ? debtors_oc_amount_perc_width
          : debtors_oc_share_perc_width}%;"
      />
      <div
        class="anti-bar"
        style="width: calc(100% - {$isMainChartMagnitude
          ? debtors_oc_amount_perc_width
          : debtors_oc_share_perc_width}%);"
      />
    </div>
  </div>
  <p style="color: black;">Communities of color</p>
  <div class="single-bar-chunk">
    <p class="strong bar-value" style="color: black;">
      {$isMainChartMagnitude
        ? getDatapoint("amount_debt_white", my_data, $selected_year).value
        : getDatapoint("share_debt_white", my_data, $selected_year).value}
    </p>
    <div class="bar-holder">
      <div
        class="white-debtors bar"
        style="width: {$isMainChartMagnitude
          ? debtors_white_amount_perc_width
          : debtors_white_share_perc_width}%;"
      />
      <div
        class="anti-bar"
        style="width: calc(100% - {$isMainChartMagnitude
          ? debtors_white_amount_perc_width
          : debtors_white_share_perc_width}%);"
      />
    </div>
  </div>
  <p style="color: black;">White communities</p>
</div>

<style>
  .data-section {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 15px;
  }
  .data-section > p {
    margin: 15px 0px 7px 0px;
    line-height: 132%;
  }
  .data-section > .datapoint {
    flex: 0 0 auto;
  }
  .bordered {
    border-bottom: 1px solid #d2d2d2;
  }
  .strong {
    font-weight: 700 !important;
  }
  .bars-chunk > p {
    margin-top: 0px;
  }

  .single-bar-chunk {
    margin-top: 10px;
  }
  .single-bar-chunk > p {
    padding-bottom: 0px;
  }
  .bar-holder {
    display: flex;
    gap: 0px;
  }
  .bar {
    flex: 0 0 auto;
    height: 25px;
    transition: ease-in-out 300ms;
  }
  .anti-bar {
    flex: 0 0 auto;
    height: 25px;
    transition: ease-in-out 300ms;
    background-color: var(--color-gray-shade-lightest);
    /* background: repeating-linear-gradient(
        60deg,
        var(--color-gray-shade-dark),
        var(--color-gray-shade-dark) 0.5px,
        transparent 1px,
        transparent 10px
      ),
      repeating-linear-gradient(
        120deg,
        var(--color-gray-shade-dark),
        var(--color-gray-shade-dark) 0.5px,
        transparent 1px,
        transparent 10px
      ),
      var(--color-gray-shade-lighter); */
  }
  .bar-value {
    float: right;
    margin: 0 0 0 10px !important;
    line-height: 1.15 !important;
    width: 55px;
    text-align: end;
  }
  .poc-debtors {
    background-color: var(--color-blue-shade-lighter);
  }
  .white-debtors {
    background-color: var(--color-blue-shade-dark);
  }

  :global(#dropdown-selector) {
    background-color: var(--color-gray-shade-lighter);
    color: black;
    border: none;
    &:hover {
      outline: 1px solid var(--color-gray);
    }
    &:focus {
      outline: 1px solid var(--color-gray);
    }
  }
  :global(.dropdown-parent) {
    width: 100%;
  }

  .dropdown-icon-holder {
    margin-bottom: 30px;
    margin-top: 10px;
    display: flex;
    width: 100%;
    align-items: baseline;
    gap: 10px;
  }

  .popup-wrapper {
    display: inline;
    height: 25px;
    width: 25px;
    margin-right: 5px;
  }
</style>
