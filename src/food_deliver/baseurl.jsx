const mode = "DEV"

const baseDomain = {
  "DEV": "http://192.168.1.77:7000/"
}

export default function baseUrl(relativePath) {
  return new URL(relativePath, baseDomain[mode]).toString()
}
