# Castro for Georgia - Frontend

This is the Jekyll-powered campaign website for Andres Castro's run for Georgia's 5th Congressional District.

## Development

### Requirements

- Ruby 3.0+
- Jekyll 4.0+
- Bundler

### Local Development

#### Fork the Repo

For code contributions, it's best to first fork the repo through GitHub and then clone your fork locally:

```bash
git clone https://github.com/[your-username]/GA-5.git
```

You can then set the original repo as the upstream:

```bash
git remote add upstream https://github.com/CastroForGeorgia/GA-5.git
```

Moving forward, you can get the latest version of the upstream branch by using:

```bash
git pull upstream main
```

#### Check Your Version of Ruby

Check your current version of ruby by using:

```bash
ruby -v
```

If you have version 3.0 or later, you can move on to installing dependencies. If the version number is below 3.0 and you aren't currently using a Ruby version manager, it's best to install the latest stable version using a Ruby version manager like [rbenv](https://github.com/rbenv/rbenv). If you have homebrew installed, the simplest path forward is to install `rbenv` through that:

```bash
brew install rbenv
```

**IMPORTANT:** Close your Terminal window after installing `rbenv` and open a new one so your changes take effect.

Use `rbenv` to install the latest stable version of Ruby:

```bash
rbenv install -l
```

You can now set that Ruby version to be used globally or locally for this project:

```bash
# your ruby version may differ
rbenv global 3.1.2   # set the default Ruby version for this machine
# or:
rbenv local 3.1.2    # set the Ruby version for this directory
```

#### Install Dependencies

```bash
bundle install
```

#### Run the Local Dev Server

```bash
bundle exec jekyll serve
```

You should now be able to view the site running locally at http://127.0.0.1:4000/.

### Docker Development

```bash
docker build -t castro-frontend .
docker run -p 4000:4000 castro-frontend
```

## Deployment

The site is configured for GitHub Pages deployment. Push to main branch to deploy.

## Content-Driven Architecture

The site uses a modern, content-driven approach with Jekyll collections to separate content from presentation. This makes it easy to manage content without touching code.

## Content Structure

### Collections

#### `_sections/` - Page Sections

Reusable content sections that appear on the homepage and other pages.

**Example: Hero Section (`content/_sections/hero.md`)**

```yaml
---
title: "Hero Section"
slug: "hero"
section_type: "hero"
hero_role: "Your role/subtitle"
hero_title: "Main headline"
hero_description: "Description text"
hero_button_text: "Button text"
hero_button_link: "https://link-url.com"
hero_image: "hero.jpg"
order: 1
---
```

**Available Section Types:**

- `hero` - Main hero section
- `about` - About section
- `subscribe` - Newsletter subscription section

#### `_faqs/` - Frequently Asked Questions

Individual FAQ items that are automatically listed and linked.

**Example: FAQ Item (`content/_faqs/example.md`)**

```yaml
---
title: "Question title?"
slug: "question-slug"
order: 1
---

Answer content goes here. Can include markdown formatting.
```

#### `_testimonials/` - Community Testimonials

Supporter testimonials and endorsements.

**Example: Testimonial (`content/_testimonials/example.md`)**

```yaml
---
title: "Testimonial Title"
author: "Person Name"
role: "Their Role/Title"
order: 1
featured: true  # Show on homepage
---

"The testimonial quote goes here."
```

#### `_policies/` - Policy Positions

Detailed policy positions and platforms.

#### `_projects/` - Campaign Projects

Campaign initiatives and community projects.

#### `_posts/` - Blog Posts

Campaign blog posts and updates.

#### `_pages/` - Static Pages
Static pages like About, Contact, etc.

## How It Works

### Automatic Section Display

Sections automatically show/hide based on content availability:
- If you have FAQs, the FAQ section appears
- If you have testimonials, the testimonials section appears
- No enable/disable flags needed in settings

### Content vs. Settings

- **Content** (managed in `content/` collections): Text, descriptions, blog posts, policies
- **Settings** (managed in `_data/settings.yml`): Site configuration, navigation, author info, social links

### Asset Management

- Images: Place in `assets/images/`, reference by filename only
- JavaScript: Place in `assets/js/`
- CSS: Managed through SCSS in `_sass/`
- Icons: Use Heroicons SVG icons directly in templates

## Adding New Content

### Add a New FAQ

1. Create `content/_faqs/new-question.md`
2. Add frontmatter with title, slug, and order
3. Write the answer in markdown
4. It automatically appears on the site

### Add a New Testimonial

1. Create `content/_testimonials/new-testimonial.md`
2. Add frontmatter with author, role, order
3. Set `featured: true` to show on homepage
4. Write the testimonial quote

### Add a New Section

1. Create `content/_sections/new-section.md`
2. Define `section_type` in frontmatter
3. Add section-specific fields
4. Create corresponding template in `_includes/`

## File Structure

```bash
frontend/
├── content/                 # All content files
│   ├── _sections/          # Page sections (hero, about, etc.)
│   ├── _faqs/              # FAQ items
│   ├── _testimonials/      # Testimonials
│   ├── _policies/          # Policy positions
│   ├── _projects/          # Campaign projects
│   ├── _posts/             # Blog posts
│   └── _pages/             # Static pages
├── _includes/              # Template partials
├── _layouts/               # Page layouts
├── _sass/                  # SCSS styles
├── assets/                 # Static assets
│   ├── images/            # Image files
│   ├── js/                # JavaScript files
│   └── css/               # Compiled CSS (auto-generated)
├── _data/
│   └── settings.yml       # Site configuration
├── _config.yml            # Jekyll configuration
└── README.md              # This file
```

## Best Practices

### Content Management

- Use descriptive filenames for content
- Include `order` field to control display sequence
- Use `featured` field to control homepage visibility
- Keep titles concise and SEO-friendly

### SEO

- Each FAQ gets its own URL (`/faq/question-slug/`)
- All content includes proper meta descriptions
- Proper heading hierarchy maintained

### Performance

- Images are lazy-loaded
- CSS is compressed
- JavaScript is minified

### Icons

We use Heroicons SVG icons directly in templates for simplicity and performance:

```html
<!-- Example: Arrow Right Icon -->
<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
</svg>
```

**Benefits:**

- No external dependencies
- Perfect Tailwind CSS integration
- Lightweight and fast
- Easy to customize colors with `stroke="currentColor"`
- Scalable with Tailwind size classes (`w-4 h-4`, `w-5 h-5`, etc.)

## Extending the System

To add new content types:

1. **Add Collection to `_config.yml`**

```yaml
collections:
  new_type:
    output: true
    permalink: /new-type/:slug/
```

2. **Create Directory**

```bash
mkdir content/_new_type
```

3. **Create Layout**
Create `_layouts/new-type.html`

4. **Create Include Template**
Create `_includes/section-new-type.html`

5. **Add to Homepage**
Add `{% include section-new-type.html %}` to `index.html`

The system is designed to be flexible and extensible for future campaign needs.
