import { WindowsButtons } from '../components/windows-buttons'

export function Home() {
  return (
    <section className="flex size-full flex-col items-center justify-center">
      <div className="flex h-12 w-full justify-end border-b border-stone-700 region-drag">
        <WindowsButtons />
      </div>
      <div className="flex size-full items-center justify-center">
        Selecione uma pasta
      </div>
    </section>
  )
}
