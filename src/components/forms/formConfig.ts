export const FORM_CONFIG: Record<string, { name: string; type: string }[]> = {
  start: [
    { name: "label", type: "text" }
  ],
  task: [
    { name: "label", type: "text" },
    { name: "description", type: "text" },
    { name: "assignee", type: "text" },
    { name: "dueDate", type: "date" },
  ],
  approval: [
    { name: "label", type: "text" },
    { name: "approverRole", type: "text" },
    { name: "threshold", type: "number" },
  ],
  automation: [
    { name: "label", type: "text" },
    { name: "actionId", type: "select" },
  ],
  end: [
    { name: "label", type: "text" }
  ]
};
