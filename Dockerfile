# Use Node.js version 11 
FROM mhart/alpine-node:11

# Set the working directory
WORKDIR /usr/src

# Copy package manager files to the working directory and run install
COPY package.json package-lock.json ./
RUN npm install

# Copy all files to the working directory
COPY . .

# Run tests
RUN CI=true npm test

# Build the app and move the resulting build to the `/public` directory
RUN npm run-script build 
RUN mv ./build /public
