# trainee_frontend

React + Vite frontend for the trainee CRUD assignment. It provides UI pages to create, read, update, and delete items through the backend API.

## Tech Stack

- React
- Vite
- React Router
- Axios

## Features

- Item listing page
- Create item page
- Update item page
- Delete item page
- API integration with backend via Axios

## Project Structure

```
trainee_frontend/
  index.html
  vite.config.js
  src/
    main.jsx
    App.jsx
    styles.css
    pages/
      GetItems.jsx
      CreateItem.jsx
      UpdateItem.jsx
      DeleteItem.jsx
    services/
      api.js
```

## Prerequisites

- Node.js 18+ (recommended)
- Backend API running (default: http://localhost:5000)

## Environment Variables

Create a local `.env` file in this folder:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

Important:
- Variables with `VITE_` prefix are exposed to browser at build/runtime.
- Never store secrets in frontend `.env`.

## Install and Run

1. Install dependencies

```bash
npm install
```

2. Start development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview production build

```bash
npm run preview
```

Default local frontend URL:

- http://localhost:5173

## API Integration

The Axios client is configured in `src/services/api.js`.

Default API base URL logic:
- Uses `VITE_API_BASE_URL` if defined
- Falls back to `http://localhost:5000/api`

Mapped requests:
- `getItems()` -> `GET /items`
- `createItem(payload)` -> `POST /items`
- `updateItem(id, payload)` -> `PUT /items/:id`
- `deleteItem(id)` -> `DELETE /items/:id`

## Manual Testing Tips

- Open browser devtools network tab
- Filter by Fetch/XHR
- Verify request method, URL, payload, status code, and response body for each CRUD action

## GitHub Safety Checklist

Before pushing:
- Confirm `.env` is not tracked
- Confirm no API keys/tokens are committed
- Confirm no build artifacts or logs are tracked
- Review staged files with `git diff --staged`

## Setup On A New PC (Frontend + Backend Connection)

1. Install required tools

- Node.js 18+
- Git

2. Clone frontend repository

```bash
git clone <frontend-repo-url>
cd trainee_frontend
```

3. Ensure backend is running

- Backend API should be available at `http://localhost:5000/api`
- If running on another URL, set it in frontend `.env`

4. Create local environment file

Create `.env` in this folder:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

5. Install and start frontend

```bash
npm install
npm run dev
```

6. Verify application

- Open `http://localhost:5173`
- Test all pages: View, Create, Update, Delete
- Confirm Network tab shows API calls to backend URL

## Push Frontend To Remote Repo (trainee_frontend)

Use these steps only after creating an empty GitHub repo named `trainee_frontend`.

```bash
git init
git branch -M main
git add .
git status
git diff --staged
git commit -m "Initial frontend commit"
git remote add origin <frontend-repo-url>
git push -u origin main
```

If `.env` appears in staged files, unstage immediately:

```bash
git restore --staged .env
```

## License

For training/assessment use.
