<script setup lang="ts">
import MuseControls from "./components/MuseControls.vue"
import { MuseEegReading } from "./services/useMuse"

function handleMuseValue(value: MuseEegReading) {
  console.log(value)
}
</script>

<template>
  <div>
    <MuseControls @value="handleMuseValue" />
  </div>
</template>
