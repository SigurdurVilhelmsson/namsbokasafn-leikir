# Deployment Guide for Linode Ubuntu Server with Nginx

This guide covers deploying ChemistryGames to a Linode Ubuntu server running nginx.

## 📋 Pre-Deployment Checklist

### Issues to Address Before Deployment:

#### 🔴 CRITICAL Issues:

1. **TSX Files Need Conversion or Build System**
   - `1. ár/molmassi.tsx` and `1. ár/lausnir.tsx` are TypeScript React components
   - **Options:**
     - **Option A:** Convert them to standalone HTML files (like other games)
     - **Option B:** Set up a build system (Vite/Webpack) and compile them
   - **Recommended:** Option A for simplicity (no build pipeline needed)

2. **File Names with Special Characters**
   - Files use Icelandic characters (ð, í)
   - **Potential issues:** URL encoding, some browsers/servers
   - **Recommended:** Create URL-friendly symlinks or rename files

3. **CDN Dependencies**
   - HTML files load React, Babel, and Tailwind from CDN
   - **Issue:** Requires internet connection, external dependency
   - **Recommended:** Consider self-hosting these libraries for production

#### 🟡 RECOMMENDED Improvements:

4. **Missing .gitignore**
   - No `.gitignore` file present
   - Could accidentally commit sensitive files or build artifacts

5. **No Error Pages**
   - Missing custom 404.html or 500.html pages

6. **No Security Headers**
   - Should configure Content-Security-Policy, X-Frame-Options, etc.

7. **No HTTPS Configuration**
   - Need SSL certificate (Let's Encrypt recommended)

8. **No Landing Page**
   - No index.html at root to list/navigate games

9. **No Compression**
   - Should enable gzip/brotli for better performance

10. **No Caching Strategy**
    - Should configure cache headers for static assets

---

## 🚀 Deployment Steps

### Step 1: Prepare Your Files

#### Option A: Convert TSX Files to HTML (Recommended for Simple Deployment)

Create standalone HTML versions of the TSX files:

```bash
# You'll need to manually convert these or use a build tool
# Each TSX component should become a standalone HTML file similar to the existing games
```

#### Option B: Build TSX Files

```bash
# On your local machine:
npm init -y
npm install react react-dom lucide-react
npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom tailwindcss

# Create build configuration (see README.md)
# Build the project
npm run build

# This creates a dist/ folder with compiled files
```

### Step 2: Create Required Files

#### 2.1 Create Landing Page (index.html)

```html
<!DOCTYPE html>
<html lang="is">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chemistry Games - Efnafræðileikir</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
    <div class="container mx-auto px-4 py-12">
        <h1 class="text-5xl font-bold text-center mb-4 text-gray-800">
            🧪 Chemistry Games
        </h1>
        <p class="text-xl text-center text-gray-600 mb-12">
            Efnafræðileikir fyrir 1. árs nemendur
        </p>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <!-- Game Cards -->
            <a href="1.%20ár/nafnakerfið.html" class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h2 class="text-2xl font-bold mb-2 text-green-600">Nafnakerfið</h2>
                <p class="text-gray-600 mb-4">Compound Name Matchmaker - Memory matching game</p>
                <span class="text-sm text-gray-500">Difficulty: Easy • Medium • Hard</span>
            </a>

            <a href="1.%20ár/einingagreining.html" class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h2 class="text-2xl font-bold mb-2 text-blue-600">Einingagreining</h2>
                <p class="text-gray-600 mb-4">Unit Conversion Race - 60-second speed quiz</p>
                <span class="text-sm text-gray-500">Difficulty: Easy • Medium • Hard • Mixed</span>
            </a>

            <a href="1.%20ár/takmarkandi.html" class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h2 class="text-2xl font-bold mb-2 text-purple-600">Takmarkandi</h2>
                <p class="text-gray-600 mb-4">Limiting Reactant Factory - Problem-solving game</p>
                <span class="text-sm text-gray-500">Difficulty: Easy • Medium • Hard</span>
            </a>

            <a href="1.%20ár/molmassi.html" class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h2 class="text-2xl font-bold mb-2 text-orange-600">Molmassi</h2>
                <p class="text-gray-600 mb-4">Molar Mass Challenge - 90-second timed quiz</p>
                <span class="text-sm text-gray-500">Difficulty: Easy • Medium • Hard • Mixed</span>
            </a>

            <a href="1.%20ár/lausnir.html" class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h2 class="text-2xl font-bold mb-2 text-pink-600">Lausnir</h2>
                <p class="text-gray-600 mb-4">Solution Lab - Concentration problems</p>
                <span class="text-sm text-gray-500">Difficulty: Easy • Medium • Hard</span>
            </a>
        </div>

        <footer class="mt-12 text-center text-gray-500">
            <p>&copy; 2025 Sigurður E. Vilhelmsson | MIT License</p>
        </footer>
    </div>
</body>
</html>
```

#### 2.2 Create .gitignore

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/
*.js.map

# Environment variables
.env
.env.local
.env.production

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
```

#### 2.3 Create Custom Error Pages

**404.html:**
```html
<!DOCTYPE html>
<html lang="is">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex items-center justify-center">
    <div class="text-center">
        <h1 class="text-9xl font-bold text-gray-300">404</h1>
        <h2 class="text-3xl font-bold text-gray-700 mb-4">Page Not Found</h2>
        <p class="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <a href="/" class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
            Back to Home
        </a>
    </div>
</body>
</html>
```

### Step 3: Server Setup

#### 3.1 Update System and Install Nginx

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

#### 3.2 Configure Firewall

```bash
# Allow Nginx through firewall
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status
```

#### 3.3 Create Site Directory

```bash
# Create directory for your site
sudo mkdir -p /var/www/chemistrygames
sudo chown -R $USER:$USER /var/www/chemistrygames
sudo chmod -R 755 /var/www/chemistrygames
```

### Step 4: Transfer Files to Server

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

### Step 5: Configure Nginx

#### 5.1 Create Nginx Configuration

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

#### 5.2 Enable Site

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

### Step 6: Set Up SSL with Let's Encrypt

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

### Step 7: Handle File Name Issues

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

### Step 8: Optional - Self-Host CDN Dependencies

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

### Step 9: Set Up Automatic Updates (Optional)

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

- [ ] TSX files converted to HTML or built
- [ ] Landing page (index.html) created
- [ ] Custom 404 page created
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Gzip compression enabled
- [ ] Security headers configured
- [ ] Cache headers configured
- [ ] File permissions correct (755 directories, 644 files)
- [ ] Error pages tested
- [ ] All games load correctly
- [ ] Mobile responsiveness verified
- [ ] CDN dependencies load or self-hosted
- [ ] Monitoring set up
- [ ] Backup strategy in place
- [ ] DNS configured correctly
- [ ] Test from different browsers
- [ ] Test from different devices

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
