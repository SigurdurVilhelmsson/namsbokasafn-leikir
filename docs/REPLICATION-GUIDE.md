# 🔄 Maintenance System Replication Guide

**Purpose**: Copy the master checklist system to other Kvenno.app repositories

**Time Required**: 5-10 minutes per repository

---

## 📦 What Gets Replicated

The complete maintenance system includes:

### Core Files (11 total)
```
✓ REPOSITORY-STATUS.md                    # Live health dashboard
✓ scripts/check-status.mjs                # Automated health check script
✓ docs/MASTER-CHECKLIST-SYSTEM.md         # Master system guide
✓ docs/checklists/
  ├── QUICK-DAILY-CHECK.md                # Daily 5-min routine
  ├── SECURITY-CHECKLIST.md               # Weekly security audit
  ├── CODE-QUALITY-CHECKLIST.md           # Weekly code quality check
  ├── DOCUMENTATION-CHECKLIST.md          # Monthly docs review
  ├── ACCESSIBILITY-CHECKLIST.md          # Quarterly a11y audit
  ├── PERFORMANCE-CHECKLIST.md            # Quarterly performance audit
  └── UX-AUDIT-CHECKLIST.md               # Quarterly UX review
```

### Package.json Scripts (5 scripts)
```json
{
  "scripts": {
    "check:status": "node scripts/check-status.mjs",
    "check:security": "pnpm audit && echo '✅ Security check complete'",
    "check:quality": "pnpm type-check && pnpm lint && pnpm format:check",
    "check:deps": "pnpm outdated || true",
    "check:all": "pnpm check:security && pnpm check:quality && pnpm check:deps"
  }
}
```

---

## 🚀 Method 1: GitHub CLI (Recommended - Works from Anywhere!)

**Best for**: Claude Code Web users, quick replication, no local clone needed

### Prerequisites

- GitHub CLI installed: `gh --version`
- Authenticated: `gh auth status`

If not installed:
```bash
# Install GitHub CLI
# Visit: https://cli.github.com/
```

### Step 1: Run the Script

```bash
./scripts/replicate-maintenance-system.sh OWNER/REPO
```

**Example**:
```bash
./scripts/replicate-maintenance-system.sh SigurdurVilhelmsson/kvenno-app
```

### Step 2: What Happens

The script will:
1. ✅ Verify repository access
2. ✅ Create a new branch: `maintenance-system-setup-[timestamp]`
3. ✅ Copy all 11 files via GitHub API
4. ✅ Show next steps for package.json update

### Step 3: Update package.json

**Option A: Via GitHub Web Interface**
1. Go to the repository on GitHub
2. Navigate to `package.json`
3. Click "Edit this file" (pencil icon)
4. Add the check scripts to the `"scripts"` section
5. Commit directly to the new branch

**Option B: Via Claude Code Web**
1. Open the target repository in Claude Code
2. Ask: "Add these check scripts to package.json" (paste the scripts)
3. Commit and push

### Step 4: Create Pull Request

```bash
gh pr create \
  --repo OWNER/REPO \
  --base main \
  --head maintenance-system-setup-[timestamp] \
  --title "Add master checklist maintenance system" \
  --body "Adds comprehensive repository maintenance system"
```

### Step 5: Merge and Test

```bash
# After merging
pnpm check:status
```

---

## 💻 Method 2: Local Clone

**Best for**: When you already have repos cloned locally, prefer local workflow

### Prerequisites

- Repository cloned locally
- Node.js installed

### Step 1: Run the Script

```bash
./scripts/replicate-maintenance-system-local.sh /path/to/target/repo
```

**Example**:
```bash
./scripts/replicate-maintenance-system-local.sh ~/projects/kvenno-app
```

### Step 2: What Happens

The script will:
1. ✅ Verify target directory is a git repo
2. ✅ Create necessary directories
3. ✅ Copy all 11 files
4. ✅ Automatically update package.json
5. ✅ Show git status

### Step 3: Review Changes

```bash
cd /path/to/target/repo
git diff
```

### Step 4: Commit and Push

```bash
git add .
git commit -m "chore: Add master checklist maintenance system"
git push
```

---

## 📋 Comparison

| Feature | GitHub CLI Method | Local Clone Method |
|---------|------------------|-------------------|
| **Clone needed** | ❌ No | ✅ Yes |
| **Works from anywhere** | ✅ Yes | ❌ No (needs local access) |
| **Claude Code Web** | ✅ Perfect | ⚠️ Limited |
| **Speed** | ⚡ Fast | ⚡ Fast |
| **Automatic package.json** | ❌ Manual | ✅ Automatic |
| **Creates PR** | ✅ Easy | ⏭️ Manual |

---

## 🎯 Recommended Workflow (Claude Code Web)

### For Your First Repository

1. **Use GitHub CLI method**:
   ```bash
   ./scripts/replicate-maintenance-system.sh SigurdurVilhelmsson/kvenno-app
   ```

2. **Update package.json via web**:
   - Go to GitHub.com
   - Edit package.json directly
   - Add the 5 check scripts

3. **Create PR**:
   ```bash
   gh pr create --fill
   ```

4. **Merge and test**:
   ```bash
   # Switch to the repo in Claude Code
   pnpm check:status
   ```

### For Subsequent Repositories

Just repeat the same steps! Takes ~5 minutes per repo.

---

## 🔧 Customization After Replication

### Required Customizations

After replication, you may need to adjust:

**1. REPOSITORY-STATUS.md**
- Update project-specific info
- Adjust health metrics
- Set maintenance schedule

**2. check-status.mjs**
- Adjust build commands if different
- Modify quality checks if different stack

**3. Checklists**
- Skip sections that don't apply
- Add project-specific checks

### Tech Stack Differences

**If target repo uses npm instead of pnpm**:
```json
{
  "check:security": "npm audit && echo '✅ Security check complete'",
  "check:deps": "npm outdated || true"
}
```

**If target repo uses yarn**:
```json
{
  "check:security": "yarn audit && echo '✅ Security check complete'",
  "check:deps": "yarn outdated || true"
}
```

**If no TypeScript**:
Remove `type-check` from `check:quality`:
```json
{
  "check:quality": "npm run lint && npm run format:check"
}
```

---

## 📝 Replication Checklist

For each repository you replicate to:

- [ ] Run replication script
- [ ] Update package.json with check scripts
- [ ] Create and merge PR
- [ ] Test: `pnpm check:status`
- [ ] Customize REPOSITORY-STATUS.md
- [ ] Adjust checklists if needed
- [ ] Document tech stack differences
- [ ] Run first full audit
- [ ] Update REPOSITORY-STATUS.md with baseline

---

## 🎓 Example: Complete Workflow

Let's replicate to `SigurdurVilhelmsson/kvenno-app`:

```bash
# 1. Run replication script
./scripts/replicate-maintenance-system.sh SigurdurVilhelmsson/kvenno-app

# Script output shows branch name: maintenance-system-setup-1234567890

# 2. Update package.json via GitHub web interface
# - Go to: https://github.com/SigurdurVilhelmsson/kvenno-app
# - Navigate to package.json
# - Click edit
# - Add check scripts
# - Commit to maintenance-system-setup-1234567890 branch

# 3. Create PR
gh pr create \
  --repo SigurdurVilhelmsson/kvenno-app \
  --base main \
  --head maintenance-system-setup-1234567890 \
  --title "Add maintenance system" \
  --fill

# 4. Merge PR on GitHub

# 5. Test in Claude Code Web
# (Switch to kvenno-app repository)
pnpm install  # If needed
pnpm check:status

# 6. Customize
# - Update REPOSITORY-STATUS.md
# - Adjust checklists
# - Document baseline metrics
```

**Total time**: ~10 minutes ⏱️

---

## 🔄 Updating Existing Systems

If you've already replicated and want to update to latest version:

### Option 1: Re-run Script
```bash
./scripts/replicate-maintenance-system.sh OWNER/REPO
```
(It will create a new branch with updates)

### Option 2: Manual Update
Copy specific files that changed:
```bash
# Example: Update just the security checklist
cp docs/checklists/SECURITY-CHECKLIST.md \
   /path/to/other/repo/docs/checklists/SECURITY-CHECKLIST.md
```

---

## 🚨 Troubleshooting

### "GitHub CLI not found"

**Solution**:
```bash
# Install GitHub CLI
# Visit: https://cli.github.com/

# Or ask Claude to help install it
```

### "Not authenticated with GitHub CLI"

**Solution**:
```bash
gh auth login
# Follow the prompts
```

### "Cannot access repository"

**Possible causes**:
- Repository doesn't exist
- Incorrect owner/repo name
- No write access

**Solution**:
```bash
# Verify repository exists
gh repo view OWNER/REPO

# Check your access
gh auth status
```

### "package.json not updated"

**Solution**: Update manually via GitHub web interface or locally

### "Scripts don't work after replication"

**Checklist**:
- [ ] package.json has check scripts?
- [ ] Dependencies installed? (`pnpm install`)
- [ ] Required tools present? (eslint, prettier, typescript)
- [ ] Correct package manager? (pnpm vs npm vs yarn)

---

## 📚 Resources

### Scripts
- `scripts/replicate-maintenance-system.sh` - GitHub CLI version
- `scripts/replicate-maintenance-system-local.sh` - Local clone version

### Documentation
- `docs/MASTER-CHECKLIST-SYSTEM.md` - How to use the system
- `REPOSITORY-STATUS.md` - Health dashboard template

### GitHub CLI
- [Installation Guide](https://cli.github.com/)
- [Authentication](https://cli.github.com/manual/gh_auth_login)
- [API Reference](https://cli.github.com/manual/gh_api)

---

## ❓ FAQ

**Q: Can I replicate to private repositories?**
A: Yes! As long as you have write access.

**Q: Will this overwrite existing files?**
A: The GitHub CLI method creates a new branch, so existing files are safe. The local method will overwrite files in the target directory.

**Q: Do I need to replicate to every repository?**
A: No, only replicate to repositories you actively maintain. Skip archived or inactive repos.

**Q: Can I customize before replicating?**
A: Yes! Edit the files in this repo first, then replicate.

**Q: What if the target repo uses different tools?**
A: You'll need to customize package.json scripts and check-status.mjs after replication.

**Q: How do I keep systems in sync across repos?**
A: Currently manual. Consider creating a template repository in the future.

---

## 🎯 Quick Reference

### Replicate (GitHub CLI)
```bash
./scripts/replicate-maintenance-system.sh OWNER/REPO
```

### Replicate (Local)
```bash
./scripts/replicate-maintenance-system-local.sh /path/to/repo
```

### Test After Replication
```bash
pnpm check:status
```

### View Checklist
```bash
cat docs/MASTER-CHECKLIST-SYSTEM.md
```

---

**Last Updated**: 2025-11-29
**Maintained by**: Kvenno.app Development Team
