import styled, { css, DefaultTheme } from 'styled-components/native'
import { TextInput } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

type ContainerProps = {
  active?: boolean
}

const containerModifiers = {
  withBorder: (theme: DefaultTheme) => css`
    border-width: 3px;
    border-color: ${theme.colors.attention};
  `,
}

export const Container = styled(TextInput)<ContainerProps>`
  ${({ theme, active }) => css`
    width: 100%;
    padding: 16px 18px;
    font-size: ${RFValue(14)}px;
    font-family: ${theme.fonts.regular};
    background-color: ${theme.colors.shape};
    color: ${theme.colors.text_dark};
    border-radius: 5px;
    margin-bottom: 8px;

    ${active && containerModifiers.withBorder(theme)};
  `}
`
