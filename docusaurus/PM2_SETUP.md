# PM2 Setup Guide for Docusaurus

This guide will help you set up PM2 to run Docusaurus on your Linux server.

## Prerequisites

- Node.js >= 18.0 installed
- npm installed
- PM2 installed globally

## Installation Steps

### 1. Install PM2 globally

```bash
npm install -g pm2
```

**Note:** If you get permission errors, you can use `npx pm2` instead (scripts are already configured for this).

### Fix PM2 Permissions (if needed)

If you encounter permission errors:

```bash
# Fix permissions on PM2 directory
sudo chown -R $(whoami) ~/.pm2
chmod 755 ~/.pm2

# Or remove and recreate (if no important processes running)
rm -rf ~/.pm2
```

### 2. Install project dependencies

```bash
cd docusaurus
npm install
```

### 3. Build the site (for production)

```bash
npm run build
```

## Running with PM2

### Development Mode (with hot reload)

```bash
# Start Docusaurus in development mode
npm run pm2:start -- --only docusaurus-dev

# Or directly:
pm2 start ecosystem.config.js --only docusaurus-dev
```

### Production Mode (serving static build)

```bash
# Make sure you've built the site first
npm run build

# Start Docusaurus in production mode
npm run pm2:start -- --only docusaurus-prod

# Or directly:
pm2 start ecosystem.config.js --only docusaurus-prod
```

## PM2 Commands

```bash
# Start the app
npm run pm2:start

# Stop the app
npm run pm2:stop

# Restart the app
npm run pm2:restart

# Delete the app from PM2
npm run pm2:delete

# View logs
npm run pm2:logs

# Monitor (real-time)
npm run pm2:monit

# View status
pm2 status

# View detailed info
pm2 info docusaurus-dev
pm2 info docusaurus-prod
```

## Auto-start on Server Reboot

To make PM2 start automatically on server reboot:

```bash
# Generate startup script
pm2 startup

# Save current PM2 process list
pm2 save
```

## Configuration

The PM2 configuration is in `ecosystem.config.js`. You can modify:

- **Port**: Change `PORT` in the `env` section
- **Memory limit**: Change `max_memory_restart`
- **Log files**: Located in `./logs/` directory

## Production Deployment Workflow

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Start with PM2 (production):**
   ```bash
   pm2 start ecosystem.config.js --only docusaurus-prod
   ```

3. **Save PM2 configuration:**
   ```bash
   pm2 save
   ```

4. **Set up auto-start:**
   ```bash
   pm2 startup
   # Follow the instructions shown
   ```

## Accessing Your Site

- Development: `http://your-server-ip:3000`
- Production: `http://your-server-ip:3000`

## Reverse Proxy Setup (Optional)

For production, you might want to use Nginx as a reverse proxy:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Troubleshooting

- **Check logs**: `pm2 logs docusaurus-prod`
- **Check status**: `pm2 status`
- **Restart if needed**: `pm2 restart docusaurus-prod`
- **Check if port is in use**: `netstat -tulpn | grep 3000`

