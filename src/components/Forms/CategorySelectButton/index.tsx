import React from 'react'

import * as S from './styles'

type CategorySelectButtonProps = {
  title: string
  onPress: () => void
}

export function CategorySelectButton({
  title,
  onPress,
}: CategorySelectButtonProps) {
  return (
    <S.Container onPress={onPress}>
      <S.Category>{title}</S.Category>
      <S.Icon name="chevron-down" />
    </S.Container>
  )
}
