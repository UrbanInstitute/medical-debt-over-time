<script>
  import { selected_position } from "../../../stores/geographies";
  import { isMainChartMagnitude, showingUSLine } from "../../../stores/line-chart-control";
  import { logClickToGA } from "@urbaninstitute/dataviz-components";
  import Toggle from "../smallest-atoms/Toggle.svelte";

  let active_amount = false,
    active_share = true;

  let onMainToggleClick = () => {
    isMainChartMagnitude.set(!$isMainChartMagnitude);
    active_amount = !active_amount;
    active_share = !active_share;
  };

  $: no_other_data = $selected_position == -1;

  $: if ($selected_position == -1 && !$showingUSLine) {
    showingUSLine.set(true);
  }
</script>

<div class="us-bar-chunk bordered">
  <Toggle
    labelPosition="right"
    label="Show US"
    bind:active={$showingUSLine}
    bind:disabled={no_other_data}
    onClick={(e) => {
      showingUSLine.set(!$showingUSLine);
      logClickToGA(e.target, "show_us_line_toggle--" + $showingUSLine);
    }}
  />
  <div class="dotted-line"></div>
</div>
<div class="bordered">
  <Toggle
    labelPosition="right"
    bind:active={active_share}
    label="Share"
    onClick={(e) => {
      onMainToggleClick();
      logClickToGA(e.target, "metric_change--share_debt_all");
    }}
  />
</div>
<Toggle
  labelPosition="right"
  bind:active={active_amount}
  label="Amount"
  onClick={(e) => {
    onMainToggleClick();
    logClickToGA(e.target, "metric_change--amount_debt_all");
  }}
/>

<style>
  .dotted-line {
    width: 50px;
    height: 1px;
    border-bottom: 3px dashed var(--color-black);
    display: inline-block;
    margin-bottom: 5px;
    margin-left: 14px;
  }
  .bordered {
    border-bottom: 1px solid #d2d2d2;
  }
</style>
