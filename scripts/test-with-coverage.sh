#!/bin/bash

set -uo pipefail

npm run coverage
testResult="$?"
echo "testResult was ${testResult}"
bash <(curl -s https://codecov.io/bash)
if [ "$testResult" != "0" ]; then
  echo 'It looks like your test failed.'
  exit 1
fi
echo 'Test suite succeeded.'
exit 0
