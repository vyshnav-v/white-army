# Vayanashaala - Village Arts & Sports Club Platform

A comprehensive community platform connecting villagers through arts, sports, education, and essential services.

## 🌟 Features

### MVP Features (Current)
- **Blood Donor Directory** - Find blood donors quickly during emergencies
- **News & Announcements** - Stay updated with village events and news
- **User Authentication** - Secure sign-up and login system
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop

### Coming Soon
- **Digital Library** - Access books and educational materials
- **Job Board** - Local job opportunities and career resources
- **Workers Directory** - Connect with local service providers
- **Video Gallery** - Educational and cultural content
- **Admin Dashboard** - Manage content and users
- **Member Profiles** - Personal dashboards and activity tracking

## 🚀 Tech Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **UI Components**: Custom components with shadcn/ui patterns
- **State Management**: Zustand (when needed)
- **Forms**: React Hook Form + Zod validation
- **Notifications**: Sonner

## 📋 Prerequisites

- Node.js 18+ and Yarn
- Supabase account (free tier works)
- Git

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd white-army
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready
3. Go to Settings > API to find your credentials
4. Go to SQL Editor and run the `supabase-setup.sql` script to create tables

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# App Configuration
NEXT_PUBLIC_APP_NAME="Vayanashaala"
NEXT_PUBLIC_APP_DESCRIPTION="Village Arts & Sports Club"
```

### 5. Run Database Setup

1. Open your Supabase project
2. Go to SQL Editor
3. Copy and paste the entire content of `supabase-setup.sql`
4. Click "Run" to create all tables and policies

### 6. Create First Admin User

1. Go to Authentication > Users in Supabase
2. Create a new user with your email
3. Go to SQL Editor and run:

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

### 7. Start Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
white-army/
├── app/                      # Next.js App Router pages
│   ├── auth/                # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── blood-donors/        # Blood donor directory
│   │   └── register/
│   ├── news/                # News & announcements
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── layout/             # Layout components
│   │   ├── header.tsx
│   │   └── footer.tsx
│   └── ui/                 # UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── badge.tsx
├── lib/                    # Utility libraries
│   ├── supabase/          # Supabase client setup
│   │   ├── client.ts      # Browser client
│   │   ├── server.ts      # Server client
│   │   └── middleware.ts  # Auth middleware
│   └── utils.ts           # Utility functions
├── types/                 # TypeScript types
│   └── database.ts        # Database types
├── middleware.ts          # Next.js middleware
├── supabase-setup.sql    # Database setup script
└── .env.local            # Environment variables (create this)
```

## 🔒 Security Features

- Row Level Security (RLS) enabled on all tables
- Role-based access control (Admin, Member, Public)
- Secure authentication with Supabase Auth
- Protected routes with middleware
- Privacy controls for blood donors

## 📱 Responsive Design

The platform is fully responsive and works on:
- 📱 Mobile phones (iOS and Android)
- 📱 Tablets
- 💻 Desktop computers
- 🖥️ Large screens

## 🎨 Customization

### Change App Name and Branding

1. Update `.env.local`:
   ```env
   NEXT_PUBLIC_APP_NAME="Your Village Name"
   ```

2. Update `app/layout.tsx` metadata

3. Update logo in `components/layout/header.tsx`

### Change Colors

Edit `app/globals.css` and component styles to match your preferred color scheme.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

### Environment Variables for Production

Make sure to add all variables from `.env.local` to your hosting platform's environment variables section.

## 📊 Database Schema

### Tables

- **profiles** - User profiles with role management
- **blood_donors** - Blood donor directory
- **news** - News and announcements
- **library_books** - Library catalog (coming soon)
- **jobs** - Job listings (coming soon)
- **workers** - Service providers directory (coming soon)
- **videos** - Video gallery (coming soon)

## 🤝 Contributing

This is a community project! Contributions are welcome.

## 📝 License

This project is open source and available for community use.

## 🆘 Support

For issues or questions:
1. Check the documentation above
2. Review Supabase documentation
3. Check Next.js documentation

## 🎯 Roadmap

### Phase 1 (MVP) ✅
- [x] Landing page
- [x] Blood donor directory
- [x] News section
- [x] Authentication
- [x] Responsive design

### Phase 2 (In Progress)
- [ ] Digital library
- [ ] Job board
- [ ] Workers directory
- [ ] Video gallery
- [ ] User dashboard

### Phase 3 (Planned)
- [ ] Admin panel
- [ ] Search functionality
- [ ] Notifications system
- [ ] Multi-language support
- [ ] PWA features
- [ ] WhatsApp integration

### Phase 4 (Future)
- [ ] Mobile app (React Native)
- [ ] Payment integration
- [ ] Events management
- [ ] Community forum
- [ ] Advanced analytics

## 🙏 Acknowledgments

Built with ❤️ for the village community

---

**Note**: This platform is designed to serve the community. Please use it responsibly and help make it better!
