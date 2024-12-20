#!/bin/sh

# This script will update the original sitemap.xml file with the latest blog routes
# that we have from routes.txt file

# Get the directory of the current script
SCRIPT_DIR=$(dirname "$(realpath "$0")")

# The routes file
ROUTES_FILE="$SCRIPT_DIR/../routes.txt"

# The original sitemap file
ORIGINAL_SITEMAP_FILE="$SCRIPT_DIR/../public/sitemap.original.xml"

# The working sitemap file
SITEMAP_FILE="$SCRIPT_DIR/../public/sitemap.xml"

# Overwrite the working sitemap file with the original sitemap file
cp "$ORIGINAL_SITEMAP_FILE" "$SITEMAP_FILE"

# Remove the closing </urlset> tag from sitemap.xml
echo "Removing closing </urlset> tag from $SITEMAP_FILE..."
sed -i '/<\/urlset>$/d' "$SITEMAP_FILE"

echo "Adding routes to $SITEMAP_FILE..."
# Read the routes.txt file and append entries to sitemap.xml
while IFS= read -r route; do
  echo "Processing route: $route"
  # Check if the route already exists in sitemap.xml
  if grep -q "<loc>https://activkinetic.ro$route</loc>" "$SITEMAP_FILE"; then
    echo "Route already exists: $route"
  else
    echo "Adding new route: $route"
    echo "  <url>" >>"$SITEMAP_FILE"
    echo "    <loc>https://activkinetic.ro$route</loc>" >>"$SITEMAP_FILE"
    echo "  </url>" >>"$SITEMAP_FILE"
  fi
done <"$ROUTES_FILE"

# Add the closing </urlset> tag to sitemap.xml
echo '</urlset>' >>"$SITEMAP_FILE"


