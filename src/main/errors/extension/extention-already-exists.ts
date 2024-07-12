export class ExtensionAlreadyExistsError extends Error {
  constructor() {
    super('A extensão já existe nesse destino!')
    this.name = 'Extension Already Exists Error'
  }
}
