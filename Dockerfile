# Get Playwright
FROM mcr.microsoft.com/playwright:v1.43.0

# Enable corepack which lets us use pnpm
RUN corepack enable

# Set the working directory
WORKDIR /contrast