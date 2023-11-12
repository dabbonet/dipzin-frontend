# Use the official Node.js 19 image.
FROM node:19

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install all dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .


# Install dotenv-vault
RUN npm install -g dotenv-vault

# Use build argument to set the DOTENV_KEY
ARG DOTENV_KEY
ENV DOTENV_KEY=$DOTENV_KEY

# Use dotenv-vault to download .env file and rename it
RUN npx dotenv-vault pull production 

# Build the Next.js app
RUN npm run build

# Remove development dependencies from node_modules
# RUN npm prune --production

COPY .env.vault .

# Run the web service on container startup.
CMD [ "npm", "run", "proda" ]
