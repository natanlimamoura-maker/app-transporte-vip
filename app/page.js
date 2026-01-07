"use client";
import React, { useState, useEffect } from 'react';
import { 
  Users, Landmark, DollarSign, AlertTriangle, ChevronLeft, 
  Phone, Plus, Save, Trash2, Settings, Download, Upload, Edit3, Bell
} from 'lucide-react';

export default function AppTransporteVIP() {
  const [view, setView] = useState('menu');
  const [alunos, setAlunos] = useState([]);
  const [nomeApp, setNomeApp] = useState('App Transporte VIP');
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nome: '', tel: '', escola: '', periodo: 'Manhã', valor: '', vencimento: '', tipo: 'mensalista' });

  useEffect(() => {
    const dados = localStorage.getItem('@TransporteVIP:v1');
    const nomeSalvo = localStorage.getItem('@TransporteVIP:nomeApp');
    if (dados) setAlunos(JSON.parse(dados));
    if (nomeSalvo) setNomeApp(nomeSalvo);
  }, []);

  const salvar = (novaLista) => {
    setAlunos(novaLista);
    localStorage.setItem('@TransporteVIP:v1', JSON.stringify(novaLista));
  };

  const salvarNomeApp = (novoNome) => {
    setNomeApp(novoNome);
    localStorage.setItem('@TransporteVIP:nomeApp', novoNome);
  };

  const manipularSubmit = (e) => {
    e.preventDefault();
    let lista;
    if (editando) {
      lista = alunos.map(a => a.id === editando ? { ...form, id: editando } : a);
      setEditando(null);
    } else {
      lista = [...alunos, { ...form, id: Date.now(), pago: false }];
    }
    salvar(lista);
    setForm({ nome: '', tel: '', escola: '', periodo: 'Manhã', valor: '', vencimento: '', tipo: 'mensalista' });
    setView('menu');
  };

  const exportarBackup = () => {
    const blob = new Blob([JSON.stringify({alunos, nomeApp})], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `backup_vip.json`; a.click();
  };

  const diaAtual = new Date().getDate();

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 pb-10 font-sans">
      <header className="bg-yellow-400 p-6 rounded-b-[40px] shadow-lg mb-6 flex justify-between items-center border-b-4 border-yellow-500">
        {view !== 'menu' && <button onClick={() => {setView('menu'); setEditando(null)}} className="bg-white/50 p-2 rounded-full"><ChevronLeft/></button>}
        <h1 className="text-lg font-black text-blue-900 mx-auto uppercase tracking-tighter italic">💎 {nomeApp}</h1>
        <button onClick={() => setView('config')} className="bg-blue-900/10 p-2 rounded-full text-blue-900"><Settings/></button>
      </header>

      <main className="px-5">
        {view === 'menu' && (
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setView('mensalistas')} className="h-32 bg-blue-700 rounded-3xl text-white flex flex-col items-center justify-center gap-2 shadow-xl border-b-4 border-blue-900"><Users/> <b>Mensalistas</b></button>
            <button onClick={() => setView('prefeitura')} className="h-32 bg-orange-500 rounded-3xl text-white flex flex-col items-center justify-center gap-2 shadow-xl border-b-4 border-orange-700"><Landmark/> <b>Prefeitura</b></button>
            <button onClick={() => setView('balanco')} className="h-32 bg-emerald-600 rounded-3xl text-white flex flex-col items-center justify-center gap-2 shadow-xl border-b-4 border-emerald-800"><DollarSign/> <b>Balanço</b></button>
            <button onClick={() => setView('atrasados')} className="h-32 bg-red-600 rounded-3xl text-white flex flex-col items-center justify-center gap-2 shadow-xl border-b-4 border-red-900"><AlertTriangle/> <b>Atrasados</b></button>
            <button onClick={() => setView('cadastro')} className="col-span-2 h-16 bg-blue-900 text-yellow-400 rounded-2xl flex items-center justify-center gap-3 font-black mt-2 shadow-lg">+ NOVO ALUNO</button>
          </div>
        )}

        {view === 'config' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="bg-white p-6 rounded-3xl shadow-md border-t-4 border-blue-900">
              <h2 className="font-black text-blue-900 uppercase text-xs mb-2">Nome do App</h2>
              <input value={nomeApp} className="w-full border-2 p-3 rounded-xl font-bold" onChange={(e) => salvarNomeApp(e.target.value)} />
            </div>

            <div className="bg-blue-900 p-6 rounded-3xl text-white space-y-4 shadow-xl">
              <h2 className="font-black text-yellow-400 uppercase text-xs">Segurança</h2>
              <button onClick={exportarBackup} className="w-full bg-white/10 p-4 rounded-xl border border-white/20 flex justify-between">Baixar Backup <Download/></button>
              <label className="w-full bg-white/10 p-4 rounded-xl border border-white/20 flex justify-between cursor-pointer">Subir Backup <Upload/><input type="file" className="hidden" onChange={(e) => {
                const reader = new FileReader();
                reader.onload = (ev) => { 
                  const b = JSON.parse(ev.target.result);
                  salvar(b.alunos);
                  if(b.nomeApp) salvarNomeApp(b.nomeApp);
                  alert("Dados Importados!"); setView('menu'); 
                };
                reader.readAsText(e.target.files[0]);
              }}/></label>
            </div>
          </div>
        )}

        {view === 'cadastro' && (
          <form onSubmit={manipularSubmit} className="bg-white p-6 rounded-3xl shadow-xl space-y-4 border-t-8 border-blue-700">
            <h2 className="font-black text-center text-blue-900 uppercase">{editando ? '✏️ Editar' : '➕ Novo'} Aluno</h2>
            <input required placeholder="Nome Completo" value={form.nome} className="w-full border-2 p-3 rounded-xl" onChange={e => setForm({...form, nome: e.target.value})} />
            <input required placeholder="WhatsApp" value={form.tel} className="w-full border-2 p-3 rounded-xl" onChange={e => setForm({...form, tel: e.target.value})} />
            <input required placeholder="Escola" value={form.escola} className="w-full border-2 p-3 rounded-xl" onChange={e => setForm({...form, escola: e.target.value})} />
            <div className="flex gap-2">
              <button type="button" onClick={() => setForm({...form, tipo: 'mensalista'})} className={`flex-1 p-3 rounded-xl font-bold border-2 ${form.tipo === 'mensalista' ? 'bg-blue-700 text-white border-blue-800' : 'bg-gray-50'}`}>Particular</button>
              <button type="button" onClick={() => setForm({...form, tipo: 'prefeitura'})} className={`flex-1 p-3 rounded-xl font-bold border-2 ${form.tipo === 'prefeitura' ? 'bg-orange-500 text-white border-orange-600' : 'bg-gray-50'}`}>Prefeitura</button>
            </div>
            {form.tipo === 'mensalista' && (
              <div className="flex gap-2">
                <input placeholder="R$ Valor" type="number" value={form.valor} className="flex-1 border-2 p-3 rounded-xl" onChange={e => setForm({...form, valor: e.target.value})} />
                <input placeholder="Dia Venc." type="number" value={form.vencimento} className="flex-1 border-2 p-3 rounded-xl" onChange={e => setForm({...form, vencimento: e.target.value})} />
              </div>
            )}
            <button type="submit" className="w-full bg-emerald-600 text-white p-4 rounded-xl font-black shadow-lg uppercase">Confirmar Registro</button>
          </form>
        )}

        {(view === 'mensalistas' || view === 'prefeitura' || view === 'atrasados') && (
          <div className="space-y-3">
            {alunos.filter(a => {
              if (view === 'mensalistas') return a.tipo === 'mensalista';
              if (view === 'prefeitura') return a.tipo === 'prefeitura';
              return !a.pago && a.tipo === 'mensalista' && Number(a.vencimento) < diaAtual;
            }).map(aluno => (
              <div key={aluno.id} className={`bg-white p-4 rounded-3xl shadow-sm border-l-8 ${aluno.pago ? 'border-green-500' : 'border-red-500'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black text-gray-800 uppercase text-sm leading-tight">{aluno.nome}</h3>
                    <p className="text-[10px] font-bold text-blue-700 uppercase leading-none">{aluno.escola}</p>
                  </div>
                  <div className="flex gap-2 text-gray-400">
                    <button onClick={() => {setForm(aluno); setEditando(aluno.id); setView('cadastro');}} className="p-1"><Edit3 size={18}/></button>
                    <button onClick={() => {if(confirm("Excluir este aluno?")) salvar(alunos.filter(x => x.id !== aluno.id))}} className="p-1"><Trash2 size={18}/></button>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => salvar(alunos.map(x => x.id === aluno.id ? {...x, pago: !x.pago} : x))} className={`flex-1 p-2 rounded-xl text-[10px] font-black border-2 ${aluno.pago ? 'bg-green-600 text-white border-green-700' : 'text-red-600 border-red-600'}`}>{aluno.pago ? 'PAGAMENTO OK ✓' : 'PENDENTE'}</button>
                  <a href={`https://wa.me/55${aluno.tel}`} className="bg-emerald-500 text-white p-2 rounded-xl px-4 shadow-sm"><Phone size={16}/></a>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'balanco' && (
          <div className="bg-white p-8 rounded-[40px] shadow-xl text-center border-t-8 border-emerald-600">
            <h2 className="font-black text-emerald-800 mb-6 uppercase">Financeiro VIP</h2>
            <div className="bg-emerald-50 p-6 rounded-3xl border-2 border-emerald-100 mb-4">
              <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Total Entrado</p>
              <p className="text-4xl font-black text-emerald-700">R$ {alunos.filter(a => a.tipo === 'mensalista' && a.pago).reduce((acc, curr) => acc + Number(curr.valor), 0).toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase text-gray-400">
              <span>Pendentes: R$ {alunos.filter(a => a.tipo === 'mensalista' && !a.pago).reduce((acc, curr) => acc + Number(curr.valor), 0).toFixed(2)}</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
