# Deployment Guide

This guide covers deploying ChemistryGames to **kvenno.app** and general server deployment.

## 🎓 Deployment to kvenno.app (Production)

### Overview
- **Production URL**: `https://kvenno.app/1-ar/games/`
- **Deployment Path**: `/var/www/kvenno.app/1-ar/games/`
- **Repository**: `chemistry-games-1ar`
- **Year-Specific**: 1st year only (separate repos for 2nd/3rd year)

### Quick Deployment Steps

```bash
# 1. SSH into kvenno.app server
ssh user@kvenno.app

# 2. Navigate to deployment directory
cd /var/www/kvenno.app/1-ar/games/

# 3. Pull latest changes (if using git)
git pull origin main

# 4. Or copy files directly
# Copy index.html and game files
cp /path/to/repo/index.html ./
cp -r "/path/to/repo/1. ár/" ./

# 5. Ensure correct permissions
sudo chown -R www-data:www-data /var/www/kvenno.app/1-ar/games/
sudo chmod -R 755 /var/www/kvenno.app/1-ar/games/

# 6. Reload nginx
sudo systemctl reload nginx
```

### Nginx Configuration for kvenno.app

The site should be configured to serve from `/1-ar/games/` path:

```nginx
server {
    server_name kvenno.app;
    root /var/www/kvenno.app;

    # Main site location
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
└── 1-ar/
    └── games/
        ├── index.html                  (landing page with game list)
        ├── 404.html                    (error page)
        ├── kvenno_structure.md         (reference doc)
        └── 1. ár/                      (game files directory)
            ├── nafnakerfið.html        ✅ Ready
            ├── einingagreining.html    ✅ Ready
            ├── takmarkandi.html        ✅ Ready
            ├── molmassi.html           ✅ Ready
            └── lausnir.html            ✅ Ready
```

**All games are production-ready!** No build process required.

### Integration with Kvenno Site Structure

All pages include:
- **Standard Header**: "Kvenno Efnafræði" with Admin/Info buttons
- **Breadcrumbs**: `Heim > 1. ár > Leikir > [Game Name]`
- **Back Navigation**: "Til baka" button linking to `/1-ar/`
- **Orange Color Scheme**: `#f36b22` (Kvennaskólinn brand color)

### Updating Existing Deployment

```bash
# Pull latest changes
cd /var/www/kvenno.app/1-ar/games/
git pull origin main

# Or use rsync from local machine
rsync -avz --progress \
    --exclude '.git' \
    --exclude 'node_modules' \
    ./ChemistryGames/ \
    user@kvenno.app:/var/www/kvenno.app/1-ar/games/

# Reload nginx
sudo systemctl reload nginx
```

---

## 🖥️ General Server Deployment (Alternative Setup)

This section covers deploying to a general Linode/Ubuntu server with nginx.

## 📋 Pre-Deployment Status

### ✅ Completed:

1. **All Games Converted to HTML** ✅
   - All 5 games are now standalone HTML files
   - No build process required
   - Ready for immediate deployment

2. **Landing Page Created** ✅
   - `index.html` with game selection and Kvenno branding

3. **Error Page Created** ✅
   - `404.html` custom error page (needs minor branding update)

4. **Kvenno Branding Applied** ✅
   - All games use `#f36b22` orange color scheme
   - Consistent headers and navigation
   - Breadcrumbs on all pages

5. **Documentation Complete** ✅
   - README.md, DEPLOYMENT.md, kvenno_structure.md

### 🟡 Optional Improvements:

1. **CDN Dependencies**
   - HTML files load React, Babel, and Tailwind from CDN
   - **Current:** External CDN (requires internet connection)
   - **Optional:** Self-host libraries for better reliability and offline support

2. **File Names with Special Characters**
   - Files use Icelandic characters (ð, í)
   - **Status:** Works fine with modern browsers/servers
   - **Optional:** Create URL-friendly symlinks if issues arise

3. **Security Headers**
   - Add Content-Security-Policy headers
   - Already has X-Frame-Options and basic security headers in nginx config

4. **Performance Optimization**
   - Gzip compression (configured in nginx)
   - Cache headers (configured in nginx)
   - Optional: Consider CDN like Cloudflare for high traffic

---

## 🚀 Deployment Steps

### Step 1: Files Are Ready! ✅

All files are already prepared and ready for deployment:
- ✅ All 5 games are standalone HTML files
- ✅ Landing page (`index.html`) created
- ✅ Error page (`404.html`) created
- ✅ No build process required

Simply copy the repository files to the server!

### Step 2: Server Setup

#### 2.1 Update System and Install Nginx

```bash
# SSH into your Linode server
ssh user@your-linode-ip

# Update system
sudo apt update && sudo apt upgrade -y

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

## 🎯 Production Checklist

Before going live, ensure:

**Already Complete:**
- ✅ All files converted to HTML (no build required)
- ✅ Landing page (index.html) created with Kvenno branding
- ✅ Custom 404 page created
- ✅ All 5 games tested and working

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
