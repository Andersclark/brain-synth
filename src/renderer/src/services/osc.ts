import OSC from "osc-js"
import { TARGET_ADDRESS, TARGET_PORT } from "../config"
import log from "./logs"

const OSC_PARAMS = {
  type: "udp4", // @param {string} 'udp4' or 'udp6'
  open: {
    host: "localhost", // @param {string} Hostname of udp server to bind to
    port: 41234, // @param {number} Port of udp server to bind to
    exclusive: false // @param {boolean} Exclusive flag
  },
  send: {
    host: TARGET_ADDRESS, // @param {string} Hostname of udp client for messaging
    port: TARGET_PORT // @param {number} Port of udp client for messaging
  }
}
const osc = new OSC({
  discardLateMessages: true,
  plugin: new OSC.DatagramPlugin(OSC_PARAMS)
})
// osc.on('error', message => {
//   console.error("[OSC ERROR]:", message)
// })
// osc.on("*", message => console.log("[OSC ANY]", message))

export function sendOSC(value) {
  const message = new OSC.Message([value.electrode], ...value.samples)
  osc.send(message)
  log("OSC", "sent", message)
}
