import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import * as S from './styles'

export type TransactionTypeButtonProps = {
  title: string
  type: 'up' | 'down'
  isActive: boolean
} & TouchableOpacityProps

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
    <S.Container type={type} isActive={isActive} {...rest}>
      <S.Icon type={type} name={icons[type]} />
      <S.Title>{title}</S.Title>
    </S.Container>
  )
}
