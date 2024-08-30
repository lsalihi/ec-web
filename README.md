# EcWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## architecure

src/
│
├── app/
│   ├── core/                   # Core module (singleton services, configurations, guards)
│   │   ├── interceptors/       # HTTP interceptors
│   │   ├── services/           # Core services used across the app (Auth, API, etc.)
│   │   ├── guards/             # Route guards
│   │   ├── models/             # Global data models/interfaces
│   │   └── core.module.ts      # Core module definition
│   │
│   ├── shared/                 # Shared module (reusable components, directives, pipes)
│   │   ├── components/         # Shared components (buttons, modals, etc.)
│   │   ├── directives/         # Shared directives
│   │   ├── pipes/              # Shared pipes (custom pipes)
│   │   ├── utils/              # Utility functions/classes
│   │   └── shared.module.ts    # Shared module definition
│   │
│   ├── features/               # Feature modules
│   │   ├── home/               # Home feature module
│   │   │   ├── components/     # Components related to the Home feature
│   │   │   ├── pages/          # Pages specific to Home feature
│   │   │   ├── services/       # Services specific to Home feature
│   │   │   ├── home.module.ts  # Home module definition
│   │   │   ├── home-routing.module.ts  # Home routing
│   │   │
│   │   ├── auth/               # Auth feature module
│   │   │   ├── components/     # Components related to authentication (login, signup)
│   │   │   ├── pages/          # Pages specific to Auth feature
│   │   │   ├── services/       # Services specific to Auth feature
│   │   │   ├── auth.module.ts  # Auth module definition
│   │   │   ├── auth-routing.module.ts  # Auth routing
│   │   │
│   │   ├── profile/            # Profile feature module
│   │   │   ├── components/     # Components related to user profile
│   │   │   ├── pages/          # Pages specific to Profile feature
│   │   │   ├── services/       # Services specific to Profile feature
│   │   │   ├── profile.module.ts  # Profile module definition
│   │   │   ├── profile-routing.module.ts  # Profile routing
│   │   │
│   │   └── ...                 # Additional feature modules as needed
│   │
│   ├── layouts/                # Layouts (header, footer, main layout, etc.)
│   │   ├── main-layout/        # Main layout components
│   │   │   ├── header/         # Header component
│   │   │   ├── footer/         # Footer component
│   │   │   └── main-layout.component.ts  # Main layout component
│   │   └── layout.module.ts    # Layout module definition
│   │
│   ├── app-routing.module.ts   # Main routing module
│   ├── app.component.ts        # Root component
│   └── app.module.ts           # Root module
│
├── assets/                     # Static assets (images, fonts, etc.)
│   ├── images/
│   ├── fonts/
│   └── styles/                 # Global styles and SCSS files
│
├── environments/               # Environment configuration (dev, prod)
│   ├── environment.ts          # Development environment
│   └── environment.prod.ts     # Production environment
│
└── styles.scss                 # Main global SCSS file

