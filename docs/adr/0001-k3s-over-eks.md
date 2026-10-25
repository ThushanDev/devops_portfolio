# ADR 0001: k3s on EC2 for the demonstration cluster

- Status: accepted for this learning project
- Context: a managed Kubernetes control plane adds cost and hides some cluster operations from the portfolio demonstration.
- Decision: use single-node k3s on EC2 for the initial demonstration, while keeping Kubernetes manifests portable.
- Consequences: the host is a single point of failure and capacity is limited. Production traffic belongs on a managed, multi-node platform. The Kubernetes API is restricted to the operator IP.
