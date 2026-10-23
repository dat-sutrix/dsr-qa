# Lossless PNG recompress (IDAT zlib level 9). Usage: python3 -I repng.py <in> <out>
import sys, zlib, struct
d = open(sys.argv[1], 'rb').read()
assert d[:8] == b'\x89PNG\r\n\x1a\n'
i, chunks, idat = 8, [], b''
while i < len(d):
    n, = struct.unpack('>I', d[i:i+4]); t = d[i+4:i+8]; body = d[i+8:i+8+n]; i += 12 + n
    if t == b'IDAT': idat += body; chunks.append((t, None) if not any(c[0] == b'IDAT' for c in chunks) else None)
    else: chunks.append((t, body))
z = zlib.compress(zlib.decompress(idat), 9)
out = bytearray(d[:8])
for c in chunks:
    if c is None: continue
    t, body = c
    if body is None: body = z
    out += struct.pack('>I', len(body)) + t + body + struct.pack('>I', zlib.crc32(t + body) & 0xffffffff)
open(sys.argv[2], 'wb').write(out)
