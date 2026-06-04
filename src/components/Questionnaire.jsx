import { questionnaire, baselineProvenance, FRAMEWORKS, autoAnswers } from '../data/questionnaire.js';

const FRAMEWORK_CLASS = {
  wa2024: 'fw-wa',
  e8: 'fw-e8',
  irap: 'fw-irap',
  ism: 'fw-ism',
  incident: 'fw-inc',
};

function answerView(q, answered) {
  if (!answered) {
    if (q.type === 'yesno') return <span className="q-ctl">Yes / No</span>;
    if (q.type === 'checkbox') return <span className="q-ctl">☐ Agree</span>;
    if (q.type === 'verify' || q.type === 'upload') return <span className="q-ctl">Provide evidence</span>;
    if (q.type === 'select') return <span className="q-ctl">Select…</span>;
    return <span className="q-ctl">Response…</span>;
  }
  const a = autoAnswers[q.id];
  const ok = ['yes', 'verified', 'current', 'agreed', 'acknowledged'].includes(String(a).toLowerCase());
  return <span className={'q-ans' + (ok ? ' ok' : '')}>{ok ? '✓ ' : ''}{a}</span>;
}

/**
 * mode: "baseline"  -> DGov-owned blank template (shows provenance prominently)
 *       "answered"  -> auto-answered by the MCP path (Sarah's SaaS)
 */
export default function Questionnaire({ mode = 'baseline' }) {
  const answered = mode === 'answered';
  return (
    <div className="qn">
      <div className="qn-head">
        <div>
          <div className="qn-title">{baselineProvenance.title}</div>
          <div className="qn-sub">{baselineProvenance.subtitle}</div>
        </div>
        <div className="qn-prov">
          <span className="qn-prov-l">Generated from current policy:</span>
          {baselineProvenance.generatedFrom.map((g) => (
            <span className="pchip" key={g}>{g}</span>
          ))}
        </div>
      </div>

      {questionnaire.map((sec) => (
        <div className="qn-sec" key={sec.section}>
          <div className="qn-sec-h">{sec.section}</div>
          <p className="qn-sec-i">{sec.intro}</p>
          {sec.questions.map((q) => (
            <div className="qrow2" key={q.id}>
              <div className="qrow2-main">
                <div className="qrow2-label">
                  {q.label} {q.required && <span className="req-dot" title="required">*</span>}
                </div>
                <div className="qrow2-meta">
                  <span className={'pchip sm ' + (FRAMEWORK_CLASS[q.framework] || '')}>{FRAMEWORKS[q.framework]}</span>
                  <span className="qrow2-src">{q.source}</span>
                  {q.auto && answered && <span className="qrow2-auto">auto-verified via MCP</span>}
                </div>
              </div>
              <div className="qrow2-ans">{answerView(q, answered)}</div>
            </div>
          ))}
        </div>
      ))}

      <div className="qn-foot">
        Owner: {baselineProvenance.owner}. Each question traces to a current WA Government or ASD policy, so an agency can
        see exactly why it is asked, then apply its own additional requirements.
      </div>
    </div>
  );
}
