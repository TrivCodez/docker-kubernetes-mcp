# Docker & Kubernetes MCP Server

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-enabled-blue?logo=docker)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/kubernetes-enabled-blue?logo=kubernetes)](https://kubernetes.io/)
[![MCP](https://img.shields.io/badge/MCP-Server-purple)](https://modelcontextprotocol.io/)

A Model Context Protocol (MCP) server that provides powerful Docker and Kubernetes integration for AI assistants.

## Features

- 🐳 **Docker Operations**: Container management, image building, volume/network management
- ☸️ **Kubernetes Operations**: Pod/Deployment/Service management, namespace operations
- 🔧 **MCP Integration**: Seamless AI assistant integration with structured tool calls

## Quick Start

```bash
git clone https://github.com/TrivCodez/docker-kubernetes-mcp.git
cd docker-kubernetes-mcp
npm install
npm run dev
```

## Usage

### Claude Desktop Config

```json
{
  "mcpServers": {
    "docker-k8s": {
      "command": "node",
      "args": ["dist/index.js"],
      "env": {
        "DOCKER_HOST": "unix:///var/run/docker.sock",
        "KUBECONFIG": "~/.kube/config"
      }
    }
  }
}
```

### Available Tools

**Docker:**
- `docker_list_containers`
- `docker_run_container`
- `docker_stop_container`
- `docker_build_image`
- `docker_logs`

**Kubernetes:**
- `k8s_list_pods`
- `k8s_create_deployment`
- `k8s_get_services`
- `k8s_exec_pod`
- `k8s_get_logs`

## Development

```bash
npm run build
npm test
```

## Security

⚠️ Requires Docker socket and Kubernetes cluster access. Use proper RBAC and authentication in production.

## License

MIT License - see LICENSE file

---
**Made with ❤️ by TrivCodez**
