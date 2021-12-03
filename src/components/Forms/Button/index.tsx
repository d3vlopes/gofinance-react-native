import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import * as S from './styles'

type ButtonProps = {
  title: string
  onPress: () => void
} & RectButtonProps

export function Button({ title, onPress, ...rest }: ButtonProps) {
  return (
    <S.Container onPress={onPress} {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  )
}
