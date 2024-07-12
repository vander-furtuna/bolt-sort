import { WindowsClose } from '../assets/icons/windows-close'
import { WindowsMaximize } from '../assets/icons/windows-maximize-button'
import { WindowsMinimize } from '../assets/icons/windows-minimize'

export function WindowsButtons() {
  return (
    <div className="flex h-full items-center justify-center region-no-drag">
      <button
        id="minimize"
        className="flex h-full w-12 items-center justify-center transition-colors duration-150 hover:bg-stone-800"
        onClick={() => window.api.window.minimize()}
      >
        <WindowsMinimize />
      </button>
      <button
        className="flex h-full w-12 items-center justify-center transition-colors duration-150 hover:bg-stone-800"
        onClick={() => window.api.window.maximize()}
      >
        <WindowsMaximize />
      </button>
      <button
        className="flex h-full w-12 items-center justify-center transition-colors duration-150 hover:bg-red-600"
        onClick={() => window.api.window.close()}
      >
        <WindowsClose />
      </button>
    </div>
  )
}
