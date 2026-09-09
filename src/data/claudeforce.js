/**
 * CLAUDEFORCE DATA FILE — src/data/claudeforce.js
 * 3 Days of Claudeforce — Dreamforce 2026, San Francisco (Sep 15–17, 2026)
 *
 * The Anthropic/Claude track at Dreamforce: sessions with Anthropic speakers,
 * sessions where Anthropic is the customer, and product keynotes carrying a
 * Claude announcement.
 *
 * Sources: the Claudeforce catalog export (widget 1788995412113001UMJA) for 14
 * sessions, which supplies titles, times, venues, flags and URLs; and the
 * Claudeforce agenda page for 5 further rows that the export does not cover
 * (Life Sciences keynote, Faster Code / Harder Incidents, Revenue Where You
 * Work, and the Spiff session at both its slots). Those five carry url: null.
 *
 * Account-neutral: no client names, no deal context. Ships to every deployment.
 *
 * Same field schema as events.js, with two fixed differences:
 * - eventCategory is always "also"
 * - registrationRequired is always false; the agenda is first-come,
 *   first-seated unless noted
 *
 * Speakers are carried in bold at the head of `summary`, since the schema has
 * no speaker field. Session copy is paraphrased, not reproduced.
 *
 * EXPORT NAME IS `claudeforceSessions`.
 */
export const claudeforceSessions = [
  // ============================================================
  // TUESDAY, SEPTEMBER 15, 2026
  // ============================================================
  {
    id: "cf-tue-dreamforce-main-keynote-2026",
    eventCategory: "also",
    title: "Dreamforce Main Keynote 2026",
    date: "2026-09-15",
    startTime: "10:00",
    endTime: "12:00",
    room: "Keynote - Hall B · Moscone South, LL",
    area: "Keynote",
    type: "Keynote",
    topic: null,
    summary:
      "<b>Marc Benioff, with Dario Amodei (Anthropic) as special guest.</b> The Agentic Enterprise as a destination — what changes when humans, agents and platforms are pulling together on customer success. <i>Recorded — available on demand.</i>",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: "https://event.salesforce.com/widget/plus/df26/1788995412113001UMJA/session/1776704005612001dxP3",
    spotifyUrl: null,
  },
  {
    id: "cf-tue-anthropic-s-economist-on-ai",
    eventCategory: "also",
    title: "Anthropic's Economist on AI and the Future of Work",
    date: "2026-09-15",
    startTime: "12:45",
    endTime: "13:30",
    room: "Sales & Service Lounge · Contemporary Jewish Museum",
    area: "Leadership conversation",
    type: "Breakout",
    topic: null,
    summary:
      "<b>Peter McCrory, Head of Economics at Anthropic, with the CMO of Sales Cloud.</b> Which forecasts about AI and labour have held up and which have not, what is actually shifting between automation and newly created roles, and what sales leaders should be watching now.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: "https://maps.google.com/?q=Contemporary+Jewish+Museum,+736+Mission+St,+San+Francisco,+CA+94103",
    url: "https://event.salesforce.com/widget/plus/df26/1788995412113001UMJA/session/1786714722723001Zdnp",
    spotifyUrl: null,
  },
  {
    id: "cf-tue-life-sciences-keynote-rewriting-the",
    eventCategory: "also",
    title: "Life Sciences Keynote: Rewriting the Script with Agentforce 360",
    date: "2026-09-15",
    startTime: "14:00",
    endTime: "14:50",
    room: "Keynote Room · Moscone West, L3",
    area: "Keynote",
    type: "Keynote",
    topic: null,
    summary:
      "<b>McKesson Medical Surgical, Fresenius, Takeda and AstraZeneca.</b> Pharma and medtech leaders return a year on, on stage, putting AI agents to work closing care gaps and shortening the path to therapy at global scale.",
    participants: null,
    registrationRequired: false,
    transitionWarning:
      "Runs against Why Anthropic Chose Spiff for Real-Time Comp Transparency (2:00 PM). Only one can be attended live — keep the one you want in My Schedule.",
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "cf-tue-why-anthropic-chose-spiff-for",
    eventCategory: "also",
    title: "Why Anthropic Chose Spiff for Real-Time Comp Transparency",
    date: "2026-09-15",
    startTime: "14:00",
    endTime: "14:40",
    room: "Room 2024 · Moscone West, L2",
    area: "Anthropic as a customer",
    type: "Breakout",
    topic: null,
    summary:
      "<b>Jaspal Singh (Anthropic) with the Salesforce Spiff team.</b> How Anthropic runs incentive compensation to drive growth and keep reps motivated, plus what Spiff does with AI, the headless patterns it supports, and where it goes next.",
    participants: null,
    registrationRequired: false,
    transitionWarning:
      "Runs against Life Sciences Keynote: Rewriting the Script with Agentforce 360 (2:00 PM). Only one can be attended live — keep the one you want in My Schedule.",
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
  {
    id: "cf-tue-faster-code-harder-incidents",
    eventCategory: "also",
    title: "Faster Code, Harder Incidents",
    date: "2026-09-15",
    startTime: "15:30",
    endTime: "16:00",
    room: "Trailblazer Theater · Moscone West, L2",
    area: "Leadership conversation",
    type: "Theater",
    topic: null,
    summary:
      "<b>Cat Wu, Head of Product for Claude Code and Cowork at Anthropic, with Jaime DeLanghe (CPO, Slack) and Spiros Xanthos (CEO, Resolve AI).</b> AI is changing both how software gets written and how teams keep production reliable. Leaders from each end of that lifecycle on what is reshaping their side of it.",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },

  // ============================================================
  // WEDNESDAY, SEPTEMBER 16, 2026
  // ============================================================
  {
    id: "cf-wed-sales-keynote-welcome-the-1",
    eventCategory: "also",
    title: "Sales Keynote: Welcome the #1 CRM and Claude to Your Team",
    date: "2026-09-16",
    startTime: "09:00",
    endTime: "09:50",
    room: "Keynote - Hall B · Moscone South, LL",
    area: "Keynote",
    type: "Keynote",
    topic: null,
    summary:
      "<b>Anthropic's Head of Americas and banking lead, with Sales Cloud leadership and customers from Batteries Plus, Lynx and Zscaler.</b> Revenue breaks wherever context is lost. The CRM capturing buyer intent and carrying it through every handoff — now running natively inside Claudeforce. <i>Recorded — available on demand.</i>",
    participants: null,
    registrationRequired: false,
    transitionWarning:
      "Runs against Financial Services Keynote: Your Pilot-to-Profit Playbook (9:15 AM). Only one can be attended live — keep the one you want in My Schedule.",
    mapsUrl: null,
    url: "https://event.salesforce.com/widget/plus/df26/1788995412113001UMJA/session/1781726986721001l0A3",
    spotifyUrl: null,
  },
  {
    id: "cf-wed-financial-services-keynote-your-pilot",
    eventCategory: "also",
    title: "Financial Services Keynote: Your Pilot-to-Profit Playbook",
    date: "2026-09-16",
    startTime: "09:15",
    endTime: "10:05",
    room: "Keynote - Room 3001 · Moscone West, L3",
    area: "Keynote",
    type: "Keynote",
    topic: null,
    summary:
      "<b>Rocket Mortgage engineering, Bank of America's CRM technology CIO, and Anthropic's banking lead.</b> Why AI scales at some financial services firms and stalls at others, and the strategies separating the leaders from the ones still experimenting. <i>Recorded — available on demand.</i>",
    participants: null,
    registrationRequired: false,
    transitionWarning:
      "Runs against Sales Keynote: Welcome the #1 CRM and Claude to Your Team (9:00 AM). Only one can be attended live — keep the one you want in My Schedule.",
    mapsUrl: null,
    url: "https://event.salesforce.com/widget/plus/df26/1788995412113001UMJA/session/1781726999275001l33J",
    spotifyUrl: null,
  },
  {
    id: "cf-wed-start-building-with-salesforce-in",
    eventCategory: "also",
    title: "Start Building with Salesforce in Claude Code",
    date: "2026-09-16",
    startTime: "10:30",
    endTime: "11:10",
    room: "Room 3018 · Moscone West, L3",
    area: "Building with Claude",
    type: "Breakout",
    topic: null,
    summary:
      "<b>Presented with Anthropic.</b> How plug-ins carry trusted Salesforce context and workflows directly into Claude Code, speeding up how Salesforce apps get built, tested and managed. <i>Recorded — available on demand.</i>",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: "https://event.salesforce.com/widget/plus/df26/1788995412113001UMJA/session/1782927051964001J2rW",
    spotifyUrl: null,
  },
  {
    id: "cf-wed-service-keynote-drive-outcomes-at",
    eventCategory: "also",
    title: "Service Keynote: Drive Outcomes at Every Customer Touchpoint",
    date: "2026-09-16",
    startTime: "12:00",
    endTime: "12:50",
    room: "Keynote - Hall B · Moscone South, LL",
    area: "Keynote",
    type: "Keynote",
    topic: null,
    summary:
      "<b>With Canada Goose, CVS Health and Vonage.</b> Agentforce Service bringing human and AI agents together for proactive service across every channel. The Claudeforce agenda adds that admins configure it with Claude and that service leaders run both kinds of agent from one interface. <i>Recorded — available on demand.</i>",
    participants: null,
    registrationRequired: false,
    transitionWarning:
      "Runs against TIME100: Inside Anthropic with Mike Krieger (12:00 PM); Future of Sales: Claude Tag (12:30 PM); Revenue Keynote: Beyond CPQ, One Engine, Every Experience (12:45 PM). Only one can be attended live — keep the one you want in My Schedule.",
    mapsUrl: null,
    url: "https://event.salesforce.com/widget/plus/df26/1788995412113001UMJA/session/1781726987489001lhYO",
    spotifyUrl: null,
  },
  {
    id: "cf-wed-time100-inside-anthropic-with-mike",
    eventCategory: "also",
    title: "TIME100: Inside Anthropic with Mike Krieger",
    date: "2026-09-16",
    startTime: "12:00",
    endTime: "12:30",
    room: "Agentic Theater · Campground · Moscone North, LL",
    area: "Leadership conversation",
    type: "Theater",
    topic: null,
    summary:
      "<b>Mike Krieger, Anthropic CPO, with TIME's editor in chief.</b> An unscripted conversation on building AI responsibly, holding innovation and human agency in balance, and where the technology goes next. <i>Recorded — available on demand.</i>",
    participants: null,
    registrationRequired: false,
    transitionWarning:
      "Runs against Service Keynote: Drive Outcomes at Every Customer Touchpoint (12:00 PM). Only one can be attended live — keep the one you want in My Schedule.",
    mapsUrl: null,
    url: "https://event.salesforce.com/widget/plus/df26/1788995412113001UMJA/session/1779839540296001G80k",
    spotifyUrl: null,
  },
  {
    id: "cf-wed-future-of-sales-claude-tag",
    eventCategory: "also",
    title: "Future of Sales: Claude Tag",
    date: "2026-09-16",
    startTime: "12:30",
    endTime: "13:10",
    room: "Room 3022 · Moscone West, L3",
    area: "Building with Claude",
    type: "Breakout",
    topic: null,
    summary:
      "<b>Kevin Martin, GTM Incubations at Anthropic.</b> Claude Tag turns Claude into a teammate inside Slack. For sales that means tagging @Claude in a deal channel to assemble the account picture, write next steps, fetch a report, or hand off a task to run on its own.",
    participants: null,
    registrationRequired: false,
    transitionWarning:
      "Runs against Service Keynote: Drive Outcomes at Every Customer Touchpoint (12:00 PM); Revenue Keynote: Beyond CPQ, One Engine, Every Experience (12:45 PM). Only one can be attended live — keep the one you want in My Schedule.",
    mapsUrl: null,
    url: "https://event.salesforce.com/widget/plus/df26/1788995412113001UMJA/session/1779838603659001GgeL",
    spotifyUrl: null,
  },
  {
    id: "cf-wed-revenue-keynote-beyond-cpq-one",
    eventCategory: "also",
    title: "Revenue Keynote: Beyond CPQ, One Engine, Every Experience",
    date: "2026-09-16",
    startTime: "12:45",
    endTime: "13:35",
    room: "Keynote - Room 3001 · Moscone West, L3",
    area: "Keynote",
    type: "Keynote",
    topic: null,
    summary:
      "<b>With Workday's CIO and m3ter.</b> Agentforce Revenue Management as one engine reaching past CPQ to hold pricing, quoting, contracting and billing together, whatever the channel, experience or agent. <i>Recorded — available on demand.</i>",
    participants: null,
    registrationRequired: false,
    transitionWarning:
      "Runs against Service Keynote: Drive Outcomes at Every Customer Touchpoint (12:00 PM); Future of Sales: Claude Tag (12:30 PM); Commerce Keynote: Solve Four Challenges of Modern Commerce (1:20 PM). Only one can be attended live — keep the one you want in My Schedule.",
    mapsUrl: null,
    url: "https://event.salesforce.com/widget/plus/df26/1788995412113001UMJA/session/1781726985383001lf7a",
    spotifyUrl: null,
  },
  {
    id: "cf-wed-commerce-keynote-solve-four-challenges",
    eventCategory: "also",
    title: "Commerce Keynote: Solve Four Challenges of Modern Commerce",
    date: "2026-09-16",
    startTime: "13:20",
    endTime: "14:10",
    room: "Keynote - Room 2020 · Moscone West, L2",
    area: "Keynote",
    type: "Keynote",
    topic: null,
    summary:
      "Shopper expectations have moved with AI and agents, and keeping up across the site, the store and B2B selling has been slow and expensive. This one takes on all four fronts at once. <i>Recorded — available on demand.</i>",
    participants: null,
    registrationRequired: false,
    transitionWarning:
      "Runs against Revenue Keynote: Beyond CPQ, One Engine, Every Experience (12:45 PM). Only one can be attended live — keep the one you want in My Schedule.",
    mapsUrl: null,
    url: "https://event.salesforce.com/widget/plus/df26/1788995412113001UMJA/session/1781726979135001lUJ0",
    spotifyUrl: null,
  },
  {
    id: "cf-wed-aiforce-keynote-anywhere-humans-and",
    eventCategory: "also",
    title: "AIforce Keynote: Anywhere Humans and Agents Work",
    date: "2026-09-16",
    startTime: "14:10",
    endTime: "15:00",
    room: "Keynote - Hall A · Moscone South, LL",
    area: "Keynote",
    type: "Keynote",
    topic: null,
    summary:
      "<b>Scott White, Head of Product for Enterprise at Anthropic.</b> AIforce framed around three demands — the AI a business wants, trust it can rely on, and measurable enterprise return — with a look at the headless capabilities underneath and customers taking Salesforce anywhere. <i>Recorded — available on demand.</i>",
    participants: null,
    registrationRequired: false,
    transitionWarning:
      "Runs against How Fin Delivers Over 90% Resolution Rates for Customers (2:30 PM). Only one can be attended live — keep the one you want in My Schedule.",
    mapsUrl: null,
    url: "https://event.salesforce.com/widget/plus/df26/1788995412113001UMJA/session/1781726973233001l5xc",
    spotifyUrl: null,
  },
  {
    id: "cf-wed-how-fin-delivers-over-90",
    eventCategory: "also",
    title: "How Fin Delivers Over 90% Resolution Rates for Customers",
    date: "2026-09-16",
    startTime: "14:30",
    endTime: "14:50",
    room: "Stage 8 · Content Pavilion · Moscone South, LL",
    area: "Anthropic as a customer",
    type: "Content Pavilion",
    topic: null,
    summary:
      "<b>Fin's Chief Operating Officer.</b> The support product Anthropic and Clay both run on, averaging 76 percent resolution across a base of 12,000 customers and handling full customer operations work rather than deflection alone.",
    participants: null,
    registrationRequired: false,
    transitionWarning:
      "Runs against AIforce Keynote: Anywhere Humans and Agents Work (2:10 PM). Only one can be attended live — keep the one you want in My Schedule.",
    mapsUrl: null,
    url: "https://event.salesforce.com/widget/plus/df26/1788995412113001UMJA/session/1779838738155001Gfg5",
    spotifyUrl: null,
  },
  {
    id: "cf-wed-anthropics-ai-powered-approach-to",
    eventCategory: "also",
    title: "Anthropic’s AI-Powered Approach to Seller Readiness",
    date: "2026-09-16",
    startTime: "15:00",
    endTime: "15:20",
    room: "Theater 5 · Moscone West, L2",
    area: "Anthropic as a customer",
    type: "Theater",
    topic: null,
    summary:
      "<b>Anthropic's Chief of Staff for Commercial Strategy and Operations, with Salesforce sales and architecture leads.</b> Scaling seller readiness through targeted AI-driven programmes that reach reps inside their normal workflow, with engagement tracked live and tied back to sales impact. <i>Recorded — available on demand.</i>",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: "https://event.salesforce.com/widget/plus/df26/1788995412113001UMJA/session/1786750055890001FDd4",
    spotifyUrl: null,
  },

  // ============================================================
  // THURSDAY, SEPTEMBER 17, 2026
  // ============================================================
  {
    id: "cf-thu-slack-keynote-the-front-door",
    eventCategory: "also",
    title: "Slack Keynote: The Front Door to the Agentic Enterprise",
    date: "2026-09-17",
    startTime: "10:00",
    endTime: "10:50",
    room: "Keynote - Hall B · Moscone South, LL",
    area: "Keynote",
    type: "Keynote",
    topic: null,
    summary:
      "<b>Boris Cherny, Allie K. Miller and Rob Seaman, with Slack product leadership and Stripe.</b> Slack as the new way to work — paying off existing investments, making AI a team activity, and giving every employee Slackbot as a single superagent to orchestrate the rest. <i>Recorded — available on demand.</i>",
    participants: null,
    registrationRequired: false,
    transitionWarning:
      "Runs against Revenue Where You Work: How Headless Design Makes It Work (10:30 AM). Only one can be attended live — keep the one you want in My Schedule.",
    mapsUrl: null,
    url: "https://event.salesforce.com/widget/plus/df26/1788995412113001UMJA/session/1781726988849001lmFb",
    spotifyUrl: null,
  },
  {
    id: "cf-thu-revenue-where-you-work-how",
    eventCategory: "also",
    title: "Revenue Where You Work: How Headless Design Makes It Work",
    date: "2026-09-17",
    startTime: "10:30",
    endTime: "11:10",
    room: "Theatre 15 · Metreon AMC, L3",
    area: "Building with Claude",
    type: "Breakout",
    topic: null,
    summary:
      "Halter and Xnurta pulling quoting into custom apps and Slack where their teams already are. Includes Halter running Agentforce Revenue Management through Claude to build a headless revenue model and a bespoke mobile app covering quoting, contracts and hardware availability.",
    participants: null,
    registrationRequired: false,
    transitionWarning:
      "Runs against Slack Keynote: The Front Door to the Agentic Enterprise (10:00 AM). Only one can be attended live — keep the one you want in My Schedule.",
    mapsUrl: "https://maps.google.com/?q=Metreon,+135+4th+St,+San+Francisco,+CA+94103",
    url: null,
    spotifyUrl: null,
  },
  {
    id: "cf-thu-why-anthropic-chose-spiff-for",
    eventCategory: "also",
    title: "Why Anthropic Chose Spiff for Real-Time Comp Transparency",
    date: "2026-09-17",
    startTime: "12:30",
    endTime: "13:10",
    room: "Stage 2 · Content Pavilion · Moscone South, LL",
    area: "Anthropic as a customer",
    type: "Breakout",
    topic: null,
    summary:
      "<b>Jaspal Singh (Anthropic) with the Salesforce Spiff team.</b> How Anthropic runs incentive compensation to drive growth and keep reps motivated, plus what Spiff does with AI, the headless patterns it supports, and where it goes next. <i>Also runs Tue 2:00 PM, Moscone West, L2, Room 2024.</i>",
    participants: null,
    registrationRequired: false,
    transitionWarning: null,
    mapsUrl: null,
    url: null,
    spotifyUrl: null,
  },
];
