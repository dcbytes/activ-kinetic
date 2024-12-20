#!/bin/sh

# Get the directory of the current script
SCRIPT_DIR=$(dirname "$(realpath "$0")")

# The routes file
ROUTES_FILE="$SCRIPT_DIR/../routes.txt"

# The website API
WEBSITE_API="http://127.0.0.1:1337/platform/api/blog/4e41971e-beb0-11ef-abdc-0242ac120002/slugs"

# Check if the first argument is "with-date"
response=$(curl -s "${WEBSITE_API}")
echo "$response" | tr -d '[]"' | tr ',' '\n' | sed 's/^/\/blog\//' >$ROUTES_FILE


