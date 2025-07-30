# FM E-Commerce

A modern, accessible, and performant single-page e-commerce app built with React, TypeScript, and Tailwind CSS. Users can browse, filter, and search products, view details, manage a shopping cart (with persistence), and toggle between light/dark themes.

---

## 🚀 Features

- Browse a list of products
- Filter & search by category, price range, and text
- View product details
- Add/remove items in a shopping cart
- Cart persists in local storage
- Responsive layout (mobile ↔ desktop)
- Light/dark theme toggle
- Centralized state management (React Context + useReducer)
- Code-splitting & responsive images
- Accessibility: semantic HTML, ARIA, keyboard navigation, WCAG AA contrast
- Unit & E2E tests

---

## 🛠️ Tech Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first, responsive, dark mode)
- [React Router](https://reactrouter.com/)
- [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
- [Cypress](https://www.cypress.io/) (E2E)
- [fakestoreapi.com](https://fakestoreapi.com/) (mock API)

---

## ⚡ Setup & Run

1. **Install dependencies:**
   npm install

2. **Start the dev server:**
   npm run dev

   App runs at [http://localhost:5173](http://localhost:5173)

3. **Run tests:**

   - Unit tests: `npm test`
   - E2E (Cypress): `npx cypress open`

4. **Build for production:**
   ```sh
   npm run build
   ```

---

## 🏗️ Key Architectural Choices

- **Component-driven, feature-based structure** for scalability and maintainability
- **React Context + useReducer** for centralized state (cart, theme)
- **Tailwind CSS** for rapid, accessible, and responsive UI
- **Code-splitting** with `React.lazy`/`Suspense` for fast initial loads
- **LocalStorage** for cart and theme persistence
- **Accessibility**: semantic HTML, ARIA, keyboard navigation, visible focus, color contrast

---

## 🧪 Testing

- **Unit tests**: Jest + React Testing Library for key components and logic
- **E2E**: Cypress covers a happy-path user flow (browse, filter, add to cart, checkout)

---

## 🌐 Deployment

- Deploy to [Vercel](https://fm-ecommerce-rho.vercel.app/)

---

## ♿ Accessibility & Performance

- All interactive elements are keyboard-accessible with visible focus
- Color contrast meets WCAG AA
- Uses semantic HTML and ARIA roles/labels
- Code-splitting and responsive images for fast loads

---

## 📚 API Doc (fakestoreapi.com)

- **GET /products**
  - Returns all products
- **GET /products/:id**
  - Returns a single product by ID
- **GET /products/categories**
  - Returns all product categories

See [https://fakestoreapi.com/docs](https://fakestoreapi.com/docs) for more details.

---
