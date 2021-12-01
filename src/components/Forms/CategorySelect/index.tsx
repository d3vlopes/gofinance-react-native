import React from 'react'

import * as S from './styles'

type CategorySelectProps = {
  title: string
}

export function CategorySelect({ title }: CategorySelectProps) {
  return (
    <S.Container>
      <S.Category>{title}</S.Category>
      <S.Icon name="chevron-down" />
    </S.Container>
  )
}
