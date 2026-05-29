import { motion } from 'framer-motion'; // Ajustado para o pacote padrão de mercado

export function WhatsAppButton() {
  const whatsappNumber = '554133739799';
  const message = 'Olá! Gostaria de saber mais sobre nossas luminárias.';
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
      {/* Ícone do WhatsApp (SVG limpo e sem blur) */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="w-8 h-8 antialiased object-contain z-10"
      />

      {/* Balão "Fale conosco" com animação fluida no Hover */}
      <motion.span
        initial={{ opacity: 0, x: 10, scale: 0.95 }}
        whileHover={{ opacity: 1, x: 0, scale: 1 }}
        className="absolute right-full mr-3 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg pointer-events-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
      >
        Fale conosco
      </motion.span>

      {/* Efeito de Pulso (Animate Ping) no fundo */}
      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20 pointer-events-none"></div>
    </motion.a>
  );
}