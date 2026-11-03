import React, { useState } from 'react';
import { 
  Building2, 
  Receipt, 
  PlusCircle, 
  Pencil, 
  Trash2, 
  CheckCircle, 
  Phone, 
  FileText, 
  Award,
  DollarSign,
  Calendar,
  Search
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('empresas');

  // Dados Iniciais / Estado do CRM
  const [empresas, setEmpresas] = useState([
    {
      id: 1,
      nome: 'Tech Solutions Ltda',
      cnpj: '12.345.678/0001-90',
      whatsapp: '5511999998888',
      statusConvite: 'Confirmado',
      trofeuNome: 'Tech Solutions - Inovação 2026',
      trofeuCategoria: 'Empresa Destaque em Tecnologia',
      endereco: 'Rua das Flores, 123 - Santo André/SP'
    },
    {
      id: 2,
      nome: 'Comércio Silva',
      cnpj: '98.765.432/0001-10',
      whatsapp: '5511977776666',
      statusConvite: 'Convidado',
      trofeuNome: 'Comércio Silva',
      trofeuCategoria: 'Melhor Atendimento Local',
      endereco: 'Av. Portugal, 456 - Santo André/SP'
    }
  ]);

  // Estado do Financeiro
  const [parcelas, setParcelas] = useState([
    {
      id: 101,
      empresaId: 1,
      empresaNome: 'Tech Solutions Ltda',
      valor: 500.00,
      vencimento: '2026-11-15',
      status: 'Pendente',
      comissaoPorcentagem: 10,
      comissaoValor: 50.00,
      comissaoPaga: false
    },
    {
      id: 102,
      empresaId: 2,
      empresaNome: 'Comércio Silva',
      valor: 750.00,
      vencimento: '2026-11-05',
      status: 'Pago',
      comissaoPorcentagem: 10,
      comissaoValor: 75.00,
      comissaoPaga: true
    }
  ]);

  // Modais de Edição e Criação
  const [editingEmpresa, setEditingEmpresa] = useState(null);
  const [editingParcela, setEditingParcela] = useState(null);

  // --- AÇÕES DE EMPRESAS ---
  const handleSaveEmpresa = (e) => {
    e.preventDefault();
    if (editingEmpresa.id) {
      setEmpresas(empresas.map(emp => emp.id === editingEmpresa.id ? editingEmpresa : emp));
    } else {
      setEmpresas([...empresas, { ...editingEmpresa, id: Date.now() }]);
    }
    setEditingEmpresa(null);
  };

  const handleDeleteEmpresa = (id) => {
    if (confirm('Tem certeza que deseja excluir esta empresa parceira?')) {
      setEmpresas(empresas.filter(emp => emp.id !== id));
      setParcelas(parcelas.filter(p => p.empresaId !== id));
    }
  };

  // --- AÇÕES DO FINANCEIRO ---
  const handleSaveParcela = (e) => {
    e.preventDefault();
    if (editingParcela.id) {
      setParcelas(parcelas.map(p => p.id === editingParcela.id ? editingParcela : p));
    } else {
      setParcelas([...parcelas, { ...editingParcela, id: Date.now() }]);
    }
    setEditingParcela(null);
  };

  const handleDeleteParcela = (id) => {
    if (confirm('Tem certeza que deseja excluir esta parcela/boleto?')) {
      setParcelas(parcelas.filter(p => p.id !== id));
    }
  };

  const togglePago = (parcela) => {
    const novoStatus = parcela.status === 'Pago' ? 'Pendente' : 'Pago';
    setParcelas(parcelas.map(p => p.id === parcela.id ? { ...p, status: novoStatus } : p));
  };

  const toggleBaixaComissao = (parcela) => {
    setParcelas(parcelas.map(p => p.id === parcela.id ? { ...p, comissaoPaga: !p.comissaoPaga } : p));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Cabeçalho */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Award className="w-6 h-6" /> Gestão de Eventos & Parceiros
          </h1>
          <span className="text-xs bg-blue-700 px-3 py-1 rounded-full">Painel Admin</span>
        </div>
      </header>

      {/* Navegação de Abas */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex divide-x divide-gray-100">
          <button 
            onClick={() => setActiveTab('empresas')} 
            className={`flex-1 py-3 text-center font-medium flex items-center justify-center gap-2 ${activeTab === 'empresas' ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50/50' : 'text-gray-500'}`}
          >
            <Building2 className="w-4 h-4" /> CRM Parceiros ({empresas.length})
          </button>
          <button 
            onClick={() => setActiveTab('financeiro')} 
            className={`flex-1 py-3 text-center font-medium flex items-center justify-center gap-2 ${activeTab === 'financeiro' ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50/50' : 'text-gray-500'}`}
          >
            <Receipt className="w-4 h-4" /> Relatório Financeiro ({parcelas.length})
          </button>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="max-w-6xl mx-auto p-4 md:p-6">

        {/* ================= SEÇÃO: EMPRESAS PARCEIRAS ================= */}
        {activeTab === 'empresas' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-700">Empresas Cadastradas</h2>
              <button 
                onClick={() => setEditingEmpresa({ nome: '', cnpj: '', whatsapp: '', statusConvite: 'A Convidar', trofeuNome: '', trofeuCategoria: '', endereco: '' })} 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1 hover:bg-blue-700 transition"
              >
                <PlusCircle className="w-4 h-4" /> Nova Empresa
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {empresas.map(emp => (
                <div key={emp.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-900">{emp.nome}</h3>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        emp.statusConvite === 'Confirmado' ? 'bg-green-100 text-green-700' : 
                        emp.statusConvite === 'Convidado' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {emp.statusConvite}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mb-3">CNPJ: {emp.cnpj || 'Não informado'}</p>

                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4 text-xs space-y-1">
                      <p className="font-semibold text-gray-700 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-blue-500" /> Gravação Troféu / Diploma:
                      </p>
                      <p><span className="text-gray-500">Nome:</span> {emp.trofeuNome || '-'}</p>
                      <p><span className="text-gray-500">Categoria:</span> {emp.trofeuCategoria || '-'}</p>
                    </div>
                  </div>

                  {/* BARRA DE AÇÕES (EDITAR / EXCLUIR / WHATSAPP) */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
                    <a 
                      href={`https://wa.me/${emp.whatsapp.replace(/\D/g,'')}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-xs bg-green-600 text-white px-3 py-1.5 rounded flex items-center gap-1 hover:bg-green-700"
                    >
                      <Phone className="w-3.5 h-3.5" /> WhatsApp
                    </a>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setEditingEmpresa(emp)} 
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded border border-blue-200 flex items-center gap-1 text-xs"
                      >
                        <Pencil className="w-4 h-4" /> Editar
                      </button>
                      <button 
                        onClick={() => handleDeleteEmpresa(emp.id)} 
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded border border-red-200 flex items-center gap-1 text-xs"
                      >
                        <Trash2 className="w-4 h-4" /> Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= SEÇÃO: RELATÓRIO FINANCEIRO ================= */}
        {activeTab === 'financeiro' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-700">Lançamentos Financeiros & Comissões</h2>
              <button 
                onClick={() => setEditingParcela({ empresaNome: '', valor: '', vencimento: '', status: 'Pendente', comissaoPorcentagem: 10, comissaoValor: 0, comissaoPaga: false })} 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1 hover:bg-blue-700 transition"
              >
                <PlusCircle className="w-4 h-4" /> Novo Lançamento
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                    <tr>
                      <th className="p-3">Empresa</th>
                      <th className="p-3">Valor</th>
                      <th className="p-3">Vencimento</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Comissão</th>
                      <th className="p-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {parcelas.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50/50">
                        <td className="p-3 font-medium">{p.empresaNome}</td>
                        <td className="p-3">R$ {Number(p.valor).toFixed(2)}</td>
                        <td className="p-3">{p.vencimento}</td>
                        <td className="p-3">
                          <button 
                            onClick={() => togglePago(p)} 
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              p.status === 'Pago' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {p.status}
                          </button>
                        </td>
                        <td className="p-3">
                          <div className="text-xs">
                            <p>R$ {Number(p.comissaoValor).toFixed(2)} ({p.comissaoPorcentagem}%)</p>
                            <button 
                              onClick={() => toggleBaixaComissao(p)} 
                              className={`mt-0.5 text-[10px] underline ${p.comissaoPaga ? 'text-green-600 font-bold' : 'text-gray-400'}`}
                            >
                              {p.comissaoPaga ? 'Comissão Paga' : 'Pendente Baixa'}
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => setEditingParcela(p)} 
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded border border-blue-200 text-xs flex items-center gap-1"
                            >
                              <Pencil className="w-3.5 h-3.5" /> Editar
                            </button>
                            <button 
                              onClick={() => handleDeleteParcela(p.id)} 
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded border border-red-200 text-xs flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ================= MODAL DE EDIÇÃO/CRIAÇÃO DE EMPRESA ================= */}
      {editingEmpresa && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">{editingEmpresa.id ? 'Editar Empresa' : 'Nova Empresa'}</h3>
            <form onSubmit={handleSaveEmpresa} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Nome da Empresa</label>
                <input 
                  type="text" 
                  required 
                  className="w-full border p-2 rounded text-sm" 
                  value={editingEmpresa.nome} 
                  onChange={e => setEditingEmpresa({ ...editingEmpresa, nome: e.target.value })} 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">WhatsApp (com DDD)</label>
                <input 
                  type="text" 
                  className="w-full border p-2 rounded text-sm" 
                  value={editingEmpresa.whatsapp} 
                  onChange={e => setEditingEmpresa({ ...editingEmpresa, whatsapp: e.target.value })} 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Status do Convite</label>
                <select 
                  className="w-full border p-2 rounded text-sm" 
                  value={editingEmpresa.statusConvite} 
                  onChange={e => setEditingEmpresa({ ...editingEmpresa, statusConvite: e.target.value })}
                >
                  <option value="A Convidar">A Convidar</option>
                  <option value="Convidado">Convidado</option>
                  <option value="Confirmado">Confirmado</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Nome para Troféu/Diploma</label>
                <input 
                  type="text" 
                  className="w-full border p-2 rounded text-sm" 
                  value={editingEmpresa.trofeuNome} 
                  onChange={e => setEditingEmpresa({ ...editingEmpresa, trofeuNome: e.target.value })} 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Categoria Premiada</label>
                <input 
                  type="text" 
                  className="w-full border p-2 rounded text-sm" 
                  value={editingEmpresa.trofeuCategoria} 
                  onChange={e => setEditingEmpresa({ ...editingEmpresa, trofeuCategoria: e.target.value })} 
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button 
                  type="button" 
                  onClick={() => setEditingEmpresa(null)} 
                  className="px-4 py-2 border rounded text-sm text-gray-600"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL DE EDIÇÃO/CRIAÇÃO DE PARCELA ================= */}
      {editingParcela && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">{editingParcela.id ? 'Editar Parcela' : 'Novo Lançamento'}</h3>
            <form onSubmit={handleSaveParcela} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Empresa</label>
                <input 
                  type="text" 
                  required 
                  className="w-full border p-2 rounded text-sm" 
                  value={editingParcela.empresaNome} 
                  onChange={e => setEditingParcela({ ...editingParcela, empresaNome: e.target.value })} 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Valor (R$)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  required 
                  className="w-full border p-2 rounded text-sm" 
                  value={editingParcela.valor} 
                  onChange={e => {
                    const val = parseFloat(e.target.value) || 0;
                    const comVal = (val * (editingParcela.comissaoPorcentagem || 10)) / 100;
                    setEditingParcela({ ...editingParcela, valor: e.target.value, comissaoValor: comVal });
                  }} 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Data de Vencimento</label>
                <input 
                  type="date" 
                  required 
                  className="w-full border p-2 rounded text-sm" 
                  value={editingParcela.vencimento} 
                  onChange={e => setEditingParcela({ ...editingParcela, vencimento: e.target.value })} 
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button 
                  type="button" 
                  onClick={() => setEditingParcela(null)} 
                  className="px-4 py-2 border rounded text-sm text-gray-600"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
