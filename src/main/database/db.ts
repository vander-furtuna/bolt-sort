import lodash from 'lodash'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

import type { Sorter } from '~/src/shared/types/sorter'

type Data = {
  sorters: Sorter[]
}

const defaultData: Data = {
  sorters: [],
}

class LowWithLodash<T> extends Low<T> {
  chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')
}

export async function getDatabase() {
  const adapter = new JSONFile<Data>('db.json')

  const db = new LowWithLodash(adapter, defaultData)
  await db.read()
  return db
}
