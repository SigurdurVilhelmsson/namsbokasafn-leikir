# Deployment Guide

> **Last Updated**: 2025-12-29
>
> **Repository Architecture**: Monorepo with Vite build system
>
> **Deployment Status**: ✅ **All 18 games built and ready for deployment!**

This guide covers deploying ChemistryGames to **kvenno.app** and general server deployment.

## 📦 Current Repository Status (2025-12-29)

**✅ DEPLOYMENT READY** - All games built and production-ready with achievement system!

**Architecture**: pnpm monorepo with 18 games (5 Year 1, 7 Year 2, 6 Year 3)
**Build System**: Vite 6.4 + TypeScript 5.3 + React 18.2
**Build Output**: Single-file HTML bundles (194-282KB each)
**Build Date**: 2025-12-29 (with cross-game achievement system)

**Games Overview**:
- **Year 1 (1-ar)**: 5 games + landing page
  - nafnakerfid.html, dimensional-analysis.html, molmassi.html, takmarkandi.html, lausnir.html
  - index.html (landing page)
- **Year 2 (2-ar)**: 7 games + landing page
  - hess-law.html, kinetics.html, lewis-structures.html, vsepr-geometry.html
  - intermolecular-forces.html, organic-nomenclature.html, redox-reactions.html
  - index.html (landing page)
- **Year 3 (3-ar)**: 6 games + landing page
  - gas-law-challenge.html, thermodynamics-predictor.html, buffer-recipe-creator.html
  - equilibrium-shifter.html, ph-titration-practice.html, ph-titration-master.html
  - index.html (landing page)

**Total**: 18 games + 3 landing pages = 21 HTML files ready for deployment

## 🎓 Deployment to kvenno.app (Production)

### Overview
- **Production URL**: `https://kvenno.app/1-ar/games/` (Year 1), `https://kvenno.app/3-ar/games/` (Year 3)
- **Deployment Path**: `/var/www/kvenno.app/{1-ar|3-ar}/games/`
- **Repository**: Unified monorepo with all games
- **Architecture**: Monorepo containing both Year 1 and Year 3 games

### Prerequisites

✅ **CURRENT STATUS**: Games are already built and ready! You can deploy immediately.

⚠️ **Only needed if rebuilding**: pnpm and dependencies are only required if you need to rebuild the games. The current builds in `1-ar/` and `3-ar/` directories are production-ready.

**If You Need to Rebuild (Optional):**

**Step 1: Check if pnpm is installed**

```bash
# Check if pnpm is installed
pnpm --version  # Current: 8.15.0 ✅

# If not installed, install pnpm globally via npm
sudo npm install -g pnpm
```

**Step 2: Install project dependencies (only if rebuilding)**

```bash
# Navigate to repository directory
cd ~/repos/ChemistryGames

# Install all dependencies (~302 packages, takes 2-5 min)
pnpm install

# Verify installation
pnpm check:quality
```

**For Current Deployment**: Skip the above steps! The games are already built.

### Building Games for Production

✅ **CURRENT STATUS**: All games are already built! (Last build: 2025-12-05 15:04)

**Built Files Ready for Deployment**:
- Year 1 games: `1-ar/*.html` ✅ (5 games + landing page)
- Year 3 games: `3-ar/*.html` ✅ (6 games + landing page)
- All files are self-contained single-file HTML bundles (169-212KB each)

**Only Rebuild If Needed** (requires dependencies installed):

```bash
# Build all games at once
pnpm build

# Or build individual games
pnpm --filter @kvenno/nafnakerfid build
pnpm --filter @kvenno/dimensional-analysis build
# ... etc for each game
```

**Build Output Location**:
- Year 1 games: `1-ar/*.html` (at repository root)
- Year 3 games: `3-ar/*.html` (at repository root)
- Note: Builds output directly to these directories, not to a `dist/` folder

### Quick Deployment Steps

✅ **Games are built and ready!** Follow these simple steps:

**From your local machine (or CI/CD):**

```bash
# 1. Verify current builds are present
ls -la 1-ar/*.html   # Should see 6 files (5 games + index.html)
ls -la 3-ar/*.html   # Should see 7 files (6 games + index.html)

# 2. Copy built files to server
rsync -avz --progress 1-ar/ user@kvenno.app:/var/www/kvenno.app/1-ar/games/
rsync -avz --progress 3-ar/ user@kvenno.app:/var/www/kvenno.app/3-ar/games/
```

**Optional - Only if you need to rebuild first:**

```bash
# 0. Install dependencies (if not already installed)
pnpm install

# 1. Build all games for production
pnpm build

# 2. Then proceed with deployment steps above
```

**On the server:**

```bash
# 1. SSH into kvenno.app server
ssh user@kvenno.app

# 2. Set correct permissions
sudo chown -R www-data:www-data /var/www/kvenno.app/1-ar/games/
sudo chown -R www-data:www-data /var/www/kvenno.app/3-ar/games/
sudo chmod -R 755 /var/www/kvenno.app/1-ar/games/
sudo chmod -R 755 /var/www/kvenno.app/3-ar/games/

# 3. Reload nginx
sudo systemctl reload nginx

# 4. Test deployment
curl -I https://kvenno.app/1-ar/games/
curl -I https://kvenno.app/3-ar/games/
```

**Alternative: Deploy via git on server**

```bash
# 1. SSH into server
ssh user@kvenno.app

# 2. Navigate to repo directory
cd /var/www/repos/ChemistryGames

# 3. Pull latest changes
git pull origin main

# 4. Install dependencies (if needed)
pnpm install

# 5. Build all games
pnpm build

# 6. Copy to deployment location
cp -r 1-ar/* /var/www/kvenno.app/1-ar/games/
cp -r 3-ar/* /var/www/kvenno.app/3-ar/games/

# 7. Fix permissions and reload
sudo chown -R www-data:www-data /var/www/kvenno.app/
sudo systemctl reload nginx
```

### Nginx Configuration for kvenno.app

The site should be configured to serve from `/1-ar/games/` and `/3-ar/games/` paths:

```nginx
server {
    server_name kvenno.app;
    root /var/www/kvenno.app;

    # Year 1 games
    location /1-ar/games/ {
        alias /var/www/kvenno.app/1-ar/games/;
        index index.html;
        try_files $uri $uri/ =404;

        # Cache HTML files briefly
        location ~* \.html$ {
            expires 1h;
            add_header Cache-Control "public, must-revalidate";
        }
    }

    # Year 3 games
    location /3-ar/games/ {
        alias /var/www/kvenno.app/3-ar/games/;
        index index.html;
        try_files $uri $uri/ =404;

        # Cache HTML files briefly
        location ~* \.html$ {
            expires 1h;
            add_header Cache-Control "public, must-revalidate";
        }
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Gzip compression
    gzip on;
    gzip_types text/html text/css application/javascript;
}
```

### File Structure on Server

```
/var/www/kvenno.app/
├── 1-ar/
│   └── games/
│       ├── index.html                           ✅ Landing page (6.0K)
│       ├── nafnakerfid.html                     ✅ Built game (169K)
│       ├── dimensional-analysis.html   ✅ Built game (205K)
│       ├── molmassi.html                        ✅ Built game (181K)
│       ├── takmarkandi.html                     ✅ Built game (185K)
│       └── lausnir.html                         ✅ Built game (197K)
└── 3-ar/
    └── games/
        ├── index.html                           ✅ Landing page (6.1K)
        ├── gas-law-challenge.html               ✅ Built game (178K)
        ├── thermodynamics-predictor.html        ✅ Built game (177K)
        ├── buffer-recipe-creator.html           ✅ Built game (182K)
        ├── equilibrium-shifter.html             ✅ Built game (212K)
        ├── ph-titration-practice.html           ✅ Built game (175K)
        └── ph-titration-master.html             ✅ Built game (191K)
```

**Build Status**: ✅ All games already built (2025-12-05 15:04) - ready for deployment!
**Total Files**: 21 HTML files (18 games + 3 landing pages)
**Total Size**: ~2.2MB (all games combined)

### Integration with Kvenno Site Structure

All pages include:
- **Standard Header**: "Kvenno Efnafræði" with Admin/Info buttons
- **Breadcrumbs**: `Heim > 1. ár > Leikir > [Game Name]`
- **Back Navigation**: "Til baka" button linking to `/1-ar/`
- **Orange Color Scheme**: `#f36b22` (Kvennaskólinn brand color)

### Updating Existing Deployment

**Option 1: Build locally and deploy**
```bash
# On your local machine
pnpm install           # Ensure dependencies are installed
pnpm build             # Build all games

# Deploy built files to server
rsync -avz --progress 1-ar/ user@kvenno.app:/var/www/kvenno.app/1-ar/games/
rsync -avz --progress 3-ar/ user@kvenno.app:/var/www/kvenno.app/3-ar/games/

# Fix permissions on server
ssh user@kvenno.app "sudo chown -R www-data:www-data /var/www/kvenno.app/ && sudo systemctl reload nginx"
```

**Option 2: Build on server**
```bash
# SSH to server
ssh user@kvenno.app

# Navigate to repo and build
cd /var/www/repos/ChemistryGames
git pull origin main
pnpm install
pnpm build

# Copy to deployment location
sudo cp -r 1-ar/* /var/www/kvenno.app/1-ar/games/
sudo cp -r 3-ar/* /var/www/kvenno.app/3-ar/games/
sudo chown -R www-data:www-data /var/www/kvenno.app/
sudo systemctl reload nginx
```

---

## 🖥️ General Server Deployment (Alternative Setup)

This section covers deploying to a general Linode/Ubuntu server with nginx.

## 📋 Pre-Deployment Status (Updated 2025-12-05)

### ✅ DEPLOYMENT READY - All Requirements Met!

**Current Status**: 🟢 **All games built and ready for immediate deployment!**

### ✅ Completed and Ready:

1. **All Games Built** ✅
   - 18 games built and production-ready (169-212KB each)
   - Last build: 2025-12-05 15:04 UTC
   - All self-contained single-file HTML bundles
   - 2 landing pages (Year 1 and Year 3)

2. **Monorepo Architecture Established** ✅
   - 18 games organized in unified repository (5 Year 1, 7 Year 2, 6 Year 3)
   - Shared component library across all games
   - TypeScript + React + Vite build system

3. **Modern Build System** ✅
   - Vite 5.0-based build process
   - Single-file HTML bundle output
   - Optimized for production deployment
   - All builds current and tested

4. **Kvenno Branding Applied** ✅
   - All games use `#f36b22` orange color scheme
   - Consistent headers and navigation
   - Breadcrumbs on all pages
   - Landing pages with professional design

5. **Documentation Complete** ✅
   - README.md, DEPLOYMENT.md, REPOSITORY-STATUS.md all current
   - Comprehensive development guides
   - Maintenance checklists
   - Updated today (2025-12-05)

6. **Code Quality Standards** ✅
   - TypeScript type checking configured
   - ESLint + Prettier configured
   - Automated quality checks available via pnpm scripts

### 🟢 No Critical Requirements!

**You can deploy immediately!** All files in `1-ar/` and `3-ar/` are production-ready.

**Dependencies only needed if**:
- You want to rebuild the games (current builds are fine)
- You want to run code quality checks
- You want to make changes and rebuild

### 🟡 Optional Improvements:

1. **Security Headers**
   - Add Content-Security-Policy headers
   - Already has X-Frame-Options and basic security headers in nginx config

2. **Performance Optimization**
   - Gzip compression (configured in nginx)
   - Cache headers (configured in nginx)
   - Optional: Consider CDN like Cloudflare for high traffic

3. **CI/CD Pipeline**
   - Automate build and deployment process
   - Consider GitHub Actions or similar

---

## 🚀 Deployment Steps

### Step 0: Verify Games Are Built (QUICK CHECK)

✅ **Good news!** Games are already built and ready!

```bash
# Verify builds are present (should see 6 files for Year 1, 7 for Year 3)
ls -la 1-ar/*.html
ls -la 3-ar/*.html

# Check sizes (should all be 169-212KB)
du -h 1-ar/*.html 3-ar/*.html
```

**What gets deployed:**
- ✅ Built HTML files from `1-ar/` and `3-ar/` directories ✅ (already exist!)
- ✅ NOT the source files from `games/` directory
- ✅ Each game is a self-contained single HTML file
- ✅ Total: 21 files (18 games + 3 landing pages)

**Optional - Only if you need to rebuild:**

```bash
# 0. Install pnpm if not already installed
pnpm --version || sudo npm install -g pnpm

# 1. Install dependencies
pnpm install

# 2. Build all games
pnpm build

# 3. Verify builds
ls -la 1-ar/*.html
ls -la 3-ar/*.html
```

### Step 1: Build Games for Production (OPTIONAL - Already Done!)

✅ **All games are already built!** Skip to Step 2 for deployment.

**Only rebuild if you've made changes to the source code:**

### Step 2: Server Setup

#### 2.1 Update System and Install Prerequisites

```bash
# SSH into your Linode server
ssh user@your-linode-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js and npm (if not already installed)
# For Ubuntu 22.04+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js and npm installation
node --version
npm --version

# Install pnpm globally
sudo npm install -g pnpm

# Verify pnpm installation
pnpm --version

# Install nginx
sudo apt install nginx -y

# Start and enable nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check nginx status
sudo systemctl status nginx
```

#### 2.2 Configure Firewall

```bash
# Allow Nginx through firewall
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status
```

#### 2.3 Create Site Directory

```bash
# Create directory for your site
sudo mkdir -p /var/www/chemistrygames
sudo chown -R $USER:$USER /var/www/chemistrygames
sudo chmod -R 755 /var/www/chemistrygames
```

### Step 3: Transfer Files to Server

#### Option A: Using Git (Recommended)

```bash
# On server
cd /var/www/chemistrygames
git clone https://github.com/SigurdurVilhelmsson/ChemistryGames.git .

# If using private repo
git clone git@github.com:SigurdurVilhelmsson/ChemistryGames.git .
```

#### Option B: Using SCP

```bash
# From your local machine
scp -r /path/to/ChemistryGames/* user@your-linode-ip:/var/www/chemistrygames/
```

#### Option C: Using rsync

```bash
# From your local machine (recommended for updates)
rsync -avz --progress /path/to/ChemistryGames/ user@your-linode-ip:/var/www/chemistrygames/
```

### Step 4: Configure Nginx

#### 4.1 Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/chemistrygames
```

**Basic Configuration:**

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name your-domain.com www.your-domain.com;

    root /var/www/chemistrygames;
    index index.html;

    # Logging
    access_log /var/log/nginx/chemistrygames_access.log;
    error_log /var/log/nginx/chemistrygames_error.log;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Main location
    location / {
        try_files $uri $uri/ =404;
    }

    # Custom error pages
    error_page 404 /404.html;
    location = /404.html {
        internal;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Cache HTML files for shorter time
    location ~* \.html$ {
        expires 1h;
        add_header Cache-Control "public, must-revalidate";
    }

    # Disable access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

#### 4.2 Enable Site

```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/chemistrygames /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### Step 5: Set Up SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Follow prompts to complete setup
# Certbot will automatically modify your nginx config

# Test auto-renewal
sudo certbot renew --dry-run
```

### Step 6: (Optional) Handle File Name Issues

If you encounter issues with Icelandic characters in URLs:

```bash
# Create URL-friendly symlinks
cd /var/www/chemistrygames/1.\ ár/
ln -s nafnakerfið.html nafnakerfid.html
ln -s einingagreining.html unit-conversion.html
ln -s takmarkandi.html limiting-reactant.html
```

Or update your index.html to use URL-encoded paths:
- `nafnakerfið.html` → `nafnakerfið.html` or use `%C3%B0` encoding

### Step 7: (Optional) Self-Host CDN Dependencies

For better performance and reliability:

```bash
# Create vendor directory
mkdir -p /var/www/chemistrygames/vendor/js
mkdir -p /var/www/chemistrygames/vendor/css

# Download dependencies
cd /var/www/chemistrygames/vendor/js
wget https://unpkg.com/react@18/umd/react.production.min.js
wget https://unpkg.com/react-dom@18/umd/react-dom.production.min.js
wget https://unpkg.com/@babel/standalone/babel.min.js

# Download Tailwind CSS (or build custom config)
cd /var/www/chemistrygames/vendor/css
wget https://cdn.tailwindcss.com -O tailwind.js

# Update HTML files to reference local files instead of CDN
# Replace CDN URLs with /vendor/js/... paths
```

### Step 8: (Optional) Set Up Automatic Updates

```bash
# Create update script
nano /var/www/chemistrygames/update.sh
```

```bash
#!/bin/bash
cd /var/www/chemistrygames
git pull origin main
sudo systemctl reload nginx
echo "Site updated successfully at $(date)"
```

```bash
# Make executable
chmod +x /var/www/chemistrygames/update.sh

# Create cron job for automatic updates (optional)
crontab -e
# Add: 0 2 * * * /var/www/chemistrygames/update.sh >> /var/log/chemistrygames-update.log 2>&1
```

---

## 🔍 Testing Your Deployment

### 1. Check Nginx Status
```bash
sudo systemctl status nginx
```

### 2. Test Site Access
```bash
curl -I http://your-domain.com
curl -I https://your-domain.com
```

### 3. Check Logs
```bash
sudo tail -f /var/log/nginx/chemistrygames_access.log
sudo tail -f /var/log/nginx/chemistrygames_error.log
```

### 4. Test SSL
Visit: https://www.ssllabs.com/ssltest/analyze.html?d=your-domain.com

### 5. Test Performance
- Use Chrome DevTools Network tab
- Check loading times
- Verify compression is working

---

## 📊 Monitoring and Maintenance

### Monitor Disk Space
```bash
df -h
```

### Monitor Nginx
```bash
sudo systemctl status nginx
sudo nginx -t
```

### View Logs
```bash
# Access logs
sudo tail -100 /var/log/nginx/chemistrygames_access.log

# Error logs
sudo tail -100 /var/log/nginx/chemistrygames_error.log

# Real-time monitoring
sudo tail -f /var/log/nginx/chemistrygames_access.log
```

### Update SSL Certificates
```bash
# Certificates auto-renew, but you can manually renew:
sudo certbot renew
```

---

## 🚨 Troubleshooting

### Issue: 403 Forbidden
```bash
# Check permissions
ls -la /var/www/chemistrygames
sudo chown -R www-data:www-data /var/www/chemistrygames
sudo chmod -R 755 /var/www/chemistrygames
```

### Issue: 404 Not Found
```bash
# Verify files exist
ls -la /var/www/chemistrygames
# Check nginx config
sudo nginx -t
# Check nginx error log
sudo tail -50 /var/log/nginx/chemistrygames_error.log
```

### Issue: CSS/JS Not Loading
```bash
# Check Content-Security-Policy headers
# May need to adjust CSP in nginx config to allow CDN resources
```

### Issue: Slow Loading
```bash
# Enable compression (see nginx config above)
# Consider self-hosting CDN dependencies
# Enable browser caching
```

---

## 🎯 Production Checklist (Updated 2025-12-05)

### ✅ Pre-Deployment Requirements (ALL COMPLETE!)

**Build Requirements:**
- ✅ All 18 games built successfully (169-212KB each)
- ✅ Build output verified in `1-ar/` and `3-ar/` directories
- ✅ Landing pages (`index.html`) present in both directories
- ✅ Last build: 2025-12-05 15:04 UTC (current)

**Already Complete:**
- ✅ Monorepo architecture with 18 games (5 Year 1, 7 Year 2, 6 Year 3)
- ✅ Modern build system (Vite 5.0 + TypeScript 5.3 + React 18.2)
- ✅ Landing pages created with Kvenno branding
- ✅ Shared component library
- ✅ Documentation complete and updated
- ✅ Git repository clean and organized
- ✅ All games optimized and production-ready

**Optional (for development only):**
- ⚪ Dependencies installed (`pnpm install`) - not needed for deployment
- ⚪ Code quality checks pass (`pnpm check:quality`) - not needed for deployment

**Server Configuration:**
- [ ] SSL certificate installed (Let's Encrypt)
- [ ] Firewall configured (UFW with Nginx Full allowed)
- [ ] Gzip compression enabled (nginx config)
- [ ] Security headers configured (nginx config)
- [ ] Cache headers configured (nginx config)
- [ ] File permissions correct (755 directories, 644 files)

**Testing:**
- [ ] All games load correctly on production
- [ ] Error pages tested (404.html)
- [ ] Mobile responsiveness verified
- [ ] CDN dependencies load properly
- [ ] Test from different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test from different devices (desktop, tablet, mobile)
- [ ] Icelandic character URLs work correctly

**Operations:**
- [ ] Monitoring set up (optional)
- [ ] Backup strategy in place
- [ ] DNS configured correctly
- [ ] Update script configured (optional)

---

## 📝 Notes

- **Domain Name:** Replace `your-domain.com` with your actual domain
- **SSL:** Let's Encrypt certificates expire every 90 days but auto-renew
- **Backups:** Consider setting up automated backups of /var/www/chemistrygames
- **CDN:** For high traffic, consider using Cloudflare or similar CDN
- **Performance:** Monitor with tools like Google PageSpeed Insights

---

## 🆘 Support

If you encounter issues:
1. Check nginx error logs: `sudo tail -50 /var/log/nginx/error.log`
2. Check site error logs: `sudo tail -50 /var/log/nginx/chemistrygames_error.log`
3. Test nginx config: `sudo nginx -t`
4. Restart nginx: `sudo systemctl restart nginx`

---

**Good luck with your deployment! 🚀**
