'use client';

import { useState } from 'react';

// Tipagem dos produtos
interface Product {
  id: string;
  name: string;
  category: 'galvanizado' | 'pvc';
  gauge: string;
  diameter: string;
  idealFor: string;
  image: string;
  colors?: string[]; // Para o caso do PVC
}

const productsData: Product[] = [
  {
    id: '1',
    name: 'Arame Galvanizado a Fogo BWG 12',
    category: 'galvanizado',
    gauge: 'BWG 12',
    diameter: '2,77 mm',
    idealFor: 'Cercas rurais, amarrações pesadas e construção civil.',
    image: '/images/arame-galvanizado.jpg', // Substitua pelo seu caminho real
  },
  {
    id: '2',
    name: 'Arame Galvanizado Ovalado 16x14',
    category: 'galvanizado',
    gauge: '16x14',
    diameter: '3,00 mm x 2,40 mm',
    idealFor: 'Cercamentos de gado e grandes extensões de terra.',
    image: '/images/arame-ovalado.jpg',
  },
  {
    id: '3',
    name: 'Arame Revestido em PVC Verde',
    category: 'pvc',
    gauge: 'BWG 14 (com capa)',
    diameter: '2,40 / 3,00 mm',
    idealFor: 'Regiões litorâneas (maresia), condomínios e paisagismo.',
    image: '/images/arame-pvc-verde.jpg',
    colors: ['bg-green-700', 'bg-zinc-900', 'bg-zinc-200'], // Verde, Preto, Branco
  },
  {
    id: '4',
    name: 'Arame Revestido em PVC para Telas',
    category: 'pvc',
    gauge: 'BWG 16',
    diameter: '1,65 / 2,40 mm',
    idealFor: 'Fabricação de telas artísticas e alambrados residenciais.',
    image: '/images/arame-pvc-geral.jpg',
    colors: ['bg-green-700', 'bg-zinc-900'],
  },
];

export default function AramesPage() {
  const [activeTab, setActiveTab] = useState<'galvanizado' | 'pvc'>('galvanizado');

  // Filtra os produtos com base na aba selecionada
  const filteredProducts = productsData.filter((p) => p.category === activeTab);

  const handleWhatsAppClick = (productName: string) => {
    const message = encodeURIComponent(`Olá! Tenho interesse em fazer um orçamento para o produto: *${productName}*. Poderia me ajudar?`);
    window.open(`https://wa.me/5500000000000?text=${message}`, '_blank');
  };

  return (
    <div className="bg-zinc-50 min-h-screen text-zinc-900">
      {/* 1. Hero Section da Categoria */}
      <section className="bg-zinc-900 text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-orange-500 font-semibold uppercase tracking-wider text-sm">
            Linha de Alta Durabilidade
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-4">
            Arames Galvanizados e Revestidos em PVC
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Proteção máxima contra corrosão e intempéries. Encontre a bitola e o acabamento ideais para o seu projeto.
          </p>
        </div>
      </section>

      {/* 2. Bloco Explicativo: Qual a diferença? */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Qual a melhor opção para o seu projeto?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Card Galvanizado */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center text-xl mb-4 font-bold text-zinc-700">
                Zn
              </div>
              <h3 className="text-xl font-bold mb-2">Arames Galvanizados</h3>
              <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                Passam pelo processo de zincagem a fogo, garantindo alta resistência à oxidação. São os mais robustos para cercas rurais, estruturas e amarrações industriais onde o custo-benefício e a força bruta são prioridade.
              </p>
            </div>
            <button 
              onClick={() => setActiveTab('galvanizado')}
              className="text-orange-600 font-semibold text-sm hover:underline text-left mt-2"
            >
              Ver produtos Galvanizados &rarr;
            </button>
          </div>

          {/* Card PVC */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-xl mb-4 font-bold text-green-700">
                PVC
              </div>
              <h3 className="text-xl font-bold mb-2">Arames Revestidos em PVC</h3>
            <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                Possuem uma camada dupla de proteção (núcleo de aço + capa plástica). São imunes à maresia, não descascam e oferecem um acabamento estético impecável, ideal para praias, condomínios e paisagismo.
              </p>
            </div>
            <button 
              onClick={() => setActiveTab('pvc')}
              className="text-orange-600 font-semibold text-sm hover:underline text-left mt-2"
            >
              Ver produtos em PVC &rarr;
            </button>
          </div>

        </div>
      </section>

      {/* 3. Vitrine de Produtos com Abas */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex justify-center mb-8">
          <div className="bg-zinc-200 p-1 rounded-xl flex gap-1">
            <button
              onClick={() => setActiveTab('galvanizado')}
              className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                activeTab === 'galvanizado'
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Arames Galvanizados
            </button>
            <button
              onClick={() => setActiveTab('pvc')}
              className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                activeTab === 'pvc'
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Revestidos em PVC
            </button>
          </div>
        </div>

        {/* Grid de Produtos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-xl overflow-hidden border border-zinc-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Imagem do Produto (Placeholder) */}
                <div className="h-48 bg-zinc-200 w-full flex items-center justify-center text-zinc-400 font-medium">
                  [ Foto: {product.name} ]
                </div>

                <div className="p-6">
                  <span className="text-xs uppercase font-bold text-orange-600 tracking-wider">
                    {product.category === 'galvanizado' ? 'Galvanizado a Fogo' : 'Revestido PVC'}
                  </span>
                  <h3 className="text-xl font-bold mt-1 mb-3">{product.name}</h3>
                  
                  {/* Especificações */}
                  <div className="space-y-1.5 text-sm text-zinc-600 mb-4">
                    <p><strong>Bitola / Espessura:</strong> {product.gauge}</p>
                    <p><strong>Diâmetro:</strong> {product.diameter}</p>
                    <p><strong>Indicação:</strong> {product.idealFor}</p>
                  </div>

                  {/* Cores disponíveis (se houver) */}
                  {product.colors && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs text-zinc-500 font-medium">Cores:</span>
                      <div className="flex gap-1.5">
                        {product.colors.map((colorClass, idx) => (
                          <div key={idx} className={`w-4 h-4 rounded-full ${colorClass} border border-zinc-300`} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Botão de Orçamento */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleWhatsAppClick(product.name)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  Solicitar Orçamento via WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}