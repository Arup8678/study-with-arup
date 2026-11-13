# Student login setup (no password)

Students can log in or sign up in 3 ways. Nobody needs a password.

| Way | Works after | Cost |
|---|---|---|
| **Continue with Google (Gmail)** | Steps 1, 2, 3, 4 | Free |
| **Email code** (6-digit code sent by email) | Steps 1, 2, 3, 5 | Free (custom email sender recommended) |
| **Mobile OTP** (6-digit SMS) | Step 6 | Paid SMS provider + Indian DLT rules |

Until mobile OTP is set up, the Mobile tab says "coming soon" and Google + email keep working.

You need to be logged in to: **Supabase** (supabase.com), **Vercel** (vercel.com) and **Google Cloud** (console.cloud.google.com).
In the steps below, replace `YOUR-SITE` with your real website address (for example `study-with-arup.vercel.app` or your own domain).

---

## Step 1. Add the keys to Vercel

1. Open **Supabase** → your project → **Project Settings** (gear icon) → **API Keys** (on older screens: **API**).
2. Copy the **Project URL** and the **anon / public** key (on newer screens it may be called the **publishable** key).
3. Open **Vercel** → project **study-with-arup** → **Settings** → **Environment Variables**. Add (tick Production, Preview and Development):
   - `NEXT_PUBLIC_SUPABASE_URL` = the Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = the anon / publishable key
   - `SUPABASE_SERVICE_ROLE_KEY` = the **service_role / secret** key (you may already have this from the course enrollment setup). Never share this one.
4. Go to **Deployments** → the latest one → **⋯** → **Redeploy**, so the new keys are used.

## Step 2. Run one SQL script (links courses to student accounts)

1. Supabase → **SQL Editor** → **New query**.
2. Open the file `supabase/student_accounts.sql` from this repo, copy everything, paste it, press **Run**.
   (If you have not yet run `supabase/course_enrollments.sql`, run that first.)

## Step 3. Tell Supabase which website addresses are allowed

Supabase → **Authentication** → **URL Configuration**:

- **Site URL**: `https://YOUR-SITE`
- **Redirect URLs** → **Add URL**, add each of these:
  - `https://YOUR-SITE/auth/callback`
  - `https://*-arup777.vercel.app/**` (so Vercel preview links can log in too)
  - `http://localhost:3000/**` (only needed for testing on a computer)

Press **Save**.

## Step 4. Turn on "Continue with Google"

**A. In Supabase, copy the callback address**
1. Supabase → **Authentication** → **Sign In / Providers** (older: **Providers**) → **Google**.
2. Copy the **Callback URL (for OAuth)**. It looks like `https://abcd1234.supabase.co/auth/v1/callback`. Keep this tab open.

**B. In Google Cloud, create the login keys**
1. Go to console.cloud.google.com. At the top, click the project picker → **New project** → name it `Study With RootX` → **Create**, and select it.
2. Search for **Google Auth Platform** (or **APIs & Services → OAuth consent screen**) → **Get started**.
   - App name: `Study With RootX`, support email: your Gmail.
   - Audience: **External**. Contact email: your Gmail. Agree and **Create**.
3. Open **Audience** → press **Publish app** → confirm. (Otherwise only test users you list can log in.)
4. Open **Clients** (older: **Credentials → Create credentials → OAuth client ID**) → **Create client**:
   - Application type: **Web application**, name: `Website`.
   - **Authorized JavaScript origins** → add `https://YOUR-SITE`.
   - **Authorized redirect URIs** → add the Supabase callback address from part A.
   - Press **Create**. Copy the **Client ID** and **Client secret**.

**C. Back in Supabase**
1. In the Google provider page, switch **Enable Sign in with Google** on.
2. Paste the **Client ID** and **Client Secret**. Press **Save**.

Test: open `https://YOUR-SITE/login` → **Continue with Google**.

## Step 5. Make the email login send a code

Supabase sends a link by default. The site asks for a 6-digit code, so the email must show the code.

1. Supabase → **Authentication** → **Email Templates** (may be under **Emails**).
2. Open **Magic Link**. Replace the message body with:

   ```html
   <h2>Your Study With RootX login code</h2>
   <p>Enter this code on the website:</p>
   <p style="font-size:28px;font-weight:bold;letter-spacing:6px">{{ .Token }}</p>
   <p>The code expires in 1 hour. If you did not ask for it, ignore this email.</p>
   ```
   Subject: `Your Study With RootX login code`. **Save**.
3. Do the same for **Confirm signup** (new students get this one the first time).
4. **Important:** Supabase's built-in email sender only allows a few emails per hour, which is fine for testing but not for real students. For real use, connect a free email service:
   Supabase → **Authentication** → **SMTP Settings** (or **Emails → SMTP**) → enable **Custom SMTP** and fill in the details from a provider such as **Resend** or **Brevo** (both have free plans). Google login has no such limit, so it is the best choice for most students.

## Step 6 (optional, paid). Mobile number OTP

Supabase cannot send SMS by itself; you need an SMS company. This costs money for every SMS.

**Indian SMS rule (DLT):** Every business SMS sent to an Indian number must use a sender ID and message template registered on a DLT portal (Jio, Airtel, Vi, etc.). Registration takes a few days and needs business/ID documents. Some providers' OTP products handle this for you; check with the provider before paying.

1. Create an account with an SMS provider that Supabase supports, for example **Twilio** (use **Twilio Verify** for OTP). Check its current price for India and whether it handles DLT for you.
2. Supabase → **Authentication** → **Sign In / Providers** → **Phone** → enable it.
3. Choose your SMS provider and paste its keys (for Twilio Verify: Account SID, Auth Token, Verify Service SID). **Save**.
4. Vercel → **Settings** → **Environment Variables** → add `NEXT_PUBLIC_PHONE_LOGIN` = `on` → **Redeploy**.

The Mobile tab on the login page then sends a real SMS code.

---

## What students see

- Header button **Login** (or **My Course** once logged in).
- `/login`: Continue with Google, or get a code by Email / Mobile. New students are asked for their name once.
- `/my-course`: their name, email/mobile, and PSC IDO course status: **not enrolled**, **payment verification pending**, or **verified**. Log out button.
- `/courses/psc-ido`: name and mobile are pre-filled when logged in, and the enrollment is saved to the account. If a student paid before making an account, opening the enroll page on the same phone and logging in links it automatically.
- Admin login (`/admin`, `/admin/enrollments`) is separate and unchanged. The enrollments table now shows the student's login email under their name.
