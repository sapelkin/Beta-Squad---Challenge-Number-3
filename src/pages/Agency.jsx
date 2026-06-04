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
      <p className="lede">Start from the DGov baseline template, then reuse existing assurance records as an input — instead of re-assessing every vendor yourself. You keep the risk and procurement decision.</p>

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

        {/* RIGHT: shared assurance records */}
        <div className="panel">
          <h4>Find an assessed vendor</h4>
          <p className="sd">Shared assurance — assessed once, with full provenance, reusable as an input to your own risk decision.</p>
          <table className="pool">
            <thead>
              <tr>
                <th>Vendor &amp; assessment provenance</th>
                <th>Findings</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((v) => {
                const b = STATUS_BADGE[v.status];
                return (
                  <tr key={v.id} className={v.hero ? 'hl' : ''}>
                    <td>
                      <b>{v.name}</b> · {v.service}
                      <div style={{ fontSize: 11, color: '#888', marginTop: 2, lineHeight: 1.5 }}>
                        Assessed by {v.assessedBy} · {v.policy}
                        <br />
                        Classification: {v.classification} · as at {v.asOf}
                      </div>
                    </td>
                    <td>
                      <span className={'badge ' + b.cls}>{b.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="sd" style={{ marginTop: 10 }}>
            Findings inform <b>your</b> risk-based decision. Harmony records assurance — it does not approve or reject vendors,
            and a gap for one agency need not block another.
          </p>
          {!reuse ? (
            <button className="btn" style={{ marginTop: 6 }} onClick={() => setReuse(true)}>
              Reuse Sarah's assessment as an input →
            </button>
          ) : (
            <p className="aibadge" style={{ marginTop: 6 }}>✓ Reused as an input — no new questionnaire. You still make the risk-based call.</p>
          )}
        </div>
      </div>
    </div>
  );
}
