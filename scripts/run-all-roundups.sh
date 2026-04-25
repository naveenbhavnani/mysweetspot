#!/bin/bash
# Run all roundups sequentially, each in its own Claude CLI invocation.
# Usage: ./run-all-roundups.sh [--start-from N] [--dry-run]
#
# Each roundup gets a fresh context window, so no token waste.
# Run with: nohup ./run-all-roundups.sh > runner.log 2>&1 &
# Or inside tmux/screen for monitoring.

set -euo pipefail

# Allow nested claude invocations
unset CLAUDECODE 2>/dev/null || true

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
INPUT_FILE="$SCRIPT_DIR/roundups-list.txt"
LOG_DIR="$SCRIPT_DIR/logs"
PROMPT_TEMPLATE="$SCRIPT_DIR/roundup-prompt.md"
PROGRESS_FILE="$SCRIPT_DIR/progress.txt"

# Defaults
START_FROM=1
DRY_RUN=false
MAX_TURNS=80

# Parse args
while [[ $# -gt 0 ]]; do
  case $1 in
    --start-from) START_FROM="$2"; shift 2 ;;
    --dry-run) DRY_RUN=true; shift ;;
    --max-turns) MAX_TURNS="$2"; shift 2 ;;
    *) echo "Unknown arg: $1"; exit 1 ;;
  esac
done

mkdir -p "$LOG_DIR"

if [[ ! -f "$INPUT_FILE" ]]; then
  echo "ERROR: $INPUT_FILE not found. Run parse-roundups.sh first."
  exit 1
fi

TOTAL=$(wc -l < "$INPUT_FILE" | tr -d ' ')
echo "========================================"
echo "MySweetSpot Roundup Runner"
echo "Total roundups: $TOTAL"
echo "Starting from:  $START_FROM"
echo "Max turns/each: $MAX_TURNS"
echo "Dry run:        $DRY_RUN"
echo "========================================"
echo ""

LINE_NUM=0
SUCCESS=0
FAILED=0

while IFS='|' read -r slug title urls; do
  LINE_NUM=$((LINE_NUM + 1))

  # Skip until start-from
  if [[ $LINE_NUM -lt $START_FROM ]]; then
    continue
  fi

  echo "[$LINE_NUM/$TOTAL] Starting: $title"
  echo "  Slug: $slug"
  echo "  Products: $(echo "$urls" | tr ',' '\n' | wc -l | tr -d ' ')"

  if [[ "$DRY_RUN" == "true" ]]; then
    echo "  [DRY RUN] Would process $slug"
    echo ""
    continue
  fi

  # Build the prompt by replacing placeholders
  PROMPT=$(sed \
    -e "s|{{SLUG}}|$slug|g" \
    -e "s|{{TITLE}}|$title|g" \
    -e "s|{{URLS}}|$urls|g" \
    "$PROMPT_TEMPLATE")

  LOG_FILE="$LOG_DIR/${slug}.log"
  START_TIME=$(date +%s)

  # Run Claude CLI with fresh context from the project directory
  if (cd "$PROJECT_DIR" && claude -p "$PROMPT" \
    --allowedTools "Bash,Read,Write,Edit,Glob,Grep,WebFetch,Agent,mcp__playwright__*" \
    --max-turns "$MAX_TURNS" \
    ) > "$LOG_FILE" 2>&1; then

    END_TIME=$(date +%s)
    DURATION=$(( END_TIME - START_TIME ))
    echo "  Done in ${DURATION}s"
    echo "$LINE_NUM|$slug|success|${DURATION}s" >> "$PROGRESS_FILE"
    SUCCESS=$((SUCCESS + 1))
  else
    END_TIME=$(date +%s)
    DURATION=$(( END_TIME - START_TIME ))
    echo "  FAILED after ${DURATION}s — check $LOG_FILE"
    echo "$LINE_NUM|$slug|failed|${DURATION}s" >> "$PROGRESS_FILE"
    FAILED=$((FAILED + 1))
  fi

  echo ""

done < "$INPUT_FILE"

echo "========================================"
echo "Completed!"
echo "  Success: $SUCCESS"
echo "  Failed:  $FAILED"
echo "  Logs:    $LOG_DIR/"
echo "  Progress: $PROGRESS_FILE"
echo "========================================"
