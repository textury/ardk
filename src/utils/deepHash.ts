import Solid from '../solid';
import { DeepHashChunk, DeepHashChunks } from '../faces/utils/deepHash';
import { concatBuffers, stringToBuffer } from './buffer';

const deepHash = async (data: DeepHashChunk): Promise<Uint8Array> => {
  let tag: Uint8Array;

  if (Array.isArray(data)) {
    tag = concatBuffers([stringToBuffer('list'), stringToBuffer(data.length.toString())]);

    return await deepHashChunks(data, await Solid.crypto.hash(tag, 'SHA-384'));
  }

  tag = concatBuffers([stringToBuffer('blob'), stringToBuffer(data.byteLength.toString())]);

  const taggedHash = concatBuffers([await Solid.crypto.hash(tag, 'SHA-384'), await Solid.crypto.hash(data, 'SHA-384')]);

  return await Solid.crypto.hash(taggedHash, 'SHA-384');
};

export const deepHashChunks = async (chunks: DeepHashChunks, acc: Uint8Array): Promise<Uint8Array> => {
  if (chunks.length < 1) {
    return acc;
  }

  const hashPair = concatBuffers([acc, await deepHash(chunks[0])]);
  const newAcc = await Solid.crypto.hash(hashPair, 'SHA-384');
  return deepHashChunks(chunks.slice(1), newAcc);
};

export default deepHash;
