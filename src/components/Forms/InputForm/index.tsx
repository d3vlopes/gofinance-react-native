import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { TextInputProps } from 'react-native'

import { Input } from '../Input'

import * as S from './styles'

type InputForm = {
  control: Control
  name: string
  error: string
} & TextInputProps

export function InputForm({ control, name, error, ...rest }: InputForm) {
  return (
    <S.Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
        name={name}
      />
      {!!error && <S.Error>{error}</S.Error>}
    </S.Container>
  )
}
