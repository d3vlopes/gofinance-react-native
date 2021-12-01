import React from 'react'
import { TextInputProps } from 'react-native'

import * as S from './styles'

type InputProps = TextInputProps

export function Input({ ...rest }: InputProps) {
  return <S.Container {...rest} />
}
