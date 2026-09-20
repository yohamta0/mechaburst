#!/usr/bin/env bash
# Re-encodes the App Preview videos (ios/store/previews/iphone) into web-sized
# hero clips. Needs ffmpeg; SPACEWAR_ROOT points at the game repo (default ..).
set -euo pipefail
cd "$(dirname "$0")/.."
root="${SPACEWAR_ROOT:-..}"
mkdir -p public/media
for lang in ja en; do
  ffmpeg -y -loglevel error -i "$root/ios/store/previews/iphone/$lang.mp4" \
    -vf "scale=720:-2:flags=lanczos" \
    -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -profile:v high -level 4.0 \
    -c:a aac -b:a 96k -ac 2 -movflags +faststart \
    "public/media/preview-$lang.mp4"
  ls -la "public/media/preview-$lang.mp4"
done
