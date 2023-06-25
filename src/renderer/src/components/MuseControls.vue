<script lang="ts" setup>
import useMuse from "../services/useMuse"
import type { MuseEegReading } from "../services/useMuse"

const emit = defineEmits(["value"])

function handleMuseValue(value: MuseEegReading): void {
  console.log(value)
  emit("value", value)
}
const { connect, start, pause, status, batteryLevel, temperature } = useMuse(handleMuseValue)
</script>
<template>
  <ul>
    <li>
      Battery:
      <pre>{{ batteryLevel }}%</pre>
    </li>
    <li>
      Temperature:
      <pre>{{ temperature }}deg ?</pre>
    </li>
    <li>
      Status:
      <pre> {{ status }}</pre>
    </li>
  </ul>
  <button @click="connect">Connect headset</button>
  <button @click="start">Start</button>
  <button @click="pause">Pause</button>
</template>
<style scoped>
ul {
  display: flex;
  flex-direction: column;
  font-size: 16px;
}
li {
  list-style: none;
  text-align: left;
  display: flex;
  flex-direction: row;
  font-weight: 700;
}
pre {
  padding: 0;
  margin: 0;
  font-weight: 400;
}
</style>
