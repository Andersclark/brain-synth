import { EEGReading, MuseClient } from "muse-js"
import { ref } from "vue"

export type MuseEegReading = {
  index: number
  electrode: number // 0 to 4
  timestamp: number // milliseconds since epoch
  samples: number[] // 12 samples each time
}
export type MuseTelemetryData = {
  sequenceId: number
  batteryLevel: number
  fuelGaugeVoltage: number
  temperature: number
}
export type Vector3 = {
  x: number
  y: number
  z: number
}
export type MuseAccelerometerData = {
  sequenceId: number
  samples: Array<Vector3>
}

export default function useMuse(handler: (val: EEGReading) => void) {
  const status = ref<"not connected" | "connected" | "streaming" | "paused">("not connected")
  const client = ref(new MuseClient())
  const connected = ref(false)
  const history = ref<MuseEegReading[]>([])
  const batteryLevel = ref<null | number>(null)
  const temperature = ref<null | number>(null)

  function handleValue(museValue: MuseEegReading): void {
    history.value.push(museValue)
    handler(museValue)
  }
  function updateTelemetry(telemetry: MuseTelemetryData) {
    batteryLevel.value = telemetry.batteryLevel
    temperature.value = telemetry.temperature
  }
  async function pause() {
    await client.value.pause()
    status.value = "paused"
  }
  async function connect() {
    await client.value.connect()
    connected.value = true
    status.value = "connected"
  }
  async function start() {
    client.value.telemetryData.subscribe(updateTelemetry)
    client.value.eegReadings.subscribe(handleValue)
    await client.value.start()
    status.value = "streaming"
  }
  return {
    connect,
    start,
    pause,
    status,
    temperature,
    batteryLevel
  }
}
