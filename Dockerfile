# Get Playwright
FROM mcr.microsoft.com/playwright:v1.44.0

# Enable corepack which lets us use pnpm
RUN corepack enable

# Set the working directory
WORKDIR /contrast