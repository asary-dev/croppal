FROM node:alpine as base

# Add package file
COPY package.json ./

# Install deps
RUN npm install

# Copy source
COPY src ./src
COPY tsconfig.json ./tsconfig.json

# Build dist
RUN npm run build

# Start production image build
FROM node:alpine

RUN npm install pm2 -g

# Copy node modules and build directory
COPY --from=base ./node_modules ./node_modules
COPY --from=base /build /build

EXPOSE 5000
CMD ["pm2-runtime", "/build/index.js"]
