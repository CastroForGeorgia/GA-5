# Castro For Georgia - Campaign Website

This repository contains the campaign website for Andres Castro, candidate for U.S. House in Georgia's 5th Congressional District.

## Project Structure

```
GA-5/
├── frontend/           # Jekyll website
│   ├── assets/        # Static assets (images, JS, CSS)
│   ├── content/       # Content files
│   │   ├── posts/     # Blog posts
│   │   ├── policies/  # Policy positions and platforms
│   │   ├── projects/  # Campaign initiatives and activities
│   │   └── pages/     # Static pages (about, contact, etc.)
│   ├── _data/         # Site configuration and data
│   ├── _includes/     # Jekyll includes/templates
│   ├── _layouts/      # Jekyll layouts
│   ├── _sass/         # SCSS stylesheets
│   ├── blog/          # Blog listing pages
│   ├── policies/      # Policy listing pages
│   ├── projects/      # Project listing pages
│   ├── _config.yml    # Jekyll configuration
│   ├── Gemfile        # Ruby dependencies
│   └── Dockerfile     # Docker configuration
├── tools/             # Future community utilities and tools
├── backend/           # Future backend services
└── README.md          # This file
```

## Content Organization

### Policies vs Projects

**Policies** (`content/policies/`): Policy positions and platforms
- Economy, healthcare, education, etc.
- Detailed policy proposals and positions
- Accessible at `/policy/[name]/`

**Projects** (`content/projects/`): Campaign initiatives and activities
- Community outreach, events, volunteer activities
- Actual campaign work and initiatives
- Accessible at `/project/[name]/`

## Quick Start

### Prerequisites
- Ruby 3.0 or higher
- Bundler
- Docker (optional)

### Local Development

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Start the development server:
   ```bash
   bundle exec jekyll serve
   ```

4. Open your browser to `http://localhost:4000`

### Docker Development

1. Build the Docker image:
   ```bash
   cd frontend
   docker build -t castro-website .
   ```

2. Run the container:
   ```bash
   docker run -p 4000:4000 -v $(pwd):/usr/src/app castro-website
   ```

3. Open your browser to `http://localhost:4000`

## Content Management

### Adding Blog Posts
- Create new posts in `frontend/content/posts/`
- Use the format: `YYYY-MM-DD-title.md`
- Include front matter with title, description, and layout

### Adding Policies
- Create new policies in `frontend/content/policies/`
- Use descriptive filenames (e.g., `economy.md`)
- Include front matter with title, description, and layout
- Policies should contain detailed policy positions and proposals

### Adding Projects
- Create new projects in `frontend/content/projects/`
- Use descriptive filenames (e.g., `community-outreach.md`)
- Include front matter with title, description, and layout
- Projects should describe actual campaign initiatives and activities

### Adding Pages
- Create new pages in `frontend/content/pages/`
- Use descriptive filenames (e.g., `contact.md`)
- Include front matter with title, description, and layout

### Managing Assets
- Images: Place in `frontend/assets/images/`
- JavaScript: Place in `frontend/assets/js/`
- CSS/SCSS: Place in `frontend/assets/css/` or `frontend/_sass/`

## Configuration

### Site Settings
Edit `frontend/_data/settings.yml` to modify:
- Site title and description
- Navigation menu
- Hero section content
- Social media links
- Google Analytics

### Jekyll Configuration
Edit `frontend/_config.yml` to modify:
- Collections configuration
- Permalink structure
- Build settings
- Asset paths

## Future Development

### Tools Directory
The `tools/` directory is reserved for future community utilities and tools that may be developed to support the campaign.

### Backend Directory
The `backend/` directory is reserved for future backend services that may be needed for advanced functionality.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally using the development server
5. Submit a pull request

## License

This project is proprietary to the Castro For Georgia campaign.

## Support

For technical support or questions about the website, please contact the development team. 