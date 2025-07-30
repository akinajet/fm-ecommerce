# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

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
