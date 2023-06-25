import udp from "node:dgram"
const client = udp.createSocket("udp4")
import { TARGET_ADDRESS, TARGET_PORT } from "../config"
import log from "./logs"

client.on("error", function (error) {
  log("UDP", "ERROR", error)
  client.close()
})

export function sendUDP(value) {
  const parsed = JSON.stringify(value)
  client.send(parsed, TARGET_PORT, TARGET_ADDRESS, function (error) {
    if (error) {
      console.error(error)
      client.close()
    } else {
      log("UDP", "sent", value)
    }
  })
}
