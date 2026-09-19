import { AIProvider, ChatMessage, GenerateStreamOptions } from './provider-interface';

export class MockProvider implements AIProvider {
  public readonly name = 'mock';

  public async generateStream(
    messages: ChatMessage[],
    options?: GenerateStreamOptions
  ): Promise<ReadableStream<Uint8Array>> {
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content || '';
    const query = lastUserMessage.toLowerCase();

    let responseText = '';
    let toolCall: { name: string; arguments: Record<string, unknown> } | undefined;

    // Detect missing information / hallucination queries first (with word boundaries to avoid matching 'agent' or 'languages')
    if (/\b(salary|password|crypto|startup|google|married|wife|age|car|net worth)\b/i.test(query)) {
      responseText = "I don't have that information in Afsar's portfolio.";
    }
    // Detect tool navigation intents
    else if (/\b(open|show|download|view)\b.*\bresume\b/i.test(query)) {
      toolCall = { name: 'openResume', arguments: {} };
      responseText = "I've opened Afsar's verified resume PDF for you.";
    } else if (query.includes('redactvision') && (query.includes('open') || query.includes('details') || query.includes('show'))) {
      toolCall = { name: 'openProject', arguments: { projectId: 'redactvision-agent' } };
      responseText = "I've opened the RedactVision Agent project modal for you.";
    } else if (query.includes('stroke2d') && (query.includes('open') || query.includes('details') || query.includes('show'))) {
      toolCall = { name: 'openProject', arguments: { projectId: 'stroke2d' } };
      responseText = "I've opened the Stroke2D project modal for you.";
    } else if (query.includes('civic') && (query.includes('open') || query.includes('details') || query.includes('show'))) {
      toolCall = { name: 'openProject', arguments: { projectId: 'civic-services-platform' } };
      responseText = "I've opened the Civic Services Platform project modal for you.";
    } else if (/\b(open|show|view|scroll to|navigate to|go to)\b.*\b(project|projects)\b/i.test(query)) {
      toolCall = { name: 'openSection', arguments: { section: 'projects' } };
      responseText = "I've navigated to Afsar's Projects section.";
    } else if (/\b(open|show|view|scroll to|navigate to|go to)\b.*\b(education|college|degree)\b/i.test(query)) {
      toolCall = { name: 'openSection', arguments: { section: 'education' } };
      responseText = "I've navigated to the Education section.";
    } else if (/\b(open|show|view|scroll to|navigate to|go to)\b.*\b(experience|internship|work)\b/i.test(query)) {
      toolCall = { name: 'openSection', arguments: { section: 'experience' } };
      responseText = "I've navigated to the Work Experience section.";
    } else if (/\b(open|show|view|scroll to|navigate to|go to)\b.*\b(skill|skills)\b/i.test(query)) {
      toolCall = { name: 'openSection', arguments: { section: 'skills' } };
      responseText = "I've navigated to the Technical Skills section.";
    } else if (/\b(open|show|view|scroll to|navigate to|go to)\b.*\b(contact|email|hire)\b/i.test(query)) {
      toolCall = { name: 'openSection', arguments: { section: 'contact' } };
      responseText = "I've navigated to the Contact section.";
    } else if (query.includes('who is afsar') || query.includes('tell me about afsar') || query.includes('about himself') || query.includes('bio')) {
      responseText =
        "Mohd Afsar is an AI and software engineer currently pursuing his Bachelor of Science in Data Science and Applications at **IIT Madras** (2023–2027) with a CGPA of 8.05/10. He specializes in agentic browser systems, privacy-preserving AI, and full-stack software development, having interned at the Sudha Gopalakrishnan Brain Centre (SGBC) at IIT Madras.";
    } else if (query.includes('redactvision')) {
      responseText =
        "**RedactVision Agent** is a privacy-preserving browser agent built for ISRO (Smart India Hackathon SIH 26171, Team ByteForce). It executes on-device DOM extraction and tokenizes sensitive PII (emails, names, credentials) into anonymous semantic placeholders locally before sending sanitized context to a server-side LLM planner, completely preventing raw PII leakage.";
    } else if (query.includes('stroke2d') || query.includes('sgbc') || query.includes('brain centre') || query.includes('internship')) {
      responseText =
        "At the **Sudha Gopalakrishnan Brain Centre (SGBC), IIT Madras**, Afsar worked as a Full Stack Developer Intern developing **Stroke2D**—a specialized clinical research tool for visualizing, mapping, and aligning human brain histology slices with MRI scans to analyze ischemic stroke regions. He also built features for the centre's OpenAtlas Editor platform using Angular, Django, and PostgreSQL.";
    } else if (query.includes('gpa') || query.includes('cgpa') || query.includes('grade')) {
      responseText = "Afsar's cumulative GPA at IIT Madras is 8.05 / 10.0.";
    } else if (query.includes('education') || query.includes('iit madras') || query.includes('study') || query.includes('college')) {
      responseText =
        "Afsar is pursuing a **Bachelor of Science in Data Science and Applications** at the **Indian Institute of Technology Madras (IIT Madras)** (May 2023 – Jan 2027) with a **CGPA of 8.05/10**. His coursework covers Data Structures & Algorithms, Database Systems, Object-Oriented Programming, Machine Learning, and Deep Learning.";
    } else if (query.includes('technology') || query.includes('tech stack') || query.includes('skills') || query.includes('programming language')) {
      responseText =
        "Afsar's technical toolkit includes:\n- **Languages**: Python, Java, JavaScript, TypeScript, SQL\n- **Frontend**: React, Next.js, Angular, Vue.js, Tailwind CSS\n- **Backend**: Django, Django REST Framework, FastAPI, Flask\n- **Databases**: PostgreSQL, SQLite\n- **AI/ML**: PyTorch, Scikit-Learn, Pandas, NumPy, Prompt Engineering, Agentic Tool Calling\n- **Tools**: Git, GitHub, Linux, VS Code, IntelliJ IDEA";
    } else if (query.includes('salary') || query.includes('married') || query.includes('age') || query.includes('car') || query.includes('google')) {
      responseText = "I don't have that information in Afsar's portfolio.";
    } else {
      responseText =
        "Afsar is an AI and full-stack engineer studying Data Science at IIT Madras. He built RedactVision Agent for ISRO (SIH 26171), engineered neuroimaging tools at SGBC IIT Madras (Stroke2D), and has solved over 300 DSA problems on LeetCode. You can ask about his projects, experience, skills, or ask me to open any section!";
    }

    const encoder = new TextEncoder();
    const words = responseText.split(' ');

    return new ReadableStream<Uint8Array>({
      async start(controller) {
        // Stream text word by word with realistic cadence
        for (const word of words) {
          const payload = JSON.stringify({ type: 'text', content: word + ' ' });
          controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
          await new Promise((r) => setTimeout(r, 18));
        }

        // Emit tool call if present
        if (toolCall) {
          const toolPayload = JSON.stringify({ type: 'tool_call', toolCall });
          controller.enqueue(encoder.encode(`data: ${toolPayload}\n\n`));
        }

        // Emit source citations if provided
        if (options?.sources && options.sources.length > 0) {
          const sourcePayload = JSON.stringify({ type: 'sources', sources: options.sources });
          controller.enqueue(encoder.encode(`data: ${sourcePayload}\n\n`));
        }

        // Done signal
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
        controller.close();
      },
    });
  }
}
