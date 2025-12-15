# MongoDB Setup Guide

## Option 1: Install MongoDB Locally (Recommended)

### Windows:
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. Make sure to install MongoDB as a Windows Service
4. The installer will automatically start MongoDB

### macOS:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

### Linux (Ubuntu/Debian):
```bash
# Import the public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create a list file for MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

## Option 2: Use MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Create `backend/.env` file with:
```
MONGODB_URI=your_atlas_connection_string_here
```

## Option 3: Use Docker (If you have Docker installed)

```bash
# Run MongoDB in a Docker container
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Verify Installation

After installing MongoDB, test the connection:
```bash
# Test if MongoDB is running
mongosh --eval "db.adminCommand('ismaster')"
```

## Quick Start (Windows)

1. Download and install MongoDB Community Server
2. MongoDB will start automatically as a Windows Service
3. Run the application:
   ```bash
   cd backend
   npm run seed
   npm run dev
   ```

## Troubleshooting

### MongoDB won't start:
- Check if port 27017 is available
- Run as administrator
- Check Windows Services for MongoDB service

### Connection refused:
- Make sure MongoDB is running
- Check firewall settings
- Verify the connection string

### Permission denied:
- Run command prompt as administrator
- Check MongoDB data directory permissions

