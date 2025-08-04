import React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

declare namespace React {
  type ReactNode = import('react').ReactNode
}

export {} 