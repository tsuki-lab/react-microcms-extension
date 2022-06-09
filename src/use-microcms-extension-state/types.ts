import {
  Message,
  UseMicroCMSExtensionOptions,
} from '../use-microcms-extension/types'

export type ParsePostMessageParams<T> = (data: T) => Message<T>

export type UseMicroCMSExtensionStateOptions<T> = {
  parsePostMessageParams?: ParsePostMessageParams<T>
} & UseMicroCMSExtensionOptions

export type UseMicroCMSExtensionStateReturnValue<T> = [
  state: T,
  setState: React.Dispatch<React.SetStateAction<T>>
]
