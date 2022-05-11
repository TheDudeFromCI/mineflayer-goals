const { registerTest } = require('mineflayer-test-api')
const assert = require('assert')
const goals = require('mineflayer-goals')

registerTest('break 1 grass', async (server, startPosition) => {
  const bot = await server.createBot({
    startPosition,
    plugins: [goals.plugin]
  })

  const block = bot.blockAt(startPosition.offset(2, -1, 0))

  const goal = new goals.BreakBlockGoal(block)
  const action = bot.goals.calculateNextAction(goal)
  await action.run()

  assert(bot.inventory.count('dirt') === 1)
})
