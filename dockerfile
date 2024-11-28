# Use a Debian-based Ruby image
FROM ruby:3.0

# Install dependencies
RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev nodejs

# Install Jekyll and Bundler
RUN gem install jekyll bundler

# Set the working directory
WORKDIR /usr/src/app

# Copy Gemfile and Gemfile.lock (if present)
COPY Gemfile Gemfile.lock ./

# Install gem dependencies
RUN bundle install

# Copy the rest of your application code
COPY . .

# Expose port 4000 for Jekyll server
EXPOSE 4000

# Command to run when starting the container
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]