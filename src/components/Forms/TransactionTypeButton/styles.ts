import styled, { css, DefaultTheme } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { TransactionTypeButtonProps } from '.'

type ContainerProps = Pick<TransactionTypeButtonProps, 'isActive' | 'type'>

const containerModifiers = {
  isActive: (theme: DefaultTheme, type: 'up' | 'down') => css`
    background-color: ${type === 'down'
      ? theme.colors.attention_light
      : theme.colors.success_light};
    border: none;
  `,
}

export const Container = styled.View<ContainerProps>`
  ${({ theme, isActive, type }) => css`
    width: 48%;
    border: 1.5px solid ${theme.colors.text};
    border-radius: 5px;

    ${isActive && containerModifiers.isActive(theme, type)};
  `}
`

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
`

export const Icon = styled(Feather)<Pick<TransactionTypeButtonProps, 'type'>>`
  ${({ theme, type }) => css`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
    color: ${type === 'up' ? theme.colors.success : theme.colors.attention};
  `}
`

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(14)}px;
  `}
`
