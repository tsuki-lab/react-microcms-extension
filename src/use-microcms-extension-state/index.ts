import { useEffect, useMemo, useState } from 'react'
import { useMicroCMSExtension } from '../use-microcms-extension'
import {
  ParsePostMessageParams,
  UseMicroCMSExtensionStateOptions,
  UseMicroCMSExtensionStateReturnValue,
} from './types'
import { descriptionParser } from './utils'

export const useMicroCMSExtensionState = <T>(
  initialState: T,
  options?: UseMicroCMSExtensionStateOptions<T>
): UseMicroCMSExtensionStateReturnValue<T> => {
  const parsePostMessageParams = useMemo<ParsePostMessageParams<T>>(() => {
    return (
      options?.parsePostMessageParams ??
      ((data) => ({
        description: descriptionParser(data),
        data,
      }))
    )
  }, [options?.parsePostMessageParams])

  const [state, setState] = useState<T>(initialState)
  const { state: iframeState, post } = useMicroCMSExtension<T>({
    origin: options?.origin,
    height: options?.height,
    width: options?.width,
  })

  useEffect(() => {
    if (iframeState?.message) {
      setState(iframeState.message.data)
    }
  }, [iframeState])

  useEffect(() => {
    post(parsePostMessageParams(state))
  }, [parsePostMessageParams, post, state])

  return [state, setState]
}
