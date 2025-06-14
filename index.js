const http = require('http');
const url = require('url');
const path = require('path');

const port = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV !== 'production';

// Simple router
const routes = {
    '/': handleHome,
    '/api/health': handleHealth,
    '/api/status': handleStatus,
    '/favicon.ico': handleFavicon
};

function handleHome(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>🚀 Autonomous Income Platform</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { 
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }
                .container { 
                    background: rgba(255,255,255,0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    padding: 40px;
                    max-width: 600px;
                    text-align: center;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
                }
                h1 { font-size: 2.5em; margin-bottom: 20px; }
                .status { 
                    color: #4ade80; 
                    font-weight: bold; 
                    font-size: 1.2em;
                    margin: 20px 0;
                }
                .info-grid { 
                    display: grid; 
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
                    gap: 20px; 
                    margin: 30px 0;
                }
                .info-card { 
                    background: rgba(255,255,255,0.1); 
                    padding: 20px; 
                    border-radius: 10px;
                }
                .api-links { margin-top: 30px; }
                .api-links a { 
                    color: #60a5fa; 
                    text-decoration: none; 
                    margin: 0 10px;
                    padding: 8px 16px;
                    border: 1px solid #60a5fa;
                    border-radius: 5px;
                    display: inline-block;
                    transition: all 0.3s;
                }
                .api-links a:hover { 
                    background: #60a5fa; 
                    color: white;
                }
                @media (max-width: 600px) {
                    .container { margin: 20px; padding: 20px; }
                    h1 { font-size: 2em; }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🚀 Autonomous Income Platform</h1>
                <div class="status">✅ Deployment Successful!</div>
                <p><strong>Deployed:</strong> </p>
                
                <div class="info-grid">
                    <div class="info-card">
                        <h3>🖥️ System</h3>
                        <p>Node.js </p>
                        <p> </p>
                    </div>
                    <div class="info-card">
                        <h3>⚡ Performance</h3>
                        <p>Memory: MB</p>
                        <p>Uptime: s</p>
                    </div>
                    <div class="info-card">
                        <h3>🌐 Environment</h3>
                        <p>Port: </p>
                        <p>Mode: </p>
                    </div>
                </div>

                <div class="api-links">
                    <a href="/api/health">Health Check</a>
                    <a href="/api/status">System Status</a>
                </div>
                
                <p style="margin-top: 30px; opacity: 0.8;">
                    <small>Automated deployment via GitHub + Vercel 🎯</small>
                </p>
            </div>
        </body>
        </html>
    );
}

function handleHealth(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.version
    }, null, 2));
}

function handleStatus(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        server: 'Autonomous Income Platform',
        status: 'operational',
        environment: process.env.NODE_ENV || 'development',
        platform: process.platform,
        architecture: process.arch,
        nodeVersion: process.version,
        port: port,
        timestamp: new Date().toISOString(),
        uptime: {
            seconds: Math.round(process.uptime()),
            readable: new Date(process.uptime() * 1000).toISOString().substr(11, 8)
        },
        memory: {
            used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
            total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
            external: Math.round(process.memoryUsage().external / 1024 / 1024)
        }
    }, null, 2));
}

function handleFavicon(req, res) {
    res.writeHead(204);
    res.end();
}

function handleNotFound(req, res) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(
        <html>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>404 - Page Not Found</h1>
            <p>The requested resource was not found on this server.</p>
            <a href="/" style="color: #007bff;">← Back to Home</a>
        </body>
        </html>
    );
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    const handler = routes[pathname] || handleNotFound;
    
    try {
        handler(req, res);
    } catch (error) {
        console.error('Server error:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
});

server.listen(port, () => {
    console.log(🚀 Autonomous Income Platform started);
    console.log(📍 Local: http://localhost:);
    console.log(🌍 Network: Available on all interfaces);
    console.log(⚙️  Environment: );
    console.log(💾 Memory: MB);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});
