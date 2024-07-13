import { FolderSimplePlus } from '@phosphor-icons/react'

import { ActionButton } from '../../../components/action-button'

interface EmptyDestinationsProps {
  onCreateDestination: () => void
}

export function EmptyDestinations({
  onCreateDestination,
}: EmptyDestinationsProps) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-3">
      <span>Essa pasta ainda não possui destinos {':('}</span>
      <ActionButton
        Icon={FolderSimplePlus}
        apparence="action"
        onClick={onCreateDestination}
      >
        Vincular destino
      </ActionButton>
    </div>
  )
}
