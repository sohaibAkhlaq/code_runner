# 🚀 CodeRunnr — MEAN Stack Frontend Showcase

<div align="center">

![CodeRunnr Banner](https://img.shields.io/badge/MEAN%20Stack-Angular%2017%20%7C%20Node.js%20%7C%20Express%20%7C%20MongoDB-6366F1?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-Premium%20Design-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)

**A production-grade competitive coding platform frontend built with Angular 17, demonstrating advanced MEAN stack fundamentals — reactive signals, standalone components, TypeScript services, lazy-loaded routes, and a stunning glassmorphism UI system.**

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 🎯 Project Purpose

This is my **flagship frontend project** built to demonstrate mastery of the **MEAN Stack** (MongoDB, Express.js, Angular, Node.js) fundamentals. Every design and architectural decision reflects real industry practices used at top tech companies.

---

## ✨ Key Features

| Feature | Technology | Details |
|---|---|---|
| ⚡ **Particle Canvas** | TypeScript Canvas API | 60 animated particles with WebGL-style connections |
| 🌊 **3D Parallax Hero** | CSS `perspective` + Angular signals | Mouse-responsive 3D code card |
| 🎨 **Glassmorphism UI** | CSS `backdrop-filter` + SCSS tokens | 70+ design tokens, 4-layer shadow system |
| 📊 **SVG Progress Ring** | Angular computed signals | Animated stroke-dashoffset |
| 🗓 **Activity Heatmap** | ngFor + computed colors | 7-week GitHub-style contribution grid |
| 🔐 **Auth System** | Angular signals + LocalStorage | JWT-ready login/register with reactive validation |
| 💪 **Password Strength** | Computed signals | Real-time 4-tier strength meter |
| 🖊 **Code Editor** | Textarea + computed signals | Line numbers, tab-indent, copy-to-clipboard, per-language starter code |
| 🔍 **Problem Filtering** | Angular `computed()` | Multi-filter: search + difficulty + topic tag |
| 📱 **Fully Responsive** | CSS Grid + mobile-first | Hamburger nav, mobile-optimized layouts |

---

## 🏗️ Architecture — MEAN Stack Frontend Patterns

```
src/
├── app/
│   ├── core/
│   │   ├── guards/          # Route protection (authGuard)
│   │   ├── interceptors/    # HTTP interceptors (JWT injection)
│   │   └── services/
│   │       ├── auth.service.ts        # Signal-based auth state
│   │       ├── problem.service.ts     # Problem data layer
│   │       └── submission.service.ts  # Submission management
│   ├── shared/
│   │   ├── components/navbar/         # Scroll-aware navbar
│   │   └── models/                    # TypeScript interfaces
│   └── pages/
│       ├── landing/       # Particle canvas + 3D hero
│       ├── problems/      # filterable problem list (computed)
│       ├── problem-detail/ # 3-panel coding IDE
│       ├── dashboard/     # Stats, heatmap, progress ring
│       ├── submissions/   # Submission history
│       ├── profile/       # User achievements
│       └── auth/          # Login + Register
├── styles/
│   ├── _variables.scss    # 70+ design tokens
│   ├── _animations.scss   # 20+ keyframe animations
│   ├── _components.scss   # Button system, cards, badges
│   ├── _reset.scss        # Modern CSS reset
│   └── _typography.scss   # Fluid type scale
```

---

## 🔧 Angular 17 Concepts Demonstrated

### ✅ Signals (Reactive State)
```typescript
// Signal-based state — no RxJS needed for UI state
isLoading    = signal(false);
searchQuery  = signal('');
typedCode    = signal('');

// Computed derived state
filteredProblems = computed(() =>
  this.problems().filter(p =>
    p.title.toLowerCase().includes(this.searchQuery().toLowerCase())
  )
);
```

### ✅ Standalone Components
```typescript
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {}
```

### ✅ Lazy-Loaded Routes
```typescript
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
    canActivate: [authGuard],  // Route guard ✅
  },
];
```

### ✅ Injectable Services (DI Pattern)
```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = signal<User | null>(null);
  readonly user = this.currentUser.asReadonly();
  isAuthenticated = signal(false);

  async login(email: string, password: string): Promise<boolean> {
    // In MEAN production: HttpClient → Express API → MongoDB
  }
}
```

### ✅ HTTP Interceptor (MEAN Stack Ready)
```typescript
// auth.interceptor.ts — JWT injection for MEAN backend calls
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('cr_token');
  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
  return next(req);
};
```

---

## 🧱 MEAN Stack Integration Architecture

```
┌─────────────────────────────────────────┐
│          Angular 17 Frontend             │
│  ┌─────────┐  ┌──────────┐  ┌────────┐ │
│  │ Signals │  │ Services │  │Guards  │ │
│  └────┬────┘  └────┬─────┘  └───┬────┘ │
└───────┼─────────────┼────────────┼──────┘
        │         HttpClient        │
        ▼             ▼             ▼
┌─────────────────────────────────────────┐
│        Express.js REST API               │
│  POST /api/auth/login                   │
│  GET  /api/problems                     │
│  POST /api/submissions                  │
└───────────────┬─────────────────────────┘
                │ Mongoose ODM
                ▼
┌─────────────────────────────────────────┐
│         MongoDB Atlas                   │
│  Collections: users, problems, subs     │
└─────────────────────────────────────────┘
```

---

## 🎨 Design System

### Color Palette (70+ Tokens)
| Token | Value | Usage |
|---|---|---|
| `--p-500` | `#6366F1` | Primary indigo |
| `--a-400` | `#22D3EE` | Accent cyan |
| `--success` | `#10B981` | Accepted status |
| `--grad-primary` | `135deg → Indigo → Violet → Magenta` | CTAs, gradients |

### Animation Library (20+ Keyframes)
- `fadeUp` — Spring physics entrance
- `rotateIn3D` — Perspective hero card reveal  
- `aurora-drift` — Background orb movement
- `shimmer` — Gradient text sweep
- `float3D` — 3D floating badges
- `scan-line` — Code window scan effect
- `pulse-glow` — Neon glow pulse

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn
- Angular CLI 17+

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/code_runnr.git
cd code_runnr

# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:4200
```

### Build for Production
```bash
npm run build
# Output: dist/code_runnr/
```

---

## 📋 Pages

| Route | Component | Auth | Description |
|---|---|---|---|
| `/` | LandingComponent | ❌ | Hero, features, testimonials |
| `/login` | LoginComponent | ❌ | Split-panel auth form |
| `/register` | RegisterComponent | ❌ | Password strength meter |
| `/problems` | ProblemsComponent | ❌ | Filterable problem list |
| `/problems/:slug` | ProblemDetailComponent | ✅ | 3-panel IDE |
| `/dashboard` | DashboardComponent | ✅ | Stats, heatmap, progress |
| `/submissions` | SubmissionsComponent | ✅ | Submission history |
| `/profile` | ProfileComponent | ✅ | Achievements, skills |

---

## 🛡️ Security Patterns (MEAN Stack Ready)

- ✅ **Route Guards** (`authGuard`) protecting private routes
- ✅ **HTTP Interceptor** for JWT Bearer token injection
- ✅ **Signal-based auth state** (no global mutable variables)
- ✅ **Input sanitization** via Angular's template binding
- ✅ **localStorage** session persistence (ready for HttpOnly cookie upgrade)

---

## 📱 Responsive Design

| Breakpoint | Layout |
|---|---|
| `> 1200px` | Full desktop — 3-column IDE, 2-column dashboard |
| `900–1200px` | Condensed — narrower panels |
| `640–900px` | Tablet — stacked columns, hamburger nav |
| `< 640px` | Mobile — single column, touch-optimized |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

```bash
git checkout -b feature/AmazingFeature
git commit -m 'feat: add AmazingFeature'
git push origin feature/AmazingFeature
# → Open a Pull Request
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

**Built with ❤️ using Angular 17, TypeScript, SCSS & MEAN Stack architecture**

*If this project helped you, please ⭐ star it on GitHub!*

</div>