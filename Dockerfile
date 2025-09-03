# Use a Debian-based Ruby image
FROM ruby:3.0

# Install dependencies including Node.js and npm
RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Install Jekyll and Bundler
RUN gem install jekyll bundler

# Set the working directory
WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy Gemfile and Gemfile.lock (if present)
COPY Gemfile Gemfile.lock ./

# Install gem dependencies
RUN bundle install

# Copy the rest of your application code
COPY . .

# Expose ports for both Jekyll (4000) and Vite (5173 default)
EXPOSE 4000 5173

# Command to run both servers
CMD ["sh", "-c", "npm run dev"]
