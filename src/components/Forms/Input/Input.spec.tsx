import React from 'react'
import { render } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'

import theme from '../../../global/styles/theme'

import { Input } from '.'

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

describe('<Input />', () => {
  it('should render border with correctly color when active', () => {
    const { getByTestId } = render(
      <Input
        testID="input-email"
        placeholder="email"
        keyboardType="email-address"
        autoCorrect={false}
        active
      />,
      {
        wrapper: Providers,
      },
    )

    const { props: input } = getByTestId('input-email')

    expect(input.style[0].borderColor).toEqual(theme.colors.attention)
    expect(input.style[0].borderWidth).toEqual(3)
  })
})
