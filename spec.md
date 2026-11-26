# The Bakery Shop: HR Dashboard (Employee Onboarding) Spec

A mobile-first dashboard that lets the bakery's owner and shift managers track every new hire from signed offer to a confident first month.
Managers mostly use it on a phone, between the oven and the counter, so everything is sized for thumbs.

![The Bakery Shop logo](logo.png)

Prototype with mock data: `hr.html` (open it in a browser). The earlier sales dashboard (`index.html`) keeps its own design and is unchanged.

## 0. Product Context (הקשר המוצר)

> סעיף זה נכתב בעברית. הנחות שסומנו **(לאישור)** הן הערכה שלנו ויש לאשר אותן מול הבעלים לפני פיתוח גרסה אמיתית.

### 0.1 למי זה מיועד? משתמשים והרשאות

| משתמש | מי זה | כמה אנשים (לאישור) | מה הוא צריך לראות ולעשות |
|---|---|---|---|
| **הנהלה / בעלים** | הבעלים ומנהל/ת התפעול | 1–2 | תמונת מצב על כל החדשים בכל הצוותים, מי תקוע ומה באיחור. צפייה בלבד, בדרך כלל. |
| **משאבי אנוש / מנהל/ת משרד** | מי שמגייס/ת ומנהל/ת את התיקים | 1–2 | ניהול מלא: הוספת עובד חדש, עריכת צ'קליסט, שליחת תזכורות, סימון משימות. |
| **מנהלי משמרת / ראש צוות** | מנהל מטבח, מנהל דלפק, מנהל משלוחים | 4–6 | רק העובדים החדשים בצוות שלהם: לסמן משימה כבוצעה, לשלוח תזכורת. |
| **חונך / "באדי"** | עובד ותיק שמלווה עובד חדש | 3–6 | רק העובד שהוא מלווה: משימות החונכות (משמרת צל ועוד). |
| **עובד חדש** (כולל עובדי דלפק ומכירות) | העובד עצמו | 2–8 בכל רגע | רק הצ'קליסט של עצמו, בקריאה וסימון משימות ששייכות לו (למשל העלאת תעודת היגיינה). |

**מטריצת הרשאות (יעד לגרסה אמיתית):**

| פעולה | הנהלה | HR | מנהל צוות | חונך | עובד חדש |
|---|---|---|---|---|---|
| לראות את כל העובדים החדשים | ✔ | ✔ | צוות שלו בלבד | העובד שלו בלבד | עצמו בלבד |
| לראות KPI כלליים | ✔ | ✔ | של הצוות | ✘ | ✘ |
| לסמן משימה כבוצעה | ✘ | ✔ | ✔ (צוות שלו) | ✔ (משימות חונך) | ✔ (משימות שלו) |
| לשלוח תזכורת | ✘ | ✔ | ✔ (צוות שלו) | ✘ | ✘ |
| להוסיף / לערוך עובד חדש | ✘ | ✔ | ✘ | ✘ | ✘ |
| לערוך תבנית צ'קליסט | ✘ | ✔ | ✘ | ✘ | ✘ |
| לצפות בפרטים אישיים (טלפון, ת"ז) | ✔ | ✔ | ✘ | ✘ | עצמו בלבד |

עקרונות: **מינימום הרשאות** (כל אחד רואה רק מה שהוא צריך), והפרטים האישיים של עובדים הם מידע רגיש שמוגן לפי חוק הגנת הפרטיות.
**בפרוטוטייפ הנוכחי אין התחברות והרשאות**: כולם רואים הכול עם נתוני דמו. המטריצה היא הבסיס לגרסה הבאה (ראו סעיף 10).

### 0.2 מה אנחנו בונים ועבור מי

- **מה:** לוח בקרה (דשבורד) מבוסס דפדפן שעוקב אחרי קליטת עובדים חדשים במאפייה, מחוזה חתום ועד חודש ראשון בטוח. בלי התקנה: דף סטטי שמתארח ב-GitHub Pages ונפתח בקישור.
- **הבעיה שפותרים (לאישור):** היום המעקב מתבצע בהודעות, בנייר או בזיכרון, ולכן קל לפספס משימה (תעודת היגיינה, תדריך אלרגנים) ולא ברור מי אחראי.
- **מי נהנה:**
  - ההנהלה מקבלת תמונה בשלוש שניות, בלי לשאול אף אחד.
  - ה-HR וראשי הצוותים חוסכים רדיפה אחרי משימות.
  - העובד החדש יודע מה מצופה ממנו וממי לקבל עזרה.
- **מדדי הצלחה (לאישור):** אפס עובדים שמתחילים בלי תעודת היגיינה; ירידה במשימות באיחור; כל עובד חדש מסיים את הצ'קליסט תוך 30 יום.

### 0.3 אופן השימוש והקהל לפי מכשיר

| | **סלולרי** (עיקרי) | **מחשב נייד / שולחני** |
|---|---|---|
| מי | מנהלי משמרת, חונכים, עובדים חדשים | HR, הנהלה |
| איפה | במטבח, ליד הדלפק, בדרכים | במשרד או בבית |
| איך | ביד אחת, לפעמים ידיים מקמח או כפפות, אור חזק, זמן קצר | ישיבה, מקלדת ועכבר, סקירה ארוכה יותר |
| משך שימוש | 30–60 שניות בכל כניסה | 5–15 דקות |
| מה חשוב | כפתורים גדולים, פעולה אחת בלחיצה, טעינה מהירה | תצוגה רחבה (3–4 עמודות), קיצורי מקלדת, ייצוא |

- **מכשירים נתמכים:** Chrome, Safari ו-Edge בגרסאות האחרונות; Android 10 ומעלה, iOS 15 ומעלה; מסכים מ-360 px ועד 1440 px; טאבלט נתמך כבונוס.
- **אינטרנט:** צריך לעבוד גם בנתונים סלולריים חלשים: משקל עמוד עד 500KB, טעינה ראשונה עד 2 שניות ב-4G.
- **שפה:** עברית (מימין לשמאל) כשפת היעד, אנגלית כשפה שנייה. הפרוטוטייפ הנוכחי באנגלית בלבד (ראו 0.5).

### 0.4 יכולות המערכת, תדירות שימוש ועדכון נתונים

**יכולות לפי עדיפות:**

| # | יכולת | עדיפות | בפרוטוטייפ? |
|---|---|---|---|
| 1 | תצוגת מצב: KPI, צינור קליטה, סטטוס לכל עובד | חובה | ✔ |
| 2 | סינון לפי צוות | חובה | ✔ |
| 3 | סימון משימה כבוצעה | חובה | ✔ |
| 4 | שליחת תזכורת לאחראי / לעובד | חובה | הודעת דמו בלבד |
| 5 | הוספת עובד חדש וצ'קליסט מתבנית | חובה | ✔ (נשמר רק במצב חי; את הצ'קליסט יוצרת אוטומציה ב-Airtable) |
| 6 | התחברות והרשאות לפי תפקיד | חובה בגרסה אמיתית | ✘ (במצב חי: טוקן אישי של Airtable) |
| 7 | התראה על משימה באיחור (דחיפה / וואטסאפ / מייל) | רצוי | ✘ |
| 8 | ייצוא לאקסל / PDF | רצוי | ✘ |
| 9 | העלאת מסמכים (תעודת היגיינה, חוזה) | רצוי | ✘ |
| 10 | היסטוריית שינויים (מי סימן מה ומתי) | רצוי | ✘ |

**תדירות שימוש (לאישור):**

| משתמש | כמה פעמים | מתי |
|---|---|---|
| מנהל משמרת | 2–3 פעמים במשמרת | תחילת משמרת, אחרי הדרכה, סוף משמרת |
| חונך | פעם ביום בשבועות הראשונים | אחרי משמרת צל |
| HR | כמה פעמים ביום | שגרת בוקר ותגובה לתזכורות |
| הנהלה | פעם בשבוע | סקירה שבועית |
| עובד חדש | פעם ביום בשבוע הראשון | לפני ואחרי משמרת |

**עדכון נתונים:**

- **פרוטוטייפ, מצב דמו:** נתוני דמו קבועים בקוד, בלי שרת. שינויים נשמרים רק בזיכרון הדפדפן ונעלמים ברענון.
- **פרוטוטייפ, מצב חי:** הדף קורא ושומר ישירות ב-Airtable, עם טוקן שהמשתמש מזין ונשמר רק בלשונית הדפדפן. הרענון ידני, בכפתור.
- **גרסה אמיתית:**
  - הנתונים נטענים בכל פתיחה, ומתרעננים אוטומטית כל 5 דקות כשהדף פתוח, וגם במשיכה לרענון.
  - פעולה של משתמש (סימון משימה) נשמרת מיד, והמסך מתעדכן באותו רגע.
  - הסטטוסים ("באיחור", "מתחיל בקרוב") מחושבים מחדש בכל טעינה ובחצות.
  - על המסך מוצג **"עודכן לאחרונה ב-HH:MM"**, כדי שאף אחד לא יסתמך על נתון ישן.
  - מקור הנתונים: Airtable (לאישור לגרסה האמיתית).
- **שמירת מידע:** פרטי עובד נמחקים או נעלמים מהתצוגה 90 יום אחרי סיום הקליטה (לאישור מול HR והיועץ המשפטי).
- **זמינות:** בשעות הפעילות (05:00 עד 22:00) בלי השבתות מתוכננות.

### 0.5 נגישות נדרשת

- **תקן יעד:** WCAG 2.1 ברמה AA, והתאמה לתקן הישראלי **ת"י 5568**. בישראל תקנות הנגישות חלות על שירותי אינטרנט שמיועדים לציבור; מערכת פנימית אינה בהכרח חייבת, אך אנחנו מתכוונים לעמוד בתקן בכל מקרה, כי יש בצוות עובדים עם מוגבלויות ושימוש בתנאי שטח קשים.
- **עברית ו-RTL:** `lang="he" dir="rtl"` בגרסה העברית; כל הפריסה, האייקונים והחצים מתהפכים; מספרים ואנגלית משובצים נכון.
- **ניגודיות:** טקסט לפחות 4.5:1 (רכיבים גרפיים 3:1); אין הסתמכות על צבע בלבד, ולכל סטטוס יש טקסט ואייקון (למשל "✔ בוצע", "⚠ באיחור").
- **גודל וזום:** אפשר להגדיל טקסט עד 200% ולהתקרב עד 400% בלי אובדן תוכן ובלי גלילה אופקית. גודל בסיס 16 px.
- **מגע:** יעדי לחיצה לפחות 56 px (מעל המינימום של 44 px), ריווח 12 px.
- **מקלדת:** כל פעולה אפשרית בלי עכבר; סדר מיקוד הגיוני; טבעת מיקוד גלויה; בלי מלכודות מיקוד בחלון הוספת עובד.
- **קורא מסך:** תמיכה ב-TalkBack, VoiceOver ו-NVDA; תוויות על כפתורי אייקון; גרפים עם תיאור טקסטואלי וטבלת נתונים חלופית; הודעות סטטוס (טוסט) מוכרזות באמצעות `aria-live`.
- **טפסים:** תווית גלויה לכל שדה, הודעות שגיאה ברורות בטקסט, ללא הגבלת זמן לא הכרחית.
- **תנועה:** כיבוד `prefers-reduced-motion`; אין הבהובים.
- **הצהרת נגישות:** עמוד הצהרה עם שם איש קשר לפניות נגישות, לפני עלייה לשימוש אמיתי.
- **בדיקות:** בדיקה אוטומטית (axe / Lighthouse) בכל גרסה, ובדיקה ידנית עם קורא מסך ומקלדת לפני אישור.
- **פער מול הפרוטוטייפ:** הפרוטוטייפ הנוכחי באנגלית ובכיוון LTR, ועדיין לא נבדק מול קורא מסך. זה יטופל בגרסה הבאה.

## 1. Goals

- See who is starting, who is stuck and what is overdue in under 3 seconds.
- Complete the most common action (mark a task done, nudge a new hire) with one tap.
- Be fully usable one-handed on a 360 px wide phone.
- Look unmistakably like The Bakery Shop: same logo, colors and rounded, warm style as the sales dashboard.

## 2. Branding (same design line as the logo)

### 2.1 Logo

- Use `logo.png` (the croissant roundel) exactly as supplied. Do not recolor, stretch or crop.
- Header: 56 px high, left, on Cream. Empty states: centered at 160 px. Favicon and home-screen icon: the logo.
- Alt text: "The Bakery Shop".

### 2.2 Colors (sampled from the logo)

| Role | Name | Hex | Used for |
|---|---|---|---|
| Brand primary | Crust Brown | `#7A4A1E` | Headings, primary buttons, key figures |
| Brand dark | Espresso | `#3E2410` | Body text |
| Brand accent | Golden Crust | `#C98A2B` | Borders, active chip, progress bars |
| Brand warm | Croissant Orange | `#E08A3C` | Floating action button, highlights |
| Background | Cream | `#FFF6E5` | Page |
| Surface | Flour White | `#FFFFFF` | Cards |
| Complementary | Deep Teal | `#1F6F78` | Secondary buttons, "done / on track" |
| Complementary | Mint Tint | `#D8EEF0` | Secondary button fill |
| Alert | Berry Red | `#B3412F` | Overdue, blocked |

Rules: AA contrast (4.5:1) for text; never color alone (status always has an icon and a word, such as "✔ Done", "⚠ Overdue").

### 2.3 Typography

Nunito everywhere, base 16 px, key figures 30 to 40 px bold, tabular figures for numbers.

## 3. Mobile responsive

- Design at 360 × 800 first. Breakpoints: 600 px (2 columns) and 1024 px (3 to 4 columns).
- Single column on phones, no horizontal scrolling at any width, charts and bars resize to the container.
- Bottom tab bar (64 px): Overview · New Hires · Tasks · Team · Candidates.
- Safe-area insets respected; works in portrait and landscape.

## 4. Large buttons

- Minimum tap target 56 × 56 px; primary actions 64 px tall and full width on phones.
- 12 px minimum gap between buttons, 18 px bold labels, 24 px icons, 16 px corner radius.
- Visible pressed state and a 3 px Deep Teal focus ring.
- Types: **Primary** (Crust Brown, e.g. "Add New Hire"), **Secondary** (Mint with teal text, e.g. "Send Reminder", "Mark Done"), **Filter chips** (56 px pills, active = Golden Crust).
- A 72 px floating **+** button (Croissant Orange) opens "Add New Hire".

## 5. Screens and layout

1. **Header:** logo, "HR Onboarding", today's date.
2. **Filter chips:** `All` · `Kitchen` · `Counter` · `Delivery` · `Admin`.
3. **KPI cards (2 × 2):** New Hires This Month · Onboarding In Progress · Overdue Tasks · Avg Days to Complete.
4. **Onboarding pipeline:** one card per new hire: avatar initials, name, role, start date, progress bar (% of tasks done), status badge (On track / Needs attention / Starting soon), and two large buttons: **Open Checklist** and **Send Reminder**.
5. **Today's checklist:** the next tasks due, each a 56 px tappable row with a checkbox (tap to mark done).
6. **Starting soon:** hires starting within 14 days.
7. **Onboarding by stage:** horizontal bars, count of hires per stage (Offer Signed, Paperwork, Training, First Shifts, Complete).
8. **Candidates:** one card per applicant (name, position, team, date applied, optional Call and Email buttons, stage selector), a count per stage and a large "Add Candidate" button. The team filter applies.
9. **Bottom tab bar** (including Candidates) and the floating "+" button.

## 6. Onboarding checklist (standard template)

| # | Task | Owner | Due (relative to start) |
|---|---|---|---|
| 1 | Sign contract and tax forms | HR | −3 days |
| 2 | Food hygiene certificate uploaded | New hire | −1 day |
| 3 | Uniform and apron issued | Manager | Day 1 |
| 4 | Kitchen and allergen safety walkthrough | Head baker | Day 1 |
| 5 | Shadow a shift with a buddy | Buddy | Day 2 to 3 |
| 6 | Learn the till and card reader (counter roles) | Manager | Day 3 |
| 7 | First solo shift | Manager | Day 7 |
| 8 | 30-day check-in | HR | Day 30 |

## 7. Data (mock)

Employee record:

| Field | Type | Example |
|---|---|---|
| `id` | string | `E-201` |
| `name` | string | `Maya Cohen` |
| `role` | string | `Baker's Assistant` |
| `team` | enum | `Kitchen` / `Counter` / `Delivery` / `Admin` |
| `startDate` | date | `2026-11-24` |
| `buddy` | string | `Dan Levi` |
| `tasks` | array of `{id, done, due}` | see section 6 |

Sample hires in the prototype: Maya Cohen (Baker's Assistant), Noam Katz (Barista), Lior Ben-David (Pastry Chef), Tamar Shalev (Cashier), Yossi Peretz (Delivery Driver), Rina Alon (Shift Manager), Omer Dahan (Dishwasher), Shira Golan (Barista).
Status is derived: overdue tasks → Needs attention; start date in the future → Starting soon; otherwise On track.

## 8. Behavior

- Tapping a checkbox updates the progress bar, KPIs and status. In live mode it updates after Airtable confirms the save.
- "Send Reminder" shows a confirmation toast (no real message is sent in the prototype).
- Demo mode (default): mock data, clearly labelled; "Add New Hire" adds on screen only and nothing is saved.
- Live mode: "Connect to Airtable" takes a base ID and a personal access token. The token is kept for that browser tab only and sent only to Airtable. "Add New Hire" saves the hire, an Airtable automation creates the checklist tasks, and the dashboard reloads until they appear.
- Live mode is meant for the owner of the token on their own device; it is not a login system for the team.
- Candidate stages: New → Phone Screen → Interview → Trial Shift → Offer → Hired, or Rejected. In live mode, candidates are read from and saved to the Airtable `Candidates` table (`Name`, `Position`, `Team`, `Stage`, `Applied Date`, `Phone`, `Email`, `Notes`). Candidate details are personal data, with the same care as employee data. "Hired" does not create a new hire automatically.
- Filter chips update all cards together.
- Empty state: logo plus "No new hires in this team yet."

## 9. Accessibility

Text status next to every color, labels on icon buttons, focus order follows visual order, keyboard operable, `prefers-reduced-motion` respected. The full requirement (WCAG 2.1 AA, Israeli standard IS 5568, Hebrew RTL) is in section 0.5.

## 10. Out of scope (v1)

Real authentication and roles, payroll, document upload, real email/SMS sending, public job application page.

## 11. Acceptance criteria

- [ ] Logo in the header and empty state, unmodified.
- [ ] Only the palette in 2.2 is used.
- [ ] Every button, chip, checkbox row and tab is at least 56 px tall.
- [ ] No horizontal scroll at 360 px.
- [ ] KPI cards are visible without scrolling on a 360 × 800 screen.
