import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/automations', () => {
    return HttpResponse.json([
      { id: 'send_email', label: 'Send Email', params: ['to', 'subject', 'body'] },
      { id: 'slack_message', label: 'Slack Message', params: ['channel', 'message'] },
      { id: 'create_ticket', label: 'Create Jira Ticket', params: ['project', 'summary', 'description'] }
    ]);
  }),
  
  http.post('/simulate', async ({ request }) => {
    try {
      const workflow = await request.json() as { nodes: any[], edges: any[] };
      const nodes = workflow.nodes || [];
      
      // Simulate execution time
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const log = nodes.map((node: any, index: number) => ({
        step: index + 1,
        nodeId: node.id,
        status: 'success',
        message: `Executed ${node.type} node "${node.data?.title || 'Untitled'}" successfully.`
      }));
      
      return HttpResponse.json(log);
    } catch (error) {
      return HttpResponse.json({ error: 'Invalid workflow data' }, { status: 400 });
    }
  })
];
