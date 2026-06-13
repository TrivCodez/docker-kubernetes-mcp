import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

// Docker tools schema
const DockerToolsSchema = z.object({
  name: z.enum(['docker_list_containers', 'docker_run_container', 'docker_stop_container', 'docker_build_image', 'docker_logs']),
  arguments: z.record(z.string(), z.any()).optional(),
});

// Kubernetes tools schema
const K8sToolsSchema = z.object({
  name: z.enum(['k8s_list_pods', 'k8s_create_deployment', 'k8s_get_services', 'k8s_exec_pod', 'k8s_get_logs']),
  arguments: z.record(z.string(), z.any()).optional(),
});

const server = new Server(
  {
    name: 'docker-kubernetes-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'docker_list_containers',
        description: 'List all Docker containers',
        inputSchema: {
          type: 'object',
          properties: {
            all: { type: 'boolean', description: 'Show all containers (default: just running)' },
          },
        },
      },
      {
        name: 'docker_run_container',
        description: 'Run a new Docker container',
        inputSchema: {
          type: 'object',
          properties: {
            image: { type: 'string', description: 'Docker image to run' },
            name: { type: 'string', description: 'Container name' },
            ports: { type: 'array', items: { type: 'string' }, description: 'Port mappings' },
            env: { type: 'object', description: 'Environment variables' },
          },
          required: ['image'],
        },
      },
      {
        name: 'docker_logs',
        description: 'Get container logs',
        inputSchema: {
          type: 'object',
          properties: {
            container: { type: 'string', description: 'Container ID or name' },
            tail: { type: 'number', description: 'Number of lines to show' },
            follow: { type: 'boolean', description: 'Follow log output' },
          },
          required: ['container'],
        },
      },
      {
        name: 'k8s_list_pods',
        description: 'List Kubernetes pods in a namespace',
        inputSchema: {
          type: 'object',
          properties: {
            namespace: { type: 'string', description: 'Kubernetes namespace (default: default)' },
            labelSelector: { type: 'string', description: 'Label selector' },
          },
        },
      },
      {
        name: 'k8s_create_deployment',
        description: 'Create a Kubernetes deployment',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Deployment name' },
            image: { type: 'string', description: 'Container image' },
            replicas: { type: 'number', description: 'Number of replicas' },
            namespace: { type: 'string', description: 'Namespace' },
            ports: { type: 'array', items: { type: 'number' }, description: 'Container ports' },
          },
          required: ['name', 'image'],
        },
      },
      {
        name: 'k8s_get_services',
        description: 'Get Kubernetes services',
        inputSchema: {
          type: 'object',
          properties: {
            namespace: { type: 'string', description: 'Kubernetes namespace' },
          },
        },
      },
      {
        name: 'k8s_exec_pod',
        description: 'Execute command in a pod',
        inputSchema: {
          type: 'object',
          properties: {
            pod: { type: 'string', description: 'Pod name' },
            namespace: { type: 'string', description: 'Namespace' },
            command: { type: 'string', description: 'Command to execute' },
          },
          required: ['pod', 'command'],
        },
      },
      {
        name: 'k8s_get_logs',
        description: 'Get pod logs',
        inputSchema: {
          type: 'object',
          properties: {
            pod: { type: 'string', description: 'Pod name' },
            namespace: { type: 'string', description: 'Namespace' },
            tail: { type: 'number', description: 'Number of lines' },
          },
          required: ['pod'],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    // TODO: Implement actual Docker and Kubernetes operations
    // This is a stub - implement real logic here
    
    return {
      content: [
        {
          type: 'text',
          text: `Tool ${name} called with args: ${JSON.stringify(args, null, 2)}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          isError: true,
        },
      ],
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Docker & Kubernetes MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
