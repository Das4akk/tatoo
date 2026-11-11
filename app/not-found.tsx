import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col items-center justify-center px-6 text-center">
      <div className="font-mono text-xs uppercase tracking-widest text-[#7F9A8A] mb-4">
        Ошибка 404
      </div>
      <h1 className="text-3xl sm:text-4xl font-light text-[#1C201D] mb-4">
        Страница не найдена
      </h1>
      <p className="text-sm text-[#5A635B] max-w-md font-light mb-8">
        Возможно, этот эскиз был перемещен в архив или адрес страницы введен неверно.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C201D] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#56675C] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Вернуться в студию</span>
      </Link>
    </div>
  );
}
