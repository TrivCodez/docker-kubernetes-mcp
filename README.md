# Docker & Kubernetes MCP Server

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-enabled-blue?logo=docker)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/kubernetes-enabled-blue?logo=kubernetes)](https://kubernetes.io/)
[![MCP](https://img.shields.io/badge/MCP-Server-purple)](https://modelcontextprotocol.io/)

A Model Context Protocol (MCP) server that provides powerful Docker and Kubernetes integration for AI assistants, enabling container orchestration, deployment management, and cluster operations.

## Features

- 🐳 **Docker Operations**
  - Container management (start, stop, restart, remove)
  - Image building and pulling
  - Volume and network management
  - Log streaming and inspection

- ☸️ **Kubernetes Operations**
  - Pod, Deployment, and Service management
  - Namespace operations
  - ConfigMap and Secret management
  - Resource monitoring and debugging

- 🔧 **MCP Integration**
  - Seamless integration with AI assistants
  - Structured tool calls for container operations
  - Real-time cluster state queries

## Installation

### Prerequisites

- Node.js 18+ or Python 3.10+
- Docker installed and running
- Kubernetes cluster access (kubectl configured)
- MCP client (e.g., Claude Desktop, Cline, etc.)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/TrivCodez/docker-kubernetes-mcp.git
cd docker-kubernetes-mcp

# Install dependencies
npm install

# Start the MCP server
npm run dev
```

### Configuration

Create a `.env` file with your configuration:

```env
# Docker configuration
DOCKER_HOST=unix:///var/run/docker.sock

# Kubernetes configuration
KUBECONFIG=~/.kube/config
KUBE_CONTEXT=

# MCP Server configuration
MCP_PORT=3000
LOG_LEVEL=info
```

## Usage

### With Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "docker-k8s": {
      "command": "node",
      "args": ["path/to/docker-kubernetes-mcp/dist/index.js"],
      "env": {
        "DOCKER_HOST": "unix:///var/run/docker.sock",
        "KUBECONFIG": "~/.kube/config"
      }
    }
  }
}
```

### Available Tools

#### Docker Tools
- `docker_list_containers` - List all containers
- `docker_run_container` - Run a new container
- `docker_stop_container` - Stop a running container
- `docker_build_image` - Build a Docker image
- `docker_logs` - Stream container logs

#### Kubernetes Tools
- `k8s_list_pods` - List pods in namespace
- `k8s_create_deployment` - Create a deployment
- `k8s_get_services` - Get service list
- `k8s_exec_pod` - Execute command in pod
- `k8s_get_logs` - Get pod logs

## Development

### Project Structure

```
docker-kubernetes-mcp/
├── src/
│   ├── index.ts          # Main entry point
│   ├── docker/           # Docker operations
│   ├── kubernetes/       # Kubernetes operations
│   └── tools/            # MCP tool definitions
├── tests/                # Test suites
├── package.json
├── tsconfig.json
└── README.md
```

### Running Tests

```bash
npm test
```

### Building

```bash
npm run build
```

## Security Considerations

⚠️ **Important**: This MCP server requires access to Docker socket and Kubernetes cluster. Ensure proper RBAC policies and network security are in place.

- Use read-only tokens when possible
- Implement proper authentication for production use
- Restrict access to sensitive namespaces
- Audit all operations in production environments

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)

---

**Made with ❤️ by TrivCodez**