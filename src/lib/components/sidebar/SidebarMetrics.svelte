<script>
  import Toggle from "../smallest-atoms/Toggle.svelte";
  import { metric_meta_data, selected_minor_metrics } from "../../../stores/line-chart-control";
  import { logClickToGA } from "@urbaninstitute/dataviz-components";

  export let mobile = false;

  let toggle_data = [
    { value: "hospital_density", active: $selected_minor_metrics.includes("hospital_density") },
    { value: "closes_merges", active: $selected_minor_metrics.includes("closes_merges") },
    { value: "hh_income", active: $selected_minor_metrics.includes("hh_income") },
    { value: "uninsured", active: $selected_minor_metrics.includes("uninsured") },
    { value: "share_disabled", active: $selected_minor_metrics.includes("share_disabled") }
  ];

  function handleNewMetricToggleClick(val, pos) {
    //if already in list, do nothing
    //if not in list, overwrite position tobechanged
    //lop tobechanged
    if ($selected_minor_metrics.includes(val)) {
      toggle_data[pos].active = false; //uncheck toggle
      $selected_minor_metrics[$selected_minor_metrics.findIndex((d) => d == val)] = ""; //remove from array of selected metrics
      return false;
    } else {
      toggle_data[pos].active = true; //check toggle
      $selected_minor_metrics[$selected_minor_metrics.findIndex((d) => d == "")] = val; //add in first open slot
      return true;
    }
  }
</script>

<div class="metrics-chunk">
  <p>Change charts by selecting and deselecting toggles below.</p>
  {#each [0, 1, 2, 3, 4] as position}
    {@const disabled =
      $selected_minor_metrics.findIndex((d) => d == toggle_data[position].value) < 0 &&
      $selected_minor_metrics.findIndex((d) => d == "") < 0}
    {@const active =
      $selected_minor_metrics.findIndex((d) => d == toggle_data[position].value) >= 0}
    <Toggle
      labelPosition="right"
      {disabled}
      {active}
      label={mobile
        ? $metric_meta_data.find((d) => d.metric == toggle_data[position].value)?.no_breaks_label
        : $metric_meta_data.find((d) => d.metric == toggle_data[position].value)?.label}
      onClick={(e) => {
        let new_active = handleNewMetricToggleClick(toggle_data[position].value, position);
        if (new_active) {
          logClickToGA(e.target, "metric_change--" + toggle_data[position].value);
        }
      }}
    />
    <br />
  {/each}
</div>

<style>
  .metrics-chunk > p {
    margin: 10px 0px;
  }
</style>
