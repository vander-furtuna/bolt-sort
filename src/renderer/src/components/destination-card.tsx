import { FolderSimple } from '@phosphor-icons/react'

interface DestinationCardProps {
  destination: {
    id: string
    folder: {
      id: string
      name: string
      path: string
    }
    extensions: {
      name: string
    }[]
  }
}

export function DestinationCard({ destination }: DestinationCardProps) {
  // const { id } = useParams<{ id: string }>()

  return (
    <div className="w-[20rem] rounded-md bg-stone-800">
      <div className="flex h-10 items-center gap-2 rounded-md bg-stone-750 px-3">
        <FolderSimple className="size-4 text-stone-300" />
        <span className="text-sm font-semibold text-stone-200">
          {destination.folder.path && destination.folder.path}
        </span>
      </div>
      <div className="flex h-9 w-full items-center gap-2 px-3">
        {/* <ExtensionInput onCreateExtension={handleCreateExtension} />
        {destination.extensions.map((extension) => (
          <ExtensionItem key={extension.name} extension={extension} />
        ))} */}
      </div>
    </div>
  )
}
