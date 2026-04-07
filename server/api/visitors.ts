import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const DATA_FILE = resolve(process.cwd(), '.visitor-count.json')
const INITIAL_COUNT = 500

function getCount() {
  if (!existsSync(DATA_FILE)) {
    writeFileSync(DATA_FILE, JSON.stringify({ count: INITIAL_COUNT, lastReset: Date.now() }))
    return INITIAL_COUNT
  }
  try {
    const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
    return data.count || INITIAL_COUNT
  } catch {
    return INITIAL_COUNT
  }
}

function incrementCount() {
  const count = getCount() + 1
  writeFileSync(DATA_FILE, JSON.stringify({ count, lastUpdate: Date.now() }))
  return count
}

export default defineEventHandler((event) => {
  const method = event.method

  if (method === 'POST') {
    const count = incrementCount()
    return { count }
  }

  return { count: getCount() }
})
