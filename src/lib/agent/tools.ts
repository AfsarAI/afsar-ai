export interface ToolDefinition {
  name: string;
  description: string;
  parameters: {
    type: string;
    properties: Record<string, {
      type: string;
      description: string;
      enum?: string[];
    }>;
    required: string[];
  };
}

export const PORTFOLIO_TOOLS: ToolDefinition[] = [
  {
    name: 'openSection',
    description: 'Scrolls to and highlights a specific section in Afsar\'s portfolio UI.',
    parameters: {
      type: 'object',
      properties: {
        section: {
          type: 'string',
          description: 'The target portfolio section to view.',
          enum: ['about', 'projects', 'experience', 'education', 'skills', 'achievements', 'contact'],
        },
      },
      required: ['section'],
    },
  },
  {
    name: 'openProject',
    description: 'Opens an interactive deep-dive modal showing full architecture, features, and links for a specific project.',
    parameters: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: 'The slug identifier of the project to open.',
          enum: ['redactvision-agent', 'stroke2d', 'civic-services-platform', 'quizmaster'],
        },
      },
      required: ['projectId'],
    },
  },
  {
    name: 'openResume',
    description: 'Opens or triggers the download of Afsar\'s verified resume PDF.',
    parameters: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'openExternalLink',
    description: 'Navigates to one of Afsar\'s verified public profiles or initiates contact.',
    parameters: {
      type: 'object',
      properties: {
        platform: {
          type: 'string',
          description: 'The platform profile to open.',
          enum: ['github', 'linkedin', 'leetcode', 'email'],
        },
      },
      required: ['platform'],
    },
  },
];
