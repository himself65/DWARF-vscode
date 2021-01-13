import { strictEqual } from 'assert'
import { PathLike, promises } from 'fs'

const elfMagic = [0x7f, 0x45, 0x4c, 0x46]

export function readelf (filename: PathLike) {
  return promises.readFile(filename).then((buf: Buffer) => {
    let offset = 0
    elfMagic.forEach(magicNumber => {
      const expectedNumber = buf.readInt8(offset++)
      strictEqual(expectedNumber, magicNumber)
    })
    return buf
  })
}
