# Next Blog Application

This Next.js 14 project is a simple blog-post application that allows users to view and post blogs. The application follows a component-based architecture and uses Redux Toolkit with RTK Query for global state management and data fetching.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **Login Page**: Users can log in with the username "user" and password "banao".
- **Blog Listing Page**: View and search for blogs by title. This page is server-side rendered with authentication token validation.
- **Create New Blog**: Access the "Create New" button to navigate to the post blog screen.
- **Post Blog Screen**: Allows users to create and post new blogs.

## Optimization Techniques

1. **Image Optimization**: Utilizes the Next.js `Image` component for efficient image compression and lazy loading.
2. **Code Splitting**: Implemented prefetching on hover and both route-based and component-based code splitting.
3. **Debouncing**: Custom `useDebounce` hook with a 300 ms delay to optimize API calls for search input.

## API Integration

- Uses dummy data for blogs and login functionality.
- APIs are managed in the `api` folder using Next.js' API routes.
- For testing, the login credentials are:
  - Username: `user`
  - Password: `banao`

## Component-Based Architecture

- Server and client components are split appropriately.
- Styled using CSS modules with a basic design system.

## SEO Considerations

- Basic SEO practices are applied to ensure visibility and search engine ranking.

## UI Reference

For design and UI elements, refer to the Figma design system: [UI Reference](https://www.figma.com/design/HM2uZF7oXVgKCcm0dqlYf1/References?node-id=0-1&t=bC4D4arlWvHp6mk7-0)