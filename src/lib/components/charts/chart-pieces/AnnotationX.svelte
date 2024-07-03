<script>
  import { timeParse } from "d3-time-format";
  import { getContext } from "svelte";

  export let data = [];
  export let labels = [];

  const { xGet, yGet, yDomain } = getContext("LayerCake");

  //$: if ($xGet) console.log($xGet(formatAnnotationLineX(2020)))

  const formatAnnotationLineX = timeParse("%m/%Y");
</script>

{#each data as one_date, i}
  <g class="annotation-group">
    <line
      class="annotation"
      data-label={labels[i]}
      x1={$xGet({ year: formatAnnotationLineX(one_date) })}
      x2={$xGet({ year: formatAnnotationLineX(one_date) })}
      y1={$yGet({ value: $yDomain[0] })}
      y2={$yGet({ value: $yDomain[1] })}
      stroke="#9b9b9b"
      stroke-dasharray="10 10"
      stroke-width="2"
    />
    <line
      class="hover-annotation anno"
      data-label={labels[i]}
      x1={$xGet({ year: formatAnnotationLineX(one_date) })}
      x2={$xGet({ year: formatAnnotationLineX(one_date) })}
      y1={$yGet({ value: $yDomain[0] })}
      y2={$yGet({ value: $yDomain[1] })}
      stroke="transparent"
      stroke-width="30"
    />
  </g>
{/each}

<style>
  .annotation-group {
    cursor: pointer;
  }
</style>
