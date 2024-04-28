#!/usr/bin/env node

import path from "node:path"
import process from "node:process"
import {fileURLToPath} from "node:url"
import ansis from "ansis"
import {Box, Text, render} from "ink"
import SelectInput from "ink-select-input"
import open from "open"
import React from "react"
import terminalImage from "terminal-image"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function getAssetPath(name: string): string {
  return path.join(__dirname, "..", "assets", name)
}

type LocalItem = {
  label: string
  url?: string
  key?: string
  action?: () => Promise<void>
}

async function handleSelect(item: LocalItem): Promise<void> {
  if (item.url) {
    void open(item.url)
  }

  if (item.action) {
    await item.action()
  }
}

function initLocalItems(items: Array<LocalItem>): Array<LocalItem> {
  for (const item of items) {
    item.key = item.url ?? item.label
  }

  return items
}

const localItems = initLocalItems([
  {
    label: "Website",
    url: "https://johnowennixon.com",
  },
  {
    label: "GitHub",
    url: "https://github.com/johnowennixon",
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/johnowennixon",
  },
  {
    label: "Twitter",
    url: "https://twitter.com/johnowennixon",
  },
  {
    label: "Facebook",
    url: "https://facebook.com/johnowennixon",
  },
  {
    label: ansis.bold("EXIT"),
    action() {
      process.exit()
    },
  },
])

const items = localItems.map((item) => ({...item, value: undefined}))

const ui = () => (
  <Box flexDirection="column">
    <Box marginBottom={1}>
      <Text>
        Avocados, Boxes, Colours, Dilbert, Escher, Fusion, Genomics, Hedgehogs, Illumination, Jesus, Knots, Linux,
        Mackintosh, Nutrition, Oxford, Puzzles, Quotes, Random, Steampunk, Typography, Unolingo, Voting, Wood, xkcd,
        Yum, Zimbabwe.
      </Text>
    </Box>
    <SelectInput items={items} onSelect={handleSelect} />
  </Box>
)

const {rows, columns} = process.stdout
const image = await terminalImage.file(getAssetPath("John_Owen_Nixon_pond_300x300.jpg"), {
  width: columns,
  height: rows - localItems.length - 5,
})
console.log(image)

render(React.createElement(ui))
