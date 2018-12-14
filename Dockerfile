# Use Node.js version 11 
FROM mhart/alpine-node:11

# Set the working directory
WORKDIR /usr/src

COPY package.json yarn.lock ./

# Copy package manager files to the working directory and run install
RUN yarn

COPY . .

# Run tests
RUN env CI=true yarn test --ci

# Build the app and move the resulting build to the `/public` directory
RUN yarn run build 
RUN mv ./build /public
