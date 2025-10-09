# Get Playwright
FROM mcr.microsoft.com/playwright:v1.56.0

# Enable corepack which lets us use pnpm
RUN corepack enable
RUN corepack prepare pnpm@9.1.0 --activate

# Set the working directory
WORKDIR /contrast