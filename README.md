# Next Meteo

**Next Meteo** is a modern, high-performance, and minimalist weather web application built with Next.js. Developed as a hobby project, it serves as a playground to explore advanced state management, internationalization, and fluid animations in the modern React ecosystem.

Powered by the Open-Meteo API, it provides accurate, real-time forecasts, rich interactive charts, and multi-language support—all bundled into a seamless user experience.

---

## Features

- **Global Search:** Check current weather and forecasts for any city worldwide.
- **Geolocation Support:** Instantly fetches local weather based on the user's current location.
- **Interactive Analytics:** Beautifully rendered temperature, humidity, and wind trends powered by Chart.js.
- **Multi-language (i18n):** Fully localized interface using `next-intl`.

---

## Tech Stack

This project leverages a modern, type-safe frontend ecosystem built for speed and developer experience:

- **Runtime & Package Manager:** [Bun](https://bun.sh/) (Blazing fast bundling and script execution)
- **Framework:** [Next.js](https://nextjs.org/) (App Router) & [React](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strictly typed)
- **Data Validation:** [Zod](https://zod.dev/) (Robust API response schema validation)
- **Styling:** [CSS Modules](https://github.com/css-modules/css-modules) (Scoped, maintainable, and lightweight CSS)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest) (Asynchronous state, caching, and background synchronization)
- **Global State Management:** [Jotai](https://jotai.org/) (Atomic and minimalist state approach for settings and UI preferences)
- **Weather API:** [Open-Meteo](https://open-meteo.com/) (Free, developer-friendly, and no-API-key-required meteorological data)
- **Data Visualization:** [Chart.js](https://www.chartjs.org/) (Dynamic canvas-based data charts)
- **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/) (Seamless i18n integration for Next.js)
- **Animations:** [Motion](https://motion.dev/) (Formerly Framer Motion, powering production-ready animations)

---

## Privacy

Next Meteo is GDPR-compliant by design: it features zero tracking, zero analytics, zero server-side data storage, and uses local storage strictly for user-requested functional preferences (hence requiring no cookie banners).
