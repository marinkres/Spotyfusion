```markdown
# Mergify

A Next.js project for music lovers!

## Description

Spotyfusion is a web application built with Next.js and TypeScript. It aims to provide a cool experience for music enthusiasts.

## Installation 🛠️

1.  **Prerequisites:**

    *   Node.js (version 18 or higher recommended)
    *   npm or yarn package manager

2.  **Clone the repository:**

    ```bash
    git clone https://github.com/marinkres/Spotyfusion.git
    cd Spotyfusion
    ```

3.  **Install dependencies:**

    ```bash
    npm install # or yarn install
    ```

4.  **Environment Variables:**

    This project needs environment variables to connect to services like Supabase and Stripe.  Check the project's documentation or `.env.example` (if available) for the necessary variables.  Create a `.env.local` file in the root directory and add them.

    Example:

    ```
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    STRIPE_SECRET_KEY=your_stripe_secret_key
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
    ```

5.  **Run the development server:**

    ```bash
    npm run dev # or yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Key Features ✨

Based on the `package.json` dependencies, Spotyfusion likely includes:

*   **Modern UI Components:** Uses Radix UI for accessible and customizable UI elements (Accordion, Alert Dialog, Avatar, Checkbox, Context Menu, Dropdown Menu, Icons, Label, Slot, Tabs).
*   **Data Fetching & Management:**  Potentially uses Supabase for backend services (database, authentication, storage).
*   **Animations:** Employs Framer Motion for animations.
*   **Payment Integration:**  Likely integrates with Stripe for handling payments.
*   **Responsive Design:**  Uses Tailwind CSS for a responsive layout.
*   **Carousel:** Uses embla-carousel-react for creating carousels.
*   **Form Handling:** Uses react-hook-form for form management.
*   **Resizable Panels:** Uses react-resizable-panels for creating resizable panels.
*   **Toast Notifications:** Uses react-toastify for displaying toast notifications.

## Contributing 🤝

Contributions are welcome!  Here's how you can contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your forked repository.
5.  Submit a pull request to the `main` branch of the Spotyfusion repository.

Please try to keep your code consistent with the project's style and include tests if possible.

## Troubleshooting 🐛

*   **Dependency Issues:** If you have problems during installation, try deleting the `node_modules` folder and `package-lock.json` (or `yarn.lock`) file and then reinstalling the dependencies.
    ```bash
    rm -rf node_modules package-lock.json # or yarn.lock
    npm install # or yarn install
    ```
*   **Environment Variable Errors:** Make sure all required environment variables are correctly set in your `.env.local` file.
*   **Supabase Connection Issues:** Check that your Supabase URL and Anon Key are correct and that your Supabase project is running.

## Homepage 🏠

Visit the project's homepage: [https://mergify.marink.me](https://mergify.marink.me)
```
