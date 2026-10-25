#!/bin/bash
set -euo pipefail
export INSTALL_K3S_VERSION="${k3s_version}"
curl -sfL https://get.k3s.io | sh -
install -d -m 0700 -o ubuntu -g ubuntu /home/ubuntu/.kube
cp /etc/rancher/k3s/k3s.yaml /home/ubuntu/.kube/config
chown ubuntu:ubuntu /home/ubuntu/.kube/config
chmod 0600 /home/ubuntu/.kube/config
echo "k3s installed; retrieve kubeconfig through SSH and replace 127.0.0.1 with this host's public IP."
