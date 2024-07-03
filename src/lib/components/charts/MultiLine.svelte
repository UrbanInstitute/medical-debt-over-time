<!--
  @component
  Generates an SVG multi-series line chart. It expects your data to be an array of objects, each with a `values` key that is an array of data objects.
 -->
<script>
  import { getContext } from "svelte";

  const { data, xGet, yGet, zGet } = getContext("LayerCake");

  $: path = (values) => {
    let build_a_path = "M";
    for (let i in values) {
      if ($yGet(values[i]) == undefined && i != 0 && build_a_path[build_a_path.length - 1] != "M") {
        build_a_path = build_a_path.substring(0, build_a_path.length - 1) + "M";
      } else if ($yGet(values[i]) != undefined) {
        build_a_path += $xGet(values[i]) + "," + $yGet(values[i]) + "L";
      }
    }
    return build_a_path.substring(0, build_a_path.length - 1);

    // return 'M' + values
    //   .filter(d => $yGet(d) != undefined)
    //   .map(d => {
    //     return $xGet(d) + ',' + $yGet(d);
    //   })
    //   .join('L');
  };

  $: getNAlines = (values) => {
    if (!values.find((d) => $yGet(d) == undefined)) return []; //no undefined points
    if (!values.find((d) => $yGet(d) != undefined)) return []; //all undefined points

    let firstTrueIndex = values.findIndex((d) => $yGet(d) != undefined);
    let lastTrueIndex = values.findLastIndex((d) => $yGet(d) != undefined);

    let most_recent = values[firstTrueIndex];
    let building_a_path = false;
    let lines = [];

    for (let i = firstTrueIndex; i < lastTrueIndex; i++) {
      if ($yGet(values[i]) != undefined) {
        if (building_a_path) {
          lines.push(
            "M" +
              $xGet(most_recent) +
              "," +
              $yGet(most_recent) +
              "L" +
              $xGet(values[i]) +
              "," +
              $yGet(values[i])
          );
          building_a_path = false;
        }
        most_recent = values[i];
      } else {
        building_a_path = true;
      }
    }
    return lines;
  };
</script>

<g class="line-group">
  {#each $data as group}
    <path
      class="path-line"
      d={path(group.values)}
      stroke={$zGet(group)}
      stroke-dasharray={$zGet(group) != "#000000" ? "none" : "6 10"}
    ></path>
    {#each getNAlines(group.values) as line}
      <path class="path-line" d={line} stroke={$zGet(group)} stroke-dasharray="2 10"></path>
    {/each}
    <g class="circles-group">
      {#each group.values.filter((d) => $yGet(d) != undefined) as value}
        <g class="one-circle">
          <circle
            class="visible-marker"
            cx={$xGet(value)}
            cy={$yGet(value)}
            r="4"
            fill="white"
            stroke={$zGet(value)}
            stroke-width="2"
          />
          <circle
            class="hover-marker"
            data-value={value.value}
            data-region={value.regions.substring(7)}
            data-year={value.year.getFullYear()}
            cx={$xGet(value)}
            cy={$yGet(value)}
            r="10"
            stroke="transparent"
            fill="transparent"
          />
        </g>
      {/each}
    </g>
  {/each}
</g>

<style>
  .path-line {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 3px;
    transition: d ease-in-out 500ms;
  }
  .visible-marker,
  .hover-marker {
    transition: cy ease-in-out 500ms;
    cursor: pointer;
  }
  .hover-marker {
    z-index: 6;
  }
</style>
