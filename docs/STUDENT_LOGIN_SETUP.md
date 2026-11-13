# Student login setup (mobile number or email + password)

Students create an account with **mobile number or email + a password**. There is no OTP and no email code.
**Continue with Google (Gmail)** is also there as a one-tap option.

> If the login page says **"Login is being set up"**, it means Step 1 is not done yet for that website
> (the Supabase keys are missing in Vercel). Do Step 1, then redeploy.

You need to be logged in to **Supabase** (supabase.com) and **Vercel** (vercel.com). Google Cloud is only needed for Step 4.
Replace `YOUR-SITE` with your real website address (for example `study-with-arup.vercel.app` or your own domain).

---

## Step 1. Add the keys to Vercel

1. **Supabase** → your project → **Project Settings** (gear icon) → **API Keys** (older screens: **API**).
2. Copy the **Project URL** and the **anon / public** key (newer screens may call it the **publishable** key).
3. **Vercel** → project **study-with-arup** → **Settings** → **Environment Variables**. Add these, and tick **Production, Preview and Development** for each:
   - `NEXT_PUBLIC_SUPABASE_URL` = the Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = the anon / publishable key
   - `SUPABASE_SERVICE_ROLE_KEY` = the **service_role / secret** key (needed for enrollments and for resetting student passwords). Never share this one.
4. **Deployments** → latest one → **⋯** → **Redeploy**.

(If you have two Vercel projects, `study-with-arup` and `study-with-arup-5295`, do this in the one your website uses.)

## Step 2. Switch on password login and switch OFF email confirmation  ← most important

1. Supabase → **Authentication** → **Sign In / Providers** (older: **Providers**).
2. At the top, make sure **Allow new users to sign up** is **ON**.
3. Open **Email**:
   - **Enable Email provider**: **ON**
   - **Confirm email**: **OFF**  (otherwise students get stuck waiting for an email)
   - Press **Save**.
4. Leave **Phone** turned off. It is not needed.

## Step 3. Run one SQL script (links courses to student accounts)

1. Supabase → **SQL Editor** → **New query**.
2. Copy everything from `supabase/student_accounts.sql` in this repo, paste, press **Run**.
   (If you have not yet run `supabase/course_enrollments.sql`, run that first.)

## Step 4 (optional). "Continue with Google"

Skip this if you only want mobile/email + password. The Google button will show an error until it is set up.

**A. Allowed addresses in Supabase** → **Authentication** → **URL Configuration**:
- **Site URL**: `https://YOUR-SITE`
- **Redirect URLs** → add: `https://YOUR-SITE/**` and `https://*-arup777.vercel.app/**` → **Save**.

**B. Copy the callback address**: Supabase → **Authentication** → **Sign In / Providers** → **Google** → copy **Callback URL (for OAuth)** (looks like `https://abcd1234.supabase.co/auth/v1/callback`).

**C. Google Cloud** (console.cloud.google.com):
1. Project picker → **New project** → `Study With RootX` → **Create**, and select it.
2. Search **Google Auth Platform** (or **APIs & Services → OAuth consent screen**) → **Get started**: app name `Study With RootX`, support email your Gmail, Audience **External**, contact email your Gmail → **Create**.
3. **Audience** → **Publish app**.
4. **Clients** → **Create client** → **Web application**:
   - Authorized JavaScript origins: `https://YOUR-SITE`
   - Authorized redirect URIs: the Supabase callback address from B
   - **Create**, then copy **Client ID** and **Client secret**.

**D. Back in Supabase** → Google provider → switch **ON**, paste Client ID and Client Secret → **Save**.

---

## Forgot password

- **Email accounts**: "Forgot password?" on the login page emails a reset link. (Supabase's built-in email sender only allows a few emails per hour. If many students use it, connect a free sender such as Resend or Brevo under **Authentication → SMTP Settings**.) The URL Configuration in Step 4A must include `https://YOUR-SITE/**` for the link to work.
- **Mobile number accounts**: no SMS is sent, so the page asks the student to WhatsApp you. You set a new password in **/admin/enrollments → Reset a student's password** (enter their mobile number and a new password), then tell them.

## Things to know (trade-offs of no-OTP login)

- **Mobile numbers are not verified.** Anyone can sign up with any number. Before giving course access, match the enrollment's UTR with your bank statement as you do now, and before resetting a password, check the WhatsApp message comes from that same number.
- A mobile account is stored in Supabase as `91XXXXXXXXXX@mobile.studywithrootx.in`. This is only a label; nothing is ever emailed to it. Students never see it.
- If you later want verified numbers, SMS OTP can be added (paid SMS provider + Indian DLT registration).

## What students see

- Header button **Login** (becomes **My Course** after login).
- `/login`: **Log in** / **Create account** tabs: mobile number or email + password, or Continue with Google.
- After a mock test or chapter quiz, logged-out students see **"Log in free to see your score"**; after logging in they return to their result.
- `/my-course`: name, mobile/email, PSC IDO status (not enrolled / payment verification pending / verified), log out.
- `/courses/psc-ido`: name and mobile pre-filled; the enrollment is saved to the account.
- Admin login (`/admin`, `/admin/enrollments`) is separate and unchanged.
