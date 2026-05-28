import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const whatsappNumber = '5541999999999';
  const message = 'Olá! Gostaria de saber mais sobre as luminárias Potenze.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/50 transition-shadow group"
    >
      <MessageCircle className="w-7 h-7 text-white" />

      <motion.span
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute right-full mr-3 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg hidden group-hover:block"
      >
        Fale conosco
      </motion.span>

      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
    </motion.a>
  );
}
