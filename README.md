<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Web Desa Mapur

## Project Overview

Welcome to **Web Desa Mapur**, a comprehensive web platform designed to serve as the official online presence for Desa Mapur. This project aims to centralize information, facilitate community engagement, and provide administrative tools for managing village content, including profiles, galleries, and important announcements. Built with modern web technologies, it offers a responsive and user-friendly experience for both residents and administrators.

## Key Features & Benefits

*   **Centralized Information Hub**: Provides a dedicated space for all official information about Desa Mapur.
*   **Administrative Dashboard**: Intuitive interface for administrators to manage website content, including pages, media, and user profiles.
*   **Dynamic Content Sections**:
    *   **Profil**: Dedicated section for detailed village profiles, history, and leadership.
    *   **Galeri**: A vibrant photo and media gallery to showcase village events and beauty.
    *   **Kepercayaan**: Information regarding local beliefs, traditions, and cultural heritage.
*   **Responsive Design**: Optimized for seamless viewing and interaction across various devices, from desktops to mobile phones.
*   **Scalable Backend**: Utilizes Supabase for robust data management and secure media storage.
*   **Modern Technology Stack**: Built with TypeScript and Node.js for a robust, maintainable, and efficient application.
*   **AI Integration Ready**: Features a setup that suggests readiness for AI-powered functionalities, potentially leveraging Google AI Studio.

## Technologies Used

This project leverages the following technologies:

### Languages

*   **TypeScript**: For type-safe and scalable JavaScript development.

### Tools & Technologies

*   **Node.js**: As the JavaScript runtime environment.
*   **Next.js**: (Inferred from `page.tsx`, `layout.tsx`, `globals.css` and `.env.local` setup) A React framework for production-grade applications.
*   **React**: For building interactive user interfaces.
*   **Tailwind CSS**: For utility-first CSS styling (`app/globals.css`).
*   **Supabase**: As the backend-as-a-service for database, authentication, and media storage (`lib/supabase.ts`).
*   **ESLint**: For code quality and consistency (`.eslintrc.json`).
*   **clsx & tailwind-merge**: For utility class management (`lib/utils.ts`).

## Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **Node.js**: Version 18.x or higher is recommended. You can download it from [nodejs.org](https://nodejs.org/).
*   **npm**: Node Package Manager, which comes bundled with Node.js.

## Installation & Setup Instructions

Follow these steps to get a development environment up and running:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/LuckyFIN-1415/desa-mapur.git
    cd desa-mapur
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env.local` file in the root directory of the project. This file will store your environment variables.
    ```
    # --- Google AI Studio / Gemini API Key (if applicable) ---
    GEMINI_API_KEY=your_gemini_api_key_here

    # --- Supabase Configuration ---
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_public_key_here
    ```
    *   **`GEMINI_API_KEY`**: If integrating with Google AI Studio/Gemini, obtain your API key from [Google AI Studio](https://ai.google.dev/).
    *   **`NEXT_PUBLIC_SUPABASE_URL`**: Your Supabase project URL. You can find this in your Supabase project settings under "API".
    *   **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**: Your Supabase "anon" public key. This is also found in your Supabase project settings under "API".

4.  **Run the Application**:
    ```bash
    npm run dev
    ```
    The application should now be running locally, typically accessible at `http://localhost:3000`.

## Project Structure

The project follows a modular structure, typical for Next.js applications:

```
desa-mapur/
├── .eslintrc.json
├── .gitignore
├── README.md
├── app/                           # Main application directory (Next.js App Router)
│   ├── admin/                     # Admin-specific routes
│   │   ├── dashboard/             # Admin Dashboard for content management
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── galeri/                # Admin controls for the photo gallery
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── kepercayaan/           # Admin controls for beliefs/traditions content
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── profil/                # Admin controls for village profile content
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── globals.css                # Global styles, including Tailwind CSS imports
│   ├── icon.svg                   # Site favicon
│   └── page.tsx                   # Main homepage component
├── hooks/
│   └── use-mobile.ts              # Custom hook for mobile responsiveness detection
├── lib/
│   ├── supabase.ts                # Supabase client initialization and media bucket constant
│   └── utils.ts                   # Utility functions (e.g., for Tailwind CSS class merging)
└── package.json                   # Project dependencies and scripts
└── tsconfig.json                  # TypeScript configuration
```

## Configuration Options

The primary configuration for this project is done via environment variables in the `.env.local` file, as described in the [Installation & Setup Instructions](#installation--setup-instructions) section. These include:

*   **`GEMINI_API_KEY`**: For potential integration with Google AI services.
*   **`NEXT_PUBLIC_SUPABASE_URL`**: The base URL for your Supabase project.
*   **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**: The public anonymous key for Supabase, used for client-side interactions.

## Contributing Guidelines

We welcome contributions to the Web Desa Mapur project! If you're interested in contributing, please follow these steps:

1.  **Fork the repository**.
2.  **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name`.
3.  **Make your changes**. Ensure your code adheres to the project's coding style (ESLint is configured).
4.  **Commit your changes** with a clear and concise message: `git commit -m "feat: Add new feature for X"`.
5.  **Push to your fork**: `git push origin feature/your-feature-name`.
6.  **Open a Pull Request** to the `main` branch of this repository. Provide a detailed description of your changes.

## License Information

This project currently has **no specified license**. All rights are reserved by the project owner until a license is formally added.

## Acknowledgments

*   **Google AI Studio**: For the potential AI integration framework and banner inspiration.
*   **Supabase**: For providing a powerful and easy-to-use backend solution for database and authentication.
*   **Next.js & React**: For the excellent framework and library that powers the frontend.
*   **Tailwind CSS**: For streamlining the styling process and enabling rapid UI development.
