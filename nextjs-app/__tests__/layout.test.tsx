import { render, screen } from '@testing-library/react'
import RootLayout from '../app/layout'

// レイアウトコンポーネントの基本的なテスト
describe('RootLayout', () => {
  it('子要素が正常にレンダリングされる', () => {
    const testContent = 'テストコンテンツ'
    
    render(
      <RootLayout>
        <div>{testContent}</div>
      </RootLayout>
    )
    
    // 子要素が表示されることを確認
    expect(screen.getByText(testContent)).toBeInTheDocument()
  })

  it('HTML構造が正しい', () => {
    const testContent = 'テストコンテンツ'
    
    const { container } = render(
      <RootLayout>
        <div>{testContent}</div>
      </RootLayout>
    )
    
    // htmlタグが存在することを確認
    const htmlElement = container.querySelector('html')
    expect(htmlElement).toBeInTheDocument()
    expect(htmlElement).toHaveAttribute('lang', 'ja')
    
    // bodyタグが存在することを確認
    const bodyElement = container.querySelector('body')
    expect(bodyElement).toBeInTheDocument()
  })

  it('複数の子要素を正しく表示する', () => {
    render(
      <RootLayout>
        <div>コンテンツ1</div>
        <div>コンテンツ2</div>
      </RootLayout>
    )
    
    expect(screen.getByText('コンテンツ1')).toBeInTheDocument()
    expect(screen.getByText('コンテンツ2')).toBeInTheDocument()
  })
}) 