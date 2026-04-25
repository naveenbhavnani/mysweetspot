#!/bin/bash
# Parses racket-roundups.md into roundups-list.txt
# Format: slug|title|url1,url2,url3,...

INPUT="../racket-roundups.md"
OUTPUT="roundups-list.txt"

cd "$(dirname "$0")"

> "$OUTPUT"

current_slug=""
current_title=""
current_urls=""

while IFS= read -r line; do
  # Match section headers: ## Best ... in India (2026)
  if [[ "$line" =~ ^##[[:space:]]+(Best[[:space:]].+)$ ]]; then
    # Save previous roundup if exists
    if [[ -n "$current_slug" && -n "$current_urls" ]]; then
      echo "${current_slug}|${current_title}|${current_urls}" >> "$OUTPUT"
    fi
    current_title="${BASH_REMATCH[1]}"
    current_urls=""
    current_slug=""
  fi

  # Match slug line
  if [[ "$line" =~ ^\*\*Slug:\*\*[[:space:]]+\`([^\`]+)\` ]]; then
    current_slug="${BASH_REMATCH[1]}"
  fi

  # Match Amazon URLs in list items
  regex='https://www\.amazon\.in/[^)\"]+'
  if [[ "$line" =~ $regex ]]; then
    url="${BASH_REMATCH[0]}"
    if [[ -n "$current_urls" ]]; then
      current_urls="${current_urls},${url}"
    else
      current_urls="${url}"
    fi
  fi

done < "$INPUT"

# Save last roundup
if [[ -n "$current_slug" && -n "$current_urls" ]]; then
  echo "${current_slug}|${current_title}|${current_urls}" >> "$OUTPUT"
fi

# Count and report
total=$(wc -l < "$OUTPUT" | tr -d ' ')
echo "Parsed $total roundups into $OUTPUT"

# Show roundups with no products (skipped)
echo ""
echo "Skipped (no products):"
grep -c "^$" "$OUTPUT" || echo "  None"
