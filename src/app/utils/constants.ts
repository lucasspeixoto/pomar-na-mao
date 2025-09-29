export const COLOR_CLASS_MAP: Record<string, string> = {
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  amber: 'bg-amber-500',
  yellow: 'bg-yellow-500',
  lime: 'bg-lime-500',
  green: 'bg-green-500',
  emerald: 'bg-emerald-500',
  teal: 'bg-teal-500',
  cyan: 'bg-cyan-500',
  sky: 'bg-sky-500',
  blue: 'bg-blue-500',
  indigo: 'bg-indigo-500',
  violet: 'bg-violet-500',
  purple: 'bg-purple-500',
  fuchsia: 'bg-fuchsia-500',
  pink: 'bg-pink-500',
  rose: 'bg-rose-500',
  gray: 'bg-gray-500',
  slate: 'bg-slate-500',
  zinc: 'bg-zinc-500',
  neutral: 'bg-neutral-500',
  stone: 'bg-stone-500',
};

export const MONTH_LABELS: Record<string, string> = {
  '01': 'Janeiro',
  '02': 'Fevereiro',
  '03': 'Março',
  '04': 'Abril',
  '05': 'Maio',
  '06': 'Junho',
  '07': 'Julho',
  '08': 'Agosto',
  '09': 'Setembro',
  '10': 'Outubro',
  '11': 'Novembro',
  '12': 'Dezembro',
};

export const LESSON_ENROLLMENT_STATUS_BG: Record<string, string> = {
  pending: 'bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-800 dark:hover:bg-yellow-700',
  approved: 'bg-orange-200 hover:bg-orange-300 dark:bg-orange-800 dark:hover:bg-orange-700',
  rejected: 'bg-red-200 hover:bg-red-300 dark:bg-red-800 dark:hover:bg-red-700',
  canceled: 'bg-blue-200 hover:bg-blue-300 dark:bg-blue-800 dark:hover:bg-blue-700',
  completed: 'bg-green-200 hover:bg-green-300 dark:bg-green-800 dark:hover:bg-green-700',
};

export const LESSON_ENROLLMENT_STATUS_TEXT: Record<string, string> = {
  pending: 'text-yellow-900 dark:text-yellow-50',
  approved: 'text-orange-900 dark:text-orange-50',
  rejected: 'text-red-900 dark:text-red-50',
  canceled: 'text-blue-900 dark:text-blue-50',
  completed: 'text-green-900 dark:text-green-50',
};
