# A workaround to getting pm2 to work with serve as expected
#
# Usage:
# Make this executable with:
# chmod +x frontendReactServer.sh 
#
# Run this with:
# pm2 start frontendReactServer.sh to start
#
# Run server with
# pm2 start lib/backend/server.js
#
echo "Serving yourAppName!"
serve -s build
