import React, { useState } from 'react'

import { Button } from '../../components/Forms/Button'
import { CategorySelect } from '../../components/Forms/CategorySelect'
import { Input } from '../../components/Forms/Input'
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton'

import * as S from './styles'

export function Register() {
  const [transactionType, setTransactionType] = useState('')

  function handleTransationTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>
      <S.Form>
        <S.Fields>
          <Input placeholder="Home" />
          <Input placeholder="Preço" />
          <S.TransactionsTypesWrapper>
            <TransactionTypeButton
              type="up"
              title="Income"
              isActive={transactionType === 'up'}
              onPress={() => handleTransationTypeSelect('up')}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              isActive={transactionType === 'down'}
              onPress={() => handleTransationTypeSelect('down')}
            />
          </S.TransactionsTypesWrapper>
          <CategorySelect title="Categoria" />
        </S.Fields>
        <Button title="Enviar" />
      </S.Form>
    </S.Container>
  )
}
