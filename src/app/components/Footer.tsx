import { Phone, Mail, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contato" className="bg-[#8B1E1E] text-white">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <img
                src="https://potenze.com.br/wp-content/uploads/2025/06/celular.png"
                alt="Potenze - 10 Anos"
            
              />
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Potenze Indústria e Comércio de Iluminação HBEL
            </p>
            <p className="text-white/60 text-xs mt-4">
              CNPJ: 24.188.251/0001-06
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-lg">Institucional</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-lg">Luminárias</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Industrial
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Comercial
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Área Classificadas
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-lg">Contato</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-white/60 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white/80">(41) 3373-9799</div>
                  <div className="text-white/80">(41) 3373-9799</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-white/60 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:vendas@potenze.com.br"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  vendas@potenze.com.br
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white/60 flex-shrink-0 mt-0.5" />
                <div className="text-white/80">
                  Rua Deputado Lauro Sodré, 131
                  <br />
                  Sítio Cercado - Curitiba/PR
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>

          <p className="text-white/60 text-sm text-center md:text-right">
            © 2026 SPMA. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
