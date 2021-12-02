import React, { useState } from 'react'
import { Modal } from 'react-native'

import { Button } from '../../components/Forms/Button'
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton'
import { Input } from '../../components/Forms/Input'
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton'

import { CategorySelect } from '../CategorySelect'

import * as S from './styles'

export function Register() {
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  function handleTransationTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
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
          <CategorySelectButton
            title="Categoria"
            onPress={handleOpenSelectCategoryModal}
          />
        </S.Fields>
        <Button title="Enviar" />
      </S.Form>
      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </S.Container>
  )
}
