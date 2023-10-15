#!/bin/sh

set -x

docker save -o backend-image.tar api-test
scp backend-image.tar ubuntu@157.230.232.58:~
