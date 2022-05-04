const { registerTest } = require('mineflayer-test-api')
const mineflayer = require('mineflayer')
const events = require('events')
const assert = require('assert')
const goals = require('mineflayer-goals')

registerTest('break 1 grass', async (server, startPosition) => {
  const bot = mineflayer.createBot({
    host: 'localhost',
    port: server.port,
    username: 'break1Grass'
  })

  bot.loadPlugin(goals.plugin)
  await events.once(bot, 'spawn')
  await server.makeOp(bot)
  await server.teleport(bot, startPosition)

  const block = bot.blockAt(startPosition.offset(2, -1, 0))

  const goal = new goals.BreakBlockGoal(block)
  const action = bot.goals.calculateNextAction(goal)
  await action.run()

  assert(bot.inventory.count('dirt') === 1)
})
