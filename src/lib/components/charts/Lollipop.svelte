<!--
  @component
  Generates an SVG multi-series line chart. It expects your data to be an array of objects, each with a `values` key that is an array of data objects.
 -->
<script>
  import { getContext } from "svelte";

  const { data, xGet, yGet, zGet } = getContext("LayerCake");

  $: getLines = (values) => {
    let lines = [];
    for (let i in values) {
      if (values[i].value) {
        lines.push(
          "M" +
            ($xGet(values[i]) + (values[i].regions.substring(7) == "3" ? 0 : ((values[i].regions.substring(7) - 1) * 6))) +
            "," +
            $yGet(values[i]) +
            "L" +
            ($xGet(values[i]) + (values[i].regions.substring(7) == "3" ? 0 : ((values[i].regions.substring(7) - 1) * 6))) +
            "," +
            $yGet({ value: 0 })
        );
      }
    }
    return lines;
  };
</script>

<g class="line-group">
  {#each $data.reverse() as group}
    {#each getLines(group.values) as line}
      <path
        class="path-line"
        d={line}
        stroke={$zGet(group)}
        stroke-dasharray={$zGet(group) != "#000000" ? "none" : "6 10"}
      ></path>
    {/each}
    <g class="circles-group">
      {#each group.values.filter((d) => $yGet(d) != undefined) as value}
      {@const position = value.regions.substring(7) == "3" ? 0 : (value.regions.substring(7) - 1) * 6 }
        <g class="one-circle">
          <circle
            class="visible-marker"
            cx={$xGet(value) + position}
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
            cx={$xGet(value) + position}
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
    transition: ease-in-out 500ms;
  }
  .forward{
    position: relative;
    z-index: 2;
  }
  .visible-marker,
  .hover-marker {
    transition: ease-in-out 500ms;
    cursor: pointer;
  }
  .hover-marker {
    z-index: 6;
  }
</style>
