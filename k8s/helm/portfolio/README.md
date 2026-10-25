# GHCR image pull access

If the GHCR package is private, create a read-only package token outside Git, sign in to GHCR with `docker login ghcr.io` (let Docker prompt for the token), and create a namespace-scoped Kubernetes pull secret from the local Docker config. Do not paste the token into a command, chat, or repository file.

Use a local, untracked values file containing:

```yaml
imagePullSecrets:
  - name: ghcr-pull
```

The secret must exist in the same namespace as the app. If the package is deliberately public, no pull secret is needed.
