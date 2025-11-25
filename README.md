# Doon Project

A fresh React + TypeScript project with ShadCN UI, TailwindCSS, and client-server service architecture.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **ShadCN UI** components
- **TailwindCSS** for styling
- **Client-Server Architecture** with service layer
- **API Routes** for server-side logic

## 📦 Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
doon-project/
├── app/
│   ├── api/              # API routes (server-side)
│   │   └── hello/
│   │       └── route.ts
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page (client component)
│   └── globals.css       # Global styles
├── components/
│   └── ui/               # ShadCN UI components
│       └── button.tsx
├── services/             # Service layer
│   ├── api-client.ts     # HTTP client
│   └── hello-service.ts  # Business logic
└── lib/
    └── utils.ts          # Utility functions
```

## 🏛️ Architecture

### Client-Server Service Architecture

1. **Client Layer** (`app/page.tsx`)
   - React components that interact with the UI
   - Uses services to communicate with the server

2. **Service Layer** (`services/`)
   - `api-client.ts`: Generic HTTP client for API calls
   - `hello-service.ts`: Business logic for Hello World functionality

3. **Server Layer** (`app/api/`)
   - API routes that handle server-side logic
   - Returns JSON responses

### Data Flow

```
Client Component → Service → API Client → API Route → Response
```

## 📝 Usage Example

```typescript
// In a client component
import { helloService } from "@/services/hello-service"

const response = await helloService.getHelloMessage()
console.log(response.data)
```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

MIT
