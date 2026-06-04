import { useState } from 'react';
import { generateScaffold } from '../lib/ai.js';
import { vendors, STATUS_BADGE, sampleLegislation } from '../data/vendors.js';

const TYPE_LABEL = { checkbox: 'checkbox', text: 'text', select: 'select', upload: 'upload', yesno: 'yes/no' };

export default function Agency() {
  const [legislation, setLegislation] = useState(sampleLegislation);
  const [fields, setFields] = useState(null);
  const [provider, setProvider] = useState('');
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState('');
  const [reuse, setReuse] = useState(false);

  async function onGenerate() {
    setLoading(true);
    setNote('');
    try {
      const res = await generateScaffold(legislation);
      setFields(res.fields || []);
      setProvider(res.provider || 'mock');
      if (res.note) setNote(res.note);
    } catch (e) {
      setNote(String(e.message || e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="gv">Agency console</h2>
      <p className="lede">Build assessment templates from policy, then reuse the certified pool instead of re-assessing vendors yourself.</p>

      <div className="split">
        {/* LEFT: AI template-from-policy */}
        <div className="panel">
          <h4>Create a template from policy</h4>
          <p className="sd">Paste the legislation or policy clause. The AI drafts the form scaffold; you refine and publish.</p>
          <textarea className="leg" value={legislation} onChange={(e) => setLegislation(e.target.value)} />
          <div style={{ marginTop: 12 }}>
            <button className="btn" onClick={onGenerate} disabled={loading}>
              {loading ? 'Generating…' : '✦ Generate scaffold'}
            </button>
            {provider && (
              <div className="aibadge">
                ✦ provider: {provider}
                {provider.startsWith('ollama') ? ' · on-prem, data stays in WA' : provider.startsWith('cli') ? ' · via your subscription' : ''}
              </div>
            )}
          </div>
          {fields && (
            <div className="scaffold">
              {fields.map((f, i) => (
                <div className="f" key={i}>
                  {f.label}
                  <span className={'ty' + (f.required ? ' req' : '')}>{f.required ? 'required' : TYPE_LABEL[f.type] || f.type}</span>
                </div>
              ))}
            </div>
          )}
          {note && <p className="notice" style={{ marginTop: 10 }}>{note}</p>}
        </div>

        {/* RIGHT: green pool */}
        <div className="panel">
          <h4>Find a certified vendor</h4>
          <p className="sd">The green pool — assessed once by Harmony, reusable by your agency now.</p>
          <table className="pool">
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Service</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((v) => {
                const b = STATUS_BADGE[v.status];
                return (
                  <tr key={v.id} className={v.hero ? 'hl' : ''}>
                    <td>
                      <b>{v.name}</b>
                    </td>
                    <td>{v.service}</td>
                    <td>
                      <span className={'badge ' + b.cls}>{b.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!reuse ? (
            <button className="btn" style={{ marginTop: 14 }} onClick={() => setReuse(true)}>
              Reuse Sarah's assessment for this contract →
            </button>
          ) : (
            <p className="aibadge" style={{ marginTop: 14 }}>✓ Reused — no new questionnaire. The harmonisation payoff in one click.</p>
          )}
        </div>
      </div>
    </div>
  );
}
