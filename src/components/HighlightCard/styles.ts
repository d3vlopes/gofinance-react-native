import styled, { css, DefaultTheme } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { HightlightCardProps } from '.'

export const Container = styled.View<Pick<HightlightCardProps, 'type'>>`
  ${({ theme, type }) => css`
    background-color: ${type === 'total'
      ? theme.colors.secondary
      : theme.colors.shape};
    width: ${RFValue(300)}px;
    border-radius: 5px;
    padding: 19px 23px;
    padding-bottom: ${RFValue(42)}px;
    margin-right: 16px;
  `}
`

export const Header = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    justify-content: space-between;
  `}
`

export const Title = styled.Text<Pick<HightlightCardProps, 'type'>>`
  ${({ theme, type }) => css`
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${type === 'total' ? theme.colors.shape : theme.colors.text_dark};
  `}
`

const iconModifiers = {
  up: (theme: DefaultTheme) => css`
    color: ${theme.colors.success};
  `,
  down: (theme: DefaultTheme) => css`
    color: ${theme.colors.attention};
  `,
  total: (theme: DefaultTheme) => css`
    color: ${theme.colors.shape};
  `,
}

export const Icon = styled(Feather)<Pick<HightlightCardProps, 'type'>>`
  ${({ theme, type }) => css`
    font-size: ${RFValue(40)}px;

    ${!!type && iconModifiers[type](theme)};
  `}
`

export const Footer = styled.View`
  ${({ theme }) => css``}
`

export const Amount = styled.Text<Pick<HightlightCardProps, 'type'>>`
  ${({ theme, type }) => css`
    font-family: ${theme.fonts.medium};
    font-size: ${RFValue(32)}px;
    color: ${type === 'total' ? theme.colors.shape : theme.colors.text_dark};
    margin-top: 38px;
  `}
`

export const LastTransaction = styled.Text<Pick<HightlightCardProps, 'type'>>`
  ${({ theme, type }) => css`
    font-family: ${theme.fonts.regular};
    color: ${type === 'total' ? theme.colors.shape : theme.colors.text};
  `}
`
