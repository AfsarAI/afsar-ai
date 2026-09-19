export interface ScopeCheckResult {
  isAllowed: boolean;
  refusalReason?: string;
  refusalMessage?: string;
}

const OUT_OF_SCOPE_PATTERNS = [
  // General programming requests
  /\bwrite (a|me a) (python|javascript|java|c\+\+|rust|go|php|ruby|sql) (program|script|code|function|app)\b/i,
  /\bhow to (install|code|write|program|build)(\s+a)?\s+(todo|calculator|weather|game|website|app)\b/i,
  /\bfix this code\b/i,
  
  // General trivia & world knowledge
  /\bwho is (elon musk|sam altman|donald trump|joe biden|modi|messi|ronaldo|taylor swift)\b/i,
  /\bwhat is the (weather|capital of|distance to|population of|speed of light)\b/i,
  /\bwho won the (world cup|super bowl|ipl|champions league)\b/i,
  /\btell me a (joke|story|poem|riddle|song)\b/i,
  /\bwhat is (the meaning of life|quantum physics|photosynthesis)\b/i,
  /\bexplain (relativity|black holes|calculus)\b/i,
  /\b(translate|write an essay|solve for x)\b/i,

  // Prompt injection attempts
  /\bignore (all|your|previous) instructions\b/i,
  /\bdisregard (all|previous) (rules|instructions)\b/i,
  /\breveal (your|the)\b.*(instructions|system prompt|developer prompt|prompt|api key)/i,
  /\boutput (your|the)\b.*(system prompt|initial prompt|instructions)/i,
  /\byou are now (dan|jailbroken|an unrestricted ai)\b/i,
];

export function checkQueryScope(query: string): ScopeCheckResult {
  const normalized = query.trim().toLowerCase();

  // Allow greeting / introduction
  if (/^(hi|hello|hey|greetings|who are you|what can you do)[\s!.?]*$/i.test(normalized)) {
    return { isAllowed: true };
  }

  // Check explicit out-of-scope patterns
  for (const pattern of OUT_OF_SCOPE_PATTERNS) {
    if (pattern.test(query)) {
      return {
        isAllowed: false,
        refusalReason: 'out_of_scope_or_injection',
        refusalMessage:
          "I am Afsar's portfolio assistant, so I can only answer questions about Afsar, his technical projects (like RedactVision Agent and Stroke2D), skills, education at IIT Madras, work experience, and portfolio navigation.",
      };
    }
  }

  return { isAllowed: true };
}
