#!/bin/bash
# Kvennaskólinn Chemistry Game Creator
# Creates a new game from the template with proper configuration

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check arguments
if [ "$#" -lt 4 ]; then
    echo -e "${RED}Usage: ./create-game.sh <year> <game-name> \"<Game Title>\" \"<Description>\"${NC}"
    echo ""
    echo "Example:"
    echo "  ./create-game.sh 1-ar molmassi \"Mólmassi Leikur\" \"Læra um mólmassa efna\""
    echo ""
    echo "Arguments:"
    echo "  <year>         Year level (e.g., 1-ar, 2-ar, 3-ar)"
    echo "  <game-name>    Game directory name (lowercase, no spaces)"
    echo "  <Game Title>   Display title for the game"
    echo "  <Description>  Short description of the game"
    exit 1
fi

YEAR=$1
GAME_NAME=$2
GAME_TITLE=$3
GAME_DESCRIPTION=$4

# Derived values
FULL_NAME="@kvenno/$GAME_NAME"
OUTPUT_DIR="../../../$YEAR"
OUTPUT_FILENAME="$GAME_NAME"
GAME_ID="$GAME_NAME"
GAME_SUBTITLE="Efnafræði $YEAR"

# Paths
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATE_DIR="$REPO_ROOT/tools/game-template"
TARGET_DIR="$REPO_ROOT/games/$YEAR/$GAME_NAME"

echo -e "${GREEN}Creating new game: $GAME_TITLE${NC}"
echo "  Name:   $GAME_NAME"
echo "  Year:   $YEAR"
echo "  Target: $TARGET_DIR"
echo ""

# Check if target directory already exists
if [ -d "$TARGET_DIR" ]; then
    echo -e "${RED}Error: Directory $TARGET_DIR already exists!${NC}"
    exit 1
fi

# Check if template exists
if [ ! -d "$TEMPLATE_DIR" ]; then
    echo -e "${RED}Error: Template directory not found at $TEMPLATE_DIR${NC}"
    exit 1
fi

# Create target directory
echo -e "${YELLOW}Creating directory structure...${NC}"
mkdir -p "$TARGET_DIR"

# Copy template files
echo -e "${YELLOW}Copying template files...${NC}"
cp -r "$TEMPLATE_DIR/"* "$TARGET_DIR/"

# Calculate relative paths based on directory depth
DEPTH_TO_ROOT="../../../"
SHARED_PATH="${DEPTH_TO_ROOT}shared"
TSCONFIG_BASE_PATH="${DEPTH_TO_ROOT}tsconfig.base.json"
SHARED_INCLUDE_PATH="${DEPTH_TO_ROOT}shared/**/*"

echo -e "${YELLOW}Configuring package.json...${NC}"
sed -i "s|GAME_NAME|$GAME_NAME|g" "$TARGET_DIR/package.json"
sed -i "s|GAME_DESCRIPTION|$GAME_DESCRIPTION|g" "$TARGET_DIR/package.json"
sed -i "s|OUTPUT_DIR|$OUTPUT_DIR|g" "$TARGET_DIR/package.json"
sed -i "s|OUTPUT_FILENAME|$OUTPUT_FILENAME|g" "$TARGET_DIR/package.json"

echo -e "${YELLOW}Configuring vite.config.ts...${NC}"
sed -i "s|SHARED_PATH|$SHARED_PATH|g" "$TARGET_DIR/vite.config.ts"
sed -i "s|OUTPUT_DIR|$OUTPUT_DIR|g" "$TARGET_DIR/vite.config.ts"
sed -i "s|OUTPUT_FILENAME|$OUTPUT_FILENAME|g" "$TARGET_DIR/vite.config.ts"

echo -e "${YELLOW}Configuring tsconfig.json...${NC}"
sed -i "s|TSCONFIG_BASE_PATH|$TSCONFIG_BASE_PATH|g" "$TARGET_DIR/tsconfig.json"
sed -i "s|SHARED_INCLUDE_PATH|$SHARED_INCLUDE_PATH|g" "$TARGET_DIR/tsconfig.json"

echo -e "${YELLOW}Configuring index.html...${NC}"
sed -i "s|GAME_TITLE|$GAME_TITLE|g" "$TARGET_DIR/index.html"
sed -i "s|GAME_DESCRIPTION|$GAME_DESCRIPTION|g" "$TARGET_DIR/index.html"

echo -e "${YELLOW}Configuring App.tsx...${NC}"
sed -i "s|GAME_NAME|$GAME_NAME|g" "$TARGET_DIR/src/App.tsx"
sed -i "s|GAME_ID|$GAME_ID|g" "$TARGET_DIR/src/App.tsx"
sed -i "s|GAME_TITLE|$GAME_TITLE|g" "$TARGET_DIR/src/App.tsx"
sed -i "s|GAME_SUBTITLE|$GAME_SUBTITLE|g" "$TARGET_DIR/src/App.tsx"
sed -i "s|GAME_DESCRIPTION|$GAME_DESCRIPTION|g" "$TARGET_DIR/src/App.tsx"

# Create empty data files
echo -e "${YELLOW}Creating data directories...${NC}"
mkdir -p "$TARGET_DIR/src/data"
touch "$TARGET_DIR/src/data/index.ts"

echo ""
echo -e "${GREEN}✓ Game created successfully!${NC}"
echo ""
echo "Next steps:"
echo "  1. cd games/$YEAR/$GAME_NAME"
echo "  2. Create your game data in src/data/"
echo "  3. Implement game logic in src/App.tsx"
echo "  4. pnpm dev  # Start development server"
echo ""
echo "Build commands:"
echo "  pnpm dev         # Start dev server"
echo "  pnpm build       # Build to single HTML file"
echo "  pnpm type-check  # Check TypeScript types"
echo ""
