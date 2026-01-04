import { test } from '@japa/runner'

test.group('auth', (group) => {
  test('My Test', async ({ assert, client }) => {
    await client.visit('auth.login').json({
      email: 'foo@ok.com',
      password: 'foo@ok.com',
    })
  })
})
