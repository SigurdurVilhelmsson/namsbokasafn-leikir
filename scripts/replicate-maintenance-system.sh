#!/bin/bash

###############################################################################
# Replicate Maintenance System to Another Repository
#
# This script copies the complete master checklist system to another repo
# using GitHub CLI (no local clone needed - works with Claude Code Web!)
#
# Usage:
#   ./scripts/replicate-maintenance-system.sh OWNER/REPO
#
# Example:
#   ./scripts/replicate-maintenance-system.sh SigurdurVilhelmsson/kvenno-app
#
# What it copies:
#   - REPOSITORY-STATUS.md
#   - scripts/check-status.mjs
#   - docs/MASTER-CHECKLIST-SYSTEM.md
#   - docs/checklists/* (all 7 checklists)
#   - Updates package.json with check scripts
#
# Requirements:
#   - GitHub CLI (gh) installed and authenticated
#   - Write access to target repository
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if repository argument provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: No repository specified${NC}"
    echo ""
    echo "Usage: $0 OWNER/REPO"
    echo "Example: $0 SigurdurVilhelmsson/kvenno-app"
    exit 1
fi

TARGET_REPO="$1"
SOURCE_DIR="/home/user/ChemistryGames"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Maintenance System Replication Script                    ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}✗ GitHub CLI (gh) not found${NC}"
    echo ""
    echo "Please install GitHub CLI:"
    echo "  https://cli.github.com/"
    echo ""
    echo "Or use the local clone version:"
    echo "  ./scripts/replicate-maintenance-system-local.sh OWNER/REPO /path/to/local/clone"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${RED}✗ Not authenticated with GitHub CLI${NC}"
    echo ""
    echo "Please authenticate:"
    echo "  gh auth login"
    exit 1
fi

echo -e "${GREEN}✓ GitHub CLI ready${NC}"
echo -e "${BLUE}Target repository: ${TARGET_REPO}${NC}"
echo ""

# Verify repository exists and we have access
echo -e "${YELLOW}Checking repository access...${NC}"
if ! gh repo view "$TARGET_REPO" &> /dev/null; then
    echo -e "${RED}✗ Cannot access repository: $TARGET_REPO${NC}"
    echo "  Make sure the repository exists and you have access"
    exit 1
fi
echo -e "${GREEN}✓ Repository accessible${NC}"
echo ""

# Create a branch for the changes
BRANCH_NAME="maintenance-system-setup-$(date +%s)"
echo -e "${YELLOW}Creating branch: ${BRANCH_NAME}${NC}"

# Get default branch
DEFAULT_BRANCH=$(gh repo view "$TARGET_REPO" --json defaultBranchRef --jq '.defaultBranchRef.name')
echo -e "${BLUE}Default branch: ${DEFAULT_BRANCH}${NC}"

# Function to create/update file in repository
create_file() {
    local file_path="$1"
    local local_file="$2"
    local commit_message="$3"

    echo -e "${YELLOW}  Creating ${file_path}...${NC}"

    # Read file content and base64 encode it
    local content=$(cat "$local_file" | base64)

    # Create the file using GitHub API
    gh api \
        --method PUT \
        -H "Accept: application/vnd.github+json" \
        "/repos/${TARGET_REPO}/contents/${file_path}" \
        -f message="$commit_message" \
        -f content="$content" \
        -f branch="$BRANCH_NAME" \
        2>/dev/null || {
            echo -e "${RED}    ✗ Failed to create ${file_path}${NC}"
            return 1
        }

    echo -e "${GREEN}    ✓ Created ${file_path}${NC}"
}

# Array of files to copy
declare -A FILES=(
    # Root files
    ["REPOSITORY-STATUS.md"]="$SOURCE_DIR/REPOSITORY-STATUS.md"

    # Scripts
    ["scripts/check-status.mjs"]="$SOURCE_DIR/scripts/check-status.mjs"

    # Documentation
    ["docs/MASTER-CHECKLIST-SYSTEM.md"]="$SOURCE_DIR/docs/MASTER-CHECKLIST-SYSTEM.md"

    # Checklists
    ["docs/checklists/QUICK-DAILY-CHECK.md"]="$SOURCE_DIR/docs/checklists/QUICK-DAILY-CHECK.md"
    ["docs/checklists/SECURITY-CHECKLIST.md"]="$SOURCE_DIR/docs/checklists/SECURITY-CHECKLIST.md"
    ["docs/checklists/CODE-QUALITY-CHECKLIST.md"]="$SOURCE_DIR/docs/checklists/CODE-QUALITY-CHECKLIST.md"
    ["docs/checklists/DOCUMENTATION-CHECKLIST.md"]="$SOURCE_DIR/docs/checklists/DOCUMENTATION-CHECKLIST.md"
    ["docs/checklists/ACCESSIBILITY-CHECKLIST.md"]="$SOURCE_DIR/docs/checklists/ACCESSIBILITY-CHECKLIST.md"
    ["docs/checklists/PERFORMANCE-CHECKLIST.md"]="$SOURCE_DIR/docs/checklists/PERFORMANCE-CHECKLIST.md"
    ["docs/checklists/UX-AUDIT-CHECKLIST.md"]="$SOURCE_DIR/docs/checklists/UX-AUDIT-CHECKLIST.md"
)

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}Copying Files to ${TARGET_REPO}${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

# Copy each file
for target_path in "${!FILES[@]}"; do
    source_file="${FILES[$target_path]}"

    if [ ! -f "$source_file" ]; then
        echo -e "${RED}✗ Source file not found: $source_file${NC}"
        continue
    fi

    create_file "$target_path" "$source_file" "chore: Add maintenance system - $target_path"
done

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}Next Steps${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "${YELLOW}1. Review the changes:${NC}"
echo -e "   gh browse ${TARGET_REPO} --branch ${BRANCH_NAME}"
echo ""

echo -e "${YELLOW}2. Update package.json manually:${NC}"
echo "   Add these scripts to package.json in ${TARGET_REPO}:"
echo ""
echo -e "${BLUE}   \"scripts\": {${NC}"
echo -e "${BLUE}     \"check:status\": \"node scripts/check-status.mjs\",${NC}"
echo -e "${BLUE}     \"check:security\": \"pnpm audit && echo '✅ Security check complete'\",${NC}"
echo -e "${BLUE}     \"check:quality\": \"pnpm type-check && pnpm lint && pnpm format:check\",${NC}"
echo -e "${BLUE}     \"check:deps\": \"pnpm outdated || true\",${NC}"
echo -e "${BLUE}     \"check:all\": \"pnpm check:security && pnpm check:quality && pnpm check:deps\"${NC}"
echo -e "${BLUE}   }${NC}"
echo ""

echo -e "${YELLOW}3. Create a pull request:${NC}"
echo -e "   gh pr create --repo ${TARGET_REPO} --base ${DEFAULT_BRANCH} --head ${BRANCH_NAME} \\"
echo -e "     --title \"Add master checklist maintenance system\" \\"
echo -e "     --body \"Adds comprehensive repository maintenance system with automated health checks and checklists.\""
echo ""

echo -e "${YELLOW}4. Test the system:${NC}"
echo "   After merging, run:"
echo -e "   ${BLUE}pnpm check:status${NC}"
echo ""

echo -e "${GREEN}✓ Replication complete!${NC}"
echo ""
