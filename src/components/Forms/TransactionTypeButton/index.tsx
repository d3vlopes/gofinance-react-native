import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import * as S from './styles'

export type TransactionTypeButtonProps = {
  title: string
  type: 'up' | 'down'
  isActive: boolean
} & RectButtonProps

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: TransactionTypeButtonProps) {
  return (
    <S.Container type={type} isActive={isActive}>
      <S.Button {...rest}>
        <S.Icon type={type} name={icons[type]} />
        <S.Title>{title}</S.Title>
      </S.Button>
    </S.Container>
  )
}
