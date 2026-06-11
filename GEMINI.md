# FinanceOS Project Brief

## 1. Концепция
* **Суть:** Личный финансовый дашборд для контроля расходов с чистым интерфейсом.
* **Позиционирование:** "Your money. Finally making sense."
* **Аудитория:** Фрилансеры и молодые специалисты 22–35 лет.
* **Ключевые фичи:** * Smart Categorization (авто-сортировка расходов).
    * Monthly Insights (отчет заработал/потратил/сохранил).
    * Savings Goals (цели накоплений).
    * Spending Visualizations (графики вместо таблиц).

## 2. Дизайн-система
* **Цвета:**
    * Фон: `#342E37` | Карточки: `#3E3842` | Бордер: `#4A4450`
    * Акцент: `#9FD356` | Текст осн: `#F5F5F5` | Текст втор: `#9E99A3`
    * Доход: `#4ADE80` | Расход: `#F87171`
* **Типографика:**
    * **Syne (Bold 700):** Заголовки (64px hero, 40px h2, 20px h3).
    * **Inter (Regular 400 - Semibold 600):** Основной текст и UI (32px KPI, 15px body, 11px table).
* **Иконки:** Lucide React, stroke 1.5px.

## 3. Стек технологий
* **Framework:** Next.js 14 (App Router).
* **Styling:** Tailwind CSS.
* **Charts:** Recharts (Line, Pie, Bar).
* **Deployment:** Vercel.

## 4. Структура проекта
```text
/src
  /app
    /dashboard (Overview, /transactions, /budget, /goals)
    page.tsx (Landing)
  /components
    /ui
    /dashboard
    /landing
  /data (mockData.ts)


  5. План разработки (Figma Workflow)
Компоненты (базовые элементы UI).

Dashboard (Overview → Transactions → Budget → Goals).

Landing (полная страница).

Mobile (адаптив).