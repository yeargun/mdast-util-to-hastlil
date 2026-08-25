function $(id) { return document.getElementById(id) }
function copyButtons() {
  for (const button of document.querySelectorAll("[data-copy]")) {
    button.addEventListener("click", async () => {
      await navigator.clipboard.writeText(button.dataset.copy)
      button.textContent = "copied"
      setTimeout(() => { button.textContent = "copy" }, 1200)
    })
  }
}
function samples(items, apply) {
  const root = $("samples")
  for (const item of items) {
    const button = document.createElement("button")
    button.type = "button"
    button.textContent = item.label
    button.addEventListener("click", () => apply(item.value))
    root.append(button)
  }
}
function showText(value) {
  $("output").hidden = false
  $("output").textContent = value
  $("preview").hidden = true
  $("frame").hidden = true
}
function showHtml(html) {
  $("output").hidden = false
  $("output").textContent = html
  $("preview").hidden = true
  $("frame").hidden = false
  $("frame").srcdoc = `<!doctype html><style>body{font:16px/1.55 system-ui;margin:16px}table{border-collapse:collapse}td,th{border:1px solid #ccc;padding:6px 8px}blockquote{border-left:3px solid #e3b341;padding-left:12px;color:#555}</style>${html}`
}
function showPreview(html) {
  $("output").hidden = false
  $("preview").hidden = false
  $("frame").hidden = true
  $("preview").innerHTML = html
}
copyButtons()

import { toHast } from "./to-hast.js"
const input = $("input")
const sample = {
  type: "root",
  children: [
    { type: "heading", depth: 1, children: [{ type: "text", value: "mdast" }] },
    { type: "paragraph", children: [
      { type: "text", value: "paste a " },
      { type: "strong", children: [{ type: "text", value: "JSON" }] },
      { type: "text", value: " mdast tree" },
    ]},
    { type: "code", lang: "js", value: "toHast(tree)" },
  ],
}
samples([
  { label: "heading", value: JSON.stringify(sample, null, 2) },
  { label: "list", value: JSON.stringify({ type: "root", children: [{ type: "list", ordered: false, children: [
    { type: "listItem", children: [{ type: "paragraph", children: [{ type: "text", value: "one" }] }] },
    { type: "listItem", checked: true, children: [{ type: "paragraph", children: [{ type: "text", value: "done" }] }] },
  ]}]}, null, 2) },
], (value) => { input.value = value; render() })
input.value = JSON.stringify(sample, null, 2)
function render() {
  try { showText(JSON.stringify(toHast(JSON.parse(input.value)), null, 2)) }
  catch (error) { showText(String(error)) }
}
input.addEventListener("input", render)
render()
