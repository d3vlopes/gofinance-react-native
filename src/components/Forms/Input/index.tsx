import React from 'react'
import { TextInputProps } from 'react-native'

import * as S from './styles'

type InputProps = {
  active?: boolean
} & TextInputProps

export function Input({ active = false, ...rest }: InputProps) {
  return <S.Container active={active} {...rest} />
}
