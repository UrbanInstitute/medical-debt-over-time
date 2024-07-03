<script>
  import { Theme, FontsUrban, Analytics } from "@urbaninstitute/dataviz-components";
</script>

<FontsUrban />
<Analytics title="changing-medical-debt-over-time-24" mode={import.meta.env.MODE} />
<Theme>
  <slot />
</Theme>
