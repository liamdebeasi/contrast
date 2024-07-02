# Get Playwright
FROM mcr.microsoft.com/playwright:v1.45.1

# Enable corepack which lets us use pnpm
RUN corepack enable

# Set the working directory
WORKDIR /contrast