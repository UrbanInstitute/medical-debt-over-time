<script>
  import { showingUSLine } from "../../../stores/line-chart-control";
  import SidebarMostRecentData from "./SidebarMostRecentData.svelte";
  import Toggle from "../smallest-atoms/Toggle.svelte";
  import SidebarMetrics from "./SidebarMetrics.svelte";
  import { selected_position } from "../../../stores/geographies";
  import { logClickToGA } from "@urbaninstitute/dataviz-components";

  $: no_other_data = $selected_position == -1;

  $: if ($selected_position == -1 && !$showingUSLine) {
    showingUSLine.set(true);
  }
</script>

<div class="sidebar">
  <SidebarMostRecentData />

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

  <div class="chunk">
    <h4>Potential Debt Drivers</h4>
  </div>
  <SidebarMetrics />
</div>

<style>
  .sidebar {
    margin-top: 40px;
    margin-right: 40px;
  }
  .dotted-line {
    width: 50px;
    height: 1px;
    border-bottom: 3px dashed var(--color-black);
    display: inline-block;
    margin-bottom: 5px;
    margin-left: 14px;
  }
  .chunk {
    padding-top: 32px;
  }
  .chunk > h4 {
    margin-bottom: 0px;
    margin-top: 0px;
  }
  .us-bar-chunk {
    padding: 20px 0px;
  }
  .bordered {
    border-bottom: 1px solid #d2d2d2;
  }
</style>
