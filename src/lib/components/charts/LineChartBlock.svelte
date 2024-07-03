<script>
  import { LayerCake, Svg, groupLonger, flatten } from "layercake";
  import {
    geo_data,
    getMetricData,
    getNamefromPosition,
    selected_position,
    color_palette,
    data_loaded
  } from "../../../stores/geographies";
  import {
    metric_meta_data,
    selected_year,
    showingUSLine
  } from "../../../stores/line-chart-control";

  import { scaleOrdinal } from "d3-scale";
  import { timeParse, timeFormat } from "d3-time-format";
  import { format } from "d3-format";

  import MultiLine from "./MultiLine.svelte";
  import Lollipop from "./Lollipop.svelte";

  import AxisX from "./chart-pieces/AxisX.svelte";
  import AxisY from "./chart-pieces/AxisY.svelte";
  import AnnotationX from "./chart-pieces/AnnotationX.svelte";

  import { Tooltip } from "@urbaninstitute/dataviz-components";

  export let metric;

  $: data = $data_loaded
    ? getMetricData(
        metric,
        $geo_data,
        metric == "closes_merges" && $selected_position != -1 ? false : $showingUSLine
      )
    : [];

  // based on the layercake example here: https://layercake.graphics/example/MultiLine

  //things for tooltip
  let dynamicX = 100;
  let dynamicY = 100;
  let width;

  let inACircle = false;
  let markerValue = 0;
  let markerPosition = -1;
  let markerYear = 2012;
  $: locationName = data ? getNamefromPosition(markerPosition) : "No region";
  let inAnnotation = false;
  let annotationLabel = "";
  $: chart_container = undefined;

  function handleMousemove(e) {
    dynamicX = e.pageX;
    dynamicY = e.pageY;
    inACircle = e.target.classList.contains("hover-marker");
    inAnnotation = e.target.classList.contains("anno");
    if (inACircle) {
      markerValue = e.target.dataset.value;
      markerPosition = e.target.dataset.region;
      markerYear = e.target.dataset.year;
    } else if (inAnnotation) {
      annotationLabel = e.target.dataset.label;
    }
  }

  function handleMouseOut() {
    inACircle = false;
    inAnnotation = false;
  }

  function handleMouseClick(e) {
    inACircle = e.target.classList.contains("hover-marker");
    if (inACircle && markerPosition != 3) {
      selected_position.set(markerPosition);
      selected_year.set(markerYear.toString());
    }
    if (inACircle && markerPosition == 3) {
      selected_position.set(-1);
      selected_year.set(markerYear.toString());
    }
  }

  /* --------------------------------------------
   * Set what is our x key to separate it from the other series
   */
  const xKey = "year";
  const yKey = "value";
  const zKey = "regions";

  //hardcode august bc that's when data comes in
  const xKeyCastAug = (d) => timeParse("%Y-%m")(d + "-08");
  const xKeyCast = (d) => timeParse("%Y")(d);

  const seriesNames = ["region_0", "region_1", "region_2", "region_3"];

  $: xTicks = ["amount_debt_all", "share_debt_all"].includes(metric)
    ? data.map((d) => d[xKey]).sort((a, b) => a - b)
    : data
        .map((d) => d[xKey])
        .sort((a, b) => a - b)
        .filter((d) => d != "2023");

  $: fewerXTicks = ["amount_debt_all", "share_debt_all"].includes(metric)
    ? xTicks.filter((d) => parseInt(d) % 2 == 1)
    : xTicks.filter((d) => parseInt(d) % 2 == 1 || d == "2022");

  /* --------------------------------------------
   * Cast values
   */
  $: if (data && data.length > 0)
    data.forEach((d) => {
      d[xKey] =
        typeof d[xKey] === "string"
          ? ["amount_debt_all", "share_debt_all"].includes(metric)
            ? xKeyCastAug(d[xKey])
            : xKeyCast(d[xKey])
          : d[xKey];

      seriesNames.forEach((name) => {
        d[name] = +d[name];
      });
    });

  const formatLabelX = (d) => {
    if (d.getFullYear() == 2011) {
      return timeFormat("%Y")(d);
    } else {
      return timeFormat("'%y")(d);
    }
  };
  let formatLabelY;

  $: switch (metric) {
    case "share_debt_all":
      formatLabelY = (d) => format(`.0%`)(d);
      break;
    case "amount_debt_all":
      formatLabelY = (d) => format(`$.2s`)(d);
      break;
    case "uninsured":
      formatLabelY = (d) => format(`.0%`)(d);
      break;
    case "hh_income":
      formatLabelY = (d) => format(`$.2s`)(d);
      break;
    case "share_disabled":
      formatLabelY = (d) => format(`.0%`)(d);
      break;
    case "hospital_density":
      formatLabelY = (d) => format(`,.4`)(d);
      break;
    case "closes_merges":
      formatLabelY = (d) => format(`.2`)(d);
      break;
    default:
      (d) => format(`.0%`)(d);
      break;
  }

  let groupedData;
  $: if (data.length > 0)
    groupedData = groupLonger(data, seriesNames, {
      groupTo: zKey,
      valueTo: yKey
    });

  //annotation
  ///*metric == "share_debt_all" || metric == "amount_debt_all"*/

  //PUT THIS BACK
  //

  //
</script>

<div
  class="chart-container"
  on:mousemove={handleMousemove}
  on:mouseout={handleMouseOut}
  on:blur={handleMouseOut}
  on:click={handleMouseClick}
  on:keypress={handleMouseClick}
  role="figure"
  bind:this={chart_container}
  bind:clientWidth={width}
>
  <LayerCake
    padding={{ top: 7, right: 10, bottom: 20, left: 25 }}
    x={xKey}
    y={yKey}
    z={zKey}
    yDomain={[0, null]}
    yPadding={[0, 50]}
    xPadding={[10, 0]}
    zScale={scaleOrdinal()}
    zRange={color_palette}
    xDomain={["amount_debt_all", "share_debt_all"].includes(metric)
      ? [xKeyCast("2011"), xKeyCastAug("2023")]
      : [xKeyCast("2011"), xKeyCast("2022")]}
    flatData={flatten(groupedData, "values")}
    data={groupedData}
  >
    <Svg>
      <AxisX
        gridlines={false}
        ticks={width < 350 ? fewerXTicks.map((d) => xKeyCast(d)) : xTicks.map((d) => xKeyCast(d))}
        format={formatLabelX}
        tickMarks
      />
      <AxisY ticks={4} format={formatLabelY} />
      {#if metric == "share_debt_all" || metric == "amount_debt_all"}
        <AnnotationX
          data={["06/2022", "03/2023"]}
          labels={[
            "<strong>July 2022</strong>:<br>Stopped reporting collections less than a year old",
            "<strong>April 2023</strong>:<br>Stopped reporting collections less than $500"
          ]}
        />
      {/if}
      {#if metric != "closes_merges"}
        <MultiLine />
      {:else}
        <Lollipop />
      {/if}
    </Svg>
    {#if inACircle}
      <Tooltip x={dynamicX} y={dynamicY}>
        <strong class="tooltip-title"
          ><span
            style="border-bottom: 2px {markerPosition == 3 ? 'dashed' : 'solid'} {color_palette[
              markerPosition
            ]};">{locationName}</span
          ></strong
        >
        <br />
        {markerYear}:
        <strong
          >{$metric_meta_data.find((d) => d.metric == metric).format.format(markerValue)}</strong
        >
        {metric == "hospital_density" ? " concentration score out of 10,000" : ""}
      </Tooltip>
    {:else if inAnnotation}
      <Tooltip x={dynamicX} y={dynamicY}>
        {@html annotationLabel}
      </Tooltip>
    {/if}
  </LayerCake>
</div>

<style>
  .chart-container {
    width: 100%;
    max-height: 400px;
    height: 100%;
    position: relative;
  }
  .tooltip-title {
    margin-bottom: 8px;
    display: inline-block;
  }
</style>
