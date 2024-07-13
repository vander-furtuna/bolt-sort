import { createContext, type ReactNode, useContext } from 'react'

// Defina o tipo de dados que o contexto irá armazenar
type SorterContextData = {
  // Adicione aqui as propriedades e métodos que deseja compartilhar
}

const SorterContext = createContext<SorterContextData>({} as SorterContextData)

type SorterContextProviderProps = {
  children: ReactNode
}

export function SorterContextProvider({
  children,
}: SorterContextProviderProps) {
  return (
    <SorterContext.Provider
      value={
        {
          /* Adicione aqui as propriedades e métodos que deseja compartilhar */
        }
      }
    >
      {children}
    </SorterContext.Provider>
  )
}

export function useSorter(): SorterContextData {
  const context = useContext(SorterContext)
  if (!context) {
    throw new Error(
      'useSorterContext deve ser usado dentro de um SorterContextProvider',
    )
  }
  return context
}
