import type { Buffer } from 'buffer'
import * as chai from 'chai'
import { expect } from 'chai'
import * as spies from 'chai-spies'
import { resolve } from 'path'
import * as vscode from 'vscode'

import { readelf } from '../../util'

chai.use(spies)
chai.spy.sandbox()

// eslint-disable-next-line @typescript-eslint/no-empty-function
function expectType<T> (value: T): void {}

suite('Test util', () => {
  vscode.window.showInformationMessage('Testing util')
  test('function: load', async () => {
    const result = await readelf(resolve(__dirname, 'fixtures', '1.out'))

    expectType<Buffer>(result)

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const noop = chai.spy(() => {})

    await readelf(resolve(__dirname, 'fixtures', 'fail.out')).catch(noop)
    expect(noop).to.have.been.called.once
  })
})
