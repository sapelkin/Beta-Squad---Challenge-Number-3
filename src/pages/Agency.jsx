import { useState } from 'react';
import { generateScaffold } from '../lib/ai.js';
import { vendors, sampleLegislation } from '../data/vendors.js';

const TYPE_LABEL = { checkbox: 'checkbox', text: 'text', select: 'select', upload: 'upload', yesno: 'yes/no' };

function VerifiedChips({ v }) {
  const chips = [];
  if (v.verified.iso27001 === 'verified') chips.push('ISO 27001');
  if (v.verified.soc2 === 'verified') chips.push('SOC 2');
  if (v.verified.irap === 'current') chips.push('IRAP');
  if (v.verified.mfa === 'enforced') chips.push('MFA');
  chips.push(v.e8 === 'ML1 met' ? 'E8 ML1' : v.e8 === 'Partial' ? 'E8 partial' : 'E8 not met');
  return (
    <div className="vchips">
      {chips.map((c) => (
        <span className="vchip" key={c}>{c}</span>
      ))}
    </div>
  );
}

export default function Agency() {
  const [legislation, setLegislation] = useState(sampleLegislation);
  const [fields, setFields] = useState(null);
  const [provider, setProvider] = useState('');
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState('');
  const [selected, setSelected] = useState(vendors[0]);

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
      <p className="lede">Tailor the baseline template from policy, then reuse assurance other agencies have already done. You keep your own risk-based decision.</p>

      <div className="split">
        {/* LEFT: AI baseline-from-policy */}
        <div className="panel">
          <h4>Tailor your baseline from policy</h4>
          <p className="sd">Paste a policy clause specific to your agency. The AI drafts form fields you add on top of the DGov baseline.</p>
          <textarea className="leg" value={legislation} onChange={(e) => setLegislation(e.target.value)} />
          <div style={{ marginTop: 12 }}>
            <button className="btn" onClick={onGenerate} disabled={loading}>
              {loading ? 'Generating…' : '✦ Generate fields'}
            </button>
            {provider && (
              <div className="aibadge">
                ✦ provider: {provider}
                {provider.startsWith('lmstudio') ? ' · on-prem, data stays in WA' : provider.startsWith('cli') ? ' · via your subscription' : ''}
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

        {/* RIGHT: assurance register + prior assessments */}
        <div className="panel">
          <h4>Vendor assurance register</h4>
          <p className="sd">Assessed once, reusable by your agency. Select a vendor to see who assessed them and what was found. No universal pass/fail.</p>
          <table className="pool">
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Verified</th>
                <th>Assessed by</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((v) => (
                <tr key={v.id} className={selected?.id === v.id ? 'hl' : ''} onClick={() => setSelected(v)} style={{ cursor: 'pointer' }}>
                  <td><b>{v.name}</b><div className="td-sub">{v.service}</div></td>
                  <td><VerifiedChips v={v} /></td>
                  <td>{v.assessments.length} {v.assessments.length === 1 ? 'agency' : 'agencies'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {selected && (
            <div className="vdetail">
              <div className="vdetail-h">{selected.name} — prior assessments</div>
              {selected.assessments.map((a, i) => (
                <div className="assess" key={i}>
                  <div className="assess-top">
                    <b>{a.agency}</b>
                    <span className="assess-date">{a.date}</span>
                  </div>
                  <div className="assess-fw">Assessed against: {a.framework}</div>
                  <div className="assess-risk"><span className="k">Risks/gaps:</span> {a.risks}</div>
                  <div className="assess-dec"><span className="k">Their decision:</span> {a.decision}</div>
                </div>
              ))}
              <p className="sd" style={{ marginTop: 10 }}>
                Reuse this assurance as an input. Apply your own data classification and risk appetite, then make your decision.
              </p>
              <button className="btn">Reuse this assurance for my assessment →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
