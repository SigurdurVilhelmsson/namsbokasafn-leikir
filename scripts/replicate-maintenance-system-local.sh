#!/bin/bash

###############################################################################
# Replicate Maintenance System to Another Repository (Local Clone Version)
#
# This script copies the complete master checklist system to another repo
# that you have cloned locally.
#
# Usage:
#   ./scripts/replicate-maintenance-system-local.sh /path/to/target/repo
#
# Example:
#   ./scripts/replicate-maintenance-system-local.sh ~/projects/kvenno-app
#
# What it copies:
#   - REPOSITORY-STATUS.md
#   - scripts/check-status.mjs
#   - docs/MASTER-CHECKLIST-SYSTEM.md
#   - docs/checklists/* (all 7 checklists)
#   - Adds check scripts to package.json
#
# Requirements:
#   - Target repository cloned locally
#   - Node.js installed (for package.json modification)
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if target directory argument provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: No target directory specified${NC}"
    echo ""
    echo "Usage: $0 /path/to/target/repo"
    echo "Example: $0 ~/projects/kvenno-app"
    exit 1
fi

TARGET_DIR="$1"
SOURCE_DIR="/home/user/ChemistryGames"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Maintenance System Replication Script (Local)            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Verify target directory exists
if [ ! -d "$TARGET_DIR" ]; then
    echo -e "${RED}✗ Target directory not found: $TARGET_DIR${NC}"
    exit 1
fi

# Verify it's a git repository
if [ ! -d "$TARGET_DIR/.git" ]; then
    echo -e "${RED}✗ Target directory is not a git repository: $TARGET_DIR${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Target directory found${NC}"
echo -e "${BLUE}Source: ${SOURCE_DIR}${NC}"
echo -e "${BLUE}Target: ${TARGET_DIR}${NC}"
echo ""

# Create directories if they don't exist
echo -e "${YELLOW}Creating directories...${NC}"
mkdir -p "$TARGET_DIR/scripts"
mkdir -p "$TARGET_DIR/docs/checklists"
echo -e "${GREEN}✓ Directories ready${NC}"
echo ""

# Function to copy file
copy_file() {
    local source_file="$1"
    local target_file="$2"
    local description="$3"

    if [ ! -f "$source_file" ]; then
        echo -e "${RED}  ✗ Source file not found: $source_file${NC}"
        return 1
    fi

    echo -e "${YELLOW}  Copying ${description}...${NC}"
    cp "$source_file" "$target_file"
    echo -e "${GREEN}    ✓ ${target_file}${NC}"
}

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}Copying Files${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

# Copy root files
echo -e "${BLUE}Root files:${NC}"
copy_file "$SOURCE_DIR/REPOSITORY-STATUS.md" "$TARGET_DIR/REPOSITORY-STATUS.md" "REPOSITORY-STATUS.md"
echo ""

# Copy scripts
echo -e "${BLUE}Scripts:${NC}"
copy_file "$SOURCE_DIR/scripts/check-status.mjs" "$TARGET_DIR/scripts/check-status.mjs" "check-status.mjs"
chmod +x "$TARGET_DIR/scripts/check-status.mjs"
echo ""

# Copy documentation
echo -e "${BLUE}Documentation:${NC}"
copy_file "$SOURCE_DIR/docs/MASTER-CHECKLIST-SYSTEM.md" "$TARGET_DIR/docs/MASTER-CHECKLIST-SYSTEM.md" "MASTER-CHECKLIST-SYSTEM.md"
echo ""

# Copy checklists
echo -e "${BLUE}Checklists:${NC}"
copy_file "$SOURCE_DIR/docs/checklists/QUICK-DAILY-CHECK.md" "$TARGET_DIR/docs/checklists/QUICK-DAILY-CHECK.md" "QUICK-DAILY-CHECK.md"
copy_file "$SOURCE_DIR/docs/checklists/SECURITY-CHECKLIST.md" "$TARGET_DIR/docs/checklists/SECURITY-CHECKLIST.md" "SECURITY-CHECKLIST.md"
copy_file "$SOURCE_DIR/docs/checklists/CODE-QUALITY-CHECKLIST.md" "$TARGET_DIR/docs/checklists/CODE-QUALITY-CHECKLIST.md" "CODE-QUALITY-CHECKLIST.md"
copy_file "$SOURCE_DIR/docs/checklists/DOCUMENTATION-CHECKLIST.md" "$TARGET_DIR/docs/checklists/DOCUMENTATION-CHECKLIST.md" "DOCUMENTATION-CHECKLIST.md"
copy_file "$SOURCE_DIR/docs/checklists/ACCESSIBILITY-CHECKLIST.md" "$TARGET_DIR/docs/checklists/ACCESSIBILITY-CHECKLIST.md" "ACCESSIBILITY-CHECKLIST.md"
copy_file "$SOURCE_DIR/docs/checklists/PERFORMANCE-CHECKLIST.md" "$TARGET_DIR/docs/checklists/PERFORMANCE-CHECKLIST.md" "PERFORMANCE-CHECKLIST.md"
copy_file "$SOURCE_DIR/docs/checklists/UX-AUDIT-CHECKLIST.md" "$TARGET_DIR/docs/checklists/UX-AUDIT-CHECKLIST.md" "UX-AUDIT-CHECKLIST.md"
echo ""

# Update package.json
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}Updating package.json${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

if [ -f "$TARGET_DIR/package.json" ]; then
    echo -e "${YELLOW}Adding check scripts to package.json...${NC}"

    # Create a Node.js script to update package.json
    node -e "
    const fs = require('fs');
    const path = '$TARGET_DIR/package.json';
    const pkg = JSON.parse(fs.readFileSync(path, 'utf8'));

    // Add scripts if they don't exist
    if (!pkg.scripts) pkg.scripts = {};

    const newScripts = {
      'check:status': 'node scripts/check-status.mjs',
      'check:security': 'pnpm audit && echo \\'✅ Security check complete\\'',
      'check:quality': 'pnpm type-check && pnpm lint && pnpm format:check',
      'check:deps': 'pnpm outdated || true',
      'check:all': 'pnpm check:security && pnpm check:quality && pnpm check:deps'
    };

    let added = false;
    for (const [key, value] of Object.entries(newScripts)) {
      if (!pkg.scripts[key]) {
        pkg.scripts[key] = value;
        added = true;
        console.log('  ✓ Added script:', key);
      } else {
        console.log('  ⏭️  Script already exists:', key);
      }
    }

    if (added) {
      fs.writeFileSync(path, JSON.stringify(pkg, null, 2) + '\n');
      console.log('');
      console.log('✓ package.json updated');
    } else {
      console.log('');
      console.log('ℹ️  All scripts already present in package.json');
    }
    "

    echo -e "${GREEN}✓ package.json processed${NC}"
else
    echo -e "${YELLOW}⚠️  No package.json found in target directory${NC}"
    echo "  You'll need to add the scripts manually"
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}Git Status${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

# Show git status in target directory
cd "$TARGET_DIR"
echo -e "${YELLOW}Changed files:${NC}"
git status --short
echo ""

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}Next Steps${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "${YELLOW}1. Review the changes:${NC}"
echo "   cd $TARGET_DIR"
echo "   git diff"
echo ""

echo -e "${YELLOW}2. Commit the changes:${NC}"
echo "   cd $TARGET_DIR"
echo "   git add ."
echo "   git commit -m \"chore: Add master checklist maintenance system\""
echo ""

echo -e "${YELLOW}3. Push to GitHub:${NC}"
echo "   git push"
echo ""

echo -e "${YELLOW}4. Test the system:${NC}"
echo "   cd $TARGET_DIR"
echo "   pnpm check:status"
echo ""

echo -e "${GREEN}✓ Replication complete!${NC}"
echo ""
echo -e "${BLUE}Copied 11 files to ${TARGET_DIR}${NC}"
echo ""
