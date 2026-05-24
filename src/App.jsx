import { useState, useRef } from "react";

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  bg:      "#F5F1EB",
  white:   "#FDFAF5",
  ink:     "#1A1714",
  body:    "#46403A",
  muted:   "#968C82",
  border:  "#DDD5C5",
  warm:    "#EAE2D2",
  panel:   "#F0EAE0",
  navy:    "#18385A",
  navyMid: "#245280",
  navyLt:  "#EBF0F6",
  gold:    "#B57818",
  goldMid: "#D09030",
  goldLt:  "#E0B850",
  goldPl:  "#FAF4E2",
  sage:    "#2E5C3A",
  sageMid: "#3C7848",
  sagePl:  "#E4EEE7",
  rose:    "#8C2830",
  rosePl:  "#FAE8EA",
  teal:    "#165858",
  tealPl:  "#E2EEEE",
  clay:    "#6A3818",
  clayPl:  "#F5EDE4",
  good:    "#1A5C2C",
  goodPl:  "#E0F0E4",
};

// ─── STATE DATA ───────────────────────────────────────────────────────────────
const STATES = {
  AL:{n:"Alabama",res:"6 mo",wait:"30 days",fee:"$200–300",sh:"alacourt.gov",dp:false,cu:false,note:"Irreconcilable differences accepted."},
  AK:{n:"Alaska",res:"None",wait:"30 days",fee:"$150–250",sh:"courts.alaska.gov",dp:false,cu:false,note:"No residency requirement."},
  AZ:{n:"Arizona",res:"90 days",wait:"60 days",fee:"$250–350",sh:"azlawhelp.org",dp:false,cu:false,note:"Community property state.",comm:true},
  AR:{n:"Arkansas",res:"60 days",wait:"30 days",fee:"$165–200",sh:"arcourts.gov",dp:false,cu:false,note:"18-month separation is independent grounds."},
  CA:{n:"California",res:"6 mo",wait:"6 months",fee:"$435–450",sh:"courts.ca.gov/selfhelp",dp:true,cu:false,note:"Best self-help network in US. 6-month waiting period after service.",dpNote:"Domestic partners use the same dissolution process as marriage."},
  CO:{n:"Colorado",res:"91 days",wait:"91 days",fee:"$230",sh:"courts.state.co.us",dp:false,cu:true,note:"Excellent online forms system.",cuNote:"Civil unions dissolve under the same statute as marriage."},
  CT:{n:"Connecticut",res:"12 mo",wait:"90 days",fee:"$360",sh:"jud.ct.gov",dp:false,cu:true,note:"90-day waiting period.",cuNote:"Civil union dissolution mirrors marriage."},
  DE:{n:"Delaware",res:"6 mo",wait:"None",fee:"$165",sh:"courts.delaware.gov",dp:false,cu:false,note:"No waiting period for uncontested."},
  FL:{n:"Florida",res:"6 mo",wait:"None",fee:"$400–410",sh:"flcourts.org",dp:false,cu:false,note:"Simplified Dissolution is fastest in US for uncontested."},
  GA:{n:"Georgia",res:"6 mo",wait:"30 days",fee:"$200–250",sh:"georgiacourts.gov",dp:false,cu:false,note:"Settlement Agreement is the key document."},
  HI:{n:"Hawaii",res:"6 mo",wait:"None",fee:"$215",sh:"courts.hawaii.gov",dp:true,cu:false,note:"Both parties sign decree; judge approves.",dpNote:"Registered domestic partners use same process as marriage."},
  ID:{n:"Idaho",res:"6 wks",wait:"None",fee:"$207",sh:"isc.idaho.gov",dp:false,cu:false,note:"Shortest residency in US — 6 weeks.",comm:true},
  IL:{n:"Illinois",res:"90 days",wait:"None",fee:"$289–388",sh:"illinoiscourts.gov",dp:true,cu:true,note:"No-fault only.",dpNote:"Civil unions and domestic partnerships dissolve as marriage."},
  IN:{n:"Indiana",res:"6 mo",wait:"60 days",fee:"$132–160",sh:"in.gov/judiciary",dp:false,cu:false,note:"60-day waiting period from filing."},
  IA:{n:"Iowa",res:"1 yr",wait:"90 days",fee:"$185",sh:"iowacourts.gov",dp:false,cu:false,note:"90-day waiting period."},
  KS:{n:"Kansas",res:"60 days",wait:"60 days",fee:"$195",sh:"kscourts.org",dp:false,cu:false,note:"Residency and waiting period run simultaneously."},
  KY:{n:"Kentucky",res:"180 days",wait:"60 days",fee:"$148",sh:"courts.ky.gov",dp:false,cu:false,note:"Lowest filing fee in the country."},
  LA:{n:"Louisiana",res:"6 mo",wait:"None",fee:"$250–350",sh:"lasc.org",dp:false,cu:false,note:"Community property state.",comm:true},
  ME:{n:"Maine",res:"6 mo",wait:"60 days",fee:"$120",sh:"courts.maine.gov",dp:true,cu:false,note:"Low fees.",dpNote:"Domestic partners use same process as marriage."},
  MD:{n:"Maryland",res:"1 yr",wait:"None",fee:"$165",sh:"mdcourts.gov",dp:false,cu:false,note:"Mutual consent divorce: no waiting period if both agree."},
  MA:{n:"Massachusetts",res:"None*",wait:"None",fee:"$200",sh:"mass.gov/courts",dp:false,cu:false,note:"*One spouse must have lived in MA at separation."},
  MI:{n:"Michigan",res:"6 mo",wait:"60 days",fee:"$175",sh:"courts.michigan.gov",dp:false,cu:false,note:"60-day wait (6 months with minor children)."},
  MN:{n:"Minnesota",res:"180 days",wait:"None",fee:"$400",sh:"mncourts.gov",dp:false,cu:false,note:"No waiting period."},
  MS:{n:"Mississippi",res:"6 mo",wait:"None",fee:"$100–200",sh:"courts.ms.gov",dp:false,cu:false,note:"Lowest fees in the Southeast."},
  MO:{n:"Missouri",res:"90 days",wait:"30 days",fee:"$150–200",sh:"courts.mo.gov",dp:false,cu:false,note:"30-day wait from service."},
  MT:{n:"Montana",res:"90 days",wait:"20 days",fee:"$170",sh:"montanacourts.gov",dp:false,cu:false,note:"Short waiting period."},
  NE:{n:"Nebraska",res:"1 yr",wait:"60 days",fee:"$158",sh:"supremecourt.ne.gov",dp:false,cu:false,note:"60-day wait."},
  NV:{n:"Nevada",res:"6 wks",wait:"None",fee:"$299",sh:"nevadajudiciary.us",dp:true,cu:false,note:"Joint petition available — fastest uncontested path.",comm:true,dpNote:"Domestic partners have full marriage-equivalent rights."},
  NH:{n:"New Hampshire",res:"1 yr",wait:"None",fee:"$250",sh:"courts.nh.gov",dp:false,cu:true,note:"No waiting period for uncontested.",cuNote:"Civil unions dissolve as marriage."},
  NJ:{n:"New Jersey",res:"1 yr",wait:"None",fee:"$300",sh:"njcourts.gov",dp:true,cu:true,note:"Online filing available.",dpNote:"Domestic partners and civil union partners use same dissolution process."},
  NM:{n:"New Mexico",res:"6 mo",wait:"None",fee:"$137",sh:"nmcourts.gov",dp:false,cu:false,note:"Community property state.",comm:true},
  NY:{n:"New York",res:"1 yr*",wait:"None",fee:"$210",sh:"nycourts.gov",dp:false,cu:false,note:"Uncontested with agreement is fastest."},
  NC:{n:"N. Carolina",res:"6 mo",wait:"1 yr sep",fee:"$225",sh:"nccourts.gov",dp:false,cu:false,note:"Must be separated 1 year before filing."},
  ND:{n:"N. Dakota",res:"6 mo",wait:"None",fee:"$80",sh:"ndcourts.gov",dp:false,cu:false,note:"Lowest fees in the West."},
  OH:{n:"Ohio",res:"6 mo",wait:"None",fee:"$200–300",sh:"supremecourt.ohio.gov",dp:false,cu:false,note:"Dissolution is faster than divorce when parties agree."},
  OK:{n:"Oklahoma",res:"6 mo",wait:"10 days",fee:"$183",sh:"oscn.net",dp:false,cu:false,note:"10-day wait — one of the shortest in US."},
  OR:{n:"Oregon",res:"6 mo",wait:"None",fee:"$301",sh:"oregonlawhelp.org",dp:true,cu:false,note:"No waiting period.",dpNote:"Domestic partners use same statute as marriage dissolution."},
  PA:{n:"Pennsylvania",res:"6 mo",wait:"90 days",fee:"$200–400",sh:"pacourts.us",dp:false,cu:false,note:"Mutual consent is faster than 90-day wait."},
  RI:{n:"Rhode Island",res:"1 yr",wait:"None",fee:"$160",sh:"courts.ri.gov",dp:false,cu:true,note:"Final decree requires a hearing.",cuNote:"Civil unions dissolve using the divorce statute."},
  SC:{n:"S. Carolina",res:"3 mo",wait:"None",fee:"$150",sh:"sccourts.org",dp:false,cu:false,note:"1-year separation required. Final hearing required."},
  SD:{n:"S. Dakota",res:"None",wait:"60 days",fee:"$95",sh:"ujs.sd.gov",dp:false,cu:false,note:"No residency requirement."},
  TN:{n:"Tennessee",res:"6 mo",wait:"60 days",fee:"$180–300",sh:"tncourts.gov",dp:false,cu:false,note:"60-day wait (90 with minor children)."},
  TX:{n:"Texas",res:"6 mo",wait:"60 days",fee:"$250–350",sh:"texaslawhelp.org",dp:false,cu:false,note:"Agreed Decree — judge signs without both parties present if uncontested.",comm:true},
  UT:{n:"Utah",res:"3 mo",wait:"30 days",fee:"$335",sh:"utcourts.gov",dp:false,cu:false,note:"Online filing for simple uncontested cases."},
  VT:{n:"Vermont",res:"6 mo",wait:"None",fee:"$90",sh:"vermontjudiciary.org",dp:false,cu:true,note:"Final decree requires hearing.",cuNote:"Civil unions dissolve as marriage."},
  VA:{n:"Virginia",res:"6 mo",wait:"None",fee:"$83",sh:"courts.virginia.gov",dp:false,cu:false,note:"Lowest fees on East Coast."},
  WA:{n:"Washington",res:"None",wait:"90 days",fee:"$314",sh:"courts.wa.gov",dp:true,cu:false,note:"Community property. 90-day wait.",comm:true,dpNote:"Domestic partners have full marriage-equivalent rights."},
  WV:{n:"W. Virginia",res:"1 yr",wait:"None",fee:"$135",sh:"courtswv.gov",dp:false,cu:false,note:"Waiting period waivable in some cases."},
  WI:{n:"Wisconsin",res:"6 mo",wait:"120 days",fee:"$184",sh:"wicourts.gov",dp:false,cu:false,note:"Longest wait — 120 days. Joint petition available.",comm:true},
  WY:{n:"Wyoming",res:"60 days",wait:"None",fee:"$70",sh:"courts.state.wy.us",dp:false,cu:false,note:"Lowest fees in Mountain West. No waiting period."},
};

const DECREE_SECTIONS = [
  {
    id:"basics", title:"Your Information", icon:"📋",
    desc:"The court header and basic facts of the case.",
    fields:[
      {id:"relType",   label:"What are you dissolving?", type:"sel",
       opts:["Legal marriage","Civil union","Registered domestic partnership"]},
      {id:"court",     label:"County and state of filing", type:"text", placeholder:"e.g. Cook County, Illinois"},
      {id:"yourName",  label:"Your full legal name", type:"text", placeholder:"Your full legal name"},
      {id:"partnerName",label:"Your partner's full legal name", type:"text", placeholder:"Their full legal name"},
      {id:"married",   label:"Date of marriage / union", type:"date"},
      {id:"separated", label:"Date of separation", type:"date"},
      {id:"caseNum",   label:"Case number (if already filed)", type:"text", placeholder:"Leave blank if not yet filed"},
    ]
  },
  {
    id:"children", title:"Children", icon:"🌿",
    desc:"Custody, parenting time, and financial support for your children.",
    fields:[
      {id:"hasKids",    label:"Do you have minor children together?", type:"yesno"},
      {id:"kidNames",   label:"Children's names and dates of birth", type:"area", showIf:"hasKids",
       placeholder:"Name — Date of birth\nName — Date of birth"},
      {id:"legalCust",  label:"Legal custody — what are you proposing?", type:"sel", showIf:"hasKids",
       opts:["Joint legal custody — we both make major decisions together",
             "Sole legal custody to me",
             "Sole legal custody to my partner",
             "Undecided — I want to discuss this in mediation"]},
      {id:"physCust",   label:"Where will the children primarily live?", type:"sel", showIf:"hasKids",
       opts:["Equal / shared parenting time (50/50)",
             "Primarily with me; regular parenting time for my partner",
             "Primarily with my partner; regular parenting time for me",
             "Undecided — I want to discuss this in mediation"]},
      {id:"schedule",   label:"Parenting schedule you're proposing", type:"area", showIf:"hasKids",
       placeholder:"Describe the weekly schedule, holiday rotation, school break plan. Or write 'open to discussion.'"},
      {id:"support",    label:"Child support — what are you proposing?", type:"sel", showIf:"hasKids",
       opts:["Per state guidelines",
             "Cooperative cost-sharing — both contribute proportionally to income",
             "Specific amount — see below",
             "Undecided — I want to discuss in mediation"]},
      {id:"supportAmt", label:"Child support amount or contribution (if known)", type:"text", showIf:"hasKids",
       placeholder:"e.g. $850/month, or describe the arrangement"},
    ]
  },
  {
    id:"property", title:"Property & Finances", icon:"⚖",
    desc:"Real estate, vehicles, accounts, and debts.",
    fields:[
      {id:"homeOwn",  label:"Do you own real estate together?", type:"yesno"},
      {id:"homeDisp", label:"What are you proposing for the home?", type:"sel", showIf:"homeOwn",
       opts:["I keep it and refinance into my name",
             "My partner keeps it and refinances into their name",
             "We sell it and split the proceeds equally",
             "We sell it — split per separate agreement",
             "Undecided — I want to discuss in mediation"]},
      {id:"vehicles", label:"Vehicles", type:"area",
       placeholder:"Who keeps which vehicle? e.g. I keep the 2019 Honda Accord. My partner keeps the 2021 RAV4."},
      {id:"accounts", label:"Bank and financial accounts", type:"area",
       placeholder:"How are you proposing to split accounts? e.g. I keep my Chase account. Joint savings split equally."},
      {id:"retire",   label:"Retirement accounts", type:"area",
       placeholder:"e.g. Each keeps their own. Or: we split via QDRO. Or: undecided."},
      {id:"debts",    label:"Debts and liabilities", type:"area",
       placeholder:"Who assumes which debts? e.g. I assume the mortgage. My partner assumes the Visa card. Joint debts split equally."},
      {id:"otherProp",label:"Other property", type:"area",
       placeholder:"Furniture, valuables, business interests, digital assets — who gets what?"},
    ]
  },
  {
    id:"spousal", title:"Spousal Support", icon:"📄",
    desc:"Alimony or maintenance — if applicable.",
    fields:[
      {id:"alimony",  label:"Spousal support — what are you proposing?", type:"sel",
       opts:["None — both parties waive permanently",
             "I pay my partner — see amount and duration below",
             "My partner pays me — see amount and duration below",
             "Undecided — I want to discuss in mediation"]},
      {id:"aliAmt",   label:"Amount and duration (if proposing support)", type:"text",
       placeholder:"e.g. $1,200/month for 3 years, ending upon remarriage"},
    ]
  },
  {
    id:"other", title:"Final Details", icon:"✦",
    desc:"Insurance, name changes, and anything else.",
    fields:[
      {id:"kidsHealth", label:"Children's health insurance", type:"sel",
       opts:["I maintain coverage for the children",
             "My partner maintains coverage",
             "Each parent maintains separate coverage",
             "N/A — no minor children",
             "Undecided"]},
      {id:"nameChange", label:"Name restoration", type:"sel",
       opts:["No name change",
             "I am restoring my former name — see below",
             "My partner is restoring their former name",
             "Both of us are restoring former names"]},
      {id:"formerName", label:"Name to be restored (if applicable)", type:"text",
       placeholder:"Full legal name to be restored"},
      {id:"notes",      label:"Anything else you want noted", type:"area",
       placeholder:"Other issues, concerns, or notes for your mediator or co-parent..."},
    ]
  },
];

// ─── UI HELPERS ───────────────────────────────────────────────────────────────
const SERIF = { fontFamily:"'Lora',Georgia,serif" };
const SANS  = { fontFamily:"'DM Sans',system-ui,sans-serif" };

function Card({ children, style={}, accent, bg, onClick }) {
  return <div onClick={onClick} style={{
    background:bg||C.white, borderRadius:18,
    border:`1px solid ${accent||C.border}`,
    padding:"20px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)",
    cursor:onClick?"pointer":"default",
    ...style,
  }}>{children}</div>;
}

function Btn({ children, onClick, v="navy", style={}, disabled }) {
  const vs = {
    navy:  { bg:`linear-gradient(135deg,${C.navy},${C.navyMid})`, c:C.white, sh:"rgba(24,56,90,0.25)" },
    gold:  { bg:`linear-gradient(135deg,${C.gold},${C.goldMid})`, c:C.white, sh:"rgba(181,120,24,0.25)" },
    sage:  { bg:`linear-gradient(135deg,${C.sage},${C.sageMid})`, c:C.white, sh:"rgba(46,92,58,0.25)" },
    ghost: { bg:"transparent", c:C.navy, border:`1.5px solid ${C.navy}`, sh:"transparent" },
    soft:  { bg:C.warm, c:C.body, sh:"transparent" },
  };
  const s = vs[v];
  return <button onClick={onClick} disabled={disabled} style={{
    background:s.bg, color:s.c, border:s.border||"none",
    borderRadius:40, padding:"13px 22px", fontSize:14, fontWeight:600,
    cursor:disabled?"not-allowed":"pointer", width:"100%",
    opacity:disabled?0.4:1, transition:"all 0.18s",
    boxShadow:`0 4px 16px ${s.sh}`, letterSpacing:0.2,
    ...SANS, ...style,
  }}
  onMouseEnter={e=>{ if(!disabled) e.currentTarget.style.filter="brightness(1.08)"; }}
  onMouseLeave={e=>e.currentTarget.style.filter=""}
  >{children}</button>;
}

function Lbl({ children, color=C.muted, style={} }) {
  return <div style={{ fontSize:10, fontWeight:700, letterSpacing:1.6,
    textTransform:"uppercase", color, ...SANS, marginBottom:8, ...style }}>{children}</div>;
}

function FInput({ value, onChange, placeholder, type="text", rows }) {
  const base = {
    width:"100%", padding:"11px 14px", borderRadius:10,
    border:`1.5px solid ${C.border}`, background:C.white,
    color:C.ink, outline:"none", fontSize:14,
    transition:"border 0.18s", lineHeight:1.6, ...SANS,
  };
  if (rows) return <textarea value={value} onChange={e=>onChange(e.target.value)}
    placeholder={placeholder} rows={rows}
    style={{...base,resize:"vertical"}}
    onFocus={e=>e.target.style.borderColor=C.navy}
    onBlur={e=>e.target.style.borderColor=C.border}/>;
  return <input type={type} value={value} onChange={e=>onChange(e.target.value)}
    placeholder={placeholder} style={{...base,colorScheme:"light"}}
    onFocus={e=>e.target.style.borderColor=C.navy}
    onBlur={e=>e.target.style.borderColor=C.border}/>;
}

function FSel({ value, onChange, opts, placeholder="— Select —" }) {
  return <select value={value} onChange={e=>onChange(e.target.value)} style={{
    width:"100%", padding:"11px 36px 11px 14px", borderRadius:10,
    border:`1.5px solid ${C.border}`, background:C.white,
    color:value?C.ink:C.muted, outline:"none", cursor:"pointer",
    fontSize:14, ...SANS, appearance:"none",
    backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23968C82' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat:"no-repeat", backgroundPosition:"right 14px center",
  }}>
    <option value="">{placeholder}</option>
    {opts.map(o=><option key={o} value={o}>{o}</option>)}
  </select>;
}

function FField({ label, children, note }) {
  return <div style={{marginBottom:16}}>
    <Lbl>{label}</Lbl>
    {children}
    {note&&<div style={{fontSize:12,color:C.muted,marginTop:5,lineHeight:1.5,...SANS}}>{note}</div>}
  </div>;
}

// ─── DECREE GENERATOR ─────────────────────────────────────────────────────────
function generateDecree(data, stateInfo) {
  const d = data;
  const si = stateInfo || {};
  const isProposer = true;
  const type = d.relType?.includes("marriage") ? "MARRIAGE"
             : d.relType?.includes("union") ? "CIVIL UNION"
             : "DOMESTIC PARTNERSHIP";

  return `IN THE ${(d.court||"[COUNTY]").toUpperCase()} COURT

Case No.: ${d.caseNum||"_____________________"}

IN RE THE ${type} OF:

${d.yourName||"[YOUR NAME]"},
      Petitioner,

and

${d.partnerName||"[PARTNER NAME]"},
      Respondent.

─────────────────────────────────────────────────
PROPOSED DECREE OF DISSOLUTION
(Draft prepared by Petitioner — for discussion)
─────────────────────────────────────────────────

This document reflects the positions and proposals of ${d.yourName||"Petitioner"}.
It is a starting point for discussion — not a final agreement.
${d.partnerName||"Respondent"} may prepare their own version independently.
Where both versions agree, those terms are ready to finalize.
Where they differ, those issues are the agenda for mediation.

The ${d.relType?.includes("marriage")?"marriage":"union"} of ${d.yourName||"Petitioner"} and ${d.partnerName||"Respondent"},
entered ${d.married||"[DATE]"}, is proposed to be DISSOLVED.
Date of separation: ${d.separated||"[DATE]"}.

${d.hasKids==="yes" ? `
I. MINOR CHILDREN
${d.kidNames||"[See attached]"}

Legal Custody — Proposed:
${d.legalCust||"[To be determined]"}

Physical Custody — Proposed:
${d.physCust||"[To be determined]"}

Parenting Schedule — Proposed:
${d.schedule||"[To be discussed]"}

Child Support — Proposed:
${d.support||"Per state guidelines"}${d.supportAmt ? `\n${d.supportAmt}` : ""}
` : "I. MINOR CHILDREN\nNo minor children, or all children are emancipated.\n"}

II. REAL PROPERTY
${d.homeOwn==="yes" ? (d.homeDisp||"[To be discussed]") : "No marital real estate, or addressed separately."}

III. VEHICLES
${d.vehicles||"[To be discussed]"}

IV. FINANCIAL ACCOUNTS
${d.accounts||"[To be discussed]"}

V. RETIREMENT ACCOUNTS
${d.retire||"[To be discussed]"}

VI. DEBTS
${d.debts||"[To be discussed]"}

${d.otherProp ? `VII. OTHER PROPERTY\n${d.otherProp}\n` : ""}
VIII. SPOUSAL SUPPORT — PROPOSED
${d.alimony||"None — both parties waive."}${d.aliAmt ? `\n${d.aliAmt}` : ""}

IX. HEALTH INSURANCE
Children's coverage: ${d.kidsHealth||"N/A"}

${d.nameChange && d.nameChange !== "No name change" ? `X. NAME RESTORATION\n${d.nameChange}${d.formerName ? `\nName: ${d.formerName}` : ""}\n` : ""}
${d.notes ? `NOTES FROM ${(d.yourName||"PETITIONER").toUpperCase()}\n${d.notes}\n` : ""}
─────────────────────────────────────────────────
NEXT STEPS

1. Send this document to ${d.partnerName||"your partner"}.
   Ask them to complete their own version at chosenfam.com.

2. Compare your two versions.
   Where you agree → those terms are ready to finalize.
   Where you differ → those are the topics for a mediation session.

3. Book a session if you need one.
   1 session: $400 · 3-session bundle: $1,100 · Full Decree Package: $1,800
   chosenfam.love/sessions

Filing information for ${si.n||"your state"}:
Residency required: ${si.res||"varies"}
Waiting period: ${si.wait||"varies"}
Filing fee: ${si.fee||"varies"}
Self-help: ${si.sh||"see your state court website"}
─────────────────────────────────────────────────
Generated by ChosenFam · chosenfam.com
This is a discussion draft — not a legal filing.
Have your final decree reviewed before submission.
─────────────────────────────────────────────────`.trim();
}

// ─── HEART TO HEART COMPONENT ─────────────────────────────────────────────────
function HeartToHeart({ onNavigate }) {
  const [sec, setSec] = useState("intro");

  const sections = [
    { id:"intro",   label:"The truth"          },
    { id:"weapons", label:"Children & conflict" },
    { id:"coop",    label:"Shared costs"        },
    { id:"broken",  label:"Broken vs. at war"   },
  ];

  const weaponsBlocks = [
    {
      title:"The loyalty bind",
      body: `Every time a child hears something negative about a parent — every time they're asked to carry a message, or watch one parent's face change when the other is mentioned — that child learns that loving both people is dangerous.

They start managing their parents' feelings instead of being children. That's not a metaphor. That's a developmental harm that shows up in therapy years later. In their relationships. In how they trust. In how they parent their own children.`,
    },
    {
      title:"The cruelty is usually quiet",
      body: `The sighing when the other parent is mentioned. The questions that fish for information. The subtle looks when a child says they had fun. The "of course she would do that" said without thinking. The birthday scheduled over the other parent's weekend. The support withheld when things get tense.

None of these feel like weapons in the moment. All of them land like weapons in the child.`,
    },
    {
      title:"What children actually need to hear",
      body: `"Your mom loves you. I love you. We both love you. We made an adult decision that has nothing to do with you. You did not cause this. You cannot fix this. Your only job is to be a kid. We will both always be your parents. That part doesn't change."

Children can survive a separation. What they cannot survive easily is watching two people they love destroy each other.`,
    },
    {
      title:"The one question worth asking yourself",
      body: `Before every decision, every message, every thing you tell your children or your attorney:

"Is this in my child's interest — or is this in my interest dressed up as my child's interest?"

Those two things feel identical when you're activated. They are not identical. The willingness to tell the difference is one of the most important things you can do for your children right now.`,
    },
  ];

  const coopBlocks = [
    {
      title:"The honest framing",
      body: `The cost of raising children doesn't belong to one parent or the other. It belongs to both of you.

You made them together. They need to eat, be housed, go to school, see doctors, play sports, wear shoes, and have birthday parties in both of your homes.

That's not a support obligation. That's parenthood.`,
    },
    {
      title:"What cooperative cost-sharing looks like",
      body: `Some families open a shared account — the kids account. Both parents contribute monthly based on their income. Childcare, medical co-pays, school supplies, activities — all come from there. Both parents can see the statements.

The money lives outside the conflict. The kids benefit from both parents' income without anyone keeping score.`,
    },
    {
      title:"What courts will actually approve",
      body: `Judges will approve any financial arrangement you both agree to, as long as the children's documented needs are being met.

The state formula is a baseline for conflict. It is not a ceiling on cooperation.

The only people who live inside the state formula are people who couldn't agree on anything else.`,
    },
  ];

  const brokenBlocks = [
    {
      head:"It's not the separation that harms children.",
      color:C.sage,
      body: `Decades of research are clear. Children of divorce are not destined to struggle. Children raised in cooperative separated households do as well as — and sometimes better than — children in intact high-conflict homes.

The variable isn't the family structure. It's whether the adults around them are at war.`,
    },
    {
      head:"What harms children is witnessed conflict.",
      color:C.rose,
      body: `Arguments overheard. Tension felt at every handoff. One parent refusing to speak to the other. The holiday weaponized. The parent who can't say the other's name without their body changing.

Children are exquisitely sensitive to parental distress. They don't need to hear the words. They read everything else.`,
    },
    {
      head:"What protects children is cooperation — even imperfect cooperation.",
      color:C.navy,
      body: `Separated parents who are civil to each other at pickup. Who can sit on the same bleachers. Who can call about a sick child without it becoming something else.

None of this requires liking each other. It requires choosing, repeatedly, to put the child in front of the conflict.`,
    },
    {
      head:"The long game.",
      color:C.gold,
      body: `Your children will grow up. They will remember how this felt — not the terms of the custody agreement, but the felt sense of whether they were safe. Whether the people who loved them most could be decent to each other.

They will bring this into their own relationships. Their own conflicts. Their own families.

How you do this is one of the most important things you'll ever model for them.

That's the long game. That's the one worth playing.`,
    },
  ];

  return (
    <div>
      <div style={{ display:"flex", gap:6, marginBottom:20, overflowX:"auto", scrollbarWidth:"none" }}>
        {sections.map(s => (
          <button key={s.id} onClick={() => setSec(s.id)} style={{
            padding:"8px 14px", borderRadius:30, border:"none", cursor:"pointer",
            fontSize:12, fontWeight:600, whiteSpace:"nowrap",
            background: sec===s.id ? C.clay : C.warm,
            color: sec===s.id ? C.white : C.muted,
            transition:"all 0.15s", ...SANS,
          }}>{s.label}</button>
        ))}
      </div>

      {sec === "intro" && (
        <div>
          <div style={{ ...SERIF, fontSize:28, color:C.navy, lineHeight:1.25, marginBottom:16, fontWeight:600 }}>
            A heart-to-heart<br/>before anything else.
          </div>
          <div style={{ width:40, height:3, background:C.gold, borderRadius:2, marginBottom:24 }} />
          <Card bg={C.clayPl} accent="rgba(106,56,24,0.2)" style={{ marginBottom:20 }}>
            <div style={{ ...SERIF, fontSize:20, color:C.clay, lineHeight:1.6, fontStyle:"italic", marginBottom:12 }}>
              "Better to come from a broken home<br/>than to live in one."
            </div>
            <div style={{ fontSize:14, color:C.body, lineHeight:1.8, ...SANS }}>
              That line is true. And it comes with a responsibility.
              The separation isn't what harms children. The conflict is.
              Which means how you do this matters as much as that you do it.
            </div>
          </Card>
          <div style={{ fontSize:15, color:C.body, lineHeight:1.85, marginBottom:20, ...SANS }}>
            ChosenFam is built to help you end a marriage — not to win one.
            There are things that need to be said plainly before you build any legal document,
            calculate any support figure, or negotiate anything. This is that conversation.
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {sections.slice(1).map(s => (
              <button key={s.id} onClick={() => setSec(s.id)} style={{
                display:"flex", alignItems:"center", justifyContent:"space-between",
                padding:"14px 18px", borderRadius:14, border:`1px solid ${C.border}`,
                background:C.white, color:C.ink, cursor:"pointer", fontSize:14, ...SANS,
              }}>
                <span style={{ fontWeight:600 }}>{s.label}</span>
                <span style={{ color:C.muted }}>→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {sec === "weapons" && (
        <div>
          <div style={{ ...SERIF, fontSize:26, color:C.navy, marginBottom:4, fontWeight:600 }}>Children and conflict.</div>
          <div style={{ fontSize:14, color:C.muted, marginBottom:20, ...SANS }}>This is the hardest section. It needs to be said.</div>
          <Card bg={C.rosePl} accent="rgba(140,32,48,0.18)" style={{ marginBottom:16 }}>
            <div style={{ ...SERIF, fontSize:17, color:C.rose, lineHeight:1.65, marginBottom:12 }}>
              Almost no one who does this knows they're doing it.
            </div>
            <div style={{ fontSize:14, color:C.body, lineHeight:1.8, ...SANS }}>
              They think they're protecting their children. Their anger may be completely righteous.
              None of that changes what happens to the child who is placed in the middle of it.
            </div>
          </Card>
          {weaponsBlocks.map((b, i) => (
            <Card key={i} style={{ marginBottom:12 }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", color:C.muted, marginBottom:8, ...SANS }}>{b.title}</div>
              <div style={{ ...SERIF, fontSize:14, color:C.body, lineHeight:1.85, whiteSpace:"pre-line" }}>{b.body}</div>
            </Card>
          ))}
          <Card bg={C.navy}>
            <div style={{ ...SERIF, fontSize:17, color:C.white, lineHeight:1.65, fontStyle:"italic", marginBottom:10 }}>
              Your children are watching you to learn what people do when something is hard and they're in pain.
            </div>
            <div style={{ fontSize:14, color:"rgba(255,255,255,0.7)", lineHeight:1.75, ...SANS }}>
              That's not a guilt trip. That's an invitation. How you do this is one of the most important things you'll ever model for them.
            </div>
          </Card>
        </div>
      )}

      {sec === "coop" && (
        <div>
          <div style={{ ...SERIF, fontSize:26, color:C.navy, marginBottom:4, fontWeight:600 }}>Children are a shared project.</div>
          <div style={{ fontSize:14, color:C.muted, marginBottom:20, ...SANS }}>A different way to think about the money.</div>
          <Card bg={C.sagePl} accent="rgba(46,92,58,0.15)" style={{ marginBottom:16 }}>
            <div style={{ ...SERIF, fontSize:17, color:C.sage, lineHeight:1.65, marginBottom:12 }}>
              The current child support system was designed for adversarial situations.
            </div>
            <div style={{ fontSize:14, color:C.body, lineHeight:1.8, ...SANS }}>
              When cooperation is possible — even partially — there is a better framework.
            </div>
          </Card>
          {coopBlocks.map((b, i) => (
            <Card key={i} style={{ marginBottom:12 }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", color:C.muted, marginBottom:8, ...SANS }}>{b.title}</div>
              <div style={{ ...SERIF, fontSize:14, color:C.body, lineHeight:1.85, whiteSpace:"pre-line" }}>{b.body}</div>
            </Card>
          ))}
          <button onClick={() => onNavigate("build")} style={{
            width:"100%", padding:"13px", borderRadius:40, border:"none",
            background:`linear-gradient(135deg,${C.sage},#3C7848)`,
            color:C.white, fontSize:14, fontWeight:700, cursor:"pointer", ...SANS,
            boxShadow:`0 4px 16px rgba(46,92,58,0.25)`, marginTop:8,
          }}>Start building the decree →</button>
        </div>
      )}

      {sec === "broken" && (
        <div>
          <div style={{ ...SERIF, fontSize:26, color:C.navy, marginBottom:4, fontWeight:600 }}>Broken home. Or at war.</div>
          <div style={{ fontSize:14, color:C.muted, marginBottom:20, ...SANS }}>What the research actually shows.</div>
          <Card bg={C.goldPl} accent="rgba(176,112,16,0.2)" style={{ marginBottom:16 }}>
            <div style={{ ...SERIF, fontSize:22, color:C.gold, lineHeight:1.5, fontStyle:"italic" }}>
              "Better to come from a broken home than to live in one."
            </div>
          </Card>
          {brokenBlocks.map((b, i) => (
            <Card key={i} style={{ marginBottom:12, borderLeft:`4px solid ${b.color}` }}>
              <div style={{ ...SERIF, fontSize:16, color:b.color, marginBottom:10, lineHeight:1.4 }}>{b.head}</div>
              <div style={{ ...SERIF, fontSize:14, color:C.body, lineHeight:1.85, whiteSpace:"pre-line" }}>{b.body}</div>
            </Card>
          ))}
          <Card bg={C.navy} style={{ marginBottom:20 }}>
            <div style={{ ...SERIF, fontSize:18, color:C.white, lineHeight:1.7, fontStyle:"italic", marginBottom:12 }}>
              "I would rather look back knowing I could have been ruthless than look back wishing I hadn't been."
            </div>
            <div style={{ fontSize:14, color:"rgba(255,255,255,0.7)", lineHeight:1.75, ...SANS }}>
              That choice is available to you right now. Every decision in this process is a chance to make it.
            </div>
          </Card>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <button onClick={() => onNavigate("build")} style={{
              padding:"13px", borderRadius:40, border:"none",
              background:`linear-gradient(135deg,${C.navy},${C.navyMid})`,
              color:C.white, fontSize:14, fontWeight:700, cursor:"pointer", ...SANS,
              boxShadow:`0 4px 16px rgba(24,56,90,0.25)`,
            }}>Start building my decree →</button>
            <button onClick={() => window.open("https://calendly.com/thelovewarrior/chosen-fam-discovery-call","_blank")} style={{
              padding:"13px", borderRadius:40, border:`1.5px solid ${C.teal}`,
              background:"transparent", color:C.teal,
              fontSize:13, fontWeight:700, cursor:"pointer", ...SANS,
            }}>Book a free discovery call →</button>
          </div>
        </div>
      )}
    </div>
  );
}


// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const NAV = [
  { id:"home",    label:"Home",     icon:"⚖" },
  { id:"heart",   label:"Heart",    icon:"♡" },
  { id:"build",   label:"Build",    icon:"📋" },
  { id:"compare", label:"Compare",  icon:"◎" },
  { id:"sessions",label:"Sessions", icon:"🌿" },
  { id:"plans",   label:"Plans",    icon:"✦" },
  { id:"terms",   label:"Terms",    icon:"◈" },
];

// ─── CONFIG — replace these with your real links ─────────────────────────────
const STRIPE = {
  doc:     "https://buy.stripe.com/dRm4gyh0GgpOarP3JdgUM04",     // $29 court-ready PDF
  review:  "https://buy.stripe.com/cNicN411I4H66bz5RlgUM03",    // $149 mediator document review
  session: "https://buy.stripe.com/aFa8wO6m2ddC57vcfJgUM00",    // $400 single session
  bundle:  "https://buy.stripe.com/7sY14mcKq2yY6bz6VpgUM02",   // $1,100 3-session bundle
  package: "https://buy.stripe.com/dRm00ih0GgpO9nL5RlgUM01",   // $1,800 decree package
};
const CALENDLY = "https://calendly.com/thelovewarrior/chosen-fam-mediation-session";
const DISCOVERY = "https://calendly.com/thelovewarrior/chosen-fam-discovery-call"; // your Calendly booking URL
const EMAIL = "hello@chosenfam.love";

// ─── PROMO CODES ──────────────────────────────────────────────────────────────
const PROMO_CODES = {
  "LOVEFIRST": { discount:0.50, label:"50% off", desc:"Love First — 50% off any service" },
  "CHOSEN10":  { discount:0.10, label:"10% off", desc:"ChosenFam — 10% off any service" },
};
const PRICES = { doc:29, review:149, session:400, bundle:1100, package:1800 };

export default function ChosenFam() {
  const [screen, setScreen] = useState("home");
  const [state,  setState]  = useState("");
  const [secIdx, setSI]     = useState(-1);
  const [data,   setData]   = useState({});
  const [showDecree, setSD] = useState(false);
  const [partnerLink, setPL] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailSent, setES]  = useState(false);
  const [partnerEmail, setPE] = useState("");
  const [showPDFModal, setSPDF]   = useState(false);
  const [pdfEmail, setPDFEmail]   = useState("");
  const [pdfSubmitted, setPDFSub] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [promoInput, setPromoIn]  = useState("");
  const [promoApplied, setPromoA] = useState(null);
  const [promoError, setPromoErr] = useState("");
  const [tosAgreed,  setTosAgreed] = useState(false);
  const [showTosModal, setSTos]    = useState(false);

  const set = (id, v) => setData(d => ({ ...d, [id]: v }));
  const si  = STATES[state];
  const completedSections = DECREE_SECTIONS.filter(s =>
    s.fields.some(f => data[f.id])
  ).length;
  const progress = Math.round((completedSections / DECREE_SECTIONS.length) * 100);

  const decree = generateDecree(data, si);

  // Promo code handler
  const applyPromo = () => {
    const code_upper = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code_upper]) {
      setPromoA({ code: code_upper, ...PROMO_CODES[code_upper] });
      setPromoErr("");
    } else {
      setPromoErr("That code isn't valid. Try LOVEFIRST or CHOSEN50.");
      setPromoA(null);
    }
  };

  // Discounted price helper
  const discountedPrice = (key) => {
    if (!promoApplied) return PRICES[key];
    return Math.round(PRICES[key] * (1 - promoApplied.discount));
  };

  // Open Stripe with promo awareness
  // Since Stripe handles coupons server-side, we show the discounted price
  // and include a note — you manually honour it by refunding the difference
  // until you set up Stripe coupons in the dashboard
  const openStripe = (key) => {
    const link = STRIPE[key];
    if (!link || link.startsWith("YOUR_")) {
      window.open("mailto:" + EMAIL + "?subject=ChosenFam Session Booking", "_blank");
      return;
    }
    if (promoApplied) {
      // Open with promo note in URL for tracking
      window.open(link + "?client_reference_id=" + promoApplied.code, "_blank");
    } else {
      window.open(link, "_blank");
    }
  };

  const copyDecree = () => {
    navigator.clipboard?.writeText(decree);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const sendLink = () => {
    setPL(true);
  };

  const sendEmail = () => {
    const subject = encodeURIComponent(`${data.yourName||"Your partner"} has shared a ChosenFam decree draft with you`);
    const body = encodeURIComponent(
      `Hi,\n\n${data.yourName||"Your partner"} has filled out a proposed divorce decree on ChosenFam and is sharing it with you.\n\n` +
      `You can fill out your own version independently at:\nhttps://chosenfam.love/build\n\n` +
      `When you're both done, you'll be able to compare your two versions and see where you agree and where you'd benefit from a conversation.\n\n` +
      `No pressure. No login required. It's free.\n\n— ChosenFam`
    );
    window.open(`mailto:${partnerEmail}?subject=${subject}&body=${body}`);
    setES(true);
  };

  return (
    <div style={{ fontFamily:"'DM Sans',system-ui,sans-serif", background:C.bg, minHeight:"100vh", color:C.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        .enter{animation:fadeUp 0.42s ease both;}
        ::-webkit-scrollbar{width:4px;height:3px}
        ::-webkit-scrollbar-thumb{background:${C.border};border-radius:4px}
        select,textarea,input{outline:none;}
      `}</style>

      {/* HEADER */}
      <header style={{ background:C.navy, height:52, display:"flex", alignItems:"center",
        justifyContent:"space-between", padding:"0 18px", position:"sticky", top:0, zIndex:100,
        boxShadow:"0 2px 14px rgba(24,56,90,0.3)" }}>
        <button onClick={()=>{setScreen("home");setSI(-1);}} style={{
          display:"flex", alignItems:"center", gap:10,
          background:"transparent", border:"none", cursor:"pointer", padding:0,
        }}>
          <img src="/logo.png" alt="Chosen Fam Mediation"
            style={{ height:38, width:38, borderRadius:"50%", objectFit:"cover",
              background:"white", flexShrink:0 }} />
          <div>
            <div style={{ ...SERIF, fontSize:18, color:C.white, fontWeight:600, letterSpacing:0.3 }}>Chosen Fam</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.5)", letterSpacing:2, textTransform:"uppercase" }}>
              Listen · Understand · Resolve · Together
            </div>
          </div>
        </button>
        {progress > 0 && screen === "build" && (
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.goldLt }}>{progress}%</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.4)", letterSpacing:1 }}>COMPLETE</div>
          </div>
        )}
      </header>

      {/* NAV */}
      <nav style={{ background:C.white, borderBottom:`1px solid ${C.border}`,
        display:"flex", overflowX:"auto", scrollbarWidth:"none" }}>
        {NAV.map(n => (
          <button key={n.id} onClick={()=>{setScreen(n.id);setSI(-1);}} style={{
            padding:"12px 16px", border:"none", cursor:"pointer",
            background:"transparent", fontSize:12, fontWeight:600,
            color:screen===n.id ? C.navy : C.muted, whiteSpace:"nowrap",
            borderBottom:`2.5px solid ${screen===n.id ? C.navy : "transparent"}`,
            transition:"all 0.15s", ...SANS,
          }}>{n.icon} {n.label}</button>
        ))}
      </nav>

      {/* Progress bar when building */}
      {screen === "build" && secIdx >= 0 && (
        <div style={{ background:C.navy, padding:"0 18px 10px" }}>
          <div style={{ background:"rgba(255,255,255,0.12)", borderRadius:4, height:4 }}>
            <div style={{ width:`${progress}%`, height:"100%", borderRadius:4,
              background:`linear-gradient(90deg,${C.goldLt},${C.goldMid})`,
              transition:"width 0.4s ease" }} />
          </div>
        </div>
      )}

      <main style={{ maxWidth:560, margin:"0 auto", padding:"24px 18px 60px" }}>

        {/* ════ HOME ════════════════════════════════════════════════════ */}
        {screen === "home" && (
          <div className="enter">
            <div style={{ textAlign:"center", paddingTop:8, marginBottom:32 }}>
              <div style={{ ...SERIF, fontSize:32, color:C.navy, lineHeight:1.2, marginBottom:12, fontWeight:600 }}>
                Write your own<br/>divorce decree.
              </div>
              <p style={{ fontSize:15, color:C.body, lineHeight:1.75, maxWidth:340, margin:"0 auto 24px" }}>
                In every US state, you can file your own divorce decree without an attorney.
                Fill out your version. Send it to your partner. Compare. Resolve.
              </p>
              <Btn v="navy" onClick={()=>setScreen("build")} style={{ maxWidth:320 }}>
                Start building my decree →
              </Btn>
              <button onClick={() => window.open(DISCOVERY, "_blank")} style={{
                maxWidth:320, margin:"0 auto",
                display:"block", padding:"11px 22px", borderRadius:40,
                border:`1px solid ${C.muted}`,
                background:"transparent", color:C.muted,
                fontSize:13, cursor:"pointer",
                fontFamily:"'DM Sans',sans-serif",
              }}>
                Not sure where to start? Book a free 15-min call
              </button>
            </div>

            {/* How it works */}
            <Card style={{ marginBottom:20 }}>
              <Lbl>How it works</Lbl>
              {[
                { n:"1", title:"You fill out your version", desc:"Work through the decree builder at your own pace. All 50 states. Takes 15–30 minutes.", color:C.navy },
                { n:"2", title:"Send it to your partner", desc:"They get a link to fill out their own version independently. No login required. No pressure.", color:C.teal },
                { n:"3", title:"Compare the two versions", desc:"See exactly where you agree and where you don't. That gap map is the agenda for a conversation.", color:C.sage },
                { n:"4", title:"Resolve and file", desc:"Where you agree, those terms are ready to go. Where you differ, one session usually closes the gap.", color:C.gold },
              ].map((s, i) => (
                <div key={s.n} style={{ display:"flex", gap:14, padding:"12px 0",
                  borderTop:i>0 ? `1px solid ${C.warm}` : "none" }}>
                  <div style={{ width:32, height:32, borderRadius:"50%", flexShrink:0,
                    background:s.color, display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:13, color:C.white, fontWeight:800, ...SANS }}>{s.n}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:14, color:s.color, marginBottom:3 }}>{s.title}</div>
                    <div style={{ fontSize:13, color:C.body, lineHeight:1.6 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </Card>

            {/* The cost frame */}
            <Card bg={C.sagePl} accent="rgba(46,92,58,0.15)" style={{ marginBottom:20 }}>
              <div style={{ ...SERIF, fontSize:18, color:C.sage, marginBottom:10 }}>
                You don't have to battle this in court.
              </div>
              <div style={{ fontSize:13, color:C.body, lineHeight:1.75 }}>
                The average contested divorce costs <strong style={{ color:C.rose }}>$47,000</strong> and
                takes <strong style={{ color:C.rose }}>18 months</strong>. Every agreement you reach
                together — on custody, support, property — keeps those decisions in your hands.
                Judges approve mutual agreements in almost every case.
                <strong style={{ color:C.sage }}> You have far more autonomy than you think.</strong>
              </div>
            </Card>

            {/* Features strip */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 }}>
              {[
                { icon:"◎", label:"All 50 states", note:"State-specific filing info" },
                { icon:"✦", label:"Free to build", note:"Pay only for extras" },
                { icon:"🌿", label:"Domestic partnerships", note:"Civil unions included" },
                { icon:"⚖", label:"All family types", note:"LGBTQ+ · Poly · Blended" },
              ].map(f => (
                <div key={f.label} style={{ background:C.white, borderRadius:12,
                  border:`1px solid ${C.border}`, padding:"12px 14px" }}>
                  <div style={{ fontSize:18, marginBottom:4 }}>{f.icon}</div>
                  <div style={{ fontWeight:700, fontSize:13, color:C.ink }}>{f.label}</div>
                  <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{f.note}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize:12, color:C.muted, textAlign:"center", lineHeight:1.7,
              fontStyle:"italic" }}>
              ChosenFam generates legal templates and educational guidance.<br/>
              This is legal orientation — not legal advice.<br/>
              Have your final decree reviewed by a legal aid org before filing.
            </div>
          </div>
        )}

        {/* ════ BUILD ═══════════════════════════════════════════════════ */}
        {screen === "build" && (
          <div className="enter">
            {secIdx === -1 && (
              <div>
                <div style={{ ...SERIF, fontSize:26, color:C.navy, marginBottom:4, fontWeight:600 }}>
                  Build Your Decree
                </div>
                <div style={{ fontSize:14, color:C.muted, marginBottom:20 }}>
                  Fill out each section with your proposed terms. Be honest — this is your starting position, not a final answer.
                </div>

                {/* State selector */}
                <Card style={{ marginBottom:16 }}>
                  <Lbl>Select your filing state</Lbl>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:si?12:0 }}>
                    {Object.entries(STATES).map(([code]) => (
                      <button key={code} onClick={() => setState(code)} style={{
                        padding:"5px 10px", borderRadius:6, fontSize:12, fontWeight:600,
                        border:`1.5px solid ${state===code?C.navy:C.border}`,
                        background:state===code?C.navy:C.white,
                        color:state===code?C.white:C.body,
                        cursor:"pointer", transition:"all 0.12s",
                      }}>{code}</button>
                    ))}
                  </div>
                  {si && (
                    <div style={{ marginTop:10, padding:"12px 14px", background:C.navyLt,
                      borderRadius:10, border:`1px solid rgba(36,80,128,0.12)` }}>
                      <div style={{ ...SERIF, fontSize:16, color:C.navy, marginBottom:8 }}>{si.n}</div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
                        {[["Residency",si.res],["Waiting period",si.wait],["Filing fee",si.fee],["Pro se","✓ Allowed"]].map(([l,v]) => (
                          <div key={l} style={{ background:C.white, borderRadius:8, padding:"8px 10px" }}>
                            <div style={{ fontSize:10, color:C.muted, marginBottom:2 }}>{l}</div>
                            <div style={{ fontSize:13, fontWeight:600, color:C.ink }}>{v}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ fontSize:12, color:C.body, lineHeight:1.6, marginBottom:6 }}>{si.note}</div>
                      {(si.dp||si.cu) && (
                        <div style={{ fontSize:12, color:C.sage, padding:"8px 10px",
                          background:C.sagePl, borderRadius:8 }}>
                          ✓ {si.dpNote||si.cuNote}
                        </div>
                      )}
                      {!si.dp && !si.cu && (
                        <div style={{ fontSize:12, color:C.rose, padding:"8px 10px",
                          background:C.rosePl, borderRadius:8 }}>
                          Note: {si.n} doesn't have a domestic partnership registry. Unregistered partners should address property via cohabitation agreement and custody via a separate filing.
                        </div>
                      )}
                    </div>
                  )}
                </Card>

                {/* Section list */}
                <Lbl>Decree sections</Lbl>
                {DECREE_SECTIONS.map((sec, i) => {
                  const filled = sec.fields.filter(f => data[f.id]).length;
                  return (
                    <Card key={sec.id} style={{ marginBottom:8, cursor:"pointer",
                      display:"flex", gap:14, alignItems:"center", padding:"14px 18px" }}
                      onClick={() => setSI(i)}>
                      <div style={{ fontSize:22, flexShrink:0 }}>{sec.icon}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:600, fontSize:14, color:C.ink }}>{sec.title}</div>
                        <div style={{ fontSize:12, color:C.muted, marginTop:1 }}>{sec.desc}</div>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        {filled > 0 && (
                          <div style={{ fontSize:11, color:C.sage, fontWeight:700,
                            background:C.sagePl, padding:"3px 10px", borderRadius:20 }}>
                            {filled} filled
                          </div>
                        )}
                        <span style={{ color:C.muted, fontSize:16 }}>→</span>
                      </div>
                    </Card>
                  );
                })}

                {/* Generate / send */}
                <div style={{ marginTop:16, display:"flex", flexDirection:"column", gap:10 }}>
                  {/* ToS checkbox */}
                  <div style={{ background:C.navyLt, borderRadius:12, padding:"14px 16px",
                    border:`1px solid rgba(36,80,128,0.15)` }}>
                    <div onClick={()=>setTosAgreed(t=>!t)}
                      style={{ display:"flex", gap:12, alignItems:"flex-start", cursor:"pointer" }}>
                      <div style={{ width:20, height:20, borderRadius:5, flexShrink:0, marginTop:1,
                        background:tosAgreed?C.sage:"transparent",
                        border:`2px solid ${tosAgreed?C.sage:C.border}`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:12, color:C.white, fontWeight:700, transition:"all 0.15s" }}>
                        {tosAgreed?"✓":""}
                      </div>
                      <div style={{ fontSize:12, color:C.body, lineHeight:1.65 }}>
                        I understand that ChosenFam provides legal orientation — not legal advice —
                        and that no attorney-client relationship is formed. I have read and agree to the{" "}
                        <span onClick={e=>{e.stopPropagation();setSTos(true);}}
                          style={{ color:C.navy, textDecoration:"underline", cursor:"pointer" }}>
                          Terms of Service and Confidentiality Agreement
                        </span>.
                      </div>
                    </div>
                  </div>
                  <Btn v="gold" onClick={() => setSD(true)}
                    disabled={!data.yourName || !tosAgreed}>
                    Generate my decree →
                  </Btn>
                  {!data.yourName && (
                    <div style={{ fontSize:12, color:C.muted, textAlign:"center" }}>
                      Complete at least your name and state to generate.
                    </div>
                  )}
                  {data.yourName && !tosAgreed && (
                    <div style={{ fontSize:12, color:C.muted, textAlign:"center" }}>
                      Please agree to the Terms of Service to continue.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Section editing */}
            {secIdx >= 0 && (
              <div>
                <button onClick={() => setSI(-1)} style={{
                  display:"flex", alignItems:"center", gap:6,
                  background:"transparent", border:"none", color:C.navy,
                  fontSize:13, fontWeight:600, cursor:"pointer", marginBottom:20, padding:0,
                }}>← Back to overview</button>

                <div style={{ ...SERIF, fontSize:24, color:C.navy, marginBottom:4 }}>
                  {DECREE_SECTIONS[secIdx].icon} {DECREE_SECTIONS[secIdx].title}
                </div>
                <div style={{ fontSize:13, color:C.muted, marginBottom:20 }}>
                  {DECREE_SECTIONS[secIdx].desc}
                </div>

                {DECREE_SECTIONS[secIdx].fields.map(f => {
                  if (f.showIf && data[f.showIf] !== "yes") return null;
                  return (
                    <FField key={f.id} label={f.label}>
                      {f.type === "yesno" && (
                        <div style={{ display:"flex", gap:10 }}>
                          {["Yes","No"].map(o => (
                            <button key={o} onClick={() => set(f.id, o.toLowerCase())} style={{
                              flex:1, padding:"11px", borderRadius:10,
                              border:`1.5px solid ${data[f.id]===o.toLowerCase()?C.navy:C.border}`,
                              background:data[f.id]===o.toLowerCase()?C.navy:C.white,
                              color:data[f.id]===o.toLowerCase()?C.white:C.body,
                              fontSize:14, fontWeight:600, cursor:"pointer", transition:"all 0.15s",
                            }}>{o}</button>
                          ))}
                        </div>
                      )}
                      {f.type === "text" && <FInput value={data[f.id]||""} onChange={v=>set(f.id,v)} placeholder={f.placeholder}/>}
                      {f.type === "date" && <FInput type="date" value={data[f.id]||""} onChange={v=>set(f.id,v)}/>}
                      {f.type === "area" && <FInput value={data[f.id]||""} onChange={v=>set(f.id,v)} placeholder={f.placeholder} rows={4}/>}
                      {f.type === "sel"  && <FSel value={data[f.id]||""} onChange={v=>set(f.id,v)} opts={f.opts}/>}
                    </FField>
                  );
                })}

                <div style={{ display:"flex", gap:10, marginTop:8 }}>
                  <Btn v="soft" style={{ flex:"0 0 90px" }}
                    onClick={() => setSI(Math.max(-1, secIdx-1))}>← Back</Btn>
                  <Btn v="navy"
                    onClick={() => setSI(secIdx < DECREE_SECTIONS.length-1 ? secIdx+1 : -1)}>
                    {secIdx < DECREE_SECTIONS.length-1
                      ? `Next: ${DECREE_SECTIONS[secIdx+1].title} →`
                      : "← Back to overview"}
                  </Btn>
                </div>
              </div>
            )}

            {/* DECREE MODAL */}
            {showDecree && (
              <div style={{ position:"fixed", inset:0, background:"rgba(26,23,20,0.7)",
                zIndex:200, display:"flex", alignItems:"flex-start", justifyContent:"center",
                padding:16, overflowY:"auto" }}
                onClick={e => { if(e.target===e.currentTarget) setSD(false); }}>
                <div style={{ background:C.white, borderRadius:18, width:"100%", maxWidth:640,
                  maxHeight:"92vh", overflow:"auto", boxShadow:"0 24px 80px rgba(0,0,0,0.4)" }}>

                  {/* Modal header */}
                  <div style={{ padding:"14px 20px", borderBottom:`1px solid ${C.border}`,
                    position:"sticky", top:0, background:C.white, zIndex:1 }}>
                    <div style={{ ...SERIF, fontSize:16, color:C.navy, marginBottom:2 }}>
                      Your Proposed Decree
                    </div>
                    <div style={{ fontSize:11, color:C.muted }}>{si?.n||"Draft"} · For discussion</div>
                  </div>

                  {/* Decree text */}
                  <pre style={{ padding:"20px 24px", fontSize:12, lineHeight:1.9, color:C.ink,
                    fontFamily:"'Courier New',monospace", whiteSpace:"pre-wrap", wordBreak:"break-word" }}>
                    {decree}
                  </pre>

                  {/* Action footer */}
                  <div style={{ padding:"16px 20px", borderTop:`1px solid ${C.border}`,
                    background:C.panel, display:"flex", flexDirection:"column", gap:12 }}>

                    {/* Header */}
                    <div style={{ ...SERIF, fontSize:18, color:C.navy, fontWeight:600 }}>
                      Your decree is ready. What would you like to do?
                    </div>

                    {/* ── TIER 1: Free copy ── */}
                    <div style={{ background:C.white, borderRadius:14, padding:"14px 16px",
                      border:`1px solid ${C.border}` }}>
                      <div style={{ display:"flex", justifyContent:"space-between",
                        alignItems:"center", marginBottom:6 }}>
                        <div style={{ fontWeight:700, fontSize:14, color:C.ink }}>
                          Copy the text
                        </div>
                        <span style={{ fontSize:12, fontWeight:700, color:C.sage,
                          background:C.sagePl, padding:"2px 10px", borderRadius:20 }}>Free</span>
                      </div>
                      <div style={{ fontSize:12, color:C.muted, marginBottom:10, lineHeight:1.5 }}>
                        Copy the full decree text and paste it into any document editor.
                      </div>
                      <button onClick={copyDecree} style={{
                        width:"100%", padding:"10px", borderRadius:30,
                        border:`1.5px solid ${C.navy}`,
                        background:copied?C.sage:"transparent",
                        color:copied?C.white:C.navy,
                        fontSize:13, fontWeight:700, cursor:"pointer", transition:"all 0.18s",
                        fontFamily:"'DM Sans',sans-serif",
                      }}>
                        {copied ? "✓ Copied to clipboard" : "Copy full decree"}
                      </button>
                    </div>

                    {/* ── TIER 2: $29 Court-Ready PDF ── */}
                    <div style={{ background:C.navyLt, borderRadius:14, padding:"14px 16px",
                      border:`2px solid ${C.navy}` }}>
                      <div style={{ display:"flex", justifyContent:"space-between",
                        alignItems:"center", marginBottom:6 }}>
                        <div style={{ fontWeight:700, fontSize:14, color:C.navy }}>
                          Get the court-ready document
                        </div>
                        <span style={{ ...SERIF, fontSize:16, fontWeight:700, color:C.navy }}>
                          $29
                        </span>
                      </div>
                      <div style={{ fontSize:12, color:C.body, marginBottom:10, lineHeight:1.55 }}>
                        Properly formatted with your county header, signature blocks,
                        page numbers, and filing instructions. Delivered to your inbox
                        within 24 hours.
                      </div>
                      <div style={{ fontSize:11, color:C.muted, marginBottom:10 }}>
                        ◈ Court-formatted document &nbsp;·&nbsp;
                        ◈ Filing checklist &nbsp;·&nbsp;
                        ◈ Cover letter template
                      </div>
                      <button onClick={()=>{ setSD(false); setSPDF(true); }}
                        style={{ width:"100%", padding:"11px", borderRadius:30, border:"none",
                          background:`linear-gradient(135deg,${C.navy},${C.navyMid})`,
                          color:C.white, fontSize:13, fontWeight:700, cursor:"pointer",
                          boxShadow:"0 4px 14px rgba(24,56,90,0.25)",
                          fontFamily:"'DM Sans',sans-serif" }}>
                        Get court-ready document —{" "}
                        {promoApplied
                          ? <span><s style={{opacity:0.6}}>$29</s> ${discountedPrice("doc")}</span>
                          : "$29"} →
                      </button>
                    </div>

                    {/* ── TIER 3: $149 Mediator Review ── */}
                    <div style={{ background:C.goldPl, borderRadius:14, padding:"14px 16px",
                      border:`1px solid rgba(181,120,24,0.25)` }}>
                      <div style={{ display:"flex", justifyContent:"space-between",
                        alignItems:"center", marginBottom:6 }}>
                        <div style={{ fontWeight:700, fontSize:14, color:C.gold }}>
                          Mediator document review
                        </div>
                        <span style={{ ...SERIF, fontSize:16, fontWeight:700, color:C.gold }}>
                          $149
                        </span>
                      </div>
                      <div style={{ fontSize:12, color:C.body, marginBottom:10, lineHeight:1.55 }}>
                        A certified mediator reviews your decree — flags missing clauses,
                        ambiguous language, and anything a judge would question.
                        Marked-up version with plain-English notes within 48 hours.
                      </div>
                      <button onClick={()=>{ setSD(false); openStripe("review"); }}
                        style={{ width:"100%", padding:"11px", borderRadius:30, border:"none",
                          background:`linear-gradient(135deg,${C.gold},${C.goldMid})`,
                          color:C.white, fontSize:13, fontWeight:700, cursor:"pointer",
                          boxShadow:"0 4px 14px rgba(181,120,24,0.25)",
                          fontFamily:"'DM Sans',sans-serif" }}>
                        Get mediator review —{" "}
                        {promoApplied
                          ? <><s style={{opacity:0.6}}>$149</s> ${discountedPrice("review")}</>
                          : "$149"} →
                      </button>
                    </div>

                    {/* ── TIER 4: Sessions ── */}
                    <div style={{ background:C.white, borderRadius:14, padding:"14px 16px",
                      border:`1px solid ${C.border}` }}>
                      <div style={{ fontWeight:700, fontSize:14, color:C.teal, marginBottom:4 }}>
                        Need a real conversation?
                      </div>
                      <div style={{ fontSize:12, color:C.muted, marginBottom:10, lineHeight:1.55 }}>
                        When the decree isn't the problem — the conversation is.
                        Book a live mediation session.
                      </div>
                      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                        <button onClick={()=>{ setSD(false); setScreen("sessions"); }}
                          style={{ flex:1, padding:"10px", borderRadius:30,
                            border:`1.5px solid ${C.teal}`,
                            background:"transparent", color:C.teal,
                            fontSize:12, fontWeight:700, cursor:"pointer",
                            fontFamily:"'DM Sans',sans-serif" }}>
                          See session options
                        </button>
                        <button onClick={()=> window.open(DISCOVERY,"_blank")}
                          style={{ flex:1, padding:"10px", borderRadius:30,
                            border:`1.5px solid ${C.teal}`,
                            background:C.teal, color:C.white,
                            fontSize:12, fontWeight:700, cursor:"pointer",
                            fontFamily:"'DM Sans',sans-serif" }}>
                          Free discovery call →
                        </button>
                      </div>
                    </div>

                    {/* ── Send to partner ── */}
                    {!partnerLink ? (
                      <button onClick={sendLink}
                        style={{ width:"100%", padding:"11px", borderRadius:30,
                          border:`1.5px solid ${C.gold}`,
                          background:"transparent", color:C.gold,
                          fontSize:13, fontWeight:700, cursor:"pointer",
                          fontFamily:"'DM Sans',sans-serif" }}>
                        Send this to my partner →
                      </button>
                    ) : (
                      <div style={{ background:C.white, borderRadius:14, padding:"14px 16px",
                        border:`1px solid ${C.border}` }}>
                        <div style={{ fontWeight:700, fontSize:13, color:C.navy, marginBottom:8 }}>
                          Send to your partner
                        </div>
                        <div style={{ fontSize:12, color:C.body, lineHeight:1.65, marginBottom:10 }}>
                          They fill out their own version independently — free, no login required.
                          Then you compare and see exactly where you agree.
                        </div>
                        <div style={{ marginBottom:10 }}>
                          <Lbl>Their email (optional)</Lbl>
                          <FInput value={partnerEmail} onChange={setPE}
                            placeholder="partner@email.com" type="email"/>
                        </div>
                        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                          {partnerEmail && (
                            <button onClick={sendEmail} style={{
                              flex:1, padding:"10px", borderRadius:30, border:"none",
                              background:`linear-gradient(135deg,${C.gold},${C.goldMid})`,
                              color:C.white, fontSize:12, fontWeight:700, cursor:"pointer",
                              fontFamily:"'DM Sans',sans-serif",
                            }}>
                              {emailSent ? "✓ Sent" : "Send email"}
                            </button>
                          )}
                          <button onClick={() => {
                            navigator.clipboard?.writeText(
                              `Hi,

I've filled out a proposed divorce decree on ChosenFam.
Would you fill out your own version here? It's free and takes 15–30 minutes:

https://chosenfam.love/build

When we're both done we can compare and see where we agree.`
                            );
                          }} style={{
                            flex:1, padding:"10px", borderRadius:30,
                            border:`1.5px solid ${C.border}`,
                            background:"transparent", color:C.body,
                            fontSize:12, fontWeight:600, cursor:"pointer",
                            fontFamily:"'DM Sans',sans-serif",
                          }}>
                            Copy message
                          </button>
                        </div>
                      </div>
                    )}

                    <button onClick={() => setSD(false)}
                      style={{ padding:"10px", borderRadius:30, border:`1px solid ${C.border}`,
                        background:"transparent", color:C.muted, fontSize:12, cursor:"pointer",
                        fontFamily:"'DM Sans',sans-serif" }}>
                      ← Keep editing
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════ COMPARE ═════════════════════════════════════════════════ */}
        {screen === "compare" && (
          <div className="enter">
            <div style={{ ...SERIF, fontSize:26, color:C.navy, marginBottom:4, fontWeight:600 }}>
              Compare Your Versions
            </div>
            <div style={{ fontSize:14, color:C.muted, marginBottom:20, lineHeight:1.65 }}>
              When both parties have filled out their decree, this is where you see where you agree — and where you need a conversation.
            </div>

            <Card bg={C.navyLt} accent="rgba(36,80,128,0.15)" style={{ marginBottom:20 }}>
              <div style={{ fontSize:13, color:C.body, lineHeight:1.75 }}>
                <strong style={{ color:C.navy }}>How this works:</strong><br/>
                You fill out your version. Your partner fills out theirs.
                You each get a PDF copy. You share them with each other — by email, text, or however works.
                Then come here to understand what the gap means and what to do about it.
              </div>
            </Card>

            {/* The gap framework */}
            <Lbl>Reading the gap between two versions</Lbl>
            {[
              {
                label:"Where you agree", icon:"✓", color:C.sage, bg:C.sagePl,
                desc:"Any clause where both versions say the same thing — or close enough — is ready to finalize. You don't need a session for these. Write them down. They're done.",
                example:"If you both wrote 'joint legal custody' → that clause is agreed. Move on.",
              },
              {
                label:"Where you differ on terms", icon:"◎", color:C.gold, bg:C.goldPl,
                desc:"One of you proposed something specific; the other proposed something different. This is a negotiation, not a conflict. One conversation usually closes it.",
                example:"You wrote '$800/month child support.' They wrote '$600/month.' One mediation session, one agreement.",
              },
              {
                label:"Where one of you said 'undecided'", icon:"◈", color:C.teal, bg:C.tealPl,
                desc:"'Undecided' is honest and useful. It means that person needs more information or more conversation before they can commit. Bring those items to a session.",
                example:"They wrote 'undecided' on the holiday schedule. You have a proposal. Start there.",
              },
              {
                label:"Where the gap is large", icon:"⚠", color:C.rose, bg:C.rosePl,
                desc:"Big gaps usually aren't about the clause — they're about the fear or grief underneath it. A mediation session addresses the underlying need, not just the position.",
                example:"You said 'equal parenting time.' They said 'primary with me.' This needs a conversation — and probably one session.",
              },
            ].map((item, i) => (
              <Card key={item.label} bg={item.bg} accent={`${item.color}25`} style={{ marginBottom:12 }}>
                <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", flexShrink:0,
                    background:item.color, display:"flex", alignItems:"center",
                    justifyContent:"center", fontSize:13, color:C.white, fontWeight:800 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:15, color:item.color, marginBottom:6 }}>{item.label}</div>
                    <div style={{ fontSize:13, color:C.body, lineHeight:1.7, marginBottom:8 }}>{item.desc}</div>
                    <div style={{ fontSize:12, color:item.color, fontStyle:"italic",
                      background:C.white, borderRadius:8, padding:"8px 10px" }}>
                      e.g. {item.example}
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            <Card style={{ marginTop:8 }}>
              <div style={{ ...SERIF, fontSize:18, color:C.navy, marginBottom:10 }}>
                The practical next step
              </div>
              <div style={{ fontSize:13, color:C.body, lineHeight:1.75, marginBottom:14 }}>
                Take your two PDFs. Go through them section by section.
                Mark each clause: Agreed / Close / Need to discuss.
                Bring the "need to discuss" list to a mediation session.
                Most couples can get to a signed decree in 1–2 sessions when they come prepared.
              </div>
              <Btn v="sage" onClick={() => setScreen("sessions")}>
                Book a mediation session →
              </Btn>
            </Card>
          </div>
        )}

        {/* ════ SESSIONS ════════════════════════════════════════════════ */}
        {screen === "sessions" && (
          <div className="enter">
            <div style={{ ...SERIF, fontSize:26, color:C.navy, marginBottom:4, fontWeight:600 }}>
              Mediation Sessions
            </div>
            <div style={{ fontSize:14, color:C.muted, marginBottom:20, lineHeight:1.65 }}>
              When the decree isn't the problem — the conversation is. A real person, in your corner, helping you get to resolution.
            </div>

            <Card bg={C.navyLt} accent="rgba(36,80,128,0.15)" style={{ marginBottom:20 }}>
              <div style={{ fontSize:13, color:C.body, lineHeight:1.75 }}>
                Sessions are facilitated by the Love Warrior — certified mediator, somatic practitioner,
                30 years in human potential work. Available via Zoom or in-person (Chicago area).
                Both parties or solo sessions. You set the agenda.
              </div>
            </Card>

            {/* Session options */}
            {[
              {
                name:"Single Session", price:"$400", duration:"90 minutes",
                icon:"◎", color:C.teal, highlight:false,
                desc:"One conversation. One agenda. Best for: a specific issue that's stuck, a first meeting to establish ground rules, or testing the waters.",
                includes:[
                  "90-minute facilitated session (Zoom or in-person)",
                  "Pre-session intake — you tell us the issue",
                  "Session notes sent within 24 hours",
                  "48-hour follow-up support",
                  "Both parties or solo — your choice",
                  "Credit toward the 3-session bundle or Decree Package",
                ],
              },
              {
                name:"3-Session Bundle", price:"$1,100", duration:"Save $100",
                icon:"◈", color:C.navy, highlight:true,
                desc:"Three focused sessions. Best for: working through multiple issues, co-parenting dynamics that need more than one conversation, building a real agreement together.",
                includes:[
                  "3 × 90-minute facilitated sessions",
                  "Session arc: understand → negotiate → finalize",
                  "Notes after each session",
                  "Between-session support",
                  "Priority scheduling",
                  "Credit toward Decree Package",
                ],
              },
              {
                name:"Decree Package", price:"$1,800", duration:"Save $200 · Complete path",
                icon:"✦", color:C.clay, highlight:false,
                desc:"Four sessions, a reviewed decree, and a court-ready PDF. From conflict to filed. The complete path.",
                includes:[
                  "4 × 90-minute mediated sessions",
                  "Court-ready decree PDF",
                  "Paralegal review included",
                  "State-specific filing instructions",
                  "Priority booking within 2 weeks",
                  "Post-package check-in call (30 min)",
                ],
              },
            ].map((session, i) => (
              <div key={session.name} style={{ marginBottom:14, position:"relative",
                border:`${session.highlight?"2px":"1px"} solid ${session.highlight?session.color:C.border}`,
                borderRadius:20, padding:"20px",
                background:session.highlight?C.navyLt:C.white,
                boxShadow:session.highlight?`0 4px 24px rgba(36,80,128,0.15)`:"0 1px 8px rgba(0,0,0,0.05)" }}>
                {session.duration.includes("Save") && (
                  <div style={{ position:"absolute", top:-11, left:20,
                    background:session.highlight ? C.navy : C.clay,
                    color:C.white, fontSize:10, fontWeight:700, padding:"3px 12px",
                    borderRadius:20, letterSpacing:0.5 }}>{session.duration}</div>
                )}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                  <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                    <span style={{ fontSize:20, color:session.color }}>{session.icon}</span>
                    <div>
                      <div style={{ fontWeight:700, fontSize:16, color:session.color }}>{session.name}</div>
                      {!session.duration.includes("Save") && (
                        <div style={{ fontSize:11, color:C.muted, marginTop:1 }}>{session.duration}</div>
                      )}
                    </div>
                  </div>
                  <div>
                    {promoApplied && (
                      <div style={{fontSize:13,color:C.muted,textDecoration:"line-through",textAlign:"right"}}>
                        {session.price}
                      </div>
                    )}
                    <div style={{ ...SERIF, fontSize:24,
                      color:promoApplied?C.sage:session.color, fontWeight:700 }}>
                      {promoApplied
                        ? "$" + ({"$400":discountedPrice("session"),"$1,100":discountedPrice("bundle"),"$1,800":discountedPrice("package")}[session.price]||session.price.replace("$",""))
                        : session.price}
                    </div>
                    {promoApplied && (
                      <div style={{fontSize:10,color:C.sage,fontWeight:700,textAlign:"right"}}>
                        {promoApplied.label}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ fontSize:13, color:C.body, lineHeight:1.65, marginBottom:12 }}>{session.desc}</div>
                {session.includes.map((f, j) => (
                  <div key={j} style={{ fontSize:12, color:C.body, padding:"4px 0",
                    borderTop:j>0 ? `1px solid ${C.warm}` : "none",
                    display:"flex", gap:8 }}>
                    <span style={{ color:session.color, flexShrink:0 }}>◈</span><span>{f}</span>
                  </div>
                ))}
                <button onClick={()=>{
                    const keyMap = {
                      "Single Session": "session",
                      "3-Session Bundle": "bundle",
                      "Decree Package": "package",
                    };
                    const key = keyMap[session.name];
                    if(key) { openStripe(key); }
                    else { window.open(CALENDLY,"_blank"); }
                  }}
                  style={{ width:"100%", marginTop:14, padding:"12px 0", borderRadius:36,
                  border:session.highlight?"none":`1.5px solid ${session.color}`,
                  background:session.highlight?`linear-gradient(135deg,${C.navy},${C.navyMid})`:"transparent",
                  color:session.highlight?C.white:session.color,
                  fontSize:13, fontWeight:700, cursor:"pointer", ...SANS,
                  boxShadow:session.highlight?`0 4px 16px rgba(36,80,128,0.2)`:"none" }}>
                  Book this session →
                </button>
              </div>
            ))}

            {promoApplied && (
              <div style={{ background:C.sagePl, borderRadius:12, padding:"12px 16px",
                border:`1px solid rgba(46,92,58,0.2)`, marginBottom:14,
                display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ fontSize:13, color:C.sage, fontWeight:700 }}>
                  ✓ {promoApplied.label} applied — {promoApplied.code}
                </div>
                <div style={{ fontSize:12, color:C.muted }}>Prices updated above</div>
              </div>
            )}
            {!promoApplied && (
              <div style={{ background:C.goldPl, borderRadius:12, padding:"12px 16px",
                border:`1px solid rgba(181,120,24,0.15)`, marginBottom:14 }}>
                <div style={{ fontSize:12, color:C.gold, fontWeight:700, marginBottom:6 }}>
                  Have a promo code?
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <input value={promoInput} onChange={e=>setPromoIn(e.target.value.toUpperCase())}
                    onKeyDown={e=>e.key==="Enter"&&applyPromo()}
                    placeholder="Enter code" maxLength={20}
                    style={{ flex:1, padding:"9px 12px", borderRadius:10,
                      border:`1px solid ${C.border}`, background:C.white,
                      fontSize:13, color:C.ink, outline:"none",
                      fontFamily:"'DM Sans',sans-serif", textTransform:"uppercase", letterSpacing:1 }}/>
                  <button onClick={applyPromo} style={{
                    padding:"9px 16px", borderRadius:30, border:"none",
                    background:C.gold, color:C.white,
                    fontSize:12, fontWeight:700, cursor:"pointer",
                    fontFamily:"'DM Sans',sans-serif" }}>Apply</button>
                </div>
                {promoError && <div style={{fontSize:11,color:C.rose,marginTop:4}}>{promoError}</div>}
              </div>
            )}
            <div style={{ fontSize:12, color:C.muted, textAlign:"center", lineHeight:1.7,
              fontStyle:"italic", marginBottom:14 }}>
              Not sure which to choose? Start with a free discovery call.<br/>
              15 minutes. We'll figure out what you actually need.
            </div>
            <button onClick={() => window.open(DISCOVERY, "_blank")} style={{
              width:"100%", padding:"13px", borderRadius:40,
              border:`1.5px solid ${C.teal}`,
              background:"transparent", color:C.teal,
              fontSize:13, fontWeight:700, cursor:"pointer",
              fontFamily:"'DM Sans',sans-serif",
            }}>
              Book a free 15-min discovery call →
            </button>
          </div>
        )}

        {/* ════ PLANS ═══════════════════════════════════════════════════ */}
        {screen === "plans" && (
          <div className="enter">
            <div style={{ ...SERIF, fontSize:26, color:C.navy, marginBottom:4, fontWeight:600 }}>
              Plans & Pricing
            </div>
            <div style={{ fontSize:14, color:C.muted, marginBottom:8, lineHeight:1.65 }}>
              Start free. Add what you need.
            </div>

            <Card bg={C.navyLt} accent="rgba(36,80,128,0.15)" style={{ marginBottom:16 }}>
              <div style={{ fontSize:13, color:C.body, lineHeight:1.75 }}>
                Average contested divorce: <strong style={{ color:C.rose }}>$47,000</strong> over 18 months.
                Our complete Decree Package: <strong style={{ color:C.sage }}>$1,800</strong>.
                The decree builder is always free.
              </div>
            </Card>

            {/* ── PROMO CODE BLOCK ── */}
            {!promoApplied ? (
              <div style={{ background:C.goldPl, borderRadius:14, padding:"14px 16px",
                border:`1px solid rgba(181,120,24,0.2)`, marginBottom:16 }}>
                <div style={{ fontWeight:700, fontSize:13, color:C.gold, marginBottom:6 }}>
                  Have a promo code?
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <input value={promoInput} onChange={e=>setPromoIn(e.target.value.toUpperCase())}
                    onKeyDown={e=>e.key==="Enter"&&applyPromo()}
                    placeholder="Enter code" maxLength={20}
                    style={{ flex:1, padding:"10px 14px", borderRadius:10,
                      border:`1.5px solid ${promoError?C.rose:C.border}`,
                      background:C.white, fontSize:14, color:C.ink, outline:"none",
                      fontFamily:"'DM Sans',sans-serif", textTransform:"uppercase",
                      letterSpacing:1 }}/>
                  <button onClick={applyPromo} style={{
                    padding:"10px 18px", borderRadius:30, border:"none",
                    background:`linear-gradient(135deg,${C.gold},${C.goldMid})`,
                    color:C.white, fontSize:13, fontWeight:700, cursor:"pointer",
                    fontFamily:"'DM Sans',sans-serif" }}>
                    Apply
                  </button>
                </div>
                {promoError && (
                  <div style={{ fontSize:12, color:C.rose, marginTop:6 }}>{promoError}</div>
                )}
              </div>
            ) : (
              <div style={{ background:C.sagePl, borderRadius:14, padding:"14px 16px",
                border:`1px solid rgba(46,92,58,0.2)`, marginBottom:16,
                display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:13, color:C.sage }}>
                    ✓ {promoApplied.label} applied — {promoApplied.code}
                  </div>
                  <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>
                    {promoApplied.desc}
                  </div>
                </div>
                <button onClick={()=>{ setPromoA(null); setPromoIn(""); }}
                  style={{ background:"transparent", border:"none", color:C.muted,
                    cursor:"pointer", fontSize:12, textDecoration:"underline",
                    fontFamily:"'DM Sans',sans-serif" }}>
                  Remove
                </button>
              </div>
            )}

            {[
              {
                name:"Free", price:"$0", color:C.sage, badge:null, highlight:false,
                desc:"The complete decree builder. All 50 states. Domestic partnerships and civil unions included. Free, always.",
                features:[
                  "Full decree builder — all 50 states",
                  "All family types and relationship structures",
                  "State-specific filing information",
                  "Send to partner flow",
                  "Compare framework",
                  "PDF copy of your decree",
                ]
              },
              {
                name:"Court-Ready Document", price:"$29", color:C.navy, badge:"One-time", highlight:true,
                desc:"Your completed decree formatted as a court-ready document — properly structured, with your county header, signature blocks, and state-specific filing instructions. Delivered to your inbox within 24 hours.",
                features:[
                  "Everything in Free",
                  "Court-formatted decree document",
                  "County-specific filing checklist",
                  "Service of process instructions for your state",
                  "Cover letter template",
                  "Delivered to your email within 24 hours",
                  "One revision within 7 days",
                ]
              },
              {
                name:"Mediator Document Review", price:"$149", color:C.gold, badge:"Most valuable", highlight:false,
                desc:"A certified mediator reviews your completed decree for completeness, clarity, and workability — returning a marked-up version with plain-English notes within 48 hours.",
                features:[
                  "Everything in Document",
                  "48-hour mediator review",
                  "Flagged issues, missing clauses, ambiguous language",
                  "Plain-English notes from a certified mediator",
                  "One follow-up question answered by your reviewer",
                ]
              },
            ].map((p, i) => (
              <div key={p.name} style={{ marginBottom:14, position:"relative",
                border:`${p.highlight?"2px":"1px"} solid ${p.highlight?p.color:C.border}`,
                borderRadius:20, padding:"20px",
                background:p.highlight?C.navyLt:C.white,
                boxShadow:p.highlight?`0 4px 24px rgba(36,80,128,0.15)`:"0 1px 8px rgba(0,0,0,0.05)" }}>
                {p.badge && (
                  <div style={{ position:"absolute", top:-11, left:20,
                    background:p.highlight?C.navy:`${p.color}20`,
                    border:p.highlight?"none":`1px solid ${p.color}40`,
                    color:p.highlight?C.white:p.color,
                    fontSize:10, fontWeight:700, padding:"3px 12px",
                    borderRadius:20, letterSpacing:0.5 }}>{p.badge}</div>
                )}
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                  <div style={{ fontWeight:700, fontSize:16, color:p.color }}>{p.name}</div>
                  <div>
                  {promoApplied && p.price !== "$0" && (
                    <div style={{ fontSize:12, color:C.muted, textDecoration:"line-through",
                      textAlign:"right" }}>{p.price}</div>
                  )}
                  <div style={{ ...SERIF, fontSize:22, color:promoApplied&&p.price!=="$0"?C.sage:p.color, fontWeight:700 }}>
                    {promoApplied && p.price !== "$0"
                      ? "$" + ({
                          "Court-Ready Document": discountedPrice("doc"),
                          "Mediator Document Review": discountedPrice("review"),
                          "Free": 0,
                        }[p.name] || p.price.replace("$",""))
                      : p.price}
                  </div>
                  {promoApplied && p.price !== "$0" && (
                    <div style={{ fontSize:10, color:C.sage, fontWeight:700, textAlign:"right" }}>
                      {promoApplied.label}
                    </div>
                  )}
                </div>
                </div>
                <div style={{ fontSize:13, color:C.body, lineHeight:1.65, marginBottom:12 }}>{p.desc}</div>
                {p.features.map((f, j) => (
                  <div key={j} style={{ fontSize:12, color:C.body, padding:"4px 0",
                    borderTop:j>0 ? `1px solid ${C.warm}` : "none", display:"flex", gap:8 }}>
                    <span style={{ color:p.color, flexShrink:0 }}>◈</span><span>{f}</span>
                  </div>
                ))}
                {p.name === "Mediator Document Review" && (
                  <div style={{ marginTop:12, padding:"10px 12px",
                    background:C.navyLt, borderRadius:8,
                    fontSize:11, color:C.navy, lineHeight:1.65, fontStyle:"italic" }}>
                    This is a document review for completeness and clarity — not legal advice.
                    We recommend having your final decree reviewed by a licensed attorney
                    or your county's self-help legal clinic before filing.
                  </div>
                )}
                <button onClick={()=>{
                    if(p.price==="$0") { setScreen("build"); return; }
                    if(p.name==="Court-Ready Document") { setSPDF(true); return; }
                    if(p.name==="Mediator Document Review") { openStripe("review"); return; }
                    window.open("mailto:"+EMAIL+"?subject=ChosenFam "+p.name,"_blank");
                  }}
                  style={{ width:"100%", marginTop:14, padding:"12px 0", borderRadius:36,
                  border:p.highlight?"none":`1.5px solid ${p.color}`,
                  background:p.highlight?`linear-gradient(135deg,${C.navy},${C.navyMid})`:"transparent",
                  color:p.highlight?C.white:p.color,
                  fontSize:13, fontWeight:700, cursor:"pointer", ...SANS,
                  boxShadow:p.highlight?`0 4px 16px rgba(36,80,128,0.2)`:"none" }}>
                  {p.price==="$0" ? "Start building — it's free" : "Choose this →"}
                </button>
              </div>
            ))}

            {/* Sessions upsell */}
            <div style={{ marginTop:8, padding:"18px", background:C.white,
              borderRadius:18, border:`1px solid ${C.border}` }}>
              <div style={{ fontWeight:700, fontSize:15, color:C.teal, marginBottom:6 }}>
                Need a real person in the room?
              </div>
              <div style={{ fontSize:13, color:C.body, lineHeight:1.65, marginBottom:12 }}>
                Single session ($400) · 3-session bundle ($1,100) · Full Decree Package ($1,800)
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                <Btn v="ghost" onClick={() => setScreen("sessions")}>
                  See session options →
                </Btn>
                <button onClick={() => window.open(DISCOVERY, "_blank")} style={{
                  padding:"11px", borderRadius:40, border:`1.5px solid ${C.teal}`,
                  background:"transparent", color:C.teal, fontSize:13, fontWeight:600,
                  cursor:"pointer", width:"100%", fontFamily:"'DM Sans',sans-serif",
                }}>
                  Book a free discovery call first →
                </button>
              </div>
            </div>

            <div style={{ fontSize:12, color:C.muted, textAlign:"center", lineHeight:1.7,
              marginTop:16, fontStyle:"italic" }}>
              ChosenFam generates legal templates and educational guidance.<br/>
              This is legal orientation — not legal advice.
            </div>
          </div>
        )}

        {/* ════ TERMS OF SERVICE ═══════════════════════════════════════ */}
        {/* ════ HEART TO HEART ════════════════════════════════════════ */}
        {screen === "heart" && (
          <div className="enter">
            <HeartToHeart onNavigate={(s)=>setScreen(s)} />
          </div>
        )}

        {screen === "terms" && (
          <div className="enter">
            <div style={{ ...SERIF, fontSize:26, color:C.navy, marginBottom:4, fontWeight:600 }}>
              Terms of Service
            </div>
            <div style={{ fontSize:13, color:C.muted, marginBottom:20 }}>
              Last updated: May 2026 · Chosen Fam Mediation · chosenfam.com
            </div>
            {[
              {
                title:"1. Legal Orientation — Not Legal Advice",
                color:C.rose,
                body:`ChosenFam provides legal orientation, educational tools, and facilitation services. We do not provide legal advice, and no attorney-client relationship is formed through your use of this platform or through any mediation session, document review, or communication with ChosenFam staff or facilitators.

The decree templates, calculators, and guidance generated by ChosenFam are starting points for discussion — not final legal documents. We strongly recommend having your completed decree reviewed by a licensed attorney or your county's self-help legal clinic before filing with any court.

Nothing on this platform constitutes legal advice. If you need legal advice, please consult a licensed family law attorney in your state.`
              },
              {
                title:"2. Mediator Confidentiality",
                color:C.navy,
                body:`All communications made in connection with a ChosenFam mediation session are confidential. This includes:

◈ Statements made by either party during a session
◈ Documents prepared specifically for and in the course of mediation
◈ Any admissions, proposals, or offers made during mediation
◈ Notes and records created by the mediator during the process

This confidentiality is grounded in the mediation privilege statutes of most US states and the Uniform Mediation Act (where adopted). Mediation communications are generally not admissible as evidence in any court proceeding.

Exceptions to confidentiality exist where: (a) disclosure is required to prevent a crime or harm to a person, (b) disclosure is required by law, or (c) all parties and the mediator agree in writing to disclosure.`
              },
              {
                title:"3. Mediator Will Not Testify",
                color:C.teal,
                body:`ChosenFam mediators will not voluntarily testify in any court, arbitration, or administrative proceeding about any communication made during a mediation session, or about observations made in the course of mediation.

If subpoenaed, ChosenFam mediators will assert all applicable privileges under state and federal law, including mediator privilege and mediation confidentiality protections.

This protection applies to all parties equally. Neither party may waive this privilege unilaterally — waiver requires the agreement of all parties and the mediator.`
              },
              {
                title:"4. No Guarantee of Court Acceptance",
                color:C.gold,
                body:`ChosenFam generates decree templates and provides educational guidance based on your inputs. We cannot guarantee that any document generated through ChosenFam will be accepted by any court, judge, or clerk.

Court acceptance depends on many factors outside our control, including state-specific requirements, county-specific formatting rules, judicial discretion, and the completeness of your agreement. We strongly recommend review by a legal professional before filing.

ChosenFam is not responsible for any costs, delays, or outcomes resulting from a court's rejection or modification of any document generated through this platform.`
              },
              {
                title:"5. Confidentiality of Your Information",
                color:C.sage,
                body:`Information you provide through ChosenFam — including your name, the names of your children, financial information, and the content of your decree — is kept strictly confidential.

We do not sell, share, or disclose your personal information to third parties except: (a) as necessary to provide services you have requested (e.g., sending your decree to a paralegal reviewer), (b) as required by law, or (c) with your explicit written consent.

Documents generated through the platform are stored only as necessary to deliver your services and are not used for any other purpose. You may request deletion of your data at any time by contacting hello@chosenfam.love.`
              },
              {
                title:"6. Scope of Services",
                color:C.clay,
                body:`ChosenFam offers the following services:

◈ Decree Builder: An educational tool that generates a proposed divorce decree template based on your inputs. This is a starting point for discussion — not a final legal document.

◈ Court-Ready Document ($29): Formatting and delivery of your completed decree as a structured document. This is document formatting, not legal review.

◈ Mediator Document Review ($149): A certified mediator reviews your decree for completeness, clarity, and workability. This is not legal advice.

◈ Mediation Sessions ($400–$1,800): Facilitated conversations to help parties reach mutual agreement. Mediators are neutral facilitators, not advocates for either party.

◈ Group Coaching and Inward Bound: Educational and support programs for individuals and families navigating separation.`
              },
              {
                title:"7. Refund Policy",
                color:C.navy,
                body:`Court-Ready Document ($29): Refundable within 7 days if not yet delivered. After delivery, refunds are available if you can demonstrate the document was materially defective.

Mediator Document Review ($149): Refundable within 48 hours of purchase if review has not yet begun. Once delivered, no refund is available, but we will provide one free revision if you identify specific issues.

Mediation Sessions: Single sessions are refundable if cancelled at least 24 hours before the scheduled time. Bundles and packages are refundable for unused sessions only. The session booking fee is non-refundable if cancelled with less than 24 hours notice.

To request a refund, contact hello@chosenfam.love with your order information.`
              },
              {
                title:"8. Agreement to These Terms",
                color:C.sage,
                body:`By using ChosenFam — including the decree builder, document review, mediation sessions, or any other service — you agree to these Terms of Service.

By checking the acknowledgment box before generating your decree, you confirm that you have read, understood, and agreed to these terms, including the confidentiality provisions, the limitation on legal advice, and the mediator's privilege not to testify.

These terms are governed by the laws of the State of Illinois. Any disputes arising from your use of ChosenFam will be resolved through mediation before any court proceeding — which, given what we do, feels right.

Questions? Contact us at hello@chosenfam.love`
              },
            ].map((section, i) => (
              <div key={i} style={{ marginBottom:20 }}>
                <div style={{ fontWeight:700, fontSize:15, color:section.color,
                  marginBottom:8, paddingBottom:8,
                  borderBottom:`2px solid ${section.color}20` }}>
                  {section.title}
                </div>
                <div style={{ fontSize:13, color:C.body, lineHeight:1.85,
                  whiteSpace:"pre-line" }}>
                  {section.body}
                </div>
              </div>
            ))}

            {/* Agreement confirmation */}
            <div style={{ background:C.navy, borderRadius:14, padding:"16px 18px",
              marginTop:8 }}>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.7)", lineHeight:1.7,
                marginBottom:12 }}>
                By using ChosenFam you agree to these terms. If you have questions,
                email us at{" "}
                <a href="mailto:hello@chosenfam.love"
                  style={{ color:C.goldLt }}>hello@chosenfam.love</a>
              </div>
              <button onClick={()=>{ setTosAgreed(true); setScreen("build"); }}
                style={{ width:"100%", padding:"12px", borderRadius:30, border:"none",
                  background:`linear-gradient(135deg,${C.sage},${C.sageMid})`,
                  color:C.white, fontSize:13, fontWeight:700, cursor:"pointer",
                  fontFamily:"'DM Sans',sans-serif" }}>
                I agree — take me to the decree builder →
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ── STICKY FOOTER ── */}
      <div style={{ background:C.white, borderTop:`1px solid ${C.border}`,
        padding:"12px 18px", textAlign:"center", position:"sticky", bottom:0, zIndex:50 }}>
        <div style={{ fontSize:11, color:C.muted, lineHeight:1.6 }}>
          ChosenFam · Legal orientation, not legal advice · All mediation communications are confidential ·{" "}
          <span onClick={()=>setScreen("terms")}
            style={{ color:C.navy, textDecoration:"underline", cursor:"pointer" }}>
            Terms of Service
          </span>{" "}·{" "}
          <a href="mailto:hello@chosenfam.love"
            style={{ color:C.navy, textDecoration:"underline" }}>
            hello@chosenfam.love
          </a>
        </div>
      </div>

      {/* ── TERMS OF SERVICE QUICK-VIEW MODAL ── */}
      {showTosModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(26,23,20,0.8)",
          zIndex:400, display:"flex", alignItems:"flex-start", justifyContent:"center",
          padding:20, overflowY:"auto" }}
          onClick={e=>{ if(e.target===e.currentTarget) setSTos(false); }}>
          <div style={{ background:C.white, borderRadius:20, width:"100%", maxWidth:500,
            maxHeight:"88vh", overflow:"auto", boxShadow:"0 24px 80px rgba(0,0,0,0.5)" }}>

            {/* Modal header */}
            <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`,
              position:"sticky", top:0, background:C.white, zIndex:1,
              display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ ...SERIF, fontSize:18, color:C.navy, fontWeight:600 }}>
                Terms of Service
              </div>
              <button onClick={()=>setSTos(false)} style={{
                background:"transparent", border:`1px solid ${C.border}`,
                borderRadius:30, padding:"6px 14px", fontSize:12,
                color:C.muted, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                Close
              </button>
            </div>

            <div style={{ padding:"20px" }}>
              {[
                {
                  title:"Not Legal Advice",
                  color:C.rose,
                  body:"ChosenFam provides legal orientation and educational tools — not legal advice. No attorney-client relationship is formed. The decree templates generated are starting points for discussion. Have your final decree reviewed by a licensed attorney or your county's self-help legal clinic before filing."
                },
                {
                  title:"Mediator Confidentiality",
                  color:C.navy,
                  body:"All communications made during a ChosenFam mediation session are confidential and are not admissible as evidence in any court proceeding. This is grounded in mediation privilege statutes and the Uniform Mediation Act."
                },
                {
                  title:"Mediator Will Not Testify",
                  color:C.teal,
                  body:"ChosenFam mediators will not voluntarily testify in any court or legal proceeding about communications made during mediation. If subpoenaed, all applicable mediator privilege protections will be asserted."
                },
                {
                  title:"No Guarantee of Court Acceptance",
                  color:C.gold,
                  body:"ChosenFam cannot guarantee that any document will be accepted by any court. Court acceptance depends on factors outside our control including state requirements, judicial discretion, and the completeness of your agreement."
                },
                {
                  title:"Your Information is Confidential",
                  color:C.sage,
                  body:"We do not sell or share your personal information. Your decree content, financial information, and personal details are kept strictly confidential and used only to deliver the services you've requested."
                },
                {
                  title:"Refunds",
                  color:C.clay,
                  body:"Documents: refundable within 7 days if undelivered. Reviews: refundable within 48 hours if not yet begun. Sessions: refundable with 24+ hours notice. Contact hello@chosenfam.love for all refund requests."
                },
              ].map((s,i) => (
                <div key={i} style={{ marginBottom:16, paddingBottom:16,
                  borderBottom:i<5?`1px solid ${C.warm}`:"none" }}>
                  <div style={{ fontWeight:700, fontSize:13, color:s.color, marginBottom:5 }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize:12, color:C.body, lineHeight:1.75 }}>{s.body}</div>
                </div>
              ))}

              <div style={{ background:C.navy, borderRadius:12, padding:"14px 16px" }}>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.7)", lineHeight:1.6,
                  marginBottom:12 }}>
                  Questions about these terms? Email us at hello@chosenfam.love
                </div>
                <button onClick={()=>{ setTosAgreed(true); setSTos(false); }}
                  style={{ width:"100%", padding:"12px", borderRadius:30, border:"none",
                    background:`linear-gradient(135deg,${C.sage},${C.sageMid})`,
                    color:C.white, fontSize:13, fontWeight:700, cursor:"pointer",
                    fontFamily:"'DM Sans',sans-serif" }}>
                  I agree to these terms ✓
                </button>
              </div>

              <div style={{ textAlign:"center", marginTop:12 }}>
                <span onClick={()=>{ setSTos(false); setScreen("terms"); }}
                  style={{ fontSize:11, color:C.navy, textDecoration:"underline",
                    cursor:"pointer" }}>
                  Read the full Terms of Service →
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── PDF EMAIL CAPTURE MODAL ── */}
      {showPDFModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(26,23,20,0.75)",
          zIndex:300, display:"flex", alignItems:"center", justifyContent:"center",
          padding:20 }}
          onClick={e=>{ if(e.target===e.currentTarget){ setSPDF(false); setPDFSub(false); setPDFEmail(""); }}}>
          <div style={{ background:C.white, borderRadius:20, width:"100%", maxWidth:420,
            padding:28, boxShadow:"0 24px 80px rgba(0,0,0,0.4)" }}>
            {!pdfSubmitted ? (
              <>
                <div style={{ ...SERIF, fontSize:22, color:C.navy, marginBottom:6, fontWeight:600 }}>
                  Get your court-ready document
                </div>
                <div style={{ fontSize:13, color:C.body, lineHeight:1.75, marginBottom:20 }}>
                  Enter your email below. We'll prepare your formatted decree document
                  and send it to you within 24 hours — along with your state-specific
                  filing checklist and cover letter.
                </div>
                <div style={{ marginBottom:14 }}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:1.5,
                    textTransform:"uppercase", color:C.muted, marginBottom:6 }}>
                    Your email address
                  </div>
                  <input type="email" value={pdfEmail}
                    onChange={e=>setPDFEmail(e.target.value)}
                    placeholder="you@email.com"
                    style={{ width:"100%", padding:"12px 14px", borderRadius:10,
                      border:`1.5px solid ${C.border}`, background:C.bg,
                      fontSize:14, color:C.ink, outline:"none",
                      fontFamily:"'DM Sans',sans-serif" }}
                    onFocus={e=>e.target.style.borderColor=C.navy}
                    onBlur={e=>e.target.style.borderColor=C.border}
                  />
                </div>
                <div style={{ fontSize:11, color:C.muted, lineHeight:1.6, marginBottom:16,
                  padding:"10px 12px", background:C.panel, borderRadius:8, fontStyle:"italic" }}>
                  After submitting your email, you'll be taken to a secure checkout page ($29).
                  Your document will be emailed to you within 24 hours of payment.
                </div>
                <button disabled={!pdfEmail || !pdfEmail.includes("@")}
                  onClick={()=>{
                    // Open Stripe with email pre-noted, then mark submitted
                    window.open(STRIPE.doc + "?prefilled_email=" + encodeURIComponent(pdfEmail), "_blank");
                    setPDFSub(true);
                  }}
                  style={{ width:"100%", padding:"13px", borderRadius:40, border:"none",
                    background: pdfEmail && pdfEmail.includes("@")
                      ? `linear-gradient(135deg,${C.navy},${C.navyMid})`
                      : C.warm,
                    color: pdfEmail && pdfEmail.includes("@") ? C.white : C.muted,
                    fontSize:14, fontWeight:700, cursor:"pointer",
                    fontFamily:"'DM Sans',sans-serif",
                    boxShadow: pdfEmail ? "0 4px 16px rgba(24,56,90,0.25)" : "none",
                    transition:"all 0.18s" }}>
                  Continue to payment →
                </button>
                <button onClick={()=>{ setSPDF(false); setPDFEmail(""); }}
                  style={{ width:"100%", marginTop:10, padding:"10px", borderRadius:40,
                    border:`1px solid ${C.border}`, background:"transparent",
                    color:C.muted, fontSize:12, cursor:"pointer",
                    fontFamily:"'DM Sans',sans-serif" }}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div style={{ textAlign:"center", marginBottom:16 }}>
                  <div style={{ fontSize:40, marginBottom:12 }}>✦</div>
                  <div style={{ ...SERIF, fontSize:22, color:C.navy, marginBottom:8, fontWeight:600 }}>
                    You're all set.
                  </div>
                  <div style={{ fontSize:13, color:C.body, lineHeight:1.75, marginBottom:16 }}>
                    Complete your payment in the tab that just opened.
                    Once payment is confirmed, we'll prepare your court-ready document
                    and send it to <strong>{pdfEmail}</strong> within 24 hours.
                  </div>
                  <div style={{ background:C.sagePl, borderRadius:12, padding:"14px 16px",
                    marginBottom:16, border:`1px solid rgba(46,92,58,0.15)` }}>
                    <div style={{ fontSize:12, color:C.sage, lineHeight:1.7 }}>
                      <strong>What you'll receive:</strong><br/>
                      ◈ Your formatted decree document<br/>
                      ◈ County-specific filing checklist<br/>
                      ◈ Service of process instructions<br/>
                      ◈ Cover letter template<br/>
                      ◈ One revision if needed
                    </div>
                  </div>
                  <div style={{ fontSize:11, color:C.muted, lineHeight:1.6, fontStyle:"italic" }}>
                    Questions? Email us at hello@chosenfam.love
                  </div>
                </div>
                <button onClick={()=>{ setSPDF(false); setPDFSub(false); setPDFEmail(""); }}
                  style={{ width:"100%", padding:"12px", borderRadius:40,
                    background:C.navy, border:"none", color:C.white,
                    fontSize:13, fontWeight:700, cursor:"pointer",
                    fontFamily:"'DM Sans',sans-serif" }}>
                  Back to ChosenFam
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
