import { render, screen } from '@testing-library/react'
import HomePage from '../app/page'
import RootLayout from '../app/layout'

// アプリケーション全体のスモークテスト
describe('App Smoke Tests', () => {
  it('ホームページが完全にレンダリングされる', () => {
    // レイアウトとページを組み合わせてテスト
    render(
      <RootLayout>
        <HomePage />
      </RootLayout>
    )
    
    // 基本的な要素が存在することを確認
    expect(screen.getByText('Hello Next.js')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('HTML構造が正しく構築される', () => {
    const { container } = render(
      <RootLayout>
        <HomePage />
      </RootLayout>
    )
    
    // HTMLの基本構造を確認
    expect(container.querySelector('html')).toBeInTheDocument()
    expect(container.querySelector('body')).toBeInTheDocument()
    expect(container.querySelector('h1')).toBeInTheDocument()
  })

  it('レンダリング時にエラーが発生しない', () => {
    // エラーがスローされないことを確認
    expect(() => {
      render(
        <RootLayout>
          <HomePage />
        </RootLayout>
      )
    }).not.toThrow()
  })

  it('アクセシビリティ基本チェック', () => {
    render(
      <RootLayout>
        <HomePage />
      </RootLayout>
    )
    
    // heading要素が適切に配置されていることを確認
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
    
    // 最初のheadingがh1であることを確認
    expect(headings[0].tagName).toBe('H1')
  })
}) 