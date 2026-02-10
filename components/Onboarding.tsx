
import React, { useState } from 'react';
import { CompanyInfo } from '../types';
import { Building2, User, Mail, Users, Briefcase, FileText } from 'lucide-react';

interface Props {
  onComplete: (info: CompanyInfo) => void;
}

const Onboarding: React.FC<Props> = ({ onComplete }) => {
  const [formData, setFormData] = useState<CompanyInfo>({
    companyName: '',
    cnpj: '',
    segment: 'Vida',
    employees: 100,
    responsibleName: '',
    email: '',
    position: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Inicie seu Diagnóstico GRC</h2>
        <p className="text-slate-600">Mapeie a maturidade estratégica da sua seguradora em menos de 15 minutos.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl border border-slate-200 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Building2 className="w-4 h-4" /> Razão Social
            </label>
            <input
              required
              className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ex: Seguradora Global S.A."
              value={formData.companyName}
              onChange={e => setFormData({...formData, companyName: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <FileText className="w-4 h-4" /> CNPJ
            </label>
            <input
              required
              className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="00.000.000/0000-00"
              value={formData.cnpj}
              onChange={e => setFormData({...formData, cnpj: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Segmento Principal
            </label>
            <select
              className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.segment}
              onChange={e => setFormData({...formData, segment: e.target.value})}
            >
              <option>Vida</option>
              <option>Saúde</option>
              <option>Patrimonial</option>
              <option>Previdência</option>
              <option>Automóveis</option>
              <option>Outros</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Users className="w-4 h-4" /> Número de Colaboradores: {formData.employees}
            </label>
            <input
              type="range"
              min="100"
              max="500"
              step="10"
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              value={formData.employees}
              onChange={e => setFormData({...formData, employees: parseInt(e.target.value)})}
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>100</span>
              <span>500</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <User className="w-4 h-4" /> Responsável
            </label>
            <input
              required
              className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Nome completo"
              value={formData.responsibleName}
              onChange={e => setFormData({...formData, responsibleName: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Mail className="w-4 h-4" /> E-mail Corporativo
            </label>
            <input
              type="email"
              required
              className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="exemplo@seguradora.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Cargo
            </label>
            <input
              required
              className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ex: Diretor de Compliance"
              value={formData.position}
              onChange={e => setFormData({...formData, position: e.target.value})}
            />
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-12 rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            Iniciar Diagnóstico
          </button>
        </div>
      </form>
    </div>
  );
};

export default Onboarding;
