# HTTPS setup

The chart exposes an Ingress but leaves TLS disabled until a real domain and contact email are configured.

1. Install cert-manager from its official, version-pinned Helm chart and verify its pods are healthy.
2. Copy the example issuer manifests, replace the contact email, and create the staging `ClusterIssuer` first. Create the production issuer only after DNS and HTTP-01 challenge validation succeed.
3. In a local, untracked values file, set `ingress.host`, enable `ingress.tls`, and add the annotation `cert-manager.io/cluster-issuer` for the chosen issuer.
4. Point the chosen hostname at the cluster's public address. Confirm that ports 80 and 443 reach Traefik.
5. Check the Certificate and Challenge resources before switching from staging to production.

Do not commit email credentials, DNS API tokens, or private keys. Keep the placeholder domain out of production DNS.
