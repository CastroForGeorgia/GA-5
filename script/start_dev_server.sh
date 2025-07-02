#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Jekyll Development Server...${NC}"

# Function to kill Jekyll processes
kill_jekyll() {
    echo -e "${YELLOW}🔍 Checking for existing Jekyll processes...${NC}"
    
    # Find Jekyll processes (excluding the current script and grep itself)
    JEKYLL_PIDS=$(ps aux | grep -E "(jekyll|bundle.*jekyll)" | grep -v grep | grep -v "$0" | awk '{print $2}')
    
    if [ -n "$JEKYLL_PIDS" ]; then
        echo -e "${YELLOW}📋 Found Jekyll processes with PIDs: $JEKYLL_PIDS${NC}"
        echo -e "${RED}🛑 Killing existing Jekyll processes...${NC}"
        
        for PID in $JEKYLL_PIDS; do
            if kill -TERM "$PID" 2>/dev/null; then
                echo -e "${GREEN}✅ Successfully killed process $PID${NC}"
            else
                echo -e "${RED}❌ Failed to kill process $PID (may have already exited)${NC}"
            fi
        done
        
        # Give processes a moment to terminate gracefully
        sleep 2
        
        # Force kill any remaining processes
        REMAINING_PIDS=$(ps aux | grep -E "(jekyll|bundle.*jekyll)" | grep -v grep | grep -v "$0" | awk '{print $2}')
        if [ -n "$REMAINING_PIDS" ]; then
            echo -e "${RED}🔨 Force killing remaining processes...${NC}"
            for PID in $REMAINING_PIDS; do
                kill -KILL "$PID" 2>/dev/null && echo -e "${GREEN}✅ Force killed process $PID${NC}"
            done
        fi
    else
        echo -e "${GREEN}✅ No existing Jekyll processes found${NC}"
    fi
}

# Function to start Jekyll server
start_jekyll() {
    echo -e "${GREEN}🌟 Starting Jekyll development server...${NC}"
    echo -e "${YELLOW}📍 Running: bundle exec jekyll serve --baseurl=\"\"${NC}"
    echo -e "${YELLOW}🌐 Server will be available at: http://localhost:4000${NC}"
    echo -e "${YELLOW}⏹️  Press Ctrl+C to stop the server${NC}"
    echo ""
    
    # Start Jekyll server
    bundle exec jekyll serve --baseurl=""
}

# Main execution
kill_jekyll
echo ""
start_jekyll 