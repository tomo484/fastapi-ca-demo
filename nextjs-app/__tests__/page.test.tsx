import { render, screen } from '@testing-library/react'
import HomePage from '../app/page'

// ホームページの基本的なテスト
describe('HomePage', () => {
  it('正常にレンダリングされる', () => {
    render(<HomePage />)
    
    // h1タグが存在することを確認
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('正しいテキストが表示される', () => {
    render(<HomePage />)
    
    // 期待するテキストが表示されることを確認
    expect(screen.getByText('Hello Next.js')).toBeInTheDocument()
  })

  it('基本的なHTMLマークアップが正しい', () => {
    render(<HomePage />)
    
    // divコンテナが存在することを確認
    const container = screen.getByText('Hello Next.js').closest('div')
    expect(container).toBeInTheDocument()
  })
}) 