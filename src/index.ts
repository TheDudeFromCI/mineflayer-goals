import { Bot } from 'mineflayer'
import { Goals } from './Goals'

export function plugin (bot: Bot): void {
  // @ts-expect-error
  bot.goals = new Goals(bot)
}

export * from './Goals'
export * from './api'
export * from './impl'
