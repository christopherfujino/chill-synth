#!/bin/bash

npm outdated # show outdated dependencies

script_dir=$(dirname $(readlink -f "${BASH_SOURCE[0]}"))
filename="$script_dir/../package-lock.json"

# collect both times in seconds-since-the-epoch
ten_days_ago=$(date -d 'now - 10 days' +%s)
file_time=$(date -r "$filename" +%s)

echo "$filename was last edited $(date -r "$filename")"
if (( file_time <= ten_days_ago )); then
  echo "$filename is older than 10 days"
  exit 1
else
  echo "$filename is fresh."
  exit 0
fi
