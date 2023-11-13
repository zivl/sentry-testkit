import execa from 'execa'

describe('es modules require', () => {
  it('should allow to import as native esm', () => {
    // test will fail if the command fails
    execa.commandSync(
      'node --experimental-vm-modules __tests__/fixtures/esm.mjs',
      {
        stdio: 'inherit',
      }
    )
  })
})
