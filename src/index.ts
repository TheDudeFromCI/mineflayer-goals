import { Bot } from 'mineflayer'
import { Goals } from './Goals'
import collectBlock from 'mineflayer-collectblock'

export function plugin (bot: Bot): void {
  bot.loadPlugin(collectBlock.plugin)

  // @ts-expect-error
  bot.goals = new Goals(bot)
}

export * from './Goals'
export * from './api'
export * from './impl'
export * from './util'
